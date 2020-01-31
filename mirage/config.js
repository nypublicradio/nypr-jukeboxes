import playlistDailyResponse from './responses/playlist-daily';
import asRest from './responses/woms/as-rest';
import womsSocketResponse from './responses/woms/socket/david';
import whatsOnResponse from './responses/whats-on'
import whatsOnCountResponse from './responses/whats-on-count';
import whatsOnCurrentResponse from './responses/whats-on-current';
import wqxrStreamResponse from './responses/wqxr-stream';
import streamsResponses from './responses/streams';
import annieBergenResponse from './responses/shows-annie-bergen';
import elliottForrestResponse from './responses/shows-elliott-forrest';
import morningsResponse from './responses/shows-morning';

export default function() {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.logging = true;       // print log of intercepted requests in console

  /*------------------------------------------------------------
    legacy (v1) endpoints
  --------------------------------------------------------------*/
  this.get("/api/v1/list/streams", streamsResponses());
  this.get("/api/v1/list/streams/:slug", wqxrStreamResponse());
  this.get("/api/v1/whats_on", whatsOnResponse());
  this.get("/api/v1/whats_on/:slug", whatsOnCurrentResponse());
  this.get("/api/v1/whats_on/:slug/:count/", whatsOnCountResponse());
  this.get("/api/v1/playlist-daily/:slug/:year/:month/:day", playlistDailyResponse());


  // TODO: change this to use factories eventually
  this.get(`/api/v3/shows/:slug/`, morningsResponse());

  this.get("/api/v3/shows/morning", morningsResponse());
  this.get("/api/v3/shows/mornings", morningsResponse());
  this.get("/api/v3/shows/annie-bergen", annieBergenResponse());
  this.get("/api/v3/shows/elliott-forrest", elliottForrestResponse());
  this.get("/api/v3/shows/airing", {}, 404);

  this.get(`/whats-on/v1/whats-on`, asRest(womsSocketResponse()));
  this.get(`http://api.example.com/api/v1/browser_id/`, {success: true});

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */
}
