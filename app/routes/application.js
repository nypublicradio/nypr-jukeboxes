import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  poll: service(),

  beforeModel() {
    // Don't start poll in Fastboot
    if (get(this, 'isFastBoot')) {
      this.set('session.noRefresh', true);
      return;
    }

    let pollFunction = () =>  get(this, 'store').findAll('stream');
    get(this, 'poll').addPoll({interval: 10 * 1000, callback: pollFunction});
  },

  model() {
    let hash = {
      streams: this.store.findAll('stream', {reload: true}).then(s => {
        return s.filterBy('liveWQXR').sortBy('sitePriority')
          .concat(s.filterBy('liveWNYC').sortBy('sitePriority')).uniq();
        })
    };
    return RSVP.hash(hash);
  },

});
