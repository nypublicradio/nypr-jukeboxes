import Route from '@ember/routing/route';
import { hash } from "rsvp";

export default Route.extend({
  async model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');

    let stream = await this.store.findRecord("stream", 'wqxr')
    return hash({
      stream: stream
    });
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});
