import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | formatted-date', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a date with year, month, and day if today', async function(assert) {
    let today = moment();
    this.set('inputValue', today.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-date inputValue}}`);
    assert.equal(this.element.textContent.trim(), today.format("dddd, MMMM Do, YYYY"));
  });

  test('it renders a date with year, month, and day if yesterday', async function(assert) {
    let yesterday = moment().add(-1, 'days');
    this.set('inputValue', yesterday.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-date inputValue}}`);
    assert.equal(this.element.textContent.trim(), yesterday.format("dddd, MMMM Do, YYYY"));
  })

  test('it renders a date with just month, day, and year if otherwise not today or yesteday', async function(assert) {
    let beforeYesterday = moment().add(-2, 'days');
    this.set('inputValue', beforeYesterday.format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{formatted-date inputValue}}`);
    assert.equal(this.element.textContent.trim(), beforeYesterday.format("MMMM Do, YYYY"));
  })
});
