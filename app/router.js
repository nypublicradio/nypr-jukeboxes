import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('listen');
  this.route('playlist-history', { path: 'playlist-history/:year/:month/:day' });
  this.route('playlist-history-today', { path: 'playlist-history'});
});

export default Router;
