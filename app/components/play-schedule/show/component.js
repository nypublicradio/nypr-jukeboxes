//adapted from new-sounds-web-client
import Component from '@ember/component';

export default Component.extend({
  classNames: ['play-schedule-show'],
  isPlaylistVisible: false,

  actions: {
    togglePlaylistVisible() {
      this.toggleProperty('isPlaylistVisible');
    }
  }
});
