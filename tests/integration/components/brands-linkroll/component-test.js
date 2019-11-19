import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | brands-linkroll', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{brands-linkroll}}`);

    assert.dom('.c-toggle-box--linkroll').exists();
  });

  test('can choose a site to exclude', async function(assert) {
    await render(hbs`<BrandsLinkroll @exclude='gothamist'/>`);

    await click('.c-toggle-box--linkroll .toggle-box__label'); // open the linkroll
    assert.dom('.c-nypr-nav__list').doesNotIncludeText('Gothamist');
  });

  test('can exclude multiple sites', async function(assert) {
    await render(hbs`<BrandsLinkroll @exclude={{array 'gothamist' 'wqxr'}}/>`);

    await click('.c-toggle-box--linkroll .toggle-box__label'); // open the linkroll
    assert.dom('.c-nypr-nav__list').doesNotIncludeText('Gothamist');
    assert.dom('.c-nypr-nav__list').doesNotIncludeText('WQXR');
  })
});
