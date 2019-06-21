import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | stream-switcher', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    let wnyc = { slug: 'wnyc-fm939', name: 'WNYC 93.9FM', audioBumper: 'blerg'}
    let wqxr = { slug: 'wqxr', name: 'WQXR 105.9FM', audioBumper: 'blarg'}

    this.set('currentStream', wqxr);
    this.set('streams', [wnyc, wqxr]);

    await render(hbs`<StreamSwitcher @streams={{streams}} @currentStream={{currentStream}}/>`);

    assert.equal(findAll('.stream-switcher button').length, 2);

    let currentStream = find('.current-stream').textContent.trim();
    assert.equal(currentStream, 'WQXR 105.9FM');

  });
});
