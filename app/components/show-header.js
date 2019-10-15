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
        let denim = [0 , 32, 56];
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
  