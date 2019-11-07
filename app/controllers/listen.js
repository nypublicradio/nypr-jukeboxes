import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  appController: controller('application'),
  currentStream  : service(),
  SHOW_STALE_CUTOFF: 15 * 60,

  isPlaylistHistoryPreviewStale: computed('clock.minute', function () {
    return this._currentShowStartedMoreThanFifteenMinutesAgo() && this._tracksAreStale();
  }),

  _currentShowStartedMoreThanFifteenMinutesAgo: function() {
    let nowTs = moment().valueOf() / 1000;
    let showStartTimeTs = this.model.stream.currentShow.start_ts;

    return nowTs > (showStartTimeTs + this.SHOW_STALE_CUTOFF);
  },

  _tracksAreStale: function() {
    let showStartTimeTs = this.model.stream.currentShow.start_ts;
    let trackStartTimeTs = 0;

    let currentShowTracks = this.model.stream.previous.filter( (track) => {
      return track.startTimeTs >= showStartTimeTs;
    });

    if (this.model.stream.previous.length > 0 && currentShowTracks.length == this.model.stream.previous.length) {
      return false; // all previous tracks are from the current show
    } else if (currentShowTracks.length > 0) {
      trackStartTimeTs = currentShowTracks[currentShowTracks.length - 1].startTimeTs; // get the earliest-starting track from the current show
    } else if (this.get('currentStream').hasCurrentTrack) {
      trackStartTimeTs = this.get('currentStream.trackStartTimeTs'); // only the current track is from the current show
    }

    return (trackStartTimeTs < showStartTimeTs) || (trackStartTimeTs > showStartTimeTs + this.SHOW_STALE_CUTOFF);
  },

  playlistHistoryItems: computed('model.stream.previous', function() {
    let showStartTimeTs = this.model.stream.currentShow.start_ts;

    if (this._currentShowStartedMoreThanFifteenMinutesAgo() && this._tracksAreStale() && this.model.stream.previous) {
      return this.model.stream.previous.filter( (track) => {
        return track.startTimeTs >= showStartTimeTs;
      });
    }

    return this.model.stream.previous;
  }),

  actions: {
    updatePlayerState(state) {
      this.appController.set('showPlayer', state);
    }
  }
});
