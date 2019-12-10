import DS from 'ember-data';
import config from '../config/environment';
import CachedShoe   from 'ember-cached-shoe'

export default  DS.JSONAPIAdapter.extend(CachedShoe, {
  host: config.womsRestAPI,
  namespace: 'v1',
  pathForType: () => 'whats-on'
});
