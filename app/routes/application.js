import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { get } from "@ember/object";
import tk from 'timekeeper';
import moment from 'moment';
import Ember from 'ember';

export default Route.extend({
  router: service(),
  nowPlaying: service(),
  moment: service(),
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
    // This calls into the woms rest API to get the currently playing track
    await this.nowPlaying.load()
  },

  beforeModel() {
    if (this.fastboot.isFastBoot) {
      // For fastboot tests we need to freeze the date to match our test responses
      // and there's no good hook to do that in ember-cli-fastboot-testing
      // so we're passing some custom params into the request

      let { testOptions } = this.fastboot.get('metadata');
      if (Ember.testing && testOptions && testOptions.freezeDateAt) {
        tk.freeze(new Date(testOptions.freezeDateAt))
        moment.now = function () { return new Date(); }
      }
    }
  },

  setupController: function(/*controller, model*/) {
    this.get('woms').initializeWOMS();
  }
});
