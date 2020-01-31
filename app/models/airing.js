//copied from new-sounds-web-client
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

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
  isCurrent: true,
  isLive: false,

  setTime(currentTime) {
    let isLive      = (currentTime >= new Date(this.startTime) && currentTime <= new Date(this.endTime));
    let isCurrent   = isLive || (currentTime > new Date(this.endTime));

    if (isLive != this.isLive) {
      this.set('isLive', isLive);
      this.notifyPropertyChange('isLive');
    }
    if (isCurrent != this.isCurrent) {
      this.set('isCurrent', isCurrent);
      this.notifyPropertyChange('isPast');
    }
  }
});
