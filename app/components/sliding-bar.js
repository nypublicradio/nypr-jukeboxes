import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  classNames:  ['sliding-bar'],
  didUpdateAttrs() {
    if (!this.get('isFastBoot')) {
      this._updateStyle();
    }
  },
  didInsertElement() {
    this._updateStyle();
    let element = this.get('element');
    element.style.setProperty('transition', 'transform .25s ease-out');
  },
  _updateStyle() {
    let element = this.get('element');
    if (element) {
      let x = this.get('positionX') || 0;
      let width = this.get('width') || 160;
      element.style.setProperty('transform', `translateX(${x}px) scaleX(${width})`);
    }
  }

});
