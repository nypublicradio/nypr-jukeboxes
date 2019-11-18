import Component from '@ember/component';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import toggleBoxPositioner from '../../utils/toggle-box-positioner';

export default Component.extend({
  classNames: ['toggle-box'],
  classNameBindings: ['open:is-active', 'theme', 'hPos', 'vPos'],
  open: false,
  theme: 'dark',
  icon: 'caret-down',

  contentClasses: computed('theme', function() {
    return `toggle-box__dropdown ${this.theme}`;
  }),

  calculatePosition(trigger, content, _destination, ref) {
    // Positions of elements were being calculated before they had
    // fully finished rendering. This ensures positioning is being
    // calculated correctly by positioning again after render

    if (_destination) {
      _destination = document.querySelector('#ember-basic-dropdown-wormhole');
      arguments[2] = _destination
    }

    scheduleOnce('afterRender',() => {
      let obj = toggleBoxPositioner(trigger, content, _destination, ref);
      ref.dropdown.applyReposition(trigger, content, obj)
    });

    return toggleBoxPositioner(...arguments);
  }
});
