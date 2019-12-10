import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import changeGate from 'ember-computed-change-gate/change-gate';

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

  composerName: reads('track.composerName'),
  trackTitle: reads('track.trackTitle'),
  ensembleName: reads('track.ensembleName'),
  conductorName: reads('track.conductorName'),
  trackStartTime: reads('track.startTime'),
  showTitle: reads('stream.currentShow.title'),
  episodeTitle: reads('stream.currentShow.episodeTitle'),
  showHost: reads('stream.currentShow.currentHost'),

  hasCurrentTrack: computed('composerName', 'trackTitle', function() {
    return this.composerName || this.trackTitle;
  }),

  track: null,
  stream: null,

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
    let nowPlaying = await this.store.queryRecord('track', {stream: this.slug});
    this.set('track', nowPlaying);
  },

  handleWomsUpdate: changeGate('woms.lastMessage', function(data) {
    this.processWOMSData(data);
  }),

  processWomsData(data) {
    var modelClass = this.store.modelFor('track');
    var serializer = this.store.serializerFor('track');
    var normalized = serializer.normalizeSingleResponse(this.store, modelClass, {
      data: {
        attributes: data,
        id: 'now-playing',
        type: 'track'
      }
    }, data.id);

    // This will update the existing model if it exists, adds it if it doesn't
    let model = this.store.push(normalized);
    this.nowPlaying.set('track', model);
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
    let show   = await this.store.findRecord('show', stream.currentShow.group_slug);
    this.set('stream', stream);
    this.set('show', show);
    return stream;
  },
});
