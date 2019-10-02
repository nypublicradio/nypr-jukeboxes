import Route from '@ember/routing/route';
import rsvp from "rsvp";

export default Route.extend({
  model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');

    return this.store.findRecord("stream", 'wqxr')
    .then(stream => {
      return rsvp.hash({
        stream: stream
      });
    });
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});