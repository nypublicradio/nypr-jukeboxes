import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

var HOSTDICT = {};
HOSTDICT[config.wqxrURL] = 'wqxr';

export default Service.extend({
  fastboot: service(),
  store: service(),
  woms: service(),

  // TODO: onload, this variable infers the slug from the host domain.
  // if we continue with the monorepo implementation, this variable will
  // need to hook into embers location API, so that when the user switches
  // streams, the url updates as well. IE, If the new standards stream is playing,
  // we are on newstandards.org.

  name: reads('stream.name'),
  slug: computed('slugFromHost', 'stream.slug', function() {
    return this.slugFromHost || this.stream.slug;
  }),

  composerName: reads('woms.metadata.mm_composer1'),
  trackTitle: reads('woms.metadata.title'),
  ensembleName: reads('woms.metadata.mm_ensemble1'),
  conductorName: reads('woms.metadata.mm_conductor'),
  trackStartTimeTs: reads('woms.metadata.real_start_time'),
  showTitle: reads('stream.currentShow.title'),
  episodeTitle: reads('stream.currentShow.episodeTitle'),
  showHost: reads('stream.currentShow.currentHost'),

  hasCurrentTrack: computed('composerName', 'trackTitle', function() {
    return this.composerName || this.trackTitle;
  }),

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
    stream.set('about', show.about);
    stream.set('contactEmail', show.contactEmail);
    this.set('stream', stream);

    return stream;
  },
});
