import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | track-info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('composerName', 'Jeronimo Gimenez');
    this.set('trackTitle', 'La boda de Luis Alonso: Intermezzo');
    this.set('ensembleName', 'Vienna Radio Symphony Orchestra');
    this.set('conductorName', 'Garcia Navarro');
    this.set('startTime', '02:23 AM');

    await render(hbs`{{track-info
      trackTitle=trackTitle
      ensembleName=ensembleName
      conductorName=conductorName
      composerName=composerName
      startTime=startTime
    }}`);

    assert.equal(find('.composer').textContent.trim(), 'Jeronimo Gimenez');
    assert.equal(find('.title').textContent.trim(), 'La boda de Luis Alonso: Intermezzo');
    assert.equal(find('.start-time').textContent.trim(), '2:23 AM');
    assert.equal(find('.ensemble'), null);
    assert.equal(find('.conductor'), null);

    await click('button');

    assert.equal(find('.ensemble').textContent.trim(), 'Performed by the Vienna Radio Symphony Orchestra');
    assert.equal(find('.conductor').textContent.trim(), 'Conducted by Garcia Navarro');
  });
});