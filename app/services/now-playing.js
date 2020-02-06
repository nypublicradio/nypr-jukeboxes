import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import moment from 'moment';
import { get } from '@ember/object';

var HOSTDICT = {};
HOSTDICT[config.wqxrURL] = 'wqxr';

export default Service.extend({
  fastboot: service(),
  store:    service(),
  woms:     service(),
  clock:    service(),
  poll:     service(),

  // TODO: onload, this variable infers the slug from the host domain.
  // if we continue with the monorepo implementation, this variable will
  // need to hook into embers location API, so that when the user switches
  // streams, the url updates as well. IE, If the new standards stream is playing,
  // we are on newstandards.org.
  slug: computed('slugFromHost', 'stream.slug', {
    get() {
      if (this._slug) {
        return this._slug;
      }
      return this.slugFromHost || this.stream.slug;
    },
    set(k, value) {
      return this._slug = value;
    }
  }),

  name: reads('stream.name'),
  track: reads('whatsOn.tracks.firstObject'),
  trackId: reads('track.id'),
  composerName: reads('track.composerName'),
  trackTitle: reads('track.trackTitle'),
  ensembleName: reads('track.ensembleName'),
  conductorName: reads('track.conductorName'),
  trackStartTime: reads('track.startTime'),
  hasCurrentTrack: computed('composerName', 'trackTitle', function() {
    return this.composerName || this.trackTitle;
  }),

  stream: null,
  show: computed('currentAiring', {
    get() {
      if (this.currentAiring && this.currentAiring.show) {
        return get(this.currentAiring, 'show')
      }
      else {
        return this._show;
      }
    },
    set(k, value) {
      return this._show = value;
    }
  }),
  showSlug: reads('show.slug'),
  showTitle: reads('show.title'),
  episodeTitle: reads('show.episodeTitle'),
  showHost: reads('show.about.people.firstObject.name'),
  whatsOn: null,

  async updateSchedule() {
    let serverDate = moment.tz(new Date(), "America/New_York")

    if (this.lastScheduleDate != serverDate.format('YYYY/MMM/DD')) {
      this.loadSchedule(serverDate)
    }

    // sets isLive and isCurrent on airing models based off the current time
    let airings = this.store.peekAll('airing')
    airings.forEach(a => a.setTime(serverDate.toDate()));

    let airing = airings.find(t => t.get('isLive'))

    if (airing) {
      if (!airing.get('show.title')) {
        // Our api doesn't provide a solid connection between an airing and a show
        let show = this.store.peekRecord('show', airing.showSlug);
        if (!show && !airing.get('triedFetchingShow')) {
          try {
            show = await this.store.findRecord('show', airing.showSlug, { reload: true });
          }
          catch(e) {
            airing.set('triedFetchingShow', true);
          }
        }
        if (show) {
          airing.set('show', show);
          this.set('show', show);
        }
      }

      this.set('currentAiring', airing);
    }
  },

  async loadSchedule(serverDate) {
    await this.store.findRecord('playlist-daily', `wqxr/${serverDate.format('YYYY/MMM/DD').toLowerCase()}`, { reload: true });
    this.set('lastScheduleDate', serverDate.format('YYYY/MMM/DD'));
  },

  init() {
    this._super(...arguments);
    let slugFromHost;
    if (this.get('fastboot.isFastBoot')) {
      slugFromHost = HOSTDICT[this.get('fastboot.request.host')];
    } else {
      slugFromHost = HOSTDICT[window.location.hostname];
    }
    slugFromHost = slugFromHost ? slugFromHost : 'wqxr';
    this.set('slugFromHost', slugFromHost);
    this.set('slug', slugFromHost);

    this.poll.addPoll({
      interval: 5000,
      callback: () => {
        this.updateSchedule()
      },
      label: 'time'
    });

  },

  async load() {
    // load the stream, which will load the current show
    await this.getStream()

    // Load playlist daily to populate schedule models on frontend
    let serverDate = moment.tz(moment(), "America/New_York")
    await this.loadSchedule(serverDate);
    await this.updateSchedule()

    let whatsOn = await this.store.queryRecord('whats-on', {stream: this.slug});
    this.updateWhatsOn(whatsOn);
  },

  updateWhatsOn(whatsOn) {
    // Payload from the whats-on model response.
    this.set('whatsOn', whatsOn);
    this.connectTrackAndShow();
  },

  connectTrackAndShow() {
    // This will be obsoleted when tracks from woms include show information
    // and we can update the serializer to do this processing

    if (this.whatsOn && this.whatsOn.tracks && this.whatsOn.tracks.length > 0 && this.show) {
      this.whatsOn.tracks.forEach(track => {
        if (!track.show) {
          track.set('show', this.show);
        }
      })
    }
  },

  async getStream() {
    if (this.get('stream')) {
      return this.get('stream');
    } else {
      return this.refreshStream();
    }
  },

  async refreshStream() {
    let stream = await this.store.findRecord('stream', this.slug, {reload: true});
    this.set('stream', stream);

    if (stream.currentShow) {
      try {
        let show  = await this.store.findRecord('show', stream.currentShow.group_slug);
        this.set('show', show);
      }
      catch(e) {
        this.set('show', undefined); // 404'd, no show
      }
    } else {
      this.set('show', undefined);
    }
    this.connectTrackAndShow();

    return stream;
  },
});
