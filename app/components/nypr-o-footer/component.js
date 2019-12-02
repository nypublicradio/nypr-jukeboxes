import Component from '@ember/component';
import layout from './template';
import config from 'nypr-jukeboxes/config/environment';

export default Component.extend({
  layout,
  tagName: '',
  NEWSLETTER_ENDPOINT: `${config.optInService}/v1/subscribe/mailchimp`,
  NEWSLETTER_PARAMS: {list: config.jukeboxNewsletter}


  // calculatePosition(trigger, content) {
  //   return positionBottomCenter(trigger, content, 5);
  // }
});