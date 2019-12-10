//adapted from new-sounds-web-client/playlist.js
import Service from '@ember/service';
import config from '../config/environment';
import { inject as service} from '@ember/service';
import { computed, observer, get, set } from '@ember/object';
import fetch from 'fetch';
import moment from 'moment';
import { debug } from '@ember/debug';

var DEFAULTSHOWDICT = {'wqxr': 'terrance-mcknight'}
var DEFAULTSHOWTITLEDICT = {'wqxr': 'Evenings with Terrance McKnight'}

export default Service.extend({
  publisherHost: config.publisherAPI,
  store: service(),
  nowPlaying: service(),
  isLoading: false,
  dailySchedule: null,
  dailyScheduleUpdater: observer('nowPlaying.slug', function() {
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

  async load(date) {
    this.set('isLoading', true)
    this.set('scheduleDate', moment(date).format('YYYY/MMM/DD'));
    let prefetchedSchedule = get(this, 'store').peekRecord('daily-schedule', `${moment(date).format('YYYY/MMM/DD')}-${this.get('nowPlaying.slug')}`)
    if (prefetchedSchedule) {
      this.set('isLoading', false)
      this.set('dailySchedule', prefetchedSchedule);
      return prefetchedSchedule;
    } else {
      let requestUrl = this._scheduleUrlForDate(date);
      return this.getSchedule(requestUrl);
    }
  },

  async getSchedule(requestUrl) {
    debug(`getting schedule ${requestUrl}`);
    let r = await fetch(requestUrl).then(response => response.json())
    return this.processSchedule(r)
  },

  airingAttrsFromEvent(event) {
    let showSlug, showTitle;
    if (event.isObject) {
      var matches = event.show_url.match('shows/(.+)');
      showSlug = matches ? matches[1] : DEFAULTSHOWDICT[this.get('nowPlaying.slug')]
      showTitle = event.show_title;
    }
    else {
      showTitle = DEFAULTSHOWTITLEDICT[this.get('nowPlaying.slug')],
      showSlug = DEFAULTSHOWDICT[this.get('nowPlaying.slug')];
    }

    return {
      id           : `${event.start_timestamp}_${showSlug}`,
      startTime    : event.iso_start_timestamp,
      endTime      : event.iso_end_timestamp,
      title        : showTitle,
      showId       : event.show_id,
      showSlug     : showSlug
    }
  },

  processSchedule(results) {
    var dailySchedule = get(this, 'store').createRecord('daily-schedule', {
      airings: [],
      id: `${this.get('scheduleDate')}-${this.get('nowPlaying.slug')}`
    })

    results.events.map(event => {
      let attrs  = this.airingAttrsFromEvent(event);
      let airing = get(this, 'store').createRecord('airing', attrs);
      event.playlists.forEach(p => p.played.forEach(t => this.processTrack(t, airing)))

      get(this, 'store').findRecord('show', attrs.showSlug).then(show => {
       airing.set('show', show);
      })

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
    let slug  = this.get('nowPlaying.slug');
    let year  = date.format("YYYY");
    let month = date.format('MMM').toLowerCase();
    let day   = date.format('DD');

    let url = `${this.publisherHost}/v1/playlist-daily/${slug}/${year}/${month}/${day}/`;
    return url;
  },

  processTrack(track, airing) {
    let store     = get(this, 'store')
    let trackId   = get(track, 'id');

    if (trackId && !store.peekRecord('track', trackId)) {
      let record = store.createRecord('track', {
        id             : track.id,
        playlistEntryId: track.id,
        catalogEntry   : track.info,
        startTime      : new Date(track.iso_start_time),
        airing         : airing
      });

      return record;
    } else if (trackId) {
      return store.peekRecord('track', trackId);
    } else {
      return null;
    }
  }
});
