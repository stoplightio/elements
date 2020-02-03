import Worker from 'worker-loader?{"fallback":true,"inline":true}!./worker';

export { Worker as ResolverWorker };
