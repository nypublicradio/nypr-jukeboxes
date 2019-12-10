import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import moment from "moment";
import Ember from 'ember';

function minutesBeforeNowMeasuredInSecondsSince1970Epoch(minutes) {
  return (moment().valueOf() / 1000) - (minutes * 60);
}

function createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(startTime) {
  return EmberObject.create({
    start_ts: minutesBeforeNowMeasuredInSecondsSince1970Epoch(startTime),
  });
}

function createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow(startTimes) {
	var tracks = [];
	for (let i=0; i<startTimes.length; i++) {
		tracks.push(
      EmberObject.create({
        startTimeTs: minutesBeforeNowMeasuredInSecondsSince1970Epoch(startTimes[i]),
      }),
		);
	}
	return tracks;
}

function createCurrentPlaylistItemWithStartTimeTsValueMeasuredAsMinutesBeforeNow(startTime) {
  return EmberObject.create({
    catalogEntry: EmberObject.create({
      composer: {
        name: 'lorem'
      }
    }),
    startTimeTs: minutesBeforeNowMeasuredInSecondsSince1970Epoch(startTime)
  });
}

function createWomsMetadataWithStartTimeTsValueMeasuredAsMinutesBeforeNow(startTime) {
  return EmberObject.create({
      mm_composer1: 'lorem',
      real_start_time: minutesBeforeNowMeasuredInSecondsSince1970Epoch(startTime)
  });
}

module('Unit | Controller | listen', function(hooks) {
  setupTest(hooks);

  //let womsService = this.owner.lookup('service:woms').set('firstUpdateReceived', true);

  //womsService.set('firstUpdateReceived', true);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:listen');
    assert.ok(controller);
  });

  test('playlist history should not be stale if show started less than 15 minutes ago', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(14));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([30, 40, 45]));
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3); // all 3 tracks from earlier show should display
  });

  test('no current track - playlist history should be stale if there are no previous playlist items', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(60));
    stream.set('previous', []);
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
  });

  test('no tracks from earlier show should display if show started more than 15 minutes ago and there are no tracks from current show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(16));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([120, 180, 240]));
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
    assert.equal(controller.get('playlistHistoryItems').length, 0); // no tracks from earlier show should display
  });

  test('playlist history should  only display tracks for current show if first track for show started more than 15 minutes after start of show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(16));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([0, 180, 240]));
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
    assert.equal(controller.get('playlistHistoryItems').length, 1);
  });

  test('playlist history should  only display previous tracks from earlier show if first track for show started less than 15 minutes after start of show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(16));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([10, 30, 40]));
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3);
  });

  test('tracks from earlier show should display if show started more than 15 minutes ago and current track started within first 15 minutes show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(16));
    stream.set('currentPlaylistItem', createCurrentPlaylistItemWithStartTimeTsValueMeasuredAsMinutesBeforeNow(10));
    let womsService = this.owner.lookup('service:woms');
    womsService.set('metadata', createWomsMetadataWithStartTimeTsValueMeasuredAsMinutesBeforeNow(10));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([30, 31, 32]));
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:now-playing');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3);
  });

  test('tracks from earlier show should NOT display if show started more than 15 minutes ago and current track started after the first 15 minutes of the show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(16));
    stream.set('currentPlaylistItem', createCurrentPlaylistItemWithStartTimeTsValueMeasuredAsMinutesBeforeNow(0));
    let womsService = this.owner.lookup('service:woms');
    womsService.set('metadata', createWomsMetadataWithStartTimeTsValueMeasuredAsMinutesBeforeNow(0));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([120, 180, 240]));
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:now-playing');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
    assert.equal(controller.get('playlistHistoryItems').length, 0);
  });

	test('playlist history should not be stale if all previous tracks are from the current show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(120));
    stream.set('currentPlaylistItem', createCurrentPlaylistItemWithStartTimeTsValueMeasuredAsMinutesBeforeNow(0));
    let womsService = this.owner.lookup('service:woms');
    womsService.set('metadata', createWomsMetadataWithStartTimeTsValueMeasuredAsMinutesBeforeNow(0));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([1, 3, 5]));
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:now-playing');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3); // all 3 tracks from current show should display
  });

  test('no current track - playlist history should not be stale if all previous tracks are from the current show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(120));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([1, 3, 5]));
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3); // all 3 tracks from current show should display
  });

  test('hide previous tracks that started more than 1 hour before the start of the current show', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(16));
    stream.set('currentPlaylistItem', createCurrentPlaylistItemWithStartTimeTsValueMeasuredAsMinutesBeforeNow(10));
    let womsService = this.owner.lookup('service:woms');
    womsService.set('metadata', createWomsMetadataWithStartTimeTsValueMeasuredAsMinutesBeforeNow(10));
    stream.set('previous', createPreviousTracksWithStartTimeTsValuesMeasuredAsMinutesBeforeNow([59 + 16, 60 + 16, 61 + 16]));
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:now-playing');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 2);
  });

  test('previous is undefined', function(assert) {
    this.owner.lookup('service:woms').set('firstUpdateReceived', true);
    let controller = this.owner.lookup('controller:listen');
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    stream.set('currentShow', createCurrentSHowWithStartTimeTsValueMeasuredAsMinutesBeforeNow(60));
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
  });

  test('twitter handle is retrieved from show object', function(assert) {
    let controller = this.owner.lookup('controller:listen');
    let model = {
      show: EmberObject.create({
        about: {
          "social": [
            { "contact-string": "@AnnieWQXR", "service":"twitter"},
            { "contact-string": "", "service":"facebook"},
            { "contact-string": "","service":"instagram"}
          ]
        }
      })
    }
    controller.set('model', model);

    assert.equal(controller.get('twitterHandle'), "AnnieWQXR");
  });
});
