//copied from new-sounds-web-client
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default DS.Model.extend({
  startTime: attr('date'),
  endTime: attr('date'),
  showSlug: attr(),
  showTitle: attr(),
  showId: attr(),
  show: belongsTo({ async: true, inverse: null }), // not a best practice, but required to get around our wacky apis
  playlistDaily: belongsTo({ async: false }),
  // episode: belongsTo('story', { async: false }),
  tracks: hasMany('tracks', { async: false, inverse: 'airing' }),
  currentTime: new Date(),

  setTime(currentTime) {
    this.set('currentTime', currentTime);
  },
  isLive: computed('currentTime', 'startTime', 'endTime', function() {
    return this.currentTime >= new Date(this.startTime) && this.currentTime <= new Date(this.endTime);
  }),
  isCurrent: computed('isLive', 'currentTime', 'startTime', 'endTime', function() {
    let isPast = this.currentTime > new Date(this.endTime);
    let isFuture = this.currentTime < new Date(this.startTime);
    return this.isLive || isPast || isFuture;
  }),
});


