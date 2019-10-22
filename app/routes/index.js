import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import moment from 'moment';


export default Route.extend({
  fastboot: service(),
  streamMetadata: service(),

  model() {
    let hash = {
      //TODO: move this to the play-schedule component so it doesn't block render
      playlist: this.get('streamMetadata').load(moment().format())
    };
    return RSVP.hash(hash);
  },
});
