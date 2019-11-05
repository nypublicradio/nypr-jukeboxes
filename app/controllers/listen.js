import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import moment from 'moment';

export default Controller.extend({
  appController: controller('application'),
  currentStream  : service(),
  SHOW_STALE_CUTOFF: 15 * 60,

  isPlaylistHistoryPreviewStale: Ember.computed('clock.minute', function () {
    let nowTs = moment().valueOf() / 1000;
    let showStartTimeTs = this.model.stream.currentShow.start_ts;
    let trackStartTimeTs = 0;

    if (this.model.stream.previous && this.model.stream.previous.length > 0) {
      trackStartTimeTs =  this.model.stream.previous[0].startTimeTs;
    }

    if (nowTs > (showStartTimeTs + this.SHOW_STALE_CUTOFF) && (trackStartTimeTs < showStartTimeTs)) {
      return true;
    }
    return false;
  }),

  playlistHistoryItems: Ember.computed('model.stream.previous', function() {
    let firstTrackFromCurrentShowStartTimeTs = 0;
    let showStartTimeTs = this.model.stream.currentShow.start_ts;
    let currentShowTracks = [];

    if (this.model.stream.previous) {
      currentShowTracks = this.model.stream.previous.filter( (track) => {
        return track.startTimeTs >= showStartTimeTs;
      });
      if (currentShowTracks.length > 0) {
        firstTrackFromCurrentShowStartTimeTs = currentShowTracks[currentShowTracks.length - 1].startTimeTs;
      }
    }

    if (firstTrackFromCurrentShowStartTimeTs > (showStartTimeTs + this.SHOW_STALE_CUTOFF)) {
      return currentShowTracks;
    }

    return this.model.stream.previous;
  }),

  actions: {
    updatePlayerState(state) {
      this.appController.set('showPlayer', state);
    }
  }
});
