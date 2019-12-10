import { dateTimeNormalizer } from 'nypr-jukeboxes/helpers/date-time-normalizer';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | date-time-normalizer', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it converts 2019-11-26 + 07:00 PM', function(assert) {
    let date = dateTimeNormalizer(["2019-11-26", "07:00 PM"]);

    assert.equal(date.toISOString(), '2019-11-27T00:00:00.000Z')
  });

  test('it converts 11/26/2019 + 19:00:00', function(assert) {
    let date = dateTimeNormalizer(["2019-11-26", "19:00:00"]);

    assert.equal(date.toISOString(), '2019-11-27T00:00:00.000Z')
  });
});
