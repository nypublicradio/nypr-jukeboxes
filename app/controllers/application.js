import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  dj             : service(),
  hifi           : service(),

  showPlayer: reads('dj.showPlayer'),
  currentStream: reads('model.streams.firstObject')
});
