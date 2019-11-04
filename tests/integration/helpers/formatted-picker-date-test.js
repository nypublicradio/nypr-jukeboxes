import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | formatted-picker-date', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', 0);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'TODAY');

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -1);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'YESTERDAY');

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -2);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-2, 'days').format("dddd"));

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -6);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-6, 'days').format("dddd"));

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -7);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-7, 'days').format("dddd, MMM Do"));

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -364);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-364, 'days').format("dddd, MMM Do"));

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -365);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-365, 'days').format("dddd, MMM Do, YYYY"));

    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -366);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-366, 'days').format("dddd, MMM Do, YYYY"));
  });
});
