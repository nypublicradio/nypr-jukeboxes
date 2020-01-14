import { module, test } from 'qunit';
import { visit, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupTime } from '../helpers/time';
import { setupSockets } from '../helpers/socket';
import asRest from 'nypr-jukeboxes/mirage/responses/woms/as-rest';
import womsDavidSocketResponse from 'nypr-jukeboxes/mirage/responses/woms/socket/david';
import womsDavidSocketResponse2 from 'nypr-jukeboxes/mirage/responses/woms/socket/david2';

module('Acceptance | woms', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupTime(hooks, { freezeDateAt: new Date("2020-01-13T18:29:00+00:00")})
  setupSockets(hooks);

  test('empty woms payload should only display stream info', async function(assert) {
    // First, make make sure the rest call we make returns nothing, so the display will be blank
    this.server.get('/whats-on/v1/whats-on', {
      data: {},
      meta: {}
    }, 200);

    await visit('/listen');
    assert.dom('[data-test-element="playlist-history"]').doesNotExist();
  });

  test('playlist history appears upon update from woms socket', async function(assert) {
    this.server.get('/whats-on/v1/whats-on', {
      data: {},
      meta: {}
    }, 200);

    await visit('/listen');
    assert.dom('[data-test-element="playlist-history"]').doesNotExist();

    // Send the woms update
    this.mockSocketServer.emit('message', JSON.stringify(womsDavidSocketResponse()))
    await waitFor('[data-test-component="current-track"]')
    await waitFor('[data-test-component="recent-track-1"]')

    assert.dom('[data-test-component=current-track] [data-test-element=track-info-composer]').hasText('Antonin Dvorak')
    assert.dom('[data-test-component=current-track] [data-test-element=track-info-title]').hasText('Serenade in D Minor for Wind Ensemble, Op. 44 (B77) ')

    assert.dom('[data-test-component=recent-track-1] [data-test-element=track-info-composer]').hasText('Maurice Ravel')
    assert.dom('[data-test-component=recent-track-1] [data-test-element=track-info-title]').hasText('Pavane for a Dead Princess')

    assert.dom('[data-test-component=recent-track-2] [data-test-element=track-info-composer]').hasText('Franz Joseph Haydn')
    assert.dom('[data-test-component=recent-track-2] [data-test-element=track-info-title]').hasText('Piano Concerto in D Hob. 18')

    assert.dom('[data-test-component=recent-track-3] [data-test-element=track-info-composer]').hasText('Louise Farrenc')
    assert.dom('[data-test-component=recent-track-3] [data-test-element=track-info-title]').hasText('Overture No. 2 in E-flat Major, Op. 23')
  })

  test('playlist history changes after update from woms socket', async function(assert) {
    this.server.get('/whats-on/v1/whats-on', asRest(womsDavidSocketResponse()));

    await visit('/listen');

    assert.dom('[data-test-component=current-track] [data-test-element=track-info-composer]').hasText('Antonin Dvorak')
    assert.dom('[data-test-component=current-track] [data-test-element=track-info-title]').hasText('Serenade in D Minor for Wind Ensemble, Op. 44 (B77) ')

    this.mockSocketServer.emit('message', JSON.stringify(womsDavidSocketResponse2()))

    assert.dom('[data-test-component=current-track] [data-test-element=track-info-composer]').hasText('Richard Wagner')
    assert.dom('[data-test-component=current-track] [data-test-element=track-info-title]').hasText("Das Rheingold: 'Entry of Gods into Valhalla'")

    assert.dom('[data-test-component=recent-track-1] [data-test-element=track-info-composer]').hasText('Antonin Dvorak')
    assert.dom('[data-test-component=recent-track-1] [data-test-element=track-info-title]').hasText('Serenade in D Minor for Wind Ensemble, Op. 44 (B77) ')
  })

});
