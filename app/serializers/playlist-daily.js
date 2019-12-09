import DS from 'ember-data';
import { get } from '@ember/object';
import { camelizeObject } from 'nypr-publisher-lib/helpers/camelize-object';
import moment from "moment";

export default DS.JSONAPISerializer.extend({
  _removeUnairedEvents(payload) {
    payload.playlistDaily.events = payload.playlistDaily.events.filter(function(event) {
      return moment(get(event, 'start_timestamp')).format("X") <= moment().format("X");
    });
  },

  _sortEventsDescending(payload) {
    payload.playlistDaily.events.sort(function(a, b) {
      return (moment(get(a, 'start_timestamp'), 'YYYY-MM-DDTHH:mm:ss') > moment(get(b, 'start_timestamp'), 'YYYY-MM-DDTHH:mm:ss') ? -1 : 1);
    });
  },

  _mergeAndSortPlaylists(payload) {
    payload.playlistDaily.events.forEach(function(event) {
      if (event.playlists) {
        var playlist = [];

        // merge all playlists into one
        for (var i = 0, l = event.playlists.length; i < l; i++) {
          playlist = playlist.concat(event.playlists[i].played);
        }

        // fix data fields
        playlist.forEach(function(track) {
          track.catalogEntry = track.info;
          track.startTime = track.time;
          delete track.info;
        });

        // sort playlist in descending order
        playlist.sort(function(a, b) {
          return (moment(get(a, 'start_time'), 'hh:mm a') > moment(get(b, 'start_time'), 'hh:mm a') ? -1 : 1);
        });

        event.playlist = playlist;
        delete event.playlists;
      }
    });
  },

  normalizeFindRecordResponse(store, modelClass, payload, id/*, requestType*/) {
    this._removeUnairedEvents(payload);
    this._mergeAndSortPlaylists(payload);
    this._sortEventsDescending(payload);

    return {
      data: {
        type: 'playlist-daily',
        id,
        attributes: {
          airings: camelizeObject(payload.playlistDaily.events),
        }
      }
    }
  },
});
