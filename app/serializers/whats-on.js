import ApplicationSerializer from './application';
import transformAttributes from '../utils/transform-attributes';
import generateTrackUniqueId from '../utils/generate-track-unique-id';
import { get } from '@ember/object';

const trackAttributeTransform = {
  trackTitle: 'Item.metadata.title',
  composerName: 'Item.metadata.mm_composer1',
  ensembleName: 'Item.metadata.mm_ensemble1',
  conductorName: 'Item.metadata.mm_conductor',
  startTime:'Item.metadata.iso_start_time',
  catno: 'Item.metadata.catno'
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
    else {
      let trackAttributes = transformAttributes(get(payload, 'data.attributes'), trackAttributeTransform);

      let track = {
        id: generateTrackUniqueId(trackAttributes),
        type: 'track',
        attributes: trackAttributes
      }

      normalizedPayload = {
        data: {
          id: 'whats-on',
          type: 'whats_on',
          relationships: {
            tracks: {
              data: [
                {
                  type: track.type,
                  id: track.id
                }
              ]
            }
          }
        },
        included: [track]
      }
    }

    return this._super(store, modelClass, normalizedPayload);
  }
});
