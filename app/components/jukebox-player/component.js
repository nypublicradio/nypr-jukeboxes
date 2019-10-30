import Component from 'nypr-player/components/nypr-player'
import { inject as service } from '@ember/service';

export default Component.extend({
  dj: service(),
  classNames: ['jukebox-player'],

  actions: {
    async playOrPause() {
      if (this.dj.isPlaying) {
        await this.dj.pause();
      }
      else {
        await this.dj.play(this.streamSlug);
      }
    },
  }
});
