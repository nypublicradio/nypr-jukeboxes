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
    assert.dom('[data-test-element="body"]').hasText('We launched an alternative experience of WQXR.org to highlight the classical programming that our listeners love, and to try out new features. Help us improve by sharing your feedback.')
    assert.dom('[data-test-element="old-wqxr-site"]').hasText('Go Back to Old WQXR.org')
    assert.dom('[data-test-element="take-a-look"]').hasText('Thanks, I\'ll Take A Look')
  });
});
