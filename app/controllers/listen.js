import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  appController: controller('application'),
  nowPlaying   : service(),
  fastboot: service(),
  woms: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  SHOW_STALE_CUTOFF: 15 * 60,
  PREVIOUS_SHOW_TRACKS_STALE_CUTOFF: 60 * 60,

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
    let currentShowTracks = [];

    if (this.model.stream.previous) {
      currentShowTracks = this.model.stream.previous.filter( (track) => {
        return track.startTimeTs >= showStartTimeTs;
      });
    }

    if (this.model.stream.previous && this.model.stream.previous.length > 0 && currentShowTracks.length == this.model.stream.previous.length) {
      return false; // all previous tracks are from the current show
    } else if (currentShowTracks.length > 0) {
      trackStartTimeTs = currentShowTracks[currentShowTracks.length - 1].startTimeTs; // get the earliest-starting track from the current show
    } else if (this.get('currentStream').hasCurrentTrack) {
      trackStartTimeTs = this.get('currentStream.trackStartTimeTs'); // only the current track is from the current show
    }

    return (trackStartTimeTs < showStartTimeTs) || (trackStartTimeTs > showStartTimeTs + this.SHOW_STALE_CUTOFF);
  },

  playlistHistoryItems: computed('model.stream.previous', function() {
    if (!this.model.stream.previous) {
      return [];
    }

    let showStartTimeTs = this.model.stream.currentShow.start_ts;

    if (this._currentShowStartedMoreThanFifteenMinutesAgo() && this._tracksAreStale() && this.model.stream.previous) {
      let currentTrackStartTime = moment(this.currentStream.trackStartTimeTs * 1000).format("hh:mm A");
      return this.model.stream.previous.filter( (track) => {
        return track.startTimeTs >= showStartTimeTs &&
               track.time != currentTrackStartTime;
      }).slice(0,3);
    }

    return this.model.stream.previous.filter( (track) => {
      let currentTrackStartTime = moment(this.currentStream.trackStartTimeTs * 1000).format("hh:mm A");
      return track.startTimeTs >= (showStartTimeTs - this.PREVIOUS_SHOW_TRACKS_STALE_CUTOFF) &&
             track.time != currentTrackStartTime;

    }).slice(0,3);
  }),

  twitterHandle: computed('model.show.about.social', function() {
    if (this.model.show.about.social) {
      let twitter = this.model.show.about.social.filter(function(s) {
        return s.service == 'twitter';
      });
      if (twitter.length > 0) {
        return twitter[0]['contact-string'].replace('@', '');
      }
    }
    return undefined;
  }),

  emailAddress: reads('model.show.contactEmail'),

  actions: {
    updatePlayerState(state) {
      this.appController.set('showPlayer', state);
    },

    openTwitterMention() {
      let height = 450;
      let width = 560;
      let left = (screen.width / 2) - (width / 2);
      let top = (screen.height / 2) - (height / 2);
      window.open('https://twitter.com/intent/tweet?screen_name=' + this.twitterHandle,
                  'popup',
                  'width=' + width + ', height=' + height + ', toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, top=' + top + ', left=' + left);
    }
  }
});
