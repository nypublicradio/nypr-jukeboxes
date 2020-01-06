import DS from 'ember-data';
import { underscore } from '@ember/string';

export default DS.JSONAPISerializer.extend({
  keyForAttribute:    key => underscore(key),
  keyForRelationship: key => underscore(key),
});
