import transformAttributes from 'nypr-jukeboxes/utils/transform-attributes';
import { module, test } from 'qunit';

module('Unit | Utility | transform-attributes', function() {

  test('it dasherizes the keys for the serializer', function(assert) {
    let transform = {
      trackTitle     : 'info.title',
      composerName   : 'info.composer',
      conductorName  : 'info.conductor',
      ensembleName   : 'info.ensemble',
      startTime      : 'info.start_time',
      catno          : 'info.catno'
    }

    let data = {
      info: {
        title: "Track Title",
        composer: "Composer Name",
        conductor: "Conductor Name",
        ensemble: "Ensemble Name",
        start_time: "2019-12-01T12:00:00+00:00",
        catno: "12345"
      }
    }

    let result = transformAttributes(data, transform);

    assert.deepEqual(result, {
      "track-title": "Track Title",
      "composer-name": "Composer Name",
      "conductor-name": "Conductor Name",
      "ensemble-name": "Ensemble Name",
      "start-time": "2019-12-01T12:00:00+00:00",
      catno: "12345"
    });
  });

  test('it allows transform functions', function(assert) {
    let transform = {
      trackTitle     : 'info.title',
      composerName   : 'info.composer',
      conductorName  : 'info.conductor',
      ensembleName   : 'info.ensemble',
      startTime      : (data) => new Date(data.info.start_time).getTime(),
      catno          : 'info.catno'
    }

    let data = {
      info: {
        title: "Track Title",
        composer: "Composer Name",
        conductor: "Conductor Name",
        ensemble: "Ensemble Name",
        start_time: "2019-12-01T12:00:00+00:00",
        catno: "12345"
      }
    }

    let result = transformAttributes(data, transform);

    assert.deepEqual(result, {
      "track-title": "Track Title",
      "composer-name": "Composer Name",
      "conductor-name": "Conductor Name",
      "ensemble-name": "Ensemble Name",
      "start-time": 1575201600000,
      catno: "12345"
    });
  });

});
