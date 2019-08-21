import fixTimestamp from 'nypr-jukeboxes/helpers/fix-timestamp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | fix-timestamp', function(hooks) {
  setupTest(hooks);

  test('when eastern timezone is present, return UTC', function(assert) {
    let result = fixTimestamp("2018-03-20T01:00:00-04:00")
    assert.equal(result, "2018-03-20T05:00:00.000Z")
  });

  test('when eastern time is present without the colon, return UTC', function(assert) {
    let result = fixTimestamp("2018-03-20T01:00:00-0400")
    assert.equal(result, "2018-03-20T05:00:00.000Z")
  });

  test('when a different timezone is present, return UTC', function(assert) {
    let result = fixTimestamp("2018-03-20T01:00:00+01:00")
    assert.equal(result, "2018-03-20T00:00:00.000Z")
  });

  test('when time includes milleseconds and timezone, return UTC', function(assert) {
    let result = fixTimestamp("2018-03-23T08:27:09.134-05:00");
    assert.equal(result, "2018-03-23T13:27:09.134Z")
  })

  test('when UTC timezone is present, return original', function(assert) {
    let result = fixTimestamp("2018-03-20T01:00:00.451Z")
    assert.equal(result, "2018-03-20T01:00:00.451Z")
  });

  test('when no timezone is present, assume eastern time', function(assert) {
    let result = fixTimestamp("2018-03-20T11:33:00")
    assert.equal(result, "2018-03-20T15:33:00.000Z")
  })
});