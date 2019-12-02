import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { get } from "@ember/object";
import config from '../config/environment';
import fetch from 'fetch';

export default Route.extend({
  router: service(),
  currentStream: service(),
  woms: service(),
  hifi: service(),
  fastboot: service(),
  dataLayer: service('nypr-metrics/data-layer'),

  title(tokens = []) {
    let siteName = 'WQXR Beta';
    let tagline = "Classical Music Radio Live from NYC";

    // combine the first two items if the second item stats with `:`
    if (tokens[1] && tokens[1].startsWith(':'))  {
      tokens.splice(0, 2, `${tokens[0]} ${tokens[1]}`);
    }

    tokens.push(tagline);
    if (tokens.length < 3) {
      tokens.push(siteName);
    }
    let title = tokens.join(' | ');
    get(this, 'dataLayer').setPageTitle(title);

    return title;
  },

  init() {
    this._super(...arguments);
    this.router.on('routeDidChange', () => {
      schedule('afterRender', () => this.dataLayer.sendPageView());
    });
    this.hifi.set('volume', 100);
  },

  async model() {
    let shoebox = this.fastboot.shoebox;
    let womsMetadata = shoebox.retrieve('womsMetadata');

    if (this.fastboot.isFastBoot) {
      let body = await fetch(`${config.womsRestAPI}/v1/whats-on?stream=wqxr`).then(r => r.json());
      womsMetadata = get(body, 'data.attributes.Item.metadata');
      shoebox.put('womsMetadata', womsMetadata);
    }

    this.woms.processWOMSData(womsMetadata);
  },

  beforeModel() {
    // Don't start poll in Fastboot
    if (get(this, 'isFastBoot')) {
      this.set('session.noRefresh', true);
      return;
    }
  },

  setupController: function(/*controller, model*/) {
    this.get('woms').initializeWOMS();
  }
});
