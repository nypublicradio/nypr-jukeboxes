import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | listen-analytics', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:listen-analytics');
    assert.ok(service);
  });
});
