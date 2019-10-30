import Service from '@ember/service';
import { inject as service} from '@ember/service';
import { inject } from '@ember/service';
import config from '../config/environment';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

var HOSTDICT = {};
HOSTDICT[config.wqxrURL] = 'wqxr';

export default Service.extend({
  fastboot: inject(),
  store: inject(),
  poll: service(),

  // TODO: onload, this variable infers the slug from the host domain.
  // if we continue with the monorepo implementation, this variable will
  // need to hook into embers location API, so that when the user switches
  // streams, the url updates as well. IE, If the new standards stream is playing,
  // we are on newstandards.org.

  name: reads('stream.name'),
  slug: computed('slugFromHost', 'stream.slug', function() {
    return this.slugFromHost || this.stream.slug;
  }),

  composerName: reads('stream.currentPlaylistItem.catalogEntry.composer.name'),
  trackTitle: reads('stream.currentPlaylistItem.catalogEntry.title'),
  ensembleName: reads('stream.currentPlaylistItem.catalogEntry.ensemble.name'),
  conductorName: reads('stream.currentPlaylistItem.catalogEntry.conductor.name'),
  showTitle: reads('stream.currentShow.title'),
  episodeTitle: reads('stream.currentShow.episodeTitle'),
  showHost: reads('stream.currentShow.currentHost'),

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

  startPolling() {
    let pollFunction = () => this.refreshStream();
    let pollId = this.get('poll').addPoll({interval: 10 * 1000, callback: pollFunction});
    this.set('pollId', pollId);
  },

  async refreshStream() {
    let stream = await this.store.findRecord('stream', this.slug);
    let show   = await this.store.findRecord('show', stream.currentShow.group_slug);
    stream.set('about', show.about);
    this.set('stream', stream);

    return stream;
  },
});
