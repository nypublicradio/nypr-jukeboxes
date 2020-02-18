import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from "@ember/object";
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  dj             : service(),
  hifi           : service(),
  cookies        : service(),
  nowPlaying     : service(),
  fastboot       : service(),
  isFastBoot     : reads('fastboot.isFastBoot'),
  links: [ { 'href': null, 'nav-slug': 'listen', 'route': 'listen', 'title': 'Listen'},
           { 'href': null, 'nav-slug': 'playlist-history', 'route': 'playlist-history-today', 'title': 'Playlist', 'clickTracking': true, 'dataAction': 'View Playlist'} ],

  showPlayer: true,
  showOnboardMessage: computed('closed', function() {
    if (this.isFastBoot) {
      return false;
    }
    return !this.cookies.exists('showOnboardMessage');
  }),

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
      this.cookies.write('showOnboardMessage', false);
      this.set('closed', true);
    }
  },
});
