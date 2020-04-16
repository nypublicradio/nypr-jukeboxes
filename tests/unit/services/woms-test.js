import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import { getOwner } from '@ember/application';
import moment from 'moment';
import womsDavidSocketResponse from 'nypr-jukeboxes/mirage/responses/woms/david';
module('Unit | Service | woms', function(hooks) {
  setupTest(hooks);

  test('woms exists', function(assert) {
    let service = this.owner.lookup('service:woms');

    let socketRef = {
      off: function() {},
    }

    service.set('socketRef', socketRef);

    assert.ok(service);
  });

  test('it opens a websocket and configures the handlers', function(assert) {
    let woms = this.owner.lookup('service:woms');
    let socketRef = {
      on: function() {},
      off: function() {},
    }
    let originalWebSockets = woms.get('websockets');
    woms.set('websockets', {
      socketFor: function() {
        return socketRef;
      },
    });

    sinon.spy(woms.websockets, "socketFor");
    sinon.spy(socketRef, "on");

    woms.set('socketRef', socketRef);
    woms.set('isConnected', true);

    woms.subscribeWOMS({ slug: 'wqxr' });

    assert.equal(woms.get('isConnected'), false);
    assert.equal(socketRef.on.calledThrice, true);
    assert.equal(woms.websockets.socketFor.calledOnce, true);
    assert.equal(woms.get('socketRef'), socketRef);

    socketRef.on.restore();
    woms.websockets.socketFor.restore();

    woms.set('websockets', originalWebSockets);
  });

  test('it attempts to reconnect to woms backend when the websocket closes', function(assert) {
    let woms = this.owner.lookup('service:woms');
    let socketRef = {
      reconnect: function() {},
      off: function() {},
    }
    sinon.spy(socketRef, "reconnect");

    woms.set('socketRef', socketRef);
    woms.set('isConnected', true);
    woms.set('initialRetryAttempted', false);

    woms.socketClosedHandler();

    assert.equal(woms.get('isConnected'), false);
    assert.equal(socketRef.reconnect.calledOnce, true);

    socketRef.reconnect.restore();
  });

  test('it does not attempt to reconnect to woms backend when the websocket closes if an initial retry has already been attempted', function(assert) {
    let woms = this.owner.lookup('service:woms');
    let socketRef = {
      reconnect: function() {},
      off: function() {},
    }
    sinon.spy(socketRef, "reconnect");

    woms.set('socketRef', socketRef);
    woms.set('isConnected', true);
    woms.set('initialRetryAttempted', true);

    woms.socketClosedHandler();

    assert.equal(woms.get('isConnected'), false);
    assert.equal(socketRef.reconnect.calledOnce, false);

    socketRef.reconnect.restore();
  });

  test('it attempts to reconnect when there is no valid socket reference', function(assert) {
    let woms = this.owner.lookup('service:woms');
    woms.set('isConnected', false);
    sinon.spy(woms, "connectWOMS");

    woms.checkConnection();

    assert.equal(woms.get('isConnected'), false);
    assert.equal(woms.connectWOMS.calledOnce, true);

    woms.connectWOMS.restore();
  });

  test('it sends a config message to woms backend when the websocket opens', function(assert) {
    let woms = this.owner.lookup('service:woms');
    let socketRef = {
      send: function() {},
      off: function() {},
    }
    sinon.spy(socketRef, "send");

    woms.set('socketRef', socketRef);
    woms.set('isConnected', false);
    woms.set('initialRetryAttempted', true);

    woms.socketOpenHandler();

    assert.equal(woms.get('isConnected'), true);
    assert.equal(woms.get('initialRetryAttempted'), false);
    assert.equal(socketRef.send.calledOnce, true);
    assert.equal(socketRef.send.getCall(0).args[0].data.stream, 'wqxr');
    assert.equal(socketRef.send.getCall(0).args[1], true);

    socketRef.send.restore();
  });

  test('it stores current track metadata received from woms backend', function(assert) {
    let woms = this.owner.lookup('service:woms');
    let nowPlaying = this.owner.lookup('service:nowPlaying');

    let socketRef = {
      off: function() {},
    }
    woms.set('router', {
      currentRouteName: 'listen'
    })
    woms.set('socketRef', socketRef);

    let routeStub = {
      refresh: function() {}
    };

    let womsOwner = getOwner(woms);

    let stub = sinon.stub(womsOwner, 'lookup')
    stub.withArgs('route:listen').returns(routeStub);
    stub.callThrough()

    woms.socketMessageHandler({data: JSON.stringify(womsDavidSocketResponse())});

    assert.equal(nowPlaying.composerName, 'Antonin Dvorak');
    assert.equal(nowPlaying.ensembleName, 'Members of the Vienna Philharmonic');
    assert.equal(nowPlaying.trackTitle, 'Serenade in D Minor for Wind Ensemble, Op. 44 (B77)');
    assert.equal(nowPlaying.conductorName, 'Myung-Whun Chung, conductor');
    assert.equal(moment(nowPlaying.trackStartTime).isSame(moment("2020-01-13T18:28:13+00:00"), 'minute'), true);

    womsOwner.lookup.restore();
  });
});
