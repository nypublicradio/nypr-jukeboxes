import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { get } from "@ember/object";

export default Route.extend({
  router: service(),
  currentStream: service(),
  woms: service(),
  dataLayer: service('nypr-metrics/data-layer'),

  init() {
    this._super(...arguments);
    this.router.on('routeDidChange', () => {
      schedule('afterRender', () => this.dataLayer.sendPageView());
    });
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
