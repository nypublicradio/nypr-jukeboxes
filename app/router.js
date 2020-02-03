import Ember from 'ember';
import { inject as service } from '@ember/service';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: service(),

  setTitle(title) {
    this.get('headData').set('title', title);
  },
});

Router.map(function() {
  this.route('listen');
  this.route('playlist-history', { path: 'playlist-history/:year/:month/:day' });
  this.route('playlist-history-today', { path: 'playlist-history'});
  this.route('404', { path: '*' });
});

export default Router;
