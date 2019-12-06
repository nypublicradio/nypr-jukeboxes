import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import moment from 'moment';

export default Route.extend({
  streamMetadata: service(),
  metadata: service(),

  model({ year, month, day }) {
    let controller = this.controllerFor('application');
    controller.send('setNavSlug', 'playlist-history');

    let date = moment();
    if (moment(year + '/' + month + '/' + day).isValid()) {
      date = moment(year + '/' + month + '/' + day);
    }

    let hash = {
      playlistDaily: this.store.findRecord('playlist-daily', `wqxr/${date.format('YYYY/MMM/DD').toLowerCase()}`, { reload: true }),
      date: date.format()
    };
    return RSVP.hash(hash);
  },

  afterModel() {
    this.get('metadata').setHeadData({
    });
  },

  actions: {
    didTransition: function() {
      let controller = this.controllerFor('application');
      Ember.run.scheduleOnce('afterRender', this, function() {
        controller.send('updateNav');
      });
    }
  }
});
