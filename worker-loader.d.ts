declare module 'worker-loader*' {
  declare const WebWorker: {
    prototype: Worker;
    new (): Worker;
  };

  export default WebWorker;
}

