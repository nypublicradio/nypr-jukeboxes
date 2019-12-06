import config from 'ember-get-config';
import DS from 'ember-data';
import rsvp from 'rsvp';
import fetch from 'fetch';

const json = r => r.json();

export default DS.JSONAPIAdapter.extend({
	host: config.publisherAPI,
  namespace: 'v1',
	// BEGIN-SNIPPET playlist-daily-find-record
  findRecord(store, type, id/*, snapshot*/) {
    let base = `${this.host}/${this.namespace}`;
    return rsvp.hash({
      playlistDaily: fetch(`${base}/playlist-daily/${id}/`).then(json),
    });
  }
  // END-SNIPPET
});
