import Component from 'nypr-audio-services/components/listen-button';
import InViewportMixin from 'ember-in-viewport';
import layout from 'nypr-audio-services/templates/components/listen-button';

// This can be eventually put into `nypr-audio-services/components/listen-button
// but only if we want to use this functionality on WQXR and WNYC, since this
// adds another dependency on `ember-in-viewport`

export default Component.extend(InViewportMixin, {
  layout,

  init() {
    this._super(...arguments);
    this.set('viewportSpy', true);
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
