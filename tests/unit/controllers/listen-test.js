import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import moment from "moment";
import Service from '@ember/service';

function createPHPTracksInStore(store, startTimes) {
  var tracks = [];
  for (let i=0; i<startTimes.length; i++) {
    tracks.push(
      run(() => store.createRecord('track'))
    );
    tracks[i].set('startTime', moment().subtract(startTimes[i], "minutes"));
  }
  return tracks;
}

module('Unit | Controller | listen', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:listen');
    assert.ok(controller);
  });

  test('return tracks that started less than 60 minutes ago', function(assert) {
    let controller = this.owner.lookup('controller:listen');
    createPHPTracksInStore(this.owner.lookup('service:store'), [0, 59, 60, 61, 120]);
    assert.equal(controller.get('recentlyPlayed').length, 3);
  });

  test('twitter handle is retrieved from show object', function(assert) {
    const NowPlayingService = Service.extend({
      show: EmberObject.create({
        about: {
          "social": [
            { "contact-string": "@AnnieWQXR", "service":"twitter"},
            { "contact-string": "", "service":"facebook"},
            { "contact-string": "","service":"instagram"}
          ]
        }
      })
    });


    this.owner.register('service:nowPlaying', NowPlayingService);

    let controller = this.owner.lookup('controller:listen');
    assert.equal(controller.get('twitterHandle'), "AnnieWQXR");
  });
});
