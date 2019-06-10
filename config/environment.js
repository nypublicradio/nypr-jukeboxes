/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'nypr-jukeboxes',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    fastboot: {
      hostWhitelist: process.env.HOST_WHITELIST ? process.env.HOST_WHITELIST.split(',') : []
    },
    siteSlug: 'wqxr',
    siteName: 'WQXR',
    siteId: 2,
    clientSlug: 'wqxr_web',
    webRoot: process.env.WQXR_URL,
    adminRoot: process.env.ADMIN_ROOT,
    authAPI: process.env.AUTH_SERVICE,
    membershipAPI: process.env.MEMBERSHIP_SERVICE,
    etagAPI: process.env.ETAG_API,
    publisherAPI: process.env.PUBLISHER_API,
    platformEventsAPI: process.env.PLATFORM_EVENTS_SERVICE
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.publisherAPI = 'http://example.com/api';
    ENV.adminRoot = 'http://admin.example.com';
    ENV.etagAPI = 'http://example.com/api/v1/browser_id/';
    ENV.webRoot = 'http://example.com';
    ENV.authAPI = 'http://example.com';
    ENV.membershipAPI = 'http://example.com';
    ENV.platformEventsAPI = 'http://example.com';
    ENV.fastboot.hostWhitelist = ['/.*/'];
  }

  if (environment === 'production') {

  }

  return ENV;
};
