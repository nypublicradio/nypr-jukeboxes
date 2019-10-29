import Component from '@ember/component';
import layout from './template';
import { positionBottomCenter } from '@nypr-design-system' ;

export default Component.extend({
  layout,
  tagName: '',
  calculatePosition(trigger, content) {
    return positionBottomCenter(trigger, content, 5);
  }
});