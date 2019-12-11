import DS from 'ember-data';
const { Model } = DS;
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  tracks: hasMany('tracks', {async: false})
});
