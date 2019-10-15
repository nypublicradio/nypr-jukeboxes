import {equal} from '@ember/object/computed';
import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import config from '../config/environment';

function isAboveViewport(element) {
    var rect = element.getBoundingClientRect();
    return rect.top > 0;
  }

  let triggerStickyClass = function() {
    let sentinel = document.querySelector(".new-donate");

    if (!isAboveViewport(sentinel)) {
        document.getElementById('sticky-donate').style.visibility = 'visible';
    } else {
        document.getElementById('sticky-donate').style.visibility = 'hidden';
    }
  };
  
  export default Component.extend({
      classNames: ['show-header'],
      didRender() {
          this._super(...arguments);
          this.sendAction('updateParent', {
              isHomepageForShow: get(this, 'isHomeForShow')
          });
        window.addEventListener(
            "scroll",
            triggerStickyClass
        );
      },
      activeTabIndex: null,
      actions: {
          updateNav(index) {
              set(this, 'activeTabIndex', index);
              this.sendAction('updateParent', {
                  isHomepageForShow: get(this, 'isHomePageForShow'),
                  activeTabIndex: get(this, 'activeTabIndex')
              })
          }
      }
  });
  