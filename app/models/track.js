//copied from new-sounds-web-client
import DS from 'ember-data';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.Model.extend({
  playlistHistory : service(),

  trackTitle     : attr(),
  composerName   : attr(),
  ensembleName   : attr(),
  conductorName  : attr(),
  trackLength    : attr(),

  startTime      : attr('date'),

  artist         : alias('composerName'),
  title          : alias('trackTitle'),

  show           : belongsTo({async: false}),
  airing         : belongsTo({async: false}),

  buyLink        : attr(),
  groupingKey    : attr('string'),
  catalogEntry   : attr(),
  playlistEntryId: attr('number'),

  isLive         : computed('playlistHistory.nowPlayingId', 'playlistEntryId', function() {
    return get(this, 'playlistHistory.nowPlayingId') == get(this, 'playlistEntryId');
  }),

  init() {
    if (this.catalogEntry) {
      this.set('ensembleName', get(this.catalogEntry, 'ensemble.name'));
      this.set('composerName', get(this.catalogEntry, 'composer.name'));
      this.set('conductorName', get(this.catalogEntry, 'conductor.name'));
      this.set('trackTitle', get(this.catalogEntry, 'title'));
      this.set('soloists', this.readSoloists(this.catalogEntry));
      this.set('trackLength', get(this.catalogEntry, 'length'));
    }

    this._super(...arguments);
  },

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
  })
});
