import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupSockets } from '../helpers/socket';
import { setupTime } from '../helpers/time';

module('Acceptance | playlist history', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupSockets(hooks);
  setupTime(hooks);

  test('visiting /playlist-history', async function(assert) {
    await visit('/playlist-history');

    assert.equal(currentURL(), '/playlist-history');
  });
});
