import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
  });

  test('it should read the `showOnboardMessage` cookie after it is written', function(assert) {
    let controller = this.owner.lookup('controller:application');
    let cookiesService = this.owner.lookup('service:cookies');
    let originalExists = cookiesService.get('exists');
    let originalWrite = cookiesService.get('write');
    cookiesService.set('exists', function() {
      return false;
    });
    cookiesService.set('write', function() {
    });
    assert.equal(controller.get('showOnboardMessage'), true);

    cookiesService.set('exists', function() {
      return true;
    });
    controller.send('hideOnboardMessage');

    assert.equal(controller.get('showOnboardMessage'), false);

    cookiesService.set('exists', originalExists);
    cookiesService.set('write', originalWrite);
  });

  test('it should set the navigation slug', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('setNavSlug', 'a-slug');

    assert.equal(controller.get('navSlug'), 'a-slug');
  });

  test('it should set the navigation slug', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('setNavSlug', 'a-slug');

    assert.equal(controller.get('navSlug'), 'a-slug');
  });

  test('it should set active tab index', function(assert) {
    let controller = this.owner.lookup('controller:application');
    controller.send('setNavSlug', 'playlist-history');
    controller.send('updateNav');

    assert.equal(controller.get('activeTabIndex'), 1);

    controller.send('setNavSlug', 'listen');
    controller.send('updateNav');

    assert.equal(controller.get('activeTabIndex'), 0);
  });
});
