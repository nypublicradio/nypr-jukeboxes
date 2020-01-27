import DataLayerService from 'nypr-metrics/services/data-layer';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default DataLayerService.extend({
  nowPlaying: service(),

  _audioEventForType(soundObject) {
    let event = this._super(...arguments);

    let { contentModelType:type } = get(soundObject, 'metadata');

    if (type != 'stream') {
      return event;
    }

    let owner = getOwner(this);
    let listenController = owner.lookup('controller:listen');
    return Object.assign(event, {
      'whatsOn': get(this.nowPlaying, 'track') !== null ? 1 : 0,
      'playlistPreview': get(listenController, 'recentlyPlayed.length') > 0 ? 1 : 0,
      'composer': get(this.nowPlaying, 'composerName'),
      'hostName': get(this.nowPlaying, 'showHost'),
      'showName': get(this.nowPlaying, 'showTitle'),
      'track': get(this.nowPlaying, 'trackTitle'),
    });
  }
});
