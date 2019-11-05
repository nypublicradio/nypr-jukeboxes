import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import moment from 'moment';

export default Controller.extend({
  appController: controller('application'),
  currentStream  : service(),
  SHOW_STALE_CUTOFF: 15 * 60 * 1000,

  isPlaylistHistoryPreviewStale: Ember.computed('clock.minute', function () {
    let nowMs = moment().valueOf();
    let showStartTimeMs = this.model.stream.currentShow.start_ts * 1000;
    let trackStartTimeMs = 0;

    if (this.model.stream.previous && this.model.stream.previous.length > 0) {
      trackStartTimeMs =  this.model.stream.previous[0].startTimeTs * 1000;
    }

    if (nowMs > (showStartTimeMs + this.SHOW_STALE_CUTOFF) && (trackStartTimeMs < showStartTimeMs)) {
      return true;
    }
    return false;
  }),

  actions: {
    updatePlayerState(state) {
      this.appController.set('showPlayer', state);
    }
  }
});
