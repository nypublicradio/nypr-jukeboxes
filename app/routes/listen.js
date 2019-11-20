import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import rsvp from "rsvp";

export default Route.extend({
  currentStream: service(),
  metadata: service(),

  async model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');

    return await this.get('currentStream').refreshStream().then(stream => {
      let showSlug = stream.currentShow.group_slug;
      return rsvp.hash({
        stream: stream,
        show: this.store.findRecord('show', showSlug),
      });
    })
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

