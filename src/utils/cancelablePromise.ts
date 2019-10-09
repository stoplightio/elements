/**
 * Give me a promise and I'll let you cancel it!
 *
 * This is useful to prevent setting React state from a resolved promise when a component unmounts.
 */
export function cancelablePromise<T = unknown>(promise: Promise<T>) {
  let hasCanceled = false;

  return {
    promise: promise.then(v => {
      if (hasCanceled) {
        throw { isCanceled: true };
      }

      return v;
    }),
    cancel: () => (hasCanceled = true),
  };
}
