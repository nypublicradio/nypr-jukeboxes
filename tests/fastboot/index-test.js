import { module, test } from 'qunit';
import { setup, visit, mockServer } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | index test', function(hooks) {
  setup(hooks);

  test('it renders a page...', async function(assert) {

    await mockServer.get('/api/v1/list/streams/', {
      count: 1,
      results: [{
        name: 'WQXR 105.9 FM',
        id: 3,
        slug: 'wqxr',
        source_tags: "wqxr_site",
        always_broadcasting: true
      }]
    });

    await mockServer.get('/api/v1/whats_on/', {
      wqxr: {
        name: 'WQXR 105.9 FM',
        slug: 'wqxr'
      }
    });

    await visit('/');
    
    assert.dom('.jukebox-display__current-stream').hasText('WQXR 105.9 FM');
  });

});
