import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  appController: controller('application'),
  nowPlaying   : service(),
  fastboot: service(),
  woms: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  MINUTES_UNTIL_STALE: 61,

  recentlyPlayed: computed('clock.minute', 'model.currentAiring', 'model.recentTracks', function() {
    let now = moment();

    return this.store.peekAll('track')
      .filter(t => now.diff(t.startTime, 'minutes') < this.MINUTES_UNTIL_STALE)
      .sortBy('startTime')
      .reverse();
  }),

  twitterHandle: computed('nowPlaying.show.about.social', function() {
    if (this.nowPlaying.show && this.nowPlaying.get('show.about.social')) {
      let twitter = this.nowPlaying.get('show.about.social').filter(function(s) {
        return s.service == 'twitter';
      });
      if (twitter.length > 0) {
        return twitter[0]['contact-string'].replace('@', '');
      }
    }
    return undefined;
  }),

  emailAddress: reads('nowPlaying.show.contactEmail'),

  onAirTitle: computed('nowPlaying.show.title', 'nowPlaying.stream.name', function() {
    if (get(this, 'nowPlaying.show.title')) {
      return get(this, 'nowPlaying.show.title');
    } else if (get(this, 'nowPlaying.stream.name')) {
      return get(this, 'nowPlaying.stream.name');
    }
    return undefined;
  }),

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
