import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import rsvp from "rsvp";

export default Route.extend({
  nowPlaying: service(),
  metadata: service(),
  dataLayer: service('nypr-metrics/data-layer'),

  beforeModel() {
    this._super(...arguments);
    this.dataLayer.push({template: 'homepage'});
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');
  },

  async model() {
    await this.get('nowPlaying').refreshStream()

    return rsvp.hash({
      stream: this.nowPlaying.stream,
      show: this.nowPlaying.show
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
