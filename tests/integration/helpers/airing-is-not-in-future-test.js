import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from "moment";

module('Integration | Helper | airing-is-not-in-future', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns true if airing started in the past', async function(assert) {
    this.set('startTime', moment().add(-1, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{airing-is-not-in-future startTime}}`);
    assert.equal(this.element.textContent.trim(), "true");
  });

  test('it returns true if airing started right now', async function(assert) {
    this.set('startTime', moment().format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{airing-is-not-in-future startTime}}`);
    assert.equal(this.element.textContent.trim(), "true");
  });

  test('it returns false if airing starts in the future', async function(assert) {
    this.set('startTime', moment().add(1, 'minutes').format('YYYY-MM-DDTHH:mm:ss'));
    await render(hbs`{{airing-is-not-in-future startTime}}`);
    assert.equal(this.element.textContent.trim(), "false");
  });

});
