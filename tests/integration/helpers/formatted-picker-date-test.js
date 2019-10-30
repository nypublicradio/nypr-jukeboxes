import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | formatted-picker-date', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    let today = moment();
    this.set('inputValue', today.format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', 0);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'TODAY');

    this.set('inputValue', today.format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -1);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'YESTERDAY');

    this.set('inputValue', today.format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -2);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), today.add(-2, 'days').format("dddd, MMMM Do, YYYY"));
  });
});
