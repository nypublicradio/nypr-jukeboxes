import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | jukebox-player', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders track artist and show', async function(assert) {
    await render(hbs`
      <JukeboxPlayer
        @trackTitle="Track Title"
        @showTitle="Show Title"
        @composerName="Track Composer"
      />
    `);

    assert.dom('[data-test-element="show-title"]').hasText('Show Title')
    assert.dom('[data-test-element="track-composer"]').hasText('Track Composer')
    assert.dom('[data-test-element="track-title"]').hasText('Track Title')
  });

  test('it renders without artist element when artist is missing', async function(assert) {
    await render(hbs`
      <JukeboxPlayer
        @trackTitle="Track Title"
        @showTitle="Show Title"
      />
    `);

    assert.dom('[data-test-element="show-title"]').hasText('Show Title')
    assert.dom('[data-test-element="track-composer"]').doesNotExist();
    assert.dom('[data-test-element="track-title"]').hasText('Track Title')
  })

  test('it renders without title element when title is missing', async function(assert) {
    await render(hbs`
      <JukeboxPlayer
        @showTitle="Show Title"
      />
    `);

    assert.dom('[data-test-element="show-title"]').hasText('Show Title')
    assert.dom('[data-test-element="track-composer"]').doesNotExist();
    assert.dom('[data-test-element="track-title"]').doesNotExist();
    assert.dom('[data-test-element="track"]').exists(); // for layout

  })
});
