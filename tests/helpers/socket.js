import { Server } from 'mock-socket';
import config from '../../config/environment';

export async function setupSockets(hooks) {
  hooks.beforeEach(async function() {
    this.mockSocketServer = new Server(config.womsAPI);
  });

  hooks.afterEach(async function() {
    this.mockSocketServer.stop();
  });
}
