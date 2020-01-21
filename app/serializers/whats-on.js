import ApplicationSerializer from './application';
import transformAttributes from '../utils/transform-attributes';
import generateTrackUniqueId from '../utils/generate-track-unique-id';
import { get } from '@ember/object';

const trackAttributeTransform = {
  trackTitle: 'title',
  composerName: 'mm_composer1',
  ensembleName: 'mm_ensemble1',
  conductorName: 'mm_conductor',
  startTime: 'iso_start_time',
  catno: 'catno'
}

export default ApplicationSerializer.extend({
  normalizeSingleResponse(store, modelClass, payload) {
    let normalizedPayload;
    if (get(payload, 'data.attributes.Item.metadata.air_break')) {

      normalizedPayload = {
        data: {
          id: 'whats-on',
          type: 'whats_on',
          attributes: {
            airbreak: true
          }
        }
      };
    }
    else if (get(payload, 'data.attributes.Item.metadata')) {
      let tracks = []
      let trackAttributes = transformAttributes(get(payload, 'data.attributes.Item.metadata'), trackAttributeTransform);
      tracks.push({
        id: generateTrackUniqueId(trackAttributes),
        type: 'track',
        attributes: trackAttributes
      })

      let rawTracks       = get(payload, 'data.attributes.Item.metadata.playlist_hist_preview');
      if (rawTracks) {
        let otherTracks = rawTracks.map(t => transformAttributes(t, trackAttributeTransform));
        otherTracks.forEach(trackAttributes => {
          tracks.push({
            id: generateTrackUniqueId(trackAttributes),
            type: 'track',
            attributes: trackAttributes
          })
        })
      }

      let tracksRelationships = tracks.map(track => {
        return {
          type: track.type,
          id: track.id
        }
      })

      normalizedPayload = {
        data: {
          id: 'whats-on',
          type: 'whats_on',
          relationships: {
            tracks: {
              data: tracksRelationships
            }
          }
        },
        included: tracks
      }
    }
    else {
      normalizedPayload = {
        data: {
          id: 'whats-on',
          type: 'whats_on',
          attributes: {}
        }
      };
    }
    return this._super(store, modelClass, normalizedPayload);
  }
});
