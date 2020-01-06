import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import rsvp from "rsvp";
import moment from "moment";

export default Route.extend({
  nowPlaying: service(),
  metadata: service(),

  beforeModel() {
    this._super(...arguments);
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');
  },

  async model() {
    let serverDate = moment.tz(moment(), "America/New_York")
    let playlistHistory = await this.store.findRecord('playlist-daily', `wqxr/${serverDate.format('YYYY/MMM/DD').toLowerCase()}`, { reload: true });

    await this.get('nowPlaying').refreshStream()

    return rsvp.hash({
      currentAiring: playlistHistory.airings.findBy('isLive', true),
      stream: this.nowPlaying.stream,
      show: this.nowPlaying.show,
    });
  },

  afterModel() {
    this.get('metadata').setHeadData({
    });
  },

  activate() {
    this.controllerFor('application').set('showPlayer', false);
  },

  deactivate() {
    this.controllerFor('application').set('showPlayer', true);
  },

  actions: {
    didTransition: function() {
      let controller = this.controllerFor('application');
      Ember.run.scheduleOnce('afterRender', this, function() {
        controller.send('updateNav');
      });
    }
  }
});
