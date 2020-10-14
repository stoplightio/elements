import * as Y from 'yjs';

function _resolvePathClassic(
  arg: Y.Map<any> | Y.Array<any>,
  partial: string = '',
  top: Y.Map<any> | Y.Array<any>,
): string {
  const parent = arg._item?.parent as Y.AbstractType<any>;
  if (!parent || parent._item?.id === top._item?.id) return partial;

  const joiner = partial === '' ? '' : partial?.[0] === '[' ? '' : '.';
  if (parent instanceof Y.Map) {
    return _resolvePathClassic(parent, arg._item?.parentSub + joiner + partial, top);
  } else if (parent instanceof Y.Array) {
    return _resolvePathClassic(parent, '[]' + joiner + partial, top);
  }
  throw new Error(`resolvePathClassic cannot handle ${parent}`);
}

export function resolvePathClassic(arg: Y.Map<any> | Y.Array<any>, top: Y.Map<any> | Y.Array<any>): string {
  return _resolvePathClassic(arg, '', top);
}

// @ts-ignore
window.resolvePathClassic = resolvePathClassic;
