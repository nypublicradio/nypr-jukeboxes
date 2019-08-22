import Service from '@ember/service';
import { inject } from '@ember/service';
import config from '../config/environment';
import { observer } from '@ember/object';
import DS from 'ember-data';

var HOSTDICT = {};
HOSTDICT[config.wqxrURL] = 'wqxr';

export default Service.extend({
  fastboot: inject(),
  store: inject(),
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
    let promise = this.get('store').findAll('stream').then(s => s.filterBy('slug', slugFromHost))
    this.set('slugFromHost', slugFromHost);
    this.set('slug', slugFromHost);
    this.set('stream', DS.PromiseObject.create({promise}).then(p => {this.set('stream', p[0])}));
  }
});
