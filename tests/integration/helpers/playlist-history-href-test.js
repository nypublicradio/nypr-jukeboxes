import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from "moment";

module('Integration | Helper | playlist-history-href', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', moment('2019-10-28T12:00:00').format('YYYY-MM-DDTHH:mm:ss'));
    this.set('increment', 0);
    await render(hbs`{{playlist-history-href inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), '/playlist-history/2019/10/28');

    this.set('increment', -1);
    await render(hbs`{{playlist-history-href inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), '/playlist-history/2019/10/27');

    this.set('increment', 1);
    await render(hbs`{{playlist-history-href inputValue increment}}`);
    assert.equal(this.element.textContent.trim(), '/playlist-history/2019/10/29');
  });
});
