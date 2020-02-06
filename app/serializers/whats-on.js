import ApplicationSerializer from './application';
import transformAttributes from '../utils/transform-attributes';
import generateTrackUniqueId from '../utils/generate-track-unique-id';
import { get } from '@ember/object';

const trackAttributeTransform = {
  trackTitle: 'title',
  mmUid: 'mm_uid',
  composerName: 'mm_composer1',
  ensembleName: 'mm_ensemble1',
  conductorName: 'mm_conductor',
  startTime: 'iso_start_time',
  catno: 'catno'
}

export default ApplicationSerializer.extend({
  normalizeSingleResponse(store, modelClass, payload) {
    let tracks = [];
    let normalizedPayload, attributes;
    if (get(payload, 'data.attributes.Item.metadata')) {
      attributes = get(payload, 'data.attributes.Item.metadata'); // the old way
    }
    else {
      attributes = get(payload, 'data.attributes') || {}; // the new way
    }

    if (this._hasNowPlaying(attributes)) {
      tracks.push(...this._getNowPlaying(attributes));
    }

    tracks.push(...this._getPlaylistHistoryPreview(attributes));
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
        attributes: {
          air_break: this._hasAirBreak(payload)
        },
        relationships: {
          tracks: {
            data: tracksRelationships
          }
        }
      },
      included: tracks
    }

    return this._super(store, modelClass, normalizedPayload);
  },

  _hasAirBreak(payload) {
    return get(payload, 'air_break');
  },

  _hasNowPlaying(payload) {
    return !get(payload, 'air_break') && get(payload, 'mm_uid');
  },

  _getNowPlaying(payload) {
    let tracks = []
    let trackAttributes = transformAttributes(payload, trackAttributeTransform);
    tracks.push({
      id: generateTrackUniqueId(trackAttributes),
      type: 'track',
      attributes: trackAttributes
    })

    return tracks;
  },

  _getPlaylistHistoryPreview(payload) {
    let tracks = [];
    let rawTracks = get(payload, 'playlist_hist_preview');
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

    return tracks;
  },
});
