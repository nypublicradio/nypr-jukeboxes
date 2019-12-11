import DS from 'ember-data';
import CachedShoe   from 'ember-cached-shoe'
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(CachedShoe, {
  host: config.womsRestAPI,
  namespace: 'v1',
  pathForType: () => 'whats-on'
});
