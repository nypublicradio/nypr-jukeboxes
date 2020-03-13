import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | formatted-day', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a date with year, month, date, and time if today', async function (assert) {
    let today = moment();
    this.set('inputValue', today.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-day inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Today');
  })

  test('it renders a date with year, month, date, and time if yesterday', async function (assert) {
    let yesterday = moment().add(-1, 'days');
    this.set('inputValue', yesterday.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-day inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Yesterday');
  })

  test('it renders a date with basic date format if day before yesterday', async function (assert) {
    let beforeYesterday = moment().add(-2, 'days');
    this.set('inputValue', beforeYesterday.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-day inputValue}}`);
    assert.equal(this.element.textContent.trim(), beforeYesterday.format("dddd"));
  });

  test('it renders a date with year, month, date, and time if day tomorrow', async function (assert) {
    let beforeYesterday = moment().add(1, 'days');
    this.set('inputValue', beforeYesterday.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-day inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Tomorrow');
  });
});
