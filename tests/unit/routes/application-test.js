import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  test('it identifies a new page view', function(assert) {
    let route = this.owner.lookup('route:application');

    let firstPageViewTransition = {
      to: {
        name: 'listen',
        params: {}
      },
      from: null
    }

    assert.equal(route._isNewPageView(firstPageViewTransition), true);

    let differentRouteTransition = {
      from: {
        name: 'listen',
        params: {}
      },
      to: {
        name: 'playlist-history-today',
        params: {}
      }
    }

    assert.equal(route._isNewPageView(differentRouteTransition), true);

    let differentPathTransition = {
      from: {
        name: 'playlist-history',
        params: { day: "10", month: "02", year: "2020" }
      },
      to: {
        name: 'playlist-history',
        params: { day: "11", month: "02", year: "2020" }
      }
    }

    assert.equal(route._isNewPageView(differentPathTransition), true);

    // no page view should be sent on a route refresh triggered by a push from WOMS

    let womsRefreshListenTransition = {
      from: {
        name: 'listen',
        params: {}
      },
      to: {
        name: 'listen',
        params: {}
      }
    }

    assert.equal(route._isNewPageView(womsRefreshListenTransition), false);

    let womsRefreshPlaylistHistoryTransition = {
      from: {
        name: 'playlist-history',
        params: { day: "11", month: "02", year: "2020" }
      },
      to: {
        name: 'playlist-history',
        params: { day: "11", month: "02", year: "2020" }
      }
    }

    assert.equal(route._isNewPageView(womsRefreshPlaylistHistoryTransition), false);

  });
});
