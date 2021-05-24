import { Collection, Direction, KeyboardDelegate, Orientation } from '@react-types/shared';
import { Key } from 'react';
export declare class TabsKeyboardDelegate<T> implements KeyboardDelegate {
    private collection;
    private flipDirection;
    private disabledKeys;
    private orientation;
    constructor(collection: Collection<T>, direction: Direction, orientation: Orientation, disabledKeys?: Set<Key>);
    getKeyLeftOf(key: Key): any;
    getKeyRightOf(key: Key): any;
    getKeyAbove(key: Key): any;
    getKeyBelow(key: Key): any;
    getFirstKey(): Key;
    getLastKey(): Key;
    getNextKey(key: any): any;
    getPreviousKey(key: any): any;
}
