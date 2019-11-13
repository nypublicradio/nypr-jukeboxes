import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Service | woms', function(hooks) {
  setupTest(hooks);

  test('woms exists', function(assert) {
    let service = this.owner.lookup('service:woms');
    assert.ok(service);
  });

  test('it opens a websocket and configures the handlers', function(assert) {
    let woms = this.owner.lookup('service:woms');
    let socketRef = {
      on: function() {}
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
      reconnect: function() {}
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
      reconnect: function() {}
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
      send: function() {}
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

    woms.socketMessageHandler({
      data: '{"Item": {"metadata": {"mm_ensemble1": "Anima Eterna", "start_time": "2019-11-12 13:38:53.868", "david_guid": "{D29A31C7-CCD1-4065-B630-076E4E12254E}", "album": "Beethoven | Complete Symphonies", "mm_reclabel": "Alpha", "catno": "380", "mm_composer1": "Ludwig van Beethoven", "mm_conductor": "Jos van Immerseel, conductor", "length": "654486", "mm_uid": "152565", "real_start_time": "2019-11-12 13:39:32.551", "title": "The Consecration of the House, Op. 124"}}, "ResponseMetadata": {"RequestId": "F8AK56KLQLSKKKIUSE5ODFA1MVVV4KQNSO5AEMVJF66Q9ASUAAJG", "HTTPStatusCode": 200, "HTTPHeaders": {"server": "Server", "date": "Tue, 12 Nov 2019 18:44:06 GMT", "content-type": "application/x-amz-json-1.0", "content-length": "515", "connection": "keep-alive", "x-amzn-requestid": "F8AK56KLQLSKKKIUSE5ODFA1MVVV4KQNSO5AEMVJF66Q9ASUAAJG", "x-amz-crc32": "4043524355"}, "RetryAttempts": 0}}'
    });

    assert.equal(woms.get('metadata').mm_composer1, 'Ludwig van Beethoven');
    assert.equal(woms.get('metadata').mm_ensemble1, 'Anima Eterna');
    assert.equal(woms.get('metadata').title, 'The Consecration of the House, Op. 124');
    assert.equal(woms.get('metadata').mm_conductor, 'Jos van Immerseel, conductor');
    assert.equal(woms.get('metadata').real_start_time, 1573583972.551);
    assert.equal(woms.get('metadata').start_time, 1573583933.868);
  });
});