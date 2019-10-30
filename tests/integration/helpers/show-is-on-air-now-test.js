import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Helper | show-is-on-air-now', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('startTime', moment().add(-1, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    this.set('endTime', moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{show-is-on-air-now startTime endTime}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('startTime', moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    this.set('endTime', moment().add(2, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{show-is-on-air-now startTime endTime}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('startTime', moment().add(-2, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    this.set('endTime', moment().add(-1, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{show-is-on-air-now startTime endTime}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });
});
