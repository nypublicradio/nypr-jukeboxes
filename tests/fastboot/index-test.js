import { module, test } from 'qunit';
import { setup, visit, mockServer } from 'ember-cli-fastboot-testing/test-support';
import { setupTime } from '../helpers/time';

import annieBergenResponse from 'nypr-jukeboxes/mirage/responses/shows-annie-bergen';
import playlistDailyResponse from 'nypr-jukeboxes/mirage/responses/playlist-daily';
import asRest from 'nypr-jukeboxes/mirage/responses/woms/as-rest';
import womsSocketResponse from 'nypr-jukeboxes/mirage/responses/woms/socket/david';
import whatsOnResponse from 'nypr-jukeboxes/mirage/responses/whats-on';
import wqxrStreamResponse from 'nypr-jukeboxes/mirage/responses/wqxr-stream';

// IMPORTANT NOTE: If you run these tests through http://localhost:4200/tests instead of
// running ember test --server, they will fail! I wish they didn't, but this needs to be resolved first:
// https://github.com/ember-fastboot/fastboot/issues/218

module('FastBoot | index test', function(hooks) {
  setup(hooks);
  setupTime(hooks, { freezeDateAt: new Date("2020-01-13T18:29:00+00:00")})

  test('it renders a page...', async function(assert) {
    await mockServer.get('/whats-on/v1/whats-on?stream=wqxr', asRest(womsSocketResponse()))
    await mockServer.get(`/api/v1/playlist-daily/wqxr/2020/jan/13/`, playlistDailyResponse());
    await mockServer.get('/api/v1/whats_on/wqxr/3/', whatsOnResponse());
    await mockServer.get('/api/v1/list/streams/wqxr/', wqxrStreamResponse());
    await mockServer.get('/api/v3/shows/annie-bergen/', annieBergenResponse())


    let { statusCode } = await visit('/listen', {
      metadata: {
        testOptions: {
          freezeDateAt: "2020-01-13T18:29:00+00:00"
        }
      }
    });

    assert.equal(statusCode, 200);
    assert.dom('[data-test-element=show-title]').hasText('Middays with Annie Bergen');

    assert.dom('[data-test-component=current-track] [data-test-element=track-info-composer]').hasText('Antonin Dvorak')
    assert.dom('[data-test-component=current-track] [data-test-element=track-info-title]').hasText('Serenade in D Minor for Wind Ensemble, Op. 44 (B77) ');
  });

  test('it handles a 404 for the show request...', async function(assert) {
    await mockServer.get('/whats-on/v1/whats-on?stream=wqxr', asRest(womsSocketResponse()))
    await mockServer.get(`/api/v1/playlist-daily/wqxr/2020/jan/13/`, playlistDailyResponse());
    await mockServer.get('/api/v1/whats_on/wqxr/3/', {}, 404);
    await mockServer.get('/api/v1/list/streams/wqxr/', wqxrStreamResponse());
    await mockServer.get('/api/v3/shows/annie-bergen/', {}, 404)

    let { statusCode } = await visit('/listen',
      {
        metadata: {
          testOptions: {
            freezeDateAt: "2020-01-13T18:29:00+00:00"
          }
        }
      }
    );

    assert.equal(statusCode, 200);
    assert.dom('[data-test-element=show-title]').hasText('WQXR 105.9 FM');
  });

});
