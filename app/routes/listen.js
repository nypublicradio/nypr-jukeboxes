import Route from '@ember/routing/route';
import rsvp from "rsvp";

export default Route.extend({
  class: 'listen',
  model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'listen');

    return this.store.findRecord("stream", 'wqxr')
    .then(stream => {
      return rsvp.hash({
        stream: rsvp.resolve(stream)
      });
    });
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});
