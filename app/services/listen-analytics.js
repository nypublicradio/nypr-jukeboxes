import ListenAnalyticsService from 'nypr-metrics/services/listen-analytics';
import { inject } from '@ember/service';

export default ListenAnalyticsService.extend({
	dataLayer: inject('data-layer')
});
