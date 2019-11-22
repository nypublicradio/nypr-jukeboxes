import StreamSerializer from 'nypr-publisher-lib/serializers/stream';
import moment from 'moment';

export default StreamSerializer.extend({
  normalizeFindRecordResponse(store, modelClass, payload, id, requestType) {
    let response = this._super(store, modelClass, payload, id, requestType);
    response.data.attributes.previous = this._getPlaylistItems(payload.schedule);
    return response;
  },

  _getPlaylistItems(schedule) {
    var newPlaylist = []

    if (!schedule.events) {
      return newPlaylist;
    }

    schedule.events.forEach(function(event) {
      if (event.playlists) {
        event.playlists.forEach(function(playlist) {
          if (playlist.played) {
            newPlaylist.push.apply(newPlaylist, playlist.played);
          }
        });
      }
    });

    newPlaylist.forEach(function(item) {
      let momentTime = moment(item.time,'hh:mm A', true);
      if (momentTime.isValid()) {
        item.startTimeTs = momentTime.valueOf() / 1000;
        item.startTime = momentTime.format('YYYY-MM-DDTHH:mm:ss');
        item.catalogEntry = item.info;
        delete item['info'];
      }
    })

    newPlaylist.sort(function(a, b) {
      return a.startTimeTs < b.startTimeTs ? 1 : -1;
    })

    return newPlaylist.slice(0,3);
  },
});
