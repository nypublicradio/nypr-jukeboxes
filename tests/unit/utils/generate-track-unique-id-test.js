import generateTrackUniqueId from 'nypr-jukeboxes/utils/generate-track-unique-id';
import { module, test } from 'qunit';
module('Unit | Utility | generate-track-unique-id', function() {
  test('it works', function(assert) {
    let result = generateTrackUniqueId({
      "track-title"     : 'Track Title',
      "composer-name"   : 'Composer Name',
      "conductor-name"  : 'Conductor Name',
      "ensemble-name"   : 'Ensemble Name',
      "start-time"      : "2020-01-13T23:43:30+00:00",
      "mm-uid"          : "119529"
    });

    assert.equal(result, `wqxr_1578959010_119529`);
  });
});
