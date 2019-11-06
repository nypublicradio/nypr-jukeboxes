import Service from '@ember/service';
import config from '../config/environment';
import { inject as service} from '@ember/service';
import { get } from '@ember/object';

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

  processWOMSData(/*metadata*/) {
    //let composer  = metadata.mm_composer1;
    //let track     = metadata.title;
    //let ensemble  = metadata.mm_ensemble1;
    //let conductor = metadata.mm_conductor;
  },
});
