import DS from 'ember-data';
const { Model } = DS;
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  airBreak: false,
  currentTrack: belongsTo('track', {async: false}),
  recentTracks: hasMany('tracks', {async: false}),
  show: belongsTo('show'),
  track: belongsTo('track', {async: false})
});
