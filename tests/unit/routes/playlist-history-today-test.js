import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | playlist-history-today', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:playlist-history-today');
    assert.ok(route);
  });
});
