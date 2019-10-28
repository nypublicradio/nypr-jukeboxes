import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | can-show-schedule-for-date', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', moment().format('YYYY-MM-DDTHH:mm:ss'));

    this.set('increment', 0);
    await render(hbs`{{can-show-schedule-for-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('increment', 1);
    await render(hbs`{{can-show-schedule-for-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'false');

		this.set('increment', -1);
    await render(hbs`{{can-show-schedule-for-date inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });
});
