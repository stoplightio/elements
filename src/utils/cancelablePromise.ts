/**
 * Give me a promise and I'll let you cancel it
 */
export function cancelablePromise<T = unknown>(promise: Promise<T>) {
  let hasCancelled = false;

  return {
    promise: promise.then(v => {
      if (hasCancelled) {
        throw { isCancelled: true };
      }

      return v;
    }),
    cancel: () => (hasCancelled = true),
  };
}
