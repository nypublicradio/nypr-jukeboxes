import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';


module('Integration | Component | toggle-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <ToggleBox as |toggle|>
        <toggle.trigger as |options|>
          <span class="the-label">Toggle Box Label</span>
        </toggle.trigger>

        <toggle.dropdown>
          Dropdown Contents
        </toggle.dropdown>
      </ToggleBox>
    `);

    // target span b/c there's an icon with assistive text in the label
    assert.dom('.toggle-box__label span.the-label').hasText('Toggle Box Label');
    await clickTrigger();
    assert.dom('.toggle-box__dropdown').hasText('Dropdown Contents');
  });
});
