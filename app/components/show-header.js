import {equal} from '@ember/object/computed';
import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import config from '../config/environment';

function isAboveViewport(element) {
    var rect = element.getBoundingClientRect();
    console.log(rect)
    return rect.top >= 0;
  }
  
  // This function adds either a .hidden or .shown class to the show header
  // component, based on the height of the the sticky bar. For example, if the
  // full header is 400px high, and the sticky bar is 100px high, this calculates
  // that once the user scrolls 300px into the page (400 - 100), the sticky bar
  // should get displayed/stuck to the top.
  let triggerStickyClass = function() {
    let elScrollContainer   = document.querySelector(".header");
    console.log(elScrollContainer);
    let elStickyContainer   = document.querySelector(".show-header--sticky-container");
    let sentinel = document.querySelector(".new-donate");
  
    if (!isAboveViewport(sentinel)) {
      elScrollContainer.classList.add("covered");
      elStickyContainer.classList.add("shown");
    } else {
      elScrollContainer.classList.remove("covered");
      elStickyContainer.classList.remove("shown");
    }
  };
  
  export default Component.extend({

  });
  