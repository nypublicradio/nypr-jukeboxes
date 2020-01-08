//adapted from new-sounds-web-client
import Component from '@ember/component';
import { inject as service} from '@ember/service';

export default Component.extend({
  classNames: ['play-schedule-show'],
  isPlaylistVisible: false,
  nowPlaying: service(),

  actions: {
    togglePlaylistVisible() {
      this.toggleProperty('isPlaylistVisible');
    }
  }
});
