declare module 'web-worker:*' {
  // tslint:disable-next-line:interface-name
  declare interface ShimmedWebWorker extends Worker {
    isShim: true;
  }

  declare const WebWorker: {
    prototype: Worker | ShimmedWebWorker;
    new (): Worker | ShimmedWebWorker;
  };

  export default WebWorker;
  export type WebWorker = Worker | ShimmedWebWorker;
}

declare module 'rollup-plugin-web-worker-loader-helper' {
  export declare function createBase64WorkerFactory(base64: string, sourceMap: string | null): string;
}
