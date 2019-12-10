//copied from new-sounds-web-client
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed, get } from '@ember/object';
import moment from 'moment';

export default DS.Model.extend({
  startTime: attr('date'),
  endTime: attr('date'),
  showSlug: attr(),
  showId: attr(),
  show: belongsTo({ async: false }),
  episode: belongsTo('story', { async: true }),
  tracks: hasMany(),
  isCurrent: computed('startTime', function() {
    return moment(get(this, 'startTime')).format("X") <= moment().format("X")
  }),
});
