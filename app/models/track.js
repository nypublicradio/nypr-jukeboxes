//copied from new-sounds-web-client
import DS from 'ember-data';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';
export default DS.Model.extend({
  nowPlaying     : service(),
  trackTitle     : attr(),
  composerName   : attr(),
  ensembleName   : attr(),
  conductorName  : attr(),
  trackLength    : attr(),
  startTime      : attr('date'),
  epochStartTime : attr(),
  reclabel       : attr(),
  artist         : alias('composerName'),
  title          : alias('trackTitle'),
  show           : belongsTo({async: false}),
  airing         : belongsTo('airing', {async: false, inverse: 'tracks'}),

  catalogEntry   : attr(),
  catno          : attr(),
  mmUid          : attr(),
  soloists       : attr(),

  readSoloists: function(catalogEntry) {
    let soloists = "";
    getWithDefault(catalogEntry, 'soloists', []).forEach(function(soloist) {
      soloists += `, ${soloist.musician.name}`;
      if (soloist.instruments.length > 0) {
         soloists += ` (${soloist.instruments[0]})`;
      }
    })

    return soloists;
  },

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
  }),

  isLive: computed('nowPlaying.trackId', function() {
    return this.nowPlaying.trackId === this.id
  })
});
