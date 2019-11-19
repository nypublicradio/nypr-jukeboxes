import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | brands-linkroll', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{brands-linkroll}}`);

    assert.dom('.brands-linkroll').exists();
  });

  test('can choose a site to exclude', async function(assert) {
    await render(hbs`<BrandsLinkroll @exclude='gothamist'/>`);

    await click('.brands-linkroll .toggle-box__label'); // open the linkroll
    assert.dom('.brands-linkroll-nav-list').doesNotIncludeText('Gothamist');
  });

  test('can exclude multiple sites', async function(assert) {
    await render(hbs`<BrandsLinkroll @exclude={{array 'gothamist' 'wqxr'}}/>`);

    await click('.brands-linkroll .toggle-box__label'); // open the linkroll
    assert.dom('.brands-linkroll-nav-list').doesNotIncludeText('Gothamist');
    assert.dom('.brands-linkroll-nav-list').doesNotIncludeText('WQXR');
  })
});
