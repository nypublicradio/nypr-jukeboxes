import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  classNames: ['home'],
  fastboot: service(),

  model() {
    let hash = {
      wqxrHome: this.store.findRecord('bucket', 'wqxr-home').then(b => {
        return {
          featuredItems: b.get('bucketItems').slice(0, 9),
          otherItems: b.get('bucketItems').slice(9)
        };
      }),
    };
    return RSVP.hash(hash);
  }
});
