import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

var HOSTDICT = {};
HOSTDICT[config.wqxrURL] = 'wqxr';

export default Service.extend({
  fastboot: service(),
  store:    service(),
  woms:     service(),

  // TODO: onload, this variable infers the slug from the host domain.
  // if we continue with the monorepo implementation, this variable will
  // need to hook into embers location API, so that when the user switches
  // streams, the url updates as well. IE, If the new standards stream is playing,
  // we are on newstandards.org.

  name: reads('stream.name'),
  slug: computed('slugFromHost', 'stream.slug', function() {
    return this.slugFromHost || this.stream.slug;
  }),

  track: null,
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
  showTitle: reads('show.title'),
  episodeTitle: reads('show.episodeTitle'),
  showHost: reads('show.currentHost'),

  show: null,
  showSlug: reads('show.slug'),

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
  },

  async load() {
    let nowPlaying = await this.store.queryRecord('whats-on', {stream: this.slug});
    this.set('track', nowPlaying.tracks.firstObject);
    this.connectTrackAndShow();
  },

  connectTrackAndShow() {
    // This will be obsolted when tracks from woms include show information
    // and we can update the serializer to do this processing
    if (this.track && this.show) {
      if (!this.track.show) {
        this.track.set('show', this.show);
      }
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
      let show   = await this.store.findRecord('show', stream.currentShow.group_slug);
      this.set('show', show);
    } else {
      this.set('show', undefined);
    }
    this.connectTrackAndShow();

    return stream;
  },
});
