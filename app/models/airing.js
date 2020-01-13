//copied from new-sounds-web-client
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import moment from 'moment';

export default DS.Model.extend({
  startTime: attr('date'),
  endTime: attr('date'),
  showSlug: attr(),
  showTitle: attr(),
  showId: attr(),
  show: belongsTo({ async: true }),
  playlistDaily: belongsTo({ async: false }),
  // episode: belongsTo('story', { async: false }),
  tracks: hasMany('tracks', { async: false, inverse: 'airing' }),
  isCurrent: computed('clock.second', 'startTime', function() {
    return moment().isAfter(this.startTime);
  }),
  isLive: computed('clock.minute', 'startTime', function() {
    return moment().isBetween(this.startTime, this.endTime);
  })
});
