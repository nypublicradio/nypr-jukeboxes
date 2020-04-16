//adapted from new-sounds-web-client
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  classNames: ['play-schedule-show'],
  isPlaylistVisible: false,
  nowPlaying: service(),
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  didInsertElement() {
    this.set('isPlaylistVisible', this.isLive)
  },

  actions: {
    togglePlaylistVisible() {
      this.toggleProperty('isPlaylistVisible');
    }
  }
});
