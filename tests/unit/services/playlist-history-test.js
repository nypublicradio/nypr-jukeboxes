import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | playlist-history', function(hooks) {
  setupTest(hooks);

  // TODO: add tests to make sure it pulls data from the right place,
  // and stores it correctly within the new models.
  // Optionally add a test to make sure pulling from whatson endpoint
  // correctly adds another track to dailySchedule
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:playlist-history');
    assert.ok(service);
  });
});
