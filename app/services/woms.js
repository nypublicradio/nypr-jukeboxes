import Service from '@ember/service';
import config from '../config/environment';
import { inject as service} from '@ember/service';
import ENV from '../config/environment';
import { run } from '@ember/runloop';
import moment from "moment";

const isReconnectTimerDisabled = ENV['ember-clock'] && ENV['ember-clock'].disabled;
export default Service.extend({
  womsHost: config.womsAPI,
  store: service(),
  hifi: service(),
  websockets: service(),
  socketRef: null,
  currentStream: service(),
  isConnected: false,
  initialRetryAttempted: false,

  async initializeWOMS() {
    this.checkConnectionInOneMinute();
    this.connectWOMS();
  },

  async connectWOMS() {
    let response = await this.get('currentStream').getStream();
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
      this.processWOMSData(data.Item.metadata);
      this.get('currentStream').refreshStream();
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

  processWOMSData(metadata) {
    if (metadata.real_start_time) {
      // @todo remove this when `real_start_time` becomes a numerical timetamp "YYYY-MM-DD HH:mm:ss.SSS"
      let realStartTime = moment.tz(metadata.real_start_time, "America/New_York");
      if (realStartTime.isValid()) {
        metadata.real_start_time = realStartTime.valueOf() / 1000;
      }
    }

    if (metadata.start_time) {
      let startTime = moment.tz(metadata.start_time, "America/New_York");
      if (startTime.isValid()) {
        metadata.start_time = startTime.valueOf() / 1000;
      }
    }

    this.set('metadata', metadata);
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
