import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupTime } from '../helpers/time';
import whatsOnResponse from 'nypr-jukeboxes/mirage/responses/whats-on';

module('Acceptance | listen', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupTime(hooks, { freezeDateAt: new Date("2020-01-13T18:29:00+00:00")})

  test('visiting /listen', async function(assert) {
    await visit('/listen');
    assert.equal(currentURL(), '/listen');

    assert.dom('[data-test-element=show-title]').hasText('Middays with Annie Bergen');

    assert.dom('[data-test-component=current-track] [data-test-element=track-info-composer]').hasText('Antonin Dvorak')
    assert.dom('[data-test-component=current-track] [data-test-element=track-info-title]').hasText('Serenade in D Minor for Wind Ensemble, Op. 44 (B77) ')

    assert.dom('[data-test-component=recent-track-1] [data-test-element=track-info-composer]').hasText('Maurice Ravel')
    assert.dom('[data-test-component=recent-track-1] [data-test-element=track-info-title]').hasText('Pavane for a Dead Princess')

    assert.dom('[data-test-component=recent-track-2] [data-test-element=track-info-composer]').hasText('Franz Joseph Haydn')
    assert.dom('[data-test-component=recent-track-2] [data-test-element=track-info-title]').hasText('Piano Concerto in D Hob. 18')

    assert.dom('[data-test-component=recent-track-3] [data-test-element=track-info-composer]').hasText('')
    assert.dom('[data-test-component=recent-track-3] [data-test-element=track-info-title]').hasText('Overture No. 2 in E-flat Major, Op. 23')
  });

  test('visiting /listen when group_slug is bad', async function(assert) {
    let whatsOnResponseWithAiringSlug = Object.assign(whatsOnResponse, {})
    whatsOnResponseWithAiringSlug.current_show = {
      group_slug: 'airing'
    }

    this.server.get("/api/v1/whats_on/wqxr/3/", whatsOnResponseWithAiringSlug);
    await visit('/listen');
    assert.equal(currentURL(), '/listen');

    assert.dom('[data-test-element=show-title]').hasText('WQXR 105.9 FM');
  })
});
