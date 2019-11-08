import Service from '@ember/service';
import config from '../config/environment';
import { inject as service} from '@ember/service';
import moment from 'moment';

export default Service.extend({
  womsHost: config.womsAPI,
  store: service(),
  hifi: service(),
  websockets: service(),
  socketRef: null,
  currentStream: service(),

  async initializeWOMS() {
    let response = await this.get('currentStream').getStream();
    this.subscribeWOMS(response)
  },

  subscribeWOMS(response) {
    let stream = response.slug;
    const socket = this.websockets.socketFor(`${this.womsHost}?stream=${stream}`);

    socket.on('open', this.socketOpenHandler, this);
    socket.on('message', this.socketMessageHandler, this);
    socket.on('close', this.socketClosedHandler, this);

    this.set('socketRef', socket);
  },

  socketOpenHandler(/*event*/) {
    // Runs when the socket is opened
    this.socketRef.send({'data': {'stream': 'wqxr'}}, true);
  },

  socketMessageHandler(event) {
    // Handles incoming messages
    let data = JSON.parse(event.data);
    if (data.Item && data.Item.metadata) {
      this.processWOMSData(data.Item.metadata);
      this.get('currentStream').refreshStream();
    }
  },

  socketClosedHandler(/*event*/) {
    // Runs when the socket is closed
  },

  processWOMSData(metadata) {
    if (metadata.real_start_time) {
      // @todo remove this when `real_start_time` becomes a numerical timetamp "YYYY-MM-DD HH:mm:ss.SSS"
      metadata.real_start_time = moment.tz(metadata.real_start_time, "America/New_York").valueOf() / 1000;
      metadata.start_time = moment.tz(metadata.start_time, "America/New_York").valueOf() / 1000;
    }
    this.set('metadata', metadata);
  },
});
