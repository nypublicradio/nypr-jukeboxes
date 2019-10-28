import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import rsvp from "rsvp";

export default Route.extend({
  currentStream: service(),

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
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});