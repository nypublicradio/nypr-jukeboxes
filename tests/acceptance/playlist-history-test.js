import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | playlist history', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /playlist-history', async function(assert) {
    await visit('/playlist-history');

    assert.equal(currentURL(), '/playlist-history');
  });
});
