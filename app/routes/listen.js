import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';

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
    // Things are loaded in the application route before we get here

    // we're getting attributes off of the nowPlaying service and
    // not the model so the attributes will update live without
    // having to refresh the route

    return {}
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
