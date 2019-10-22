import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from "@ember/object";

export default Controller.extend({
  dj             : service(),
  hifi           : service(),
  currentStream  : service(),
  links: [ { 'href': null, 'nav-slug': 'listen', 'title': 'Listen'}, { 'href': null, 'nav-slug': 'playlist-history', 'title': 'Playlist History'} ],

  showPlayer: reads('dj.showPlayer'),

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
  },
});