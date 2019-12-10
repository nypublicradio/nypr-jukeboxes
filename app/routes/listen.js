import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import rsvp from "rsvp";
import moment from "moment";

export default Route.extend({
  nowPlaying: service(),
  playlistHistory: service(),
  metadata: service(),

  async model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');

    let playlistHistory = await this.playlistHistory.load(moment());

    let currentAiring   = playlistHistory.airings.findBy('isCurrent', true);
    let stream          = await this.get('nowPlaying').refreshStream()

    let showSlug = stream.currentShow.group_slug;
    return rsvp.hash({
      recentTracks: currentAiring.tracks,
      stream: stream,
      show: this.store.findRecord('show', showSlug),
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
