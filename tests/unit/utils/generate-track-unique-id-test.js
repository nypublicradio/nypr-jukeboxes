import generateTrackUniqueId from 'nypr-jukeboxes/utils/generate-track-unique-id';
import { module, test } from 'qunit';

module('Unit | Utility | generate-track-unique-id', function() {
  test('it works', function(assert) {
    let result = generateTrackUniqueId({
      track_title     : 'Track Title',
      composer_name   : 'Composer Name',
      conductor_name  : 'Conductor Name',
      ensemble_name   : 'Ensemble Name',
      start_time      : "2019-12-01T12:00:00+00:00",
      catno           : "12345"
    });

    assert.equal(result, 't_12345_2019-12-01');
  });
});
