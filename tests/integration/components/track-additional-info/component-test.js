import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | track-additional-info', function(hooks) {
  setupRenderingTest(hooks);

  test('it just renders the title when no details are present', async function(assert) {
    this.set('title', "Track Title");
    this.set('conductor', null);
    this.set('ensemble', null);

    await render(hbs`
      <TrackAdditionalInfo @conductorName={{conductor}} @ensembleName={{ensemble}}>
        {{title}}
      </TrackAdditionalInfo>
      `);

    assert.equal(this.element.textContent.trim(), 'Track Title');
  });

  test('it renders a toggle box with additional info when ensemble or conductor is available', async function(assert) {
    this.set('title', "Track Title");
    this.set('conductor', "Garcia Navarro");
    this.set('ensemble', "Vienna Radio Symphony Orchestra");

    await render(hbs`<TrackAdditionalInfo @conductorName={{conductor}} @ensembleName={{ensemble}}>
      {{title}}
    </TrackAdditionalInfo>`);

    assert.dom('.secondary-metadata-toggle-box').exists();
    await click('.secondary-metadata-toggle-box .toggle-box__label');

    assert.dom('.secondary-metadata-content-field.ensemble').hasText('Performed by the Vienna Radio Symphony Orchestra')
    assert.dom('.secondary-metadata-content-field.conductor').hasText('Conducted by Garcia Navarro')
  });
});
