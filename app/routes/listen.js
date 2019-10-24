import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import { hash } from "rsvp";

export default Route.extend({
  currentStream: service(),

  async model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');

    let stream = await this.get('currentStream').refreshStream();
    return hash({
      stream: stream
    });
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});