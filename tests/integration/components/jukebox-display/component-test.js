import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';


const djStub = Service.extend({
  isReady: true,

  init() {
    this._super(...arguments);
    this.currentlyLoadingIds = [];
  }
});

module('Integration | Component | jukebox-display', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:dj', djStub);
    this.dj = this.owner.lookup('service:dj');
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    let wqxr = {
      slug: 'wqxr',
      name: 'WQXR 105.9FM',
      audioBumper: 'blarg',
      currentPiece: 'Beethoven\'s Fifth',
      currentComposer: {
        name: 'Ludwig van Beethoven'
      },
      currentShow: {
        showTitle: 'Evenings with Terrance McKnight'
      }
    }

    this.set('currentStream', wqxr);

    await render(hbs`<JukeboxDisplay @currentStream={{currentStream}}/>`);

    assert.equal(find('.jukebox-display__current-stream').textContent.trim(), 'WQXR 105.9FM');
  });
});
