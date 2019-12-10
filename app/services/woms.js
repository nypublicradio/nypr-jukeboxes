import Service from '@ember/service';
import config from '../config/environment';
import { inject as service} from '@ember/service';
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
    run.cancel(this.get('nextCheck'));
    this.set('nextCheck', null);
  },

  socketMessageHandler(event) {
    let data = JSON.parse(event.data);

    if (data.Item && data.Item.metadata) {
      this.firstUpdateReceived = true;
      this.set('lastMessage', data);
    }
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
});
