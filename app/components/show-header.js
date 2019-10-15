import {equal} from '@ember/object/computed';
import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import config from '../config/environment';

function isAboveViewport(element) {
    console.log('hi')
    var rect = element.getBoundingClientRect();
    console.log(rect)
    return rect.top >= 0;
  }

  let triggerStickyClass = function() {
    let elScrollContainer   = document.querySelector(".header");
    console.log(elScrollContainer);
    let elStickyContainer   = document.querySelector(".show-header--sticky-container");
    let sentinel = document.querySelector(".new-donate");
  
    if (!isAboveViewport(sentinel)) {
      elScrollContainer.classList.add("covered");
     // elStickyContainer.classList.add("shown");
    } else {
      elScrollContainer.classList.remove("covered");
     // elStickyContainer.classList.remove("shown");
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
        console.log(document.querySelector(".header"))
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
  