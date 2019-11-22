import config from 'ember-get-config';
import DS from 'ember-data';
import rsvp from 'rsvp';
import fetch from 'fetch';
import moment from 'moment';

const json = r => r.json();

export default DS.JSONAPIAdapter.extend({
  host: config.publisherAPI,
  namespace: 'v1',
  findAll() {
    let base = `${this.host}/${this.namespace}`;
    return rsvp.hash({
      streams: fetch(`${base}/list/streams/`).then(json),
      whatsOn: fetch(`${base}/whats_on/`).then(json),
    });
  },
  // BEGIN-SNIPPET stream-find-record
  findRecord(store, type, id/*, snapshot*/) {
    let base = `${this.host}/${this.namespace}`;
    let date = moment.tz(moment(), "America/New_York").format('YYYY/MMM/DD').toLowerCase();
    return rsvp.hash({
      stream: fetch(`${base}/list/streams/${id}/`).then(json),
      whatsOn: fetch(`${base}/whats_on/${id}/3/`).then(json),
      schedule: fetch(`${base}/playlist-daily/${id}/${date}/`).then(json),
    });
  }
  // END-SNIPPET
});
