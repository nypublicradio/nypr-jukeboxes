import tk from 'timekeeper';
import Ember from 'ember';
import { get, trySet } from "@ember/object";

// Cribbed some hacks from ember-mockdate-shim, which doesn't seem to work in
// fastboot, so I'm using timekeeper instead

const originalDate = Date;
const originalPlatformNow = get(Ember, 'run.backburner._platform.now');

export async function setupTime(hooks, options = {}) {
  hooks.beforeEach(async function() {
    trySet(Ember, 'run.backburner._platform.now', () => originalDate());
    if (options.freezeDateAt) {
      tk.freeze(options.freezeDateAt);
    }
  });

  hooks.afterEach(async function() {
    trySet(Ember, 'run.backburner._platform.now', originalPlatformNow);
    if (options.freezeDateAt) {
      tk.reset();
    }
  });
}
