import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import { inject as service } from '@ember/service';
import { not, readOnly, reads } from '@ember/object/computed';

export default Component.extend(InViewportMixin, {
  classNames: ['play-button'],
  classNameBindings: ['isPlaying:is-playing:is-paused', 'isLoading'],

  hifi                : service(),
  dj                  : service(),
  disabled            : not('hifi.isReady'),
  'aria-label'        : readOnly('title'),
  isReady             : reads('hifi.isReady'),
  isPlaying           : reads('hifi.isPlaying'),
  isLoading           : reads('hifi.isLoading'),
  isStream            : reads('hifi.isStream'),

  init() {
    this._super(...arguments);
    this.set('viewportSpy', true);
  },

  didInsertElement() {
    this._super(...arguments);
  },

  click() {
    if (this.isPlaying) {
      this.hifi.pause();
    }
    else {
      this.dj.play(this.playItemId);
    }
  },

  onEnterViewport: function() {},
  onExitViewport: function() {},

  didEnterViewport() {
    this.onEnterViewport();
  },

  didExitViewport() {
    this.onExitViewport();
  }
});
