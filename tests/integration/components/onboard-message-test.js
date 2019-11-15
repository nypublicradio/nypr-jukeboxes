import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | onboard-message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`
      <OnboardMessage
      />
    `);

    assert.dom('[data-test-element="title"]').hasText('Welcome to a New WQXR')
    assert.dom('[data-test-element="body"]').hasText('We’ve launched an alternative experience of WQXR.org with the goal of highlighting the classical programming that you love, and try out new features. Help us improve the experience, send your feedback to beta@wqxr.org.')
    assert.dom('[data-test-element="old-wqxr-site"]').hasText('Go Back to Old wqxr.org')
    assert.dom('[data-test-element="take-a-look"]').hasText('Thanks, I\'ll Take a Look')
  });
});
