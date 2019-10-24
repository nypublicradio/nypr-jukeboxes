import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from "@ember/object";
import RSVP from 'rsvp';

export default Route.extend({
  currentStream: service(),
  woms: service(),

  beforeModel() {
    // Don't start poll in Fastboot
    if (get(this, 'isFastBoot')) {
      this.set('session.noRefresh', true);
      return;
    }
  },

  setupController: function(controller, model) {
    this.get('woms').initializeWOMS();
    this.get('currentStream').startPolling();
  },

  redirect: function () {
    this.transitionTo('listen');
  }
});
