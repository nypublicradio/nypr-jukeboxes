import config from 'ember-get-config';
import DS from 'ember-data';
import rsvp from 'rsvp';
import fetch from 'fetch';
import CachedShoe   from 'ember-cached-shoe'

const json = r => r.json();

export default DS.JSONAPIAdapter.extend(CachedShoe, {
	host: config.publisherAPI,
  namespace: 'v1',
  findRecord(store, type, id/*, snapshot*/) {
    let base = `${this.host}/${this.namespace}`;
    return rsvp.hash({
      playlistDaily: fetch(`${base}/playlist-daily/${id}/`).then(json),
    });
  }
});
