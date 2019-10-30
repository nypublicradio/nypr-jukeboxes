import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  appController: controller('application'),
  currentStream  : service(),

  actions: {
    updatePlayerState(state) {
      this.appController.set('showPlayer', state);
    }
  }
});
