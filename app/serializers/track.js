import DS from 'ember-data';
import { underscore } from '@ember/string';
import { get } from '@ember/object';

export default DS.JSONAPISerializer.extend({
  keyForAttribute:    key => key,
  keyForRelationship: key => underscore(key),
  modelNameFromPayloadKey: () => 'track',

  attrs: {
    trackTitle: 'title',
    composerName: 'mm_composer1',
    ensembleName: 'mm_ensemble1',
    conductorName: 'mm_conductor',
    startTime:'iso_start_time'
  },

  normalizeSingleResponse(store, klass, payload) {
    let womsMetadata = get(payload.data, 'attributes.Item.metadata')
    if (womsMetadata) {
      payload.data.attributes = Object.assign({catalog_entry: {
        catno: womsMetadata.catno
      }}, womsMetadata);
    }
    payload.data.id = 'now-playing';
    return this._super(...arguments);
  }
});
