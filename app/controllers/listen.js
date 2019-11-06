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
    return this._currentShowStartedMoreThanFifteenMinutesAgo() && this._noTrackStartedWithinFirstFifteenMinutesOfCurrentShow();
  }),

  _currentShowStartedMoreThanFifteenMinutesAgo: function() {
    let nowTs = moment().valueOf() / 1000;
    let showStartTimeTs = this.model.stream.currentShow.start_ts;

    return nowTs > (showStartTimeTs + this.SHOW_STALE_CUTOFF);
  },

  _noTrackStartedWithinFirstFifteenMinutesOfCurrentShow: function() {
    let showStartTimeTs = this.model.stream.currentShow.start_ts;
    let trackStartTimeTs = 0;

    if (this.get('currentStream').hasCurrentTrack) {
      trackStartTimeTs = this.get('currentStream.trackStartTimeTs');
    } else if (this.model.stream.previous && this.model.stream.previous.length > 0) {
      trackStartTimeTs =  this.model.stream.previous[0].startTimeTs;
    }
    return (trackStartTimeTs < showStartTimeTs) || (trackStartTimeTs > showStartTimeTs + this.SHOW_STALE_CUTOFF);
  },

  playlistHistoryItems: computed('model.stream.previous', function() {
    let showStartTimeTs = this.model.stream.currentShow.start_ts;

    if (this._currentShowStartedMoreThanFifteenMinutesAgo() && this._noTrackStartedWithinFirstFifteenMinutesOfCurrentShow() && this.model.stream.previous) {
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
