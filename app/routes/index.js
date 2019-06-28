import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


export default Route.extend({
  classNames: ['home'],
  fastboot: service(),

  model() {
    let hash = {
    };
    return RSVP.hash(hash);
  },

  setupController(controller) {
    this._super(...arguments);
    let streams = this.controllerFor('application').get('model.streams')
    let currentStream = this.controllerFor('application').get('currentStream')
    controller.set('streams', streams);
    controller.set('currentStream', currentStream);
  }
});
