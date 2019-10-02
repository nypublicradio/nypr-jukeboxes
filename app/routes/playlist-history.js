import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'playlist-history');
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});
