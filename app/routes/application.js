import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from "@ember/object";
import RSVP from 'rsvp';

export default Route.extend({
  streamMetadata: service(),
  currentStream: service(),

  beforeModel() {
    // Don't start poll in Fastboot
    if (get(this, 'isFastBoot')) {
      this.set('session.noRefresh', true);
      return;
    }
  },

  model() {
    let hash = {
      // TODO: this can be loaded in index.js if we don't need stream data outside
      // of the index page. If this is moved to index.js, make sure to add a poll
      // in application.js, or keep the streamMetadata injection (streamMetadata service
      // instantiates the poll). Otherwise there won't be song metadata updates
      // to the sticky player (assuming the sticky player is a global player, and
      // not just available on index)
      streams: this.get('streamMetadata').loadStreams()
    };
    return RSVP.hash(hash);
  },

  setupController: function(controller, model) {
    controller.set('currentStream', model.streams[0]);
  },

  redirect: function () {
    this.transitionTo('listen');
  }

});
