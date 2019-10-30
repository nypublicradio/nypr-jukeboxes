import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';

export default Controller.extend({
  appController: controller('application'),

  actions: {
    updatePlayerState(state) {
      this.appController.set('showPlayer', state);
    }
  }
});
