import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-show-time', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('startTime', '2019-10-28T10:00:00');
    this.set('endTime', '2019-10-28T15:00:00');
    await render(hbs`{{format-show-time startTime endTime}}`);
    assert.equal(this.element.textContent.trim(), '10:00 - 3:00 PM');

    this.set('startTime', '2019-10-28T00:00:00');
    this.set('endTime', '2019-10-28T05:30:00');
    await render(hbs`{{format-show-time startTime endTime}}`);
    assert.equal(this.element.textContent.trim(), '12:00 - 5:30 AM');

    this.set('startTime', '2019-10-28T19:00:00');
    this.set('endTime', '2019-10-29T00:00:00');
    await render(hbs`{{format-show-time startTime endTime}}`);
    assert.equal(this.element.textContent.trim(), '7:00 - 12:00 AM');
  });
});
