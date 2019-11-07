import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import moment from "moment";
import Ember from 'ember';

module('Unit | Controller | listen', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:listen');
    assert.ok(controller);
  });

  test('playlist history should not be stale if show started less than 15 minutes ago', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (14 * 60), // show started 14 minutes ago
    });
    stream.set('currentShow', currentShow);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (30 * 60), // started 30 minutes ago
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (40 * 60), // 40 minutes ago
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (45* 60), // 45 minutes ago
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3); // all 3 tracks from earlier show should display
  });

  test('no current track - playlist history should be stale if there are no previous playlist items', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (1 * 60 * 60), // show started 1 hour ago
    });
    stream.set('currentShow', currentShow);
    stream.set('previous', []);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
  });

  test('no tracks from earlier show should display if show started more than 15 minutes ago and there are no tracks from current show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (16  * 60), // show started 16 minutes ago
    });
    stream.set('currentShow', currentShow);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (2 * 60 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (3 * 60 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (4 * 60 * 60),
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
    assert.equal(controller.get('playlistHistoryItems').length, 0); // no tracks from earlier show should display
  });

  test('playlist history should  only display tracks for current show if first track for show started more than 15 minutes after start of show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (16  * 60), // show started 16 minutes ago
    });
    stream.set('currentShow', currentShow);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000), // track started right now
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (3 * 60 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (4 * 60 * 60),
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
    assert.equal(controller.get('playlistHistoryItems').length, 1);
  });

  test('playlist history should  only display previous tracks from earlier show if first track for show started less than 15 minutes after start of show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (16  * 60), // show started 16 minutes ago
    });
    stream.set('currentShow', currentShow);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (10 * 60), // track started 10 minutes ago
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (30 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (40 * 60),
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3);
  });

  test('tracks from earlier show should display if show started more than 15 minutes ago and current track started within first 15 minutes show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (16  * 60), // show started 16 minutes ago
    });
    stream.set('currentShow', currentShow);
    let currentPlaylistItem = EmberObject.create({
      catalogEntry: EmberObject.create({
        composer: {
          name: 'lorem'
        }
      }),
      startTimeTs: (moment().valueOf() / 1000) - (10 * 60)
    });
    stream.set('currentPlaylistItem', currentPlaylistItem);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (30 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (31 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (32 * 60),
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:current-stream');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3);
  });

  test('tracks from earlier show should NOT display if show started more than 15 minutes ago and current track started after the first 15 minutes of the show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (16  * 60), // show started 16 minutes ago
    });
    stream.set('currentShow', currentShow);
    let currentPlaylistItem = EmberObject.create({
      catalogEntry: EmberObject.create({
        composer: {
          name: 'lorem'
        }
      }),
      startTimeTs: (moment().valueOf() / 1000)
    });
    stream.set('currentPlaylistItem', currentPlaylistItem);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (2 * 60 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (3 * 60 * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (4 * 60 * 60),
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:current-stream');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), true);
    assert.equal(controller.get('playlistHistoryItems').length, 0);
  });

	test('playlist history should not be stale if all previous tracks are from the current show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (2 * 60 * 60), // show started 2 hours ago
    });
    stream.set('currentShow', currentShow);
    let currentPlaylistItem = EmberObject.create({
      catalogEntry: EmberObject.create({
        composer: {
          name: 'lorem'
        }
      }),
      startTimeTs: (moment().valueOf() / 1000)
    });
    stream.set('currentPlaylistItem', currentPlaylistItem);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (1 * 60), // started 1 minute
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (3 * 60), // 3 minutes ago
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (5 * 60), // 5 minutes ago
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:current-stream');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3); // all 3 tracks from current show should display
  });

  test('no current track - playlist history should not be stale if all previous tracks are from the current show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (2 * 60 * 60), // show started 2 hours ago
    });
    stream.set('currentShow', currentShow);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (1 * 60), // started 1 minute
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (3 * 60), // 3 minutes ago
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - (5 * 60), // 5 minutes ago
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 3); // all 3 tracks from current show should display
  });

  test('hide previous tracks that started more than 1 hour before the start of the current show', function(assert) {
    let controller = this.owner.lookup('controller:listen');

    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    let currentShow = EmberObject.create({
      start_ts: (moment().valueOf() / 1000) - (16  * 60), // show started 16 minutes ago
    });
    stream.set('currentShow', currentShow);
    let currentPlaylistItem = EmberObject.create({
      catalogEntry: EmberObject.create({
        composer: {
          name: 'lorem'
        }
      }),
      startTimeTs: (moment().valueOf() / 1000) - (10 * 60)
    });
    stream.set('currentPlaylistItem', currentPlaylistItem);
    let previous = [
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - ((59 + 16) * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - ((60 + 16) * 60),
      }),
      EmberObject.create({
        startTimeTs: (moment().valueOf() / 1000) - ((61 + 16) * 60),
      }),
    ]
    stream.set('previous', previous);
    let model = {
      stream: stream
    }
    controller.set('model', model);
    Ember.inject.service();
    let service = this.owner.lookup('service:current-stream');
    service.set('stream', stream);

    assert.equal(controller.get('isPlaylistHistoryPreviewStale'), false);
    assert.equal(controller.get('playlistHistoryItems').length, 2);
  });
});
