import DS from 'ember-data';
import { get } from '@ember/object';
import { camelizeObject } from 'nypr-publisher-lib/helpers/camelize-object';
import moment from "moment";

export default DS.JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, modelClass, payload, id/*, requestType*/) {
    payload.playlistDaily.events = payload.playlistDaily.events.filter(function(event) {
      return moment(get(event, 'start_timestamp')).format("X") <= moment().format("X");
    });

    payload.playlistDaily.events.forEach(function(event) {
      if (event.playlists) {
        var playlist = [];

        for (var i = 0, l = event.playlists.length; i < l; i++) {
          playlist = playlist.concat(event.playlists[i].played);
        }

        playlist.forEach(function(track) {
          track.catalogEntry = track.info;
          track.startTime = track.time;
          delete track.info;
        });

        playlist.sort(function(a, b) {
          return (moment(get(a, 'start_time'), 'hh:mm a') > moment(get(b, 'start_time'), 'hh:mm a') ? -1 : 1);
        });

        event.playlist = playlist;
        delete event.playlists;
      }
    });

    payload.playlistDaily.events.sort(function(a, b) {
      return (moment(get(a, 'start_timestamp'), 'YYYY-MM-DDTHH:mm:ss') > moment(get(b, 'start_timestamp'), 'YYYY-MM-DDTHH:mm:ss') ? -1 : 1);
    });

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
