//copied from new-sounds-web-client
import DS from 'ember-data';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.Model.extend({
  streamMetadata : service(),
  show           : belongsTo({async: false}),
  airing         : belongsTo({async: false}),

  buyLink        : attr(),
  startTime      : attr('string'),
  startTimeTs    : attr('number'),
  groupingKey    : attr('string'),
  catalogEntry   : attr(),
  playlistEntryId: attr('number'),

  artist         : alias('catalogEntry.composer.name'),
  trackLength    : alias('catalogEntry.length'),
  title          : alias('catalogEntry.title'),
  soloists: computed('catalogEntry', function() {
    let soloists = "";
    getWithDefault(this, 'catalogEntry.soloists', []).forEach(function(soloist) {
      soloists += `, ${soloist.musician.name}`;
      if (soloist.instruments.length > 0) {
         soloists += ` (${soloist.instruments[0]})`;
      }
    });

    return soloists;
  }),
  isLive         : computed('streamMetadata.nowPlayingId', 'playlistEntryId', function() {
    return get(this, 'streamMetadata.nowPlayingId') == get(this, 'playlistEntryId');
  }),

  humanTrackLength: computed('trackLength', function() {
    let length = get(this, 'trackLength');

    var hrs = ~~(length / 3600);
    var mins = ~~((length % 3600) / 60);
    var secs = length % 60;

    let parts = []

    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0) parts.push(`${secs}s`);

    return parts.join(" ");
  })
});
