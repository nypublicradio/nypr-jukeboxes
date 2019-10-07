import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, observer, set, get } from '@ember/object';
import { run, debounce } from '@ember/runloop';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import config from '../config/environment';

const easeOut = function (time, start, change, duration) {
  return start + change * Math.sin(Math.min(1, time / duration) * (Math.PI / 2));
};

export default Component.extend({
  tagName: 'nav',
  classNames: ['horizontal-nav'],
  classNameBindings: ['canScrollLeft:is-left-scrollable','canScrollRight:is-right-scrollable'],
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  didChangeIndex: () => {},
  optionLinks: ['Listen', 'Playback History'],
  parsedLinks: computed('links', function() {
    let links = A(get(this, 'links'));
    return links.map(i => {
      if (typeof i.href === 'string' && i.href.indexOf(config.webRoot) === 0) {
        // make sure the parsed path has a leading slash
        i.href = i.href.replace(config.webRoot, '').replace(/^([^/]+)/, '/$1');
        return i;
      } else {
        return i;
      }
    });
  }),

  init() {
    this._super(...arguments);
    // fallback to null if defaultSlug is undefined because a linkrollLink without
    // a navSlug key will match on `undefined` in `findBy` below
    let defaultSlug = get(this, 'defaultSlug') || null;
    let links = A(get(this, 'links'));

    this.links = links;

    let defaultIndex = links.indexOf(links.findBy('nav-slug', defaultSlug));
    set(this, 'activeTabIndex', defaultIndex === -1 ? 0 : defaultIndex);
  },

  didInsertElement() {
    // set the indicator to the correct position
    run.scheduleOnce('afterRender', this, '_handleDOMChange');

    // save scrolling container for convenience
    let container = this.get('element').querySelector('.horizontal-nav__container');
    this.set('container', container);

    // scroll active tab into view on pageload
    this._scrollToTab(this.get('activeTabIndex'));

    // setup event handlers
    let DOMChangeHandler = () => debounce(this, '_handleDOMChange', 100);
    this.set('DOMChangeHandler', DOMChangeHandler);
    container
      .addEventListener('scroll', DOMChangeHandler);
    window
      .addEventListener('resize', DOMChangeHandler);

  },

  willDestroyElement() {
    // teardown event handlers
    let DOMChangeHandler = this.get('DOMChangeHandler');
    this.get('container')
      .removeEventListener('scroll', DOMChangeHandler);
    window
      .removeEventListener('resize', DOMChangeHandler);
  },

  updateTabIndicator(tabIndex) {
    if (!this.get('isFastBoot')) {
      let element = this.get('element');
      if (element) {
        let tab = element.querySelector(`li:nth-child(${tabIndex+1})`);
        if (tab) {
          this.set('indicatorWidth', tab.clientWidth);
          this.set('indicatorX', tab.offsetLeft);
        }
      }
    }
  },

  _handleTabChange: observer('activeTabIndex', function() {
    let tabIndex = this.get('activeTabIndex');
    if (tabIndex !== undefined && !Number.isNaN(tabIndex)) {
      this.updateTabIndicator(tabIndex);
    }
  }),

  _handleDOMChange() {
    let container = this.get('container');
    let containerWidth = container.clientWidth;
    let contentWidth = container.scrollWidth;
    let scrollOffset = container.scrollLeft;
//
//          contentWidth
//               |
//    |-------------------|
//     __ ___.==========._
//    |_link_|_link__lin|_|
//           '=========='
//    |<---->|<-------->|
//       /          \
// scrollOffset  containerWidth (visible area)
//
    // calculate if scrolling is possible
    // used to controll arrow button visibility
    let canScroll = contentWidth > containerWidth;
    this.set('canScrollLeft', canScroll && scrollOffset > 0);
    this.set('canScrollRight', canScroll && scrollOffset + containerWidth < contentWidth);
    this.set('scrollOffset', scrollOffset);
    this.set('containerWidth', containerWidth);

    // realign the active tab indicator
    // when font-size changes at breakpoints, etc.
    this._handleTabChange();
  },

  _animateScroll(element, newPos, duration) {
    let startTime = Date.now();
    let startPos = element.scrollLeft;

    // clamp scrollPosition
    newPos = Math.max(0, newPos);
    newPos = Math.min(element.scrollWidth - element.clientWidth, newPos);

    // calculate distance to scroll
    let change = newPos - startPos;

    // This inner function is called until the elements scrollLeft reaches newPos.
    let updateScroll = () => {
      let now = Date.now();
      let time = now - startTime;
      element.scrollLeft = easeOut(time, startPos, change, duration);
      if (element.scrollLeft !== newPos) {
        requestAnimationFrame(updateScroll);
      }
    };
    requestAnimationFrame(updateScroll);
  },

  _scrollTo(targetOffset) {
    // scroll directly to an offset
    let container = this.get('container');
    this._animateScroll(container, targetOffset, 250);
  },

  _scrollToTab(i) {
    // scroll a specific tab into view if needed
    let container = this.get('container');
    let containerWidth = container.clientWidth;
    let element = this.get('element');
    let tab = element.querySelector(`li:nth-child(${i+1})`);
    if (tab) {
      let tabLeft = tab.offsetLeft;
      let tabWidth = tab.clientWidth;
      let tabRight = tab.offsetLeft + tabWidth;
      let scrollOffset = container.scrollLeft;
      let contentWidth = container.scrollWidth;
      if (tabRight + scrollOffset > containerWidth) {
        this._scrollTo(contentWidth - tabWidth);
      } else if (tabLeft < scrollOffset) {
        this._scrollTo(tabLeft);
      }
    }
  },

  actions: {
    scrollBy(delta) {
      // increment scroll offset by a specific delta value
      let offset = this.get('scrollOffset') + delta;
      this._scrollTo(offset);
    }
  }
});
