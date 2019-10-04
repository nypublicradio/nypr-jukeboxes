import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import moment from 'moment';

export default Route.extend({
  streamMetadata: service(),

  model() {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'playlist-history');
    let hash = {
      playlist: this.get('streamMetadata').load(moment().format())
    };
    return RSVP.hash(hash);
  },
  afterModel() {
    let controller = this.controllerFor('application');
    controller.send('updateNav');
  },
});
