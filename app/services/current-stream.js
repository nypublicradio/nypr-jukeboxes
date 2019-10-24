import Service from '@ember/service';
import { inject as service} from '@ember/service';
import { inject } from '@ember/service';
import config from '../config/environment';
import { observer, get } from '@ember/object';

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
  slugFromHost: null,
  slugUpdater: observer('slugFromHost', 'stream', function() {
    this.set('slug', this.get('stream.slug') ? this.get('stream.slug') : this.get('slugFromHost'))
  }),
  slug: null,

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

  refreshStream() {
    let promise = get(this, 'store').findRecord('stream', this.get('slug'));
    promise.then(stream => {
      this._refreshShow(stream);
    });
    return promise;
  },

  _refreshShow(stream) {
    return get(this, 'store').findRecord('show', stream.currentShow.group_slug).then(show => {
      stream.set('about', show.about);
    })
  }
});
