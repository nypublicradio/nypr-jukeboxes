import Component from '@ember/component';

const NAV_ITEMS = [{
  url: 'https://www.wnyc.org',
  title: 'WNYC',
}, {
  url: 'https://www.newsounds.org',
  title: 'New Sounds',
}, {
  url: 'https://www.wqxr.org',
  title: 'WQXR',
}, {
  url: 'https://gothamist.com',
  title: 'Gothamist',
}, {
  url: 'https://www.njpr.org',
  title: 'NJPR',
}, {
  url: 'https://www.wnycstudios.org',
  title: 'WNYC Studios',
}, {
  url: 'https://www.thegreenespace.org',
  title: 'The Greene Space',
}];

import { computed } from '@ember/object';
export default Component.extend({
  tagName: '',

  navItems: NAV_ITEMS,
  
  items: computed('navItems', 'exclude', function() {
    let { navItems, exclude } = this;
    if (!navItems || navItems.length === 0) {
      return [];
    }

    if (exclude && typeof exclude === 'string') {
      return navItems.filter(item => item.title.toLowerCase() !== exclude.toLowerCase());
    } else if (Array.isArray(exclude)) {
      exclude = exclude
        .map(e => typeof e === 'string' && e.toLowerCase())
        .filter(e => !!e);
      return navItems.filter(item => !exclude.includes(item.title.toLowerCase()));
    } else {
      return navItems;
    }
  }),
});
