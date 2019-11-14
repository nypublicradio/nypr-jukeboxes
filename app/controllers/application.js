import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from "@ember/object";
import move from 'ember-animated/motions/move';
import { easeInAndOut } from 'ember-animated/easings/cosine';

export default Controller.extend({
  dj             : service(),
  hifi           : service(),
  currentStream  : service(),
  links: [ { 'href': null, 'nav-slug': 'listen', 'title': 'Listen'}, { 'href': null, 'nav-slug': 'playlist-history', 'title': 'Playlist History'} ],

  showPlayer: true,
  showOnboardMessage: true,

  * showPlayerAnimation(context) { //eslint-disable-line
    let { insertedSprites, removedSprites } = context;
    for (let sprite of insertedSprites) {
      sprite.startTranslatedBy(0, 500);
      move(sprite, {easing: easeInAndOut, duration: 500});
    }
    for (let sprite of removedSprites.reverse()) {
      sprite.endTranslatedBy(0, 500);
      move(sprite, {easing: easeInAndOut, duration: 500});
    }
  },

  actions: {
    setNavSlug(navSlug) {
      set(this, 'navSlug', navSlug);
    },
    updateNav() {
      let navSlug = this.get('navSlug');
      let activeTabIndex = 0;
      let index = this.links.findIndex(link => link['nav-slug'] === navSlug);
      if (index > 0) {
        activeTabIndex = index;
      }
      set(this, 'activeTabIndex', activeTabIndex);
    },
    hideOnboardMessage() {
      this.set('showOnboardMessage', false);
    }
  },
});
