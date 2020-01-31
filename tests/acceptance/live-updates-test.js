import { module, test } from 'qunit';
import { visit, currentURL, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupTime } from '../helpers/time';
import { setupSockets } from '../helpers/socket';
import tk from 'timekeeper';

module('Acceptance | live updates', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupTime(hooks)
  setupSockets(hooks);

  test('schedule automatically updates as time goes on', async function(assert) {
    let nowPlaying = this.owner.lookup('service:now-playing');
    tk.freeze(new Date("2020-01-13T18:29:00+00:00"));

    await visit('/listen');
    assert.equal(currentURL(), '/listen');

    assert.dom('[data-test-element=show-title]').hasText('Middays with Annie Bergen');
    tk.travel(new Date("2020-01-13T20:29:00+00:00"));
    await nowPlaying.updateSchedule(); // have to do this manually since timers won't fire in test

    await waitFor('[data-test-element=show-title]')
    assert.dom('[data-test-element=show-title]').hasText('Afternoons with Elliott Forrest');
  })
});
