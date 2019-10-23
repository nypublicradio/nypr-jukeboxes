import Component from '@ember/component';
import { get, set } from '@ember/object';

function isAboveViewport(element) {
  var rect = element.getBoundingClientRect();
  return rect.top > 0;
}

let triggerStickyClass = function () {
  let sentinel = document.querySelector(".new-donate");

  if (!isAboveViewport(sentinel)) {
    let denim = [0, 81, 142];
    document.getElementById('sticky-donate').style.visibility = 'visible';
    document.getElementById('listen-playhistory').style.backgroundColor = 'rgb(' + [...denim].join(',') + ')';
  } else {
    document.getElementById('sticky-donate').style.visibility = 'hidden';
    document.getElementById('listen-playhistory').style.backgroundColor = 'transparent';
  }
};

export default Component.extend({
  classNames: ['show-header'],
  didRender() {
    this._super(...arguments);
    window.addEventListener(
      "scroll",
      triggerStickyClass
    );
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