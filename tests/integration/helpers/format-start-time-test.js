import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-show-time', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('startTime', '2019-10-28T14:23:00');
    await render(hbs`{{format-start-time startTime}}`);
    assert.equal(this.element.textContent.trim(), '2:23 PM');

    this.set('startTime', '2019-10-28T02:24:00');
    await render(hbs`{{format-start-time startTime}}`);
    assert.equal(this.element.textContent.trim(), '2:24 AM');

    this.set('startTime', '02:25 AM');
    await render(hbs`{{format-start-time startTime}}`);
    assert.equal(this.element.textContent.trim(), '2:25 AM');
  });
});
