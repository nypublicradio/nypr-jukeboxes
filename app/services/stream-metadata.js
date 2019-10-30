//adapted from new-sounds-web-client/playlist.js
import Service from '@ember/service';
import config from '../config/environment';
import { inject as service} from '@ember/service';
import { computed, observer, get, set } from '@ember/object';
import fetch from 'fetch';
import moment from 'moment';
import { debug } from '@ember/debug';
import fixTimestamp from '../helpers/fix-timestamp';


var DEFAULTSHOWDICT = {'wqxr': 'terrance-mcknight'}
var DEFAULTSHOWTITLEDICT = {'wqxr': 'Evenings with Terrance McKnight'}


export default Service.extend({
  publisherHost: config.publisherAPI,
  store: service(),
  hifi: service(),
  currentStream: service(),
  isLoading: false,
  dailySchedule: null,
  dailyScheduleUpdater: observer('currentStream.slug', function() {
    if (!this.get('isLoading')) {
      this.load(moment().format());
    }
  }),
  scheduleDate: moment().format("YYYY/MMM/DD"), //currentScheduleId
  isTodaysSchedule: computed('scheduleDate', function() {
    return moment().format('YYYY/MMM/DD') == get(this, 'scheduleDate');
  }),
  previousScheduleDate: computed('scheduleDate', function() {
    return moment(get(this, 'scheduleDate'), 'YYYY/MMM/DD').subtract(1, 'day').format('YYYY/MMM/DD')
  }),
  nextScheduleDate: computed('scheduleDate', function() {
    return moment(get(this, 'scheduleDate'), 'YYYY/MMM/DD').add(1, 'day').format('YYYY/MMM/DD')
  }),

  load(date) {
    this.set('isLoading', true)
    this.set('scheduleDate', moment(date).format('YYYY/MMM/DD'));
    let prefetchedSchedule = get(this, 'store').peekRecord('daily-schedule', `${moment(date).format('YYYY/MMM/DD')}-${this.get('currentStream.slug')}`)
    if (prefetchedSchedule) {
      this.set('isLoading', false)
      this.set('dailySchedule', prefetchedSchedule);
      return prefetchedSchedule;
    } else {
      let requestUrl = this._scheduleUrlForDate(date);
      return this.getSchedule(requestUrl);
    }
  },

  getSchedule(requestUrl) {
    debug(`getting schedule ${requestUrl}`);
    return fetch(requestUrl).then(response => {
      return response.json().then(r => {
        debug(`process schedule ${requestUrl}`)
        return this.processSchedule(r);
      })
    });
  },

  processSchedule(results) {
    var dailySchedule = get(this, 'store').createRecord('daily-schedule', {airings: [], id: `${this.get('scheduleDate')}-${this.get('currentStream.slug')}`})
    //return
    results.events.map(event => {
      var attrs;
      var playlists = event.playlists.map(p => p.played.map(t => this.processTrack(t)))
      if (get(event, 'isObject')) {
        var matches = event.show_url.match('shows/(.+)');
        let showSlug = matches ? matches[1] : DEFAULTSHOWDICT[this.get('currentStream.slug')]

        attrs = {
          id       : `${event.start_timestamp}_${showSlug}`,
          startTime: event.start_timestamp,
          endTime  : event.end_timestamp,
          title    : event.show_title,
          showId   : event.show_id,
          showSlug : showSlug,
          tracks : [].concat.apply([], playlists).sort(function(a, b) {
                      return (moment(get(a, 'startTime'), 'hh:mm a') > moment(get(b, 'startTime'), 'hh:mm a') ? -1 : 1);
                   })
        };
      }
      else {
        attrs = {
          id       : `${event.start_timestamp}_${DEFAULTSHOWDICT[this.get('currentStream.slug')]}`,
          startTime: event.start_timestamp,
          endTime  : fixTimestamp(event.end_timestamp),
          title    : DEFAULTSHOWTITLEDICT[this.get('currentStream.slug')],
          showSlug : DEFAULTSHOWDICT[this.get('currentStream.slug')],
          tracks : [].concat.apply([], playlists).sort(function(a, b) {
                      return (moment(get(a, 'startTime')) > moment(get(b, 'startTime'), 'hh:mm a') ? -1 : 1);
                   })
        };
      }

      // TODO: change this model from airing to something less confusing. This is
      // basically a event - and it can either be a show event or airing, as defined in publisher.
      var airing = get(this, 'store').createRecord('airing', attrs)

      //get(this, 'store').findRecord('show', attrs.showSlug).then(show => {
      //  airing.set('show', show);
      //})

      set(this, 'dailySchedule', dailySchedule);
      dailySchedule.get('airings').addObject(airing);
    });
    this.set('isLoading', false);
    dailySchedule.set('airings', dailySchedule.get('airings').reverse().filter( (airing) => {
     return airing.isCurrent;
    }));
    return dailySchedule;
  },

  _scheduleUrlForDate(rawDate) {
    let date  = moment.tz(rawDate, "America/New_York");
    let slug  = this.get('currentStream.slug');
    let year  = date.format("YYYY");
    let month = date.format('MMM').toLowerCase();
    let day   = date.format('DD');

    let url = `${this.publisherHost}/v1/playlist-daily/${slug}/${year}/${month}/${day}/`;
    return url;
  },

  processTrack(track) {
    let store     = get(this, 'store')
    let trackId   = get(track, 'id');
    if (trackId && !store.peekRecord('track', trackId)) {
      let record = store.createRecord('track', {
        id             : get(track, 'id'),
        playlistEntryId: get(track, 'id'),
        catalogEntry   : get(track, 'info'),
        startTime      : get(track, 'time'),
      });
      return record;
    } else if (trackId) {
      return store.peekRecord('track', trackId);
    } else {
      return null;
    }
  },

  findAiring(timestampWithZone) {
    let playTime = moment(timestampWithZone);

    let airing = get(this, 'store').peekAll('airing').find(s => {
      return playTime.isBetween(moment(get(s, 'startTime')), moment(get(s, 'endTime')), null, '[]');
    });

    if (!airing) {
      debug(`could not find schedule item for track ${timestampWithZone} -> ${playTime}`)
    }

    return airing;
  }
});
