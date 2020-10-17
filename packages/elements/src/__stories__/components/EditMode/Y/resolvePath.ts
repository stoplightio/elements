import * as Y from 'yjs';

function _resolvePath(arg: Y.Map<any> | Y.Array<any>, partial: string = '', top: Y.Map<any> | Y.Array<any>): string {
  const parent = arg._item?.parent as Y.AbstractType<any>;
  if (!parent || parent._item?.id === top._item?.id) return partial;

  const joiner = partial === '' ? '' : partial?.[0] === '[' ? '' : '.';
  if (parent instanceof Y.Map) {
    return _resolvePath(parent, arg._item?.parentSub + joiner + partial, top);
  } else if (parent instanceof Y.Array) {
    return _resolvePath(parent, '[]' + joiner + partial, top);
  }
  throw new Error(`resolvePath cannot handle ${parent}`);
}

export function resolvePath(arg: Y.Map<any> | Y.Array<any>, top: Y.Map<any> | Y.Array<any>): string {
  return _resolvePath(arg, '', top);
}

// @ts-ignore
window.resolvePath = resolvePath;
