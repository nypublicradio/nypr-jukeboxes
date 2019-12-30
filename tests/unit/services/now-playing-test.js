import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Service | now-playing', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:now-playing');
    assert.ok(service);
  });

  test('should check for missing currentShow https://jira.wnyc.org/browse/DSODA-336', function(assert) {
    let service = this.owner.lookup('service:now-playing');
    let store = this.owner.lookup('service:store');

    service.set('show', {});

    let stub = sinon.stub(store, 'findRecord')
    stub.withArgs('stream', 'wqxr').returns({});
    stub.callThrough()

    let stream = service.refreshStream();

    stream.then(function() {
      assert.equal(service.get('show'), undefined);
    });
  });
});
