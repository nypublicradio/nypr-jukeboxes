import generateAiringUniqueId from 'nypr-jukeboxes/utils/generate-airing-unique-id';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Utility | generate-airing-unique-id', function() {

  test('it works', function(assert) {
    moment.tz.setDefault("America/New_York");

    let result = generateAiringUniqueId({
      "show-id"     : '124',
      "start-time"  : "2019-12-01T12:00:00+00:00",
      "end-time"    : "2019-12-01T13:00:00+00:00",
    });

    assert.equal(result, 'a_124_2019-12-01_07:00_2019-12-01_08:00');
  });
});
