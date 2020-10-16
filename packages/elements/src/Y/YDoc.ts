import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

export class YDoc {
  public doc: Y.Doc;
  public root: Y.Map<any>;
  public wsProvider: WebsocketProvider;
  public ready: Promise<void>;
  constructor(nodeUri: string) {
    this.doc = new Y.Doc();

    this.root = this.doc.getMap('root');

    this.wsProvider = new WebsocketProvider(
      process.env.NODE_ENV === 'production'
        ? 'wss://demos.yjs.dev' // `${location.protocol === 'http:' ? 'ws' : 'wss'}://${location.host}`
        : 'ws://localhost:1234',
      nodeUri,
      this.doc,
      { connect: false },
    );

    this.ready = new Promise((resolve, reject) => {
      // TODO: Fix this
      setTimeout(resolve, 1000);
      // this.wsProvider.once('sync', () => resolve);
      // TODO: Implement a timeout
    });

    this.wsProvider.connect();
  }
}

// @ts-ignore
window.Y = Y;
