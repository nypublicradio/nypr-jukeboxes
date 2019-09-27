import Route from '@ember/routing/route';

export default Route.extend({
  model(params, transition) {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'playlist-history');
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});
