import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  classNames: ['show-header'],
  didRender() {
    this._super(...arguments);
  },
  activeTabIndex: null,
  actions: {
    updateNav(index) {
      set(this, 'activeTabIndex', index);
      this.sendAction('activeTabIndex', {
        activeTabIndex: get(this, 'activeTabIndex')
      })
    }
  }
});
