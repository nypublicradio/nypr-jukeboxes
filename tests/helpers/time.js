import { freezeDateAt, unfreezeDate } from 'ember-mockdate-shim';

export async function setupTime(hooks, options = {}) {
  hooks.beforeEach(async function() {
    if (options.freezeDateAt) {
      freezeDateAt(options.freezeDateAt);
    }
  });

  hooks.afterEach(async function() {
    if (options.freezeDateAt) {
      unfreezeDate();
    }
  });
}
