import Service from '@ember/service';
import config from '../config/environment';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import ENV from '../config/environment';
import { run } from '@ember/runloop';

const isReconnectTimerDisabled = ENV['ember-clock'] && ENV['ember-clock'].disabled;
export default Service.extend({
  womsHost: config.womsAPI,
  store: service(),
  hifi: service(),
  nowPlaying: service(),
  websockets: service(),
  router: service(),
  socketRef: null,
  isConnected: false,
  firstUpdateReceived: false,
  initialRetryAttempted: false,
  lastMessage: null,
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  async initializeWOMS() {
    if (this.isFastBoot) {
      return;
    }
    this.checkConnectionInOneMinute();
    this.connectWOMS();
  },

  async connectWOMS() {
    let response = await this.get('nowPlaying').getStream();
    this.subscribeWOMS(response);
  },

  subscribeWOMS(response) {
    let stream = response.slug;
    this.isConnected = false;

    const socket = this.websockets.socketFor(`${this.womsHost}?stream=${stream}`);

    socket.on('open', this.socketOpenHandler, this);
    socket.on('message', this.socketMessageHandler, this);
    socket.on('close', this.socketClosedHandler, this);

    this.set('socketRef', socket);
  },

  socketOpenHandler(/*event*/) {
    this.socketRef.send({'data': {'stream': 'wqxr'}}, true);
    this.isConnected = true;
    this.initialRetryAttempted = false;
    if (!isReconnectTimerDisabled) {
      run.cancel(this.get('nextCheck'));
      this.set('nextCheck', null);
    }
  },

  socketMessageHandler(event) {
    let data = JSON.parse(event.data);
    // HACK: filter out invalid messages from woms.
    // Real solution should be to remove the duplicate messages
    // https://jira.wnyc.org/browse/DSODA-398

    if (data.mm_uid || data.Item) {
      this.firstUpdateReceived = true;
      this.set('lastMessage', data);
      this.processWomsData(data);
      let owner = getOwner(this);
      let currentRoute = this.router.currentRouteName;
      let route = owner.lookup(`route:${currentRoute}`);
      route.refresh();
    }
  },

  processWomsData(data) {
    var modelClass = this.store.modelFor('whats-on');
    var serializer = this.store.serializerFor('whats-on');

    var normalized = serializer.normalizeSingleResponse(this.store, modelClass, {
      data: {
        attributes: data,
        id: 'whats-on',
        type: 'whats-on'
      }
    }, data.id);

    // This will update the existing model if it exists, adds it if it doesn't
    let model = this.store.push(normalized);
    this.nowPlaying.updateWhatsOn(model);
  },

  socketClosedHandler(/*event*/) {
    this.isConnected = false;

    if (this.socketRef && !this.initialRetryAttempted) {
      this.initalRetryAttempted = true;
      this.socketReconnect();
    } else {
      this.checkConnectionInOneMinute();
    }
  },

  socketReconnect: function() {
    if (this.socketRef) {
      this.socketRef.reconnect();
    } else {
      this.connectWOMS();
    }
  },

  checkConnectionInOneMinute: function() {
    if (!isReconnectTimerDisabled) {
      this.set('nextCheck', run.later(this, this.checkConnection, 60 * 1000));
    }
  },

  checkConnection: function () {
    if (this.isConnected == false) {
      this.socketReconnect();
    }
    this.checkConnectionInOneMinute();
  },

  willDestroy: function() {
    this._super(...arguments);

    this.set('lastMessage', undefined);
    if (this.socketRef) {
      this.socketRef.off('open', this.socketOpenHandler);
      this.socketRef.off('message', this.socketMessageHandler);
      this.socketRef.off('close', this.socketClosedHandler);
    }
  },
});
