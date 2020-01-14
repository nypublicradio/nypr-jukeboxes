import tk from 'timekeeper';
import Ember from 'ember';
import { get, trySet } from "@ember/object";

// Cribbed some hacks from ember-mockdate-shim, which doesn't seem to work in
// fastboot, so I'm using timekeeper instead

const originalDate = Date;
const originalPlatformNow = get(Ember, 'run.backburner._platform.now');

export async function setupTime(hooks, options = {}) {
  hooks.beforeEach(async function() {
    if (options.freezeDateAt) {
      trySet(Ember, 'run.backburner._platform.now', () => originalDate());
      tk.freeze(options.freezeDateAt);
    }
  });

  hooks.afterEach(async function() {
    if (options.freezeDateAt) {
      trySet(Ember, 'run.backburner._platform.now', originalPlatformNow);
      tk.reset();
    }
  });
}
