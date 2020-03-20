import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | formatted-picker-date', function(hooks) {
  setupRenderingTest(hooks);

  let days_in_year = moment().isLeapYear() ? 366 : 365;

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', 0);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'TODAY');
  })

  test("it renders tomorrow", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', 1);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'TOMORROW');
  })

  test("it renders yesterday", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -1);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'YESTERDAY');
  })
   
  test("it renders day before yesterday", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -2);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-2, 'days').format("dddd"));
  })

  test("it renders the day within the week ", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -6);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-6, 'days').format("dddd"));
  })

  test("it renders the date without year after 6 days ", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -7);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-7, 'days').format("dddd, MMM Do"));
  })

  test("it renders the date without year within the year ", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -(days_in_year - 1));
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-(days_in_year - 1), 'days').format("dddd, MMM Do"));
  })

  test("it renders the date within year", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));

    this.set('increment', -days_in_year);
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().subtract(days_in_year, 'days').format("dddd, MMM Do, YYYY"));
  })

  test("it renders the date with the year if more than a year ago", async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', -(days_in_year + 1));
    await render(hbs`{{formatted-picker-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), moment().add(-(days_in_year + 1), 'days').format("dddd, MMM Do, YYYY"));
  });
});
