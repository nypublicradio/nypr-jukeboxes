// A fix for https://github.com/emberjs/ember.js/issues/16541

import ObjectProxy from '@ember/object/proxy';

export function initialize(/* appInstance */) {
  ObjectProxy.reopen({
    unknownProperty(key) {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      let content = this.content;
      if (!content || content.isDestroying || content.isDestroyed) {
        return;
      }
      return this._super(key);
    },
    willWatchProperty(/*key*/) {
      if (this.isDestroying || this.isDestroyed ||
        this.content != null &&
        (this.content.isDestroying || this.content.isDestroyed)) {
        return;
      }
      return this._super(arguments);
    }
  });
}

export default {
  initialize
};
