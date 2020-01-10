import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
	fastboot: service(),
	isFastBoot: reads('fastboot.isFastBoot'),
	classNames: ['song-metadata']
});
