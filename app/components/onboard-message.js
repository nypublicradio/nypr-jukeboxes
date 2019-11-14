import Component from '@ember/component';

export default Component.extend({
	classNames: ['onboard-message'],

	actions: {
    hideOnboardMessage() {
      this.onHideOnboardMessage();
    }
  }
});
