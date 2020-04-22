import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  _normalizeResponse(store, primaryModelClass, payload /*, id, requestType, isSingle */) {
    /* 2020-04-21 TODO: we should be able to delete this method entirely after this is fixed: https://jira.wnyc.org/browse/DSODA-375

    This crudely merges incoming (and mostly likely incomplete) records from woms with existing (mostly likely more complete) records we have in the ember-data store from publisher. This prevents the UI from flashing needlessly when records get updated with incorrect data, rendered, corrected, and rendered.

    It works and I hate it. - JK*/

    if (payload && payload.included) {
      payload.included.forEach(record => {
        if (record.type == 'track') {
          let existingTrack = store.peekRecord('track', record.id)
          if (existingTrack) {
            record.attributes.title     = record.attributes.title     || existingTrack.trackTitle;
            record.attributes.composer  = record.attributes.composer  || existingTrack.composerName;
            record.attributes.conductor = record.attributes.conductor || existingTrack.conductorName;
            record.attributes.catno     = record.attributes.catno     || existingTrack.catno;
            record.attributes.album     = record.attributes.album     || existingTrack.albumName;
            record.attributes.ensemble  = record.attributes.ensemble  || existingTrack.ensembleName;
            record.attributes.reclabel  = record.attributes.reclabel  || existingTrack.reclabel;
          }
        }
      })
    }

    return this._normalizeDocumentHelper(payload);
  },

});
