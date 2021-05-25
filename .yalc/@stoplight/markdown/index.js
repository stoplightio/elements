'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('@stoplight/types');
var Yaml = require('@stoplight/yaml');
var require$$0$1 = require('path');
var require$$0$2 = require('mdast-util-to-markdown');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var types__namespace = /*#__PURE__*/_interopNamespace(types);
var Yaml__namespace = /*#__PURE__*/_interopNamespace(Yaml);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);

var hast = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var mdast = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$6 = Array.isArray;

var isArray_1 = isArray$6;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$5 = freeGlobal || freeSelf || Function('return this')();

var _root = root$5;

var root$4 = _root;

/** Built-in value references. */
var Symbol$5 = root$4.Symbol;

var _Symbol = Symbol$5;

var Symbol$4 = _Symbol;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$6.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$6.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$4 ? Symbol$4.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$7.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$5.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$3 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$4(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$4;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$4(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$4;

var baseGetTag$3 = _baseGetTag,
    isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$6(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$3(value) && baseGetTag$3(value) == symbolTag);
}

var isSymbol_1 = isSymbol$6;

var isArray$5 = isArray_1,
    isSymbol$5 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$1(value, object) {
  if (isArray$5(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$5(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey$1;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$5(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$5;

var baseGetTag$2 = _baseGetTag,
    isObject$4 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  if (!isObject$4(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$2(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$1;

var root$3 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$3['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$1;

var isFunction = isFunction_1,
    isMasked = _isMasked,
    isObject$3 = isObject_1,
    toSource = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$4 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$4.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$6).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$3(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$3(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$3;

var getNative$2 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$2(Object, 'create');

var _nativeCreate = nativeCreate$4;

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$2.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$2(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$2;

var eq$1 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto$1 = Array.prototype;

/** Built-in value references. */
var splice$4 = arrayProto$1.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$4.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear;
ListCache$1.prototype['delete'] = listCacheDelete;
ListCache$1.prototype.get = listCacheGet;
ListCache$1.prototype.has = listCacheHas;
ListCache$1.prototype.set = listCacheSet;

var _ListCache = ListCache$1;

var getNative$1 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Map$2 = getNative$1(root$2, 'Map');

var _Map = Map$2;

var Hash = _Hash,
    ListCache = _ListCache,
    Map$1 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var MapCache = _MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache;

var memoize_1 = memoize$1;

var memoize = memoize_1;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

var memoizeCapped = _memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$2 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath$2;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap$3(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$3;

var Symbol$2 = _Symbol,
    arrayMap$2 = _arrayMap,
    isArray$4 = isArray_1,
    isSymbol$4 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$2(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$4(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap$2(value, baseToString$2) + '';
  }
  if (isSymbol$4(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

var _baseToString = baseToString$2;

var baseToString$1 = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$7(value) {
  return value == null ? '' : baseToString$1(value);
}

var toString_1 = toString$7;

var isArray$3 = isArray_1,
    isKey = _isKey,
    stringToPath$1 = _stringToPath,
    toString$6 = toString_1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$3(value, object) {
  if (isArray$3(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString$6(value));
}

var _castPath = castPath$3;

var isSymbol$3 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$4(value) {
  if (typeof value == 'string' || isSymbol$3(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey$4;

var castPath$2 = _castPath,
    toKey$3 = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$2(object, path) {
  path = castPath$2(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey$3(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet$2;

var baseGet$1 = _baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet$1(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$1;

var get = get_1;

/**
 * The base implementation of `_.at` without support for individual paths.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {string[]} paths The property paths to pick.
 * @returns {Array} Returns the picked elements.
 */
function baseAt$1(object, paths) {
  var index = -1,
      length = paths.length,
      result = Array(length),
      skip = object == null;

  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index]);
  }
  return result;
}

var _baseAt = baseAt$1;

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */

function last$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var last_1 = last$1;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */

function baseSlice$2(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var _baseSlice = baseSlice$2;

var baseGet = _baseGet,
    baseSlice$1 = _baseSlice;

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent$2(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice$1(path, 0, -1));
}

var _parent = parent$2;

var castPath$1 = _castPath,
    last = last_1,
    parent$1 = _parent,
    toKey$2 = _toKey;

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset$2(object, path) {
  path = castPath$1(path, object);
  object = parent$1(object, path);
  return object == null || delete object[toKey$2(last(path))];
}

var _baseUnset = baseUnset$2;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$3(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$3;

var baseUnset$1 = _baseUnset,
    isIndex$2 = _isIndex;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice$3 = arrayProto.splice;

/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt$1(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex$2(index)) {
        splice$3.call(array, index, 1);
      } else {
        baseUnset$1(array, index);
      }
    }
  }
  return array;
}

var _basePullAt = basePullAt$1;

var isSymbol$2 = isSymbol_1;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending$1(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol$2(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol$2(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

var _compareAscending = compareAscending$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$1(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$1;

var baseGetTag$1 = _baseGetTag,
    isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$2(value) && baseGetTag$1(value) == argsTag;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$1 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$1.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$3.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments$1;

var Symbol$1 = _Symbol,
    isArguments = isArguments_1,
    isArray$2 = isArray_1;

/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable$1(value) {
  return isArray$2(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable$1;

var arrayPush = _arrayPush,
    isFlattenable = _isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten$1;

var baseFlatten = _baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

var flatten_1 = flatten$1;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$1(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$1;

var getNative = _getNative;

var defineProperty$3 = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$3;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$1(value) {
  return value;
}

var identity_1 = identity$1;

var constant = constant_1,
    defineProperty$2 = _defineProperty,
    identity = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty$2 ? identity : function(func, string) {
  return defineProperty$2(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var flatten = flatten_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest$1(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

var _flatRest = flatRest$1;

var arrayMap$1 = _arrayMap,
    baseAt = _baseAt,
    basePullAt = _basePullAt,
    compareAscending = _compareAscending,
    flatRest = _flatRest,
    isIndex$1 = _isIndex;

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = ['a', 'b', 'c', 'd'];
 * var pulled = _.pullAt(array, [1, 3]);
 *
 * console.log(array);
 * // => ['a', 'c']
 *
 * console.log(pulled);
 * // => ['b', 'd']
 */
var pullAt = flatRest(function(array, indexes) {
  var length = array == null ? 0 : array.length,
      result = baseAt(array, indexes);

  basePullAt(array, arrayMap$1(indexes, function(index) {
    return isIndex$1(index, length) ? +index : index;
  }).sort(compareAscending));

  return result;
});

var pullAt_1 = pullAt;

var defineProperty$1 = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$1(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$1;

var baseAssignValue = _baseAssignValue,
    eq = eq_1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$2.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue$1;

var assignValue = _assignValue,
    castPath = _castPath,
    isIndex = _isIndex,
    isObject$2 = isObject_1,
    toKey$1 = _toKey;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet$1(object, path, value, customizer) {
  if (!isObject$2(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey$1(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject$2(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

var _baseSet = baseSet$1;

var baseSet = _baseSet;

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

var set_1 = set;

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$1(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$1;

var arrayMap = _arrayMap,
    copyArray = _copyArray,
    isArray$1 = isArray_1,
    isSymbol$1 = isSymbol_1,
    stringToPath = _stringToPath,
    toKey = _toKey,
    toString$5 = toString_1;

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray$1(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol$1(value) ? [value] : copyArray(stringToPath(toString$5(value)));
}

var toPath_1 = toPath;

var baseUnset = _baseUnset;

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

var unset_1 = unset;

var format = {exports: {}};

(function (module) {
(function() {

  //// Export the API
  var namespace;

  // CommonJS / Node module
  {
    namespace = module.exports = format;
  }

  namespace.format = format;
  namespace.vsprintf = vsprintf;

  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    namespace.printf = printf;
  }

  function printf(/* ... */) {
    console.log(format.apply(null, arguments));
  }

  function vsprintf(fmt, replacements) {
    return format.apply(null, [fmt].concat(replacements));
  }

  function format(fmt) {
    var argIndex = 1 // skip initial format argument
      , args = [].slice.call(arguments)
      , i = 0
      , n = fmt.length
      , result = ''
      , c
      , escaped = false
      , arg
      , tmp
      , leadingZero = false
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
          var digits = '';
          while (/\d/.test(fmt[i])) {
            digits += fmt[i++];
            c = fmt[i];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        }
      ;
    for (; i < n; ++i) {
      c = fmt[i];
      if (escaped) {
        escaped = false;
        if (c == '.') {
          leadingZero = false;
          c = fmt[++i];
        }
        else if (c == '0' && fmt[i + 1] == '.') {
          leadingZero = true;
          i += 2;
          c = fmt[i];
        }
        else {
          leadingZero = true;
        }
        precision = slurpNumber();
        switch (c) {
        case 'b': // number in binary
          result += parseInt(nextArg(), 10).toString(2);
          break;
        case 'c': // character
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String)
            result += arg;
          else
            result += String.fromCharCode(parseInt(arg, 10));
          break;
        case 'd': // number in decimal
          result += parseInt(nextArg(), 10);
          break;
        case 'f': // floating point number
          tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
          result += leadingZero ? tmp : tmp.replace(/^0/, '');
          break;
        case 'j': // JSON
          result += JSON.stringify(nextArg());
          break;
        case 'o': // number in octal
          result += '0' + parseInt(nextArg(), 10).toString(8);
          break;
        case 's': // string
          result += nextArg();
          break;
        case 'x': // lowercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16);
          break;
        case 'X': // uppercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
          break;
        default:
          result += c;
          break;
        }
      } else if (c === '%') {
        escaped = true;
      } else {
        result += c;
      }
    }
    return result;
  }

}());
}(format));

var formatter = format.exports;

var fault$1 = create$3(Error);

var fault_1 = fault$1;

fault$1.eval = create$3(EvalError);
fault$1.range = create$3(RangeError);
fault$1.reference = create$3(ReferenceError);
fault$1.syntax = create$3(SyntaxError);
fault$1.type = create$3(TypeError);
fault$1.uri = create$3(URIError);

fault$1.create = create$3;

// Create a new `EConstructor`, with the formatted `format` as a first argument.
function create$3(EConstructor) {
  FormattedError.displayName = EConstructor.displayName || EConstructor.name;

  return FormattedError

  function FormattedError(format) {
    if (format) {
      format = formatter.apply(null, arguments);
    }

    return new EConstructor(format)
  }
}

var matters_1 = matters$3;

var fault = fault_1;

var own$a = {}.hasOwnProperty;

var markers = {yaml: '-', toml: '+'};

function matters$3(options) {
  var settings = options || 'yaml';
  var results = [];
  var index = -1;
  var length;

  // One preset or matter.
  if (typeof settings === 'string' || !('length' in settings)) {
    settings = [settings];
  }

  length = settings.length;

  while (++index < length) {
    results[index] = matter(settings[index]);
  }

  return results
}

function matter(option) {
  var result = option;

  if (typeof result === 'string') {
    if (!own$a.call(markers, result)) {
      throw fault('Missing matter definition for `%s`', result)
    }

    result = {type: result, marker: markers[result]};
  } else if (typeof result !== 'object') {
    throw fault('Expected matter to be an object, not `%j`', result)
  }

  if (!own$a.call(result, 'type')) {
    throw fault('Missing `type` in matter `%j`', result)
  }

  if (!own$a.call(result, 'fence') && !own$a.call(result, 'marker')) {
    throw fault('Missing `marker` or `fence` in matter `%j`', result)
  }

  return result
}

var syntax$6 = create$2;

var matters$2 = matters_1;

function create$2(options) {
  var settings = matters$2(options);
  var length = settings.length;
  var index = -1;
  var flow = {};
  var matter;
  var code;

  while (++index < length) {
    matter = settings[index];
    code = fence$1(matter, 'open').charCodeAt(0);
    if (code in flow) {
      flow[code].push(parse$8(matter));
    } else {
      flow[code] = [parse$8(matter)];
    }
  }

  return {flow: flow}
}

function parse$8(matter) {
  var name = matter.type;
  var anywhere = matter.anywhere;
  var valueType = name + 'Value';
  var fenceType = name + 'Fence';
  var sequenceType = fenceType + 'Sequence';
  var fenceConstruct = {tokenize: tokenizeFence, partial: true};
  var buffer;

  return {tokenize: tokenizeFrontmatter, concrete: true}

  function tokenizeFrontmatter(effects, ok, nok) {
    var self = this;

    return start

    function start(code) {
      var position = self.now();

      if (position.column !== 1 || (!anywhere && position.line !== 1)) {
        return nok(code)
      }

      effects.enter(name);
      buffer = fence$1(matter, 'open');
      return effects.attempt(fenceConstruct, afterOpeningFence, nok)(code)
    }

    function afterOpeningFence(code) {
      buffer = fence$1(matter, 'close');
      return lineEnd(code)
    }

    function lineStart(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        return lineEnd(code)
      }

      effects.enter(valueType);
      return lineData(code)
    }

    function lineData(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        effects.exit(valueType);
        return lineEnd(code)
      }

      effects.consume(code);
      return lineData
    }

    function lineEnd(code) {
      // Require a closing fence.
      if (code === null) {
        return nok(code)
      }

      // Can only be an eol.
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return effects.attempt(fenceConstruct, after, lineStart)
    }

    function after(code) {
      effects.exit(name);
      return ok(code)
    }
  }

  function tokenizeFence(effects, ok, nok) {
    var bufferIndex = 0;

    return start

    function start(code) {
      if (code === buffer.charCodeAt(bufferIndex)) {
        effects.enter(fenceType);
        effects.enter(sequenceType);
        return insideSequence(code)
      }

      return nok(code)
    }

    function insideSequence(code) {
      if (bufferIndex === buffer.length) {
        effects.exit(sequenceType);

        if (code === -2 || code === -1 || code === 32) {
          effects.enter('whitespace');
          return insideWhitespace(code)
        }

        return fenceEnd(code)
      }

      if (code === buffer.charCodeAt(bufferIndex)) {
        effects.consume(code);
        bufferIndex++;
        return insideSequence
      }

      return nok(code)
    }

    function insideWhitespace(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code);
        return insideWhitespace
      }

      effects.exit('whitespace');
      return fenceEnd(code)
    }

    function fenceEnd(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        effects.exit(fenceType);
        return ok(code)
      }

      return nok(code)
    }
  }
}

function fence$1(matter, prop) {
  var marker;

  if (matter.marker) {
    marker = pick$1(matter.marker, prop);
    return marker + marker + marker
  }

  return pick$1(matter.fence, prop)
}

function pick$1(schema, prop) {
  return typeof schema === 'string' ? schema : schema[prop]
}

var micromarkExtensionFrontmatter = syntax$6;

var fromMarkdown$9 = createFromMarkdown;

var matters$1 = matters_1;

function createFromMarkdown(options) {
  var settings = matters$1(options);
  var length = settings.length;
  var index = -1;
  var enter = {};
  var exit = {};
  var matter;

  while (++index < length) {
    matter = settings[index];
    enter[matter.type] = opener(matter);
    exit[matter.type] = close;
    exit[matter.type + 'Value'] = value;
  }

  return {enter: enter, exit: exit}
}

function opener(matter) {
  return open
  function open(token) {
    this.enter({type: matter.type, value: ''}, token);
    this.buffer();
  }
}

function close(token) {
  var data = this.resume();
  // Remove the initial and final eol.
  this.exit(token).value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
}

function value(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}

var toMarkdown$8 = createToMarkdown;

var matters = matters_1;

function createToMarkdown(options) {
  var unsafe = [];
  var handlers = {};
  var settings = matters(options);
  var length = settings.length;
  var index = -1;
  var matter;

  while (++index < length) {
    matter = settings[index];
    handlers[matter.type] = handler(matter);
    unsafe.push({atBreak: true, character: fence(matter, 'open').charAt(0)});
  }

  return {unsafe: unsafe, handlers: handlers}
}

function handler(matter) {
  var open = fence(matter, 'open');
  var close = fence(matter, 'close');

  return handle

  function handle(node) {
    return open + (node.value ? '\n' + node.value : '') + '\n' + close
  }
}

function fence(matter, prop) {
  var marker;

  if (matter.marker) {
    marker = pick(matter.marker, prop);
    return marker + marker + marker
  }

  return pick(matter.fence, prop)
}

function pick(schema, prop) {
  return typeof schema === 'string' ? schema : schema[prop]
}

var syntax$5 = micromarkExtensionFrontmatter;
var fromMarkdown$8 = fromMarkdown$9;
var toMarkdown$7 = toMarkdown$8;

var remarkFrontmatter = frontmatter;

function frontmatter(options) {
  var data = this.data();
  add('micromarkExtensions', syntax$5(options));
  add('fromMarkdownExtensions', fromMarkdown$8(options));
  add('toMarkdownExtensions', toMarkdown$7(options));
  function add(field, value) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) data[field].push(value);
    else data[field] = [value];
  }
}

var own$9 = {}.hasOwnProperty;

var hasOwnProperty$1 = own$9;

var splice$2 = [].splice;

var splice_1 = splice$2;

var splice$1 = splice_1;

// causes a stack overflow in V8 when trying to insert 100k items for instance.

function chunkedSplice$9(list, start, remove, items) {
  var end = list.length;
  var chunkStart = 0;
  var parameters; // Make start between zero and `end` (included).

  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }

  remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

  if (items.length < 10000) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    splice$1.apply(list, parameters);
  } else {
    // Delete `remove` items starting from `start`
    if (remove) splice$1.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 10000);
      parameters.unshift(start, 0);
      splice$1.apply(list, parameters);
      chunkStart += 10000;
      start += 10000;
    }
  }
}

var chunkedSplice_1 = chunkedSplice$9;

function miniflat$3(value) {
  return value === null || value === undefined
    ? []
    : 'length' in value
    ? value
    : [value]
}

var miniflat_1 = miniflat$3;

var hasOwnProperty = hasOwnProperty$1;
var chunkedSplice$8 = chunkedSplice_1;
var miniflat$2 = miniflat_1;

function combineExtensions$1(extensions) {
  var all = {};
  var index = -1;

  while (++index < extensions.length) {
    extension$2(all, extensions[index]);
  }

  return all
}

function extension$2(all, extension) {
  var hook;
  var left;
  var right;
  var code;

  for (hook in extension) {
    left = hasOwnProperty.call(all, hook) ? all[hook] : (all[hook] = {});
    right = extension[hook];

    for (code in right) {
      left[code] = constructs$2(
        miniflat$2(right[code]),
        hasOwnProperty.call(left, code) ? left[code] : []
      );
    }
  }
}

function constructs$2(list, existing) {
  var index = -1;
  var before = [];

  while (++index < list.length) {
(list[index].add === 'after' ? existing : before).push(list[index]);
  }

  chunkedSplice$8(existing, 0, 0, before);
  return existing
}

var combineExtensions_1 = combineExtensions$1;

var syntax$4 = {};

var fromCharCode$4 = String.fromCharCode;

var fromCharCode_1 = fromCharCode$4;

var fromCharCode$3 = fromCharCode_1;

function regexCheck$8(regex) {
  return check

  function check(code) {
    return regex.test(fromCharCode$3(code))
  }
}

var regexCheck_1 = regexCheck$8;

var regexCheck$7 = regexCheck_1;

var asciiAlpha$4 = regexCheck$7(/[A-Za-z]/);

var asciiAlpha_1 = asciiAlpha$4;

var regexCheck$6 = regexCheck_1;

var asciiAlphanumeric$5 = regexCheck$6(/[\dA-Za-z]/);

var asciiAlphanumeric_1 = asciiAlphanumeric$5;

// Note: EOF is seen as ASCII control here, because `null < 32 == true`.
function asciiControl$3(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code < 32 || code === 127
  )
}

var asciiControl_1 = asciiControl$3;

function markdownLineEnding$k(code) {
  return code < -2
}

var markdownLineEnding_1 = markdownLineEnding$k;

// This module is generated by `script/`.
//
// CommonMark handles attention (emphasis, strong) markers based on what comes
// before or after them.
// One such difference is if those characters are Unicode punctuation.
// This script is generated from the Unicode data.
var unicodePunctuation$4 = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

var unicodePunctuationRegex$1 = unicodePunctuation$4;

var unicodePunctuationRegex = unicodePunctuationRegex$1;
var regexCheck$5 = regexCheck_1;

// In fact adds to the bundle size.

var unicodePunctuation$3 = regexCheck$5(unicodePunctuationRegex);

var unicodePunctuation_1 = unicodePunctuation$3;

var regexCheck$4 = regexCheck_1;

var unicodeWhitespace$3 = regexCheck$4(/\s/);

var unicodeWhitespace_1 = unicodeWhitespace$3;

var asciiAlpha$3 = asciiAlpha_1;
var asciiAlphanumeric$4 = asciiAlphanumeric_1;
var asciiControl$2 = asciiControl_1;
var markdownLineEnding$j = markdownLineEnding_1;
var unicodePunctuation$2 = unicodePunctuation_1;
var unicodeWhitespace$2 = unicodeWhitespace_1;

var www = {tokenize: tokenizeWww, partial: true};
var domain = {tokenize: tokenizeDomain, partial: true};
var path = {tokenize: tokenizePath, partial: true};
var punctuation = {tokenize: tokenizePunctuation, partial: true};
var namedCharacterReference = {
  tokenize: tokenizeNamedCharacterReference,
  partial: true
};

var wwwAutolink = {tokenize: tokenizeWwwAutolink, previous: previousWww};
var httpAutolink = {tokenize: tokenizeHttpAutolink, previous: previousHttp};
var emailAutolink = {tokenize: tokenizeEmailAutolink, previous: previousEmail};

var text$5 = {};

// Export hooked constructs.
syntax$4.text = text$5;

// `0`
var code$1 = 48;

// While the code is smaller than `{`.
while (code$1 < 123) {
  text$5[code$1] = emailAutolink;
  code$1++;
  // Jump from `:` -> `A`
  if (code$1 === 58) code$1 = 65;
  // Jump from `[` -> `a`
  else if (code$1 === 91) code$1 = 97;
}

// `+`
text$5[43] = emailAutolink;
// `-`
text$5[45] = emailAutolink;
// `.`
text$5[46] = emailAutolink;
// `_`
text$5[95] = emailAutolink;
// `h`.
text$5[72] = [emailAutolink, httpAutolink];
text$5[104] = [emailAutolink, httpAutolink];
// `w`.
text$5[87] = [emailAutolink, wwwAutolink];
text$5[119] = [emailAutolink, wwwAutolink];

function tokenizeEmailAutolink(effects, ok, nok) {
  var self = this;
  var hasDot;

  return start

  function start(code) {
    /* istanbul ignore next - hooks. */
    if (
      !gfmAtext(code) ||
      !previousEmail(self.previous) ||
      previous$2(self.events)
    ) {
      return nok(code)
    }

    effects.enter('literalAutolink');
    effects.enter('literalAutolinkEmail');
    return atext(code)
  }

  function atext(code) {
    if (gfmAtext(code)) {
      effects.consume(code);
      return atext
    }

    // `@`
    if (code === 64) {
      effects.consume(code);
      return label
    }

    return nok(code)
  }

  function label(code) {
    // `.`
    if (code === 46) {
      return effects.check(punctuation, done, dotContinuation)(code)
    }

    if (
      // `-`
      code === 45 ||
      // `_`
      code === 95
    ) {
      return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code)
    }

    if (asciiAlphanumeric$4(code)) {
      effects.consume(code);
      return label
    }

    return done(code)
  }

  function dotContinuation(code) {
    effects.consume(code);
    hasDot = true;
    return label
  }

  function dashOrUnderscoreContinuation(code) {
    effects.consume(code);
    return afterDashOrUnderscore
  }

  function afterDashOrUnderscore(code) {
    // `.`
    if (code === 46) {
      return effects.check(punctuation, nok, dotContinuation)(code)
    }

    return label(code)
  }

  function done(code) {
    if (hasDot) {
      effects.exit('literalAutolinkEmail');
      effects.exit('literalAutolink');
      return ok(code)
    }

    return nok(code)
  }
}

function tokenizeWwwAutolink(effects, ok, nok) {
  var self = this;

  return start

  function start(code) {
    /* istanbul ignore next - hooks. */
    if (
      (code !== 87 && code - 32 !== 87) ||
      !previousWww(self.previous) ||
      previous$2(self.events)
    ) {
      return nok(code)
    }

    effects.enter('literalAutolink');
    effects.enter('literalAutolinkWww');
    // For `www.` we check instead of attempt, because when it matches, GH
    // treats it as part of a domain (yes, it says a valid domain must come
    // after `www.`, but that’s not how it’s implemented by them).
    return effects.check(
      www,
      effects.attempt(domain, effects.attempt(path, done), nok),
      nok
    )(code)
  }

  function done(code) {
    effects.exit('literalAutolinkWww');
    effects.exit('literalAutolink');
    return ok(code)
  }
}

function tokenizeHttpAutolink(effects, ok, nok) {
  var self = this;

  return start

  function start(code) {
    /* istanbul ignore next - hooks. */
    if (
      (code !== 72 && code - 32 !== 72) ||
      !previousHttp(self.previous) ||
      previous$2(self.events)
    ) {
      return nok(code)
    }

    effects.enter('literalAutolink');
    effects.enter('literalAutolinkHttp');
    effects.consume(code);
    return t1
  }

  function t1(code) {
    // `t`
    if (code === 84 || code - 32 === 84) {
      effects.consume(code);
      return t2
    }

    return nok(code)
  }

  function t2(code) {
    // `t`
    if (code === 84 || code - 32 === 84) {
      effects.consume(code);
      return p
    }

    return nok(code)
  }

  function p(code) {
    // `p`
    if (code === 80 || code - 32 === 80) {
      effects.consume(code);
      return s
    }

    return nok(code)
  }

  function s(code) {
    // `s`
    if (code === 83 || code - 32 === 83) {
      effects.consume(code);
      return colon
    }

    return colon(code)
  }

  function colon(code) {
    // `:`
    if (code === 58) {
      effects.consume(code);
      return slash1
    }

    return nok(code)
  }

  function slash1(code) {
    // `/`
    if (code === 47) {
      effects.consume(code);
      return slash2
    }

    return nok(code)
  }

  function slash2(code) {
    // `/`
    if (code === 47) {
      effects.consume(code);
      return after
    }

    return nok(code)
  }

  function after(code) {
    return asciiControl$2(code) ||
      unicodeWhitespace$2(code) ||
      unicodePunctuation$2(code)
      ? nok(code)
      : effects.attempt(domain, effects.attempt(path, done), nok)(code)
  }

  function done(code) {
    effects.exit('literalAutolinkHttp');
    effects.exit('literalAutolink');
    return ok(code)
  }
}

function tokenizeWww(effects, ok, nok) {
  return start

  function start(code) {
    // Assume a `w`.
    effects.consume(code);
    return w2
  }

  function w2(code) {
    // `w`
    if (code === 87 || code - 32 === 87) {
      effects.consume(code);
      return w3
    }

    return nok(code)
  }

  function w3(code) {
    // `w`
    if (code === 87 || code - 32 === 87) {
      effects.consume(code);
      return dot
    }

    return nok(code)
  }

  function dot(code) {
    // `.`
    if (code === 46) {
      effects.consume(code);
      return after
    }

    return nok(code)
  }

  function after(code) {
    return code === null || markdownLineEnding$j(code) ? nok(code) : ok(code)
  }
}

function tokenizeDomain(effects, ok, nok) {
  var hasUnderscoreInLastSegment;
  var hasUnderscoreInLastLastSegment;

  return domain

  function domain(code) {
    // `&`
    if (code === 38) {
      return effects.check(
        namedCharacterReference,
        done,
        punctuationContinuation
      )(code)
    }

    if (code === 46 /* `.` */ || code === 95 /* `_` */) {
      return effects.check(punctuation, done, punctuationContinuation)(code)
    }

    // GH documents that only alphanumerics (other than `-`, `.`, and `_`) can
    // occur, which sounds like ASCII only, but they also support `www.點看.com`,
    // so that’s Unicode.
    // Instead of some new production for Unicode alphanumerics, markdown
    // already has that for Unicode punctuation and whitespace, so use those.
    if (
      asciiControl$2(code) ||
      unicodeWhitespace$2(code) ||
      (code !== 45 /* `-` */ && unicodePunctuation$2(code))
    ) {
      return done(code)
    }

    effects.consume(code);
    return domain
  }

  function punctuationContinuation(code) {
    // `.`
    if (code === 46) {
      hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
      hasUnderscoreInLastSegment = undefined;
      effects.consume(code);
      return domain
    }

    // `_`
    if (code === 95) hasUnderscoreInLastSegment = true;

    effects.consume(code);
    return domain
  }

  function done(code) {
    if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
      return ok(code)
    }

    return nok(code)
  }
}

function tokenizePath(effects, ok) {
  var balance = 0;

  return inPath

  function inPath(code) {
    // `&`
    if (code === 38) {
      return effects.check(
        namedCharacterReference,
        ok,
        continuedPunctuation
      )(code)
    }

    // `(`
    if (code === 40) {
      balance++;
    }

    // `)`
    if (code === 41) {
      return effects.check(
        punctuation,
        parenAtPathEnd,
        continuedPunctuation
      )(code)
    }

    if (pathEnd(code)) {
      return ok(code)
    }

    if (trailingPunctuation(code)) {
      return effects.check(punctuation, ok, continuedPunctuation)(code)
    }

    effects.consume(code);
    return inPath
  }

  function continuedPunctuation(code) {
    effects.consume(code);
    return inPath
  }

  function parenAtPathEnd(code) {
    balance--;
    return balance < 0 ? ok(code) : continuedPunctuation(code)
  }
}

function tokenizeNamedCharacterReference(effects, ok, nok) {
  return start

  function start(code) {
    // Assume an ampersand.
    effects.consume(code);
    return inside
  }

  function inside(code) {
    if (asciiAlpha$3(code)) {
      effects.consume(code);
      return inside
    }

    // `;`
    if (code === 59) {
      effects.consume(code);
      return after
    }

    return nok(code)
  }

  function after(code) {
    // If the named character reference is followed by the end of the path, it’s
    // not continued punctuation.
    return pathEnd(code) ? ok(code) : nok(code)
  }
}

function tokenizePunctuation(effects, ok, nok) {
  return start

  function start(code) {
    // Always a valid trailing punctuation marker.
    effects.consume(code);
    return after
  }

  function after(code) {
    // Check the next.
    if (trailingPunctuation(code)) {
      effects.consume(code);
      return after
    }

    // If the punctuation marker is followed by the end of the path, it’s not
    // continued punctuation.
    return pathEnd(code) ? ok(code) : nok(code)
  }
}

function trailingPunctuation(code) {
  return (
    // `!`
    code === 33 ||
    // `"`
    code === 34 ||
    // `'`
    code === 39 ||
    // `)`
    code === 41 ||
    // `*`
    code === 42 ||
    // `,`
    code === 44 ||
    // `.`
    code === 46 ||
    // `:`
    code === 58 ||
    // `;`
    code === 59 ||
    // `<`
    code === 60 ||
    // `?`
    code === 63 ||
    // `_`.
    code === 95 ||
    // `~`
    code === 126
  )
}

function pathEnd(code) {
  return (
    // EOF.
    code === null ||
    // CR, LF, CRLF, HT, VS.
    code < 0 ||
    // Space.
    code === 32 ||
    // `<`
    code === 60
  )
}

function gfmAtext(code) {
  return (
    code === 43 /* `+` */ ||
    code === 45 /* `-` */ ||
    code === 46 /* `.` */ ||
    code === 95 /* `_` */ ||
    asciiAlphanumeric$4(code)
  )
}

function previousWww(code) {
  return (
    code === null ||
    code < 0 ||
    code === 32 /* ` ` */ ||
    code === 40 /* `(` */ ||
    code === 42 /* `*` */ ||
    code === 95 /* `_` */ ||
    code === 126 /* `~` */
  )
}

function previousHttp(code) {
  return code === null || !asciiAlpha$3(code)
}

function previousEmail(code) {
  return code !== 47 /* `/` */ && previousHttp(code)
}

function previous$2(events) {
  var index = events.length;

  while (index--) {
    if (
      (events[index][1].type === 'labelLink' ||
        events[index][1].type === 'labelImage') &&
      !events[index][1]._balanced
    ) {
      return true
    }
  }
}

var micromarkExtensionGfmAutolinkLiteral = syntax$4;

function markdownLineEndingOrSpace$9(code) {
  return code < 0 || code === 32
}

var markdownLineEndingOrSpace_1 = markdownLineEndingOrSpace$9;

var markdownLineEndingOrSpace$8 = markdownLineEndingOrSpace_1;
var unicodePunctuation$1 = unicodePunctuation_1;
var unicodeWhitespace$1 = unicodeWhitespace_1;

// Classify whether a character is unicode whitespace, unicode punctuation, or
// anything else.
// Used for attention (emphasis, strong), whose sequences can open or close
// based on the class of surrounding characters.
function classifyCharacter$2(code) {
  if (
    code === null ||
    markdownLineEndingOrSpace$8(code) ||
    unicodeWhitespace$1(code)
  ) {
    return 1
  }

  if (unicodePunctuation$1(code)) {
    return 2
  }
}

var classifyCharacter_1 = classifyCharacter$2;

function resolveAll$4(constructs, events, context) {
  var called = [];
  var index = -1;
  var resolve;

  while (++index < constructs.length) {
    resolve = constructs[index].resolveAll;

    if (resolve && called.indexOf(resolve) < 0) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }

  return events
}

var resolveAll_1 = resolveAll$4;

var assign$5 = Object.assign;

var assign_1 = assign$5;

var assign$4 = assign_1;

function shallow$7(object) {
  return assign$4({}, object)
}

var shallow_1 = shallow$7;

var micromarkExtensionGfmStrikethrough = create$1;

var classifyCharacter$1 = classifyCharacter_1;
var chunkedSplice$7 = chunkedSplice_1;
var resolveAll$3 = resolveAll_1;
var shallow$6 = shallow_1;

function create$1(options) {
  var settings = options || {};
  var single = settings.singleTilde;
  var tokenizer = {
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };

  if (single === null || single === undefined) {
    single = true;
  }

  return {text: {126: tokenizer}, insideSpan: {null: tokenizer}}

  // Take events and resolve strikethrough.
  function resolveAllStrikethrough(events, context) {
    var index = -1;
    var strikethrough;
    var text;
    var open;
    var nextEvents;

    // Walk through all events.
    while (++index < events.length) {
      // Find a token that can close.
      if (
        events[index][0] === 'enter' &&
        events[index][1].type === 'strikethroughSequenceTemporary' &&
        events[index][1]._close
      ) {
        open = index;

        // Now walk back to find an opener.
        while (open--) {
          // Find a token that can open the closer.
          if (
            events[open][0] === 'exit' &&
            events[open][1].type === 'strikethroughSequenceTemporary' &&
            events[open][1]._open &&
            // If the sizes are the same:
            events[index][1].end.offset - events[index][1].start.offset ===
              events[open][1].end.offset - events[open][1].start.offset
          ) {
            events[index][1].type = 'strikethroughSequence';
            events[open][1].type = 'strikethroughSequence';

            strikethrough = {
              type: 'strikethrough',
              start: shallow$6(events[open][1].start),
              end: shallow$6(events[index][1].end)
            };

            text = {
              type: 'strikethroughText',
              start: shallow$6(events[open][1].end),
              end: shallow$6(events[index][1].start)
            };

            // Opening.
            nextEvents = [
              ['enter', strikethrough, context],
              ['enter', events[open][1], context],
              ['exit', events[open][1], context],
              ['enter', text, context]
            ];

            // Between.
            chunkedSplice$7(
              nextEvents,
              nextEvents.length,
              0,
              resolveAll$3(
                context.parser.constructs.insideSpan.null,
                events.slice(open + 1, index),
                context
              )
            );

            // Closing.
            chunkedSplice$7(nextEvents, nextEvents.length, 0, [
              ['exit', text, context],
              ['enter', events[index][1], context],
              ['exit', events[index][1], context],
              ['exit', strikethrough, context]
            ]);

            chunkedSplice$7(events, open - 1, index - open + 3, nextEvents);

            index = open + nextEvents.length - 2;
            break
          }
        }
      }
    }

    return removeRemainingSequences(events)
  }

  function removeRemainingSequences(events) {
    var index = -1;
    var length = events.length;

    while (++index < length) {
      if (events[index][1].type === 'strikethroughSequenceTemporary') {
        events[index][1].type = 'data';
      }
    }

    return events
  }

  function tokenizeStrikethrough(effects, ok, nok) {
    var previous = this.previous;
    var events = this.events;
    var size = 0;

    return start

    function start(code) {
      if (
        code !== 126 ||
        (previous === 126 &&
          events[events.length - 1][1].type !== 'characterEscape')
      ) {
        return nok(code)
      }

      effects.enter('strikethroughSequenceTemporary');
      return more(code)
    }

    function more(code) {
      var before = classifyCharacter$1(previous);
      var token;
      var after;

      if (code === 126) {
        // If this is the third marker, exit.
        if (size > 1) return nok(code)
        effects.consume(code);
        size++;
        return more
      }

      if (size < 2 && !single) return nok(code)
      token = effects.exit('strikethroughSequenceTemporary');
      after = classifyCharacter$1(code);
      token._open = !after || (after === 2 && before);
      token._close = !before || (before === 2 && after);
      return ok(code)
    }
  }
}

var syntax$3 = {};

function markdownSpace$9(code) {
  return code === -2 || code === -1 || code === 32
}

var markdownSpace_1 = markdownSpace$9;

var markdownSpace$8 = markdownSpace_1;

function spaceFactory$1(effects, ok, type, max) {
  var limit = max ? max - 1 : Infinity;
  var size = 0;
  return start

  function start(code) {
    if (markdownSpace$8(code)) {
      effects.enter(type);
      return prefix(code)
    }

    return ok(code)
  }

  function prefix(code) {
    if (markdownSpace$8(code) && size++ < limit) {
      effects.consume(code);
      return prefix
    }

    effects.exit(type);
    return ok(code)
  }
}

var factorySpace$h = spaceFactory$1;

syntax$3.flow = {
  null: {tokenize: tokenizeTable, resolve: resolveTable, interruptible: true}
};

var createSpace = factorySpace$h;

var setextUnderlineMini = {tokenize: tokenizeSetextUnderlineMini, partial: true};
var nextPrefixedOrBlank = {tokenize: tokenizeNextPrefixedOrBlank, partial: true};

function resolveTable(events, context) {
  var length = events.length;
  var index = -1;
  var token;
  var inHead;
  var inDelimiterRow;
  var inRow;
  var cell;
  var content;
  var text;
  var contentStart;
  var contentEnd;
  var cellStart;

  while (++index < length) {
    token = events[index][1];

    if (inRow) {
      if (token.type === 'temporaryTableCellContent') {
        contentStart = contentStart || index;
        contentEnd = index;
      }

      if (
        // Combine separate content parts into one.
        (token.type === 'tableCellDivider' || token.type === 'tableRow') &&
        contentEnd
      ) {
        content = {
          type: 'tableContent',
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end
        };
        text = {
          type: 'chunkText',
          start: content.start,
          end: content.end,
          contentType: 'text'
        };

        events.splice(
          contentStart,
          contentEnd - contentStart + 1,
          ['enter', content, context],
          ['enter', text, context],
          ['exit', text, context],
          ['exit', content, context]
        );
        index -= contentEnd - contentStart - 3;
        length = events.length;
        contentStart = undefined;
        contentEnd = undefined;
      }
    }

    if (
      events[index][0] === 'exit' &&
      cellStart &&
      cellStart + 1 < index &&
      (token.type === 'tableCellDivider' ||
        (token.type === 'tableRow' &&
          (cellStart + 3 < index ||
            events[cellStart][1].type !== 'whitespace')))
    ) {
      cell = {
        type: inDelimiterRow
          ? 'tableDelimiter'
          : inHead
          ? 'tableHeader'
          : 'tableData',
        start: events[cellStart][1].start,
        end: events[index][1].end
      };
      events.splice(index + (token.type === 'tableCellDivider' ? 1 : 0), 0, [
        'exit',
        cell,
        context
      ]);
      events.splice(cellStart, 0, ['enter', cell, context]);
      index += 2;
      length = events.length;
      cellStart = index + 1;
    }

    if (token.type === 'tableRow') {
      inRow = events[index][0] === 'enter';

      if (inRow) {
        cellStart = index + 1;
      }
    }

    if (token.type === 'tableDelimiterRow') {
      inDelimiterRow = events[index][0] === 'enter';

      if (inDelimiterRow) {
        cellStart = index + 1;
      }
    }

    if (token.type === 'tableHead') {
      inHead = events[index][0] === 'enter';
    }
  }

  return events
}

function tokenizeTable(effects, ok, nok) {
  var align = [];
  var tableHeaderCount = 0;
  var seenDelimiter;
  var hasDash;

  return start

  function start(code) {
    /* istanbul ignore if - used to be passed in beta micromark versions. */
    if (code === null || code === -5 || code === -4 || code === -3) {
      return nok(code)
    }

    effects.enter('table')._align = align;
    effects.enter('tableHead');
    effects.enter('tableRow');

    // If we start with a pipe, we open a cell marker.
    if (code === 124) {
      return cellDividerHead(code)
    }

    tableHeaderCount++;
    effects.enter('temporaryTableCellContent');
    // Can’t be space or eols at the start of a construct, so we’re in a cell.
    return inCellContentHead(code)
  }

  function cellDividerHead(code) {
    // Always a pipe.
    effects.enter('tableCellDivider');
    effects.consume(code);
    effects.exit('tableCellDivider');
    seenDelimiter = true;
    return cellBreakHead
  }

  function cellBreakHead(code) {
    // EOF, CR, LF, CRLF.
    if (code === null || code === -5 || code === -4 || code === -3) {
      return atRowEndHead(code)
    }

    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.enter('whitespace');
      effects.consume(code);
      return inWhitespaceHead
    }

    if (seenDelimiter) {
      seenDelimiter = undefined;
      tableHeaderCount++;
    }

    // `|`
    if (code === 124) {
      return cellDividerHead(code)
    }

    // Anything else is cell content.
    effects.enter('temporaryTableCellContent');
    return inCellContentHead(code)
  }

  function inWhitespaceHead(code) {
    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.consume(code);
      return inWhitespaceHead
    }

    effects.exit('whitespace');
    return cellBreakHead(code)
  }

  function inCellContentHead(code) {
    // EOF, whitespace, pipe
    if (code === null || code < 0 || code === 32 || code === 124) {
      effects.exit('temporaryTableCellContent');
      return cellBreakHead(code)
    }

    effects.consume(code);
    // `\`
    return code === 92 ? inCellContentEscapeHead : inCellContentHead
  }

  function inCellContentEscapeHead(code) {
    // `\` or `|`
    if (code === 92 || code === 124) {
      effects.consume(code);
      return inCellContentHead
    }

    // Anything else.
    return inCellContentHead(code)
  }

  function atRowEndHead(code) {
    if (code === null) {
      return nok(code)
    }

    effects.exit('tableRow');
    effects.exit('tableHead');

    // Always a line ending.
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');

    // If a setext heading, exit.
    return effects.check(
      setextUnderlineMini,
      nok,
      // Support an indent before the delimiter row.
      createSpace(effects, rowStartDelimiter, 'linePrefix', 4)
    )
  }

  function rowStartDelimiter(code) {
    // If there’s another space, or we’re at the EOL/EOF, exit.
    if (code === null || code < 0 || code === 32) {
      return nok(code)
    }

    effects.enter('tableDelimiterRow');
    return atDelimiterRowBreak(code)
  }

  function atDelimiterRowBreak(code) {
    // EOF, CR, LF, CRLF.
    if (code === null || code === -5 || code === -4 || code === -3) {
      return rowEndDelimiter(code)
    }

    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.enter('whitespace');
      effects.consume(code);
      return inWhitespaceDelimiter
    }

    // `-`
    if (code === 45) {
      effects.enter('tableDelimiterFiller');
      effects.consume(code);
      hasDash = true;
      align.push(null);
      return inFillerDelimiter
    }

    // `:`
    if (code === 58) {
      effects.enter('tableDelimiterAlignment');
      effects.consume(code);
      effects.exit('tableDelimiterAlignment');
      align.push('left');
      return afterLeftAlignment
    }

    // If we start with a pipe, we open a cell marker.
    if (code === 124) {
      effects.enter('tableCellDivider');
      effects.consume(code);
      effects.exit('tableCellDivider');
      return atDelimiterRowBreak
    }

    return nok(code)
  }

  function inWhitespaceDelimiter(code) {
    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.consume(code);
      return inWhitespaceDelimiter
    }

    effects.exit('whitespace');
    return atDelimiterRowBreak(code)
  }

  function inFillerDelimiter(code) {
    // `-`
    if (code === 45) {
      effects.consume(code);
      return inFillerDelimiter
    }

    effects.exit('tableDelimiterFiller');

    // `:`
    if (code === 58) {
      effects.enter('tableDelimiterAlignment');
      effects.consume(code);
      effects.exit('tableDelimiterAlignment');

      align[align.length - 1] =
        align[align.length - 1] === 'left' ? 'center' : 'right';

      return afterRightAlignment
    }

    return atDelimiterRowBreak(code)
  }

  function afterLeftAlignment(code) {
    // `-`
    if (code === 45) {
      effects.enter('tableDelimiterFiller');
      effects.consume(code);
      hasDash = true;
      return inFillerDelimiter
    }

    // Anything else is not ok.
    return nok(code)
  }

  function afterRightAlignment(code) {
    // EOF, CR, LF, CRLF.
    if (code === null || code === -5 || code === -4 || code === -3) {
      return rowEndDelimiter(code)
    }

    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.enter('whitespace');
      effects.consume(code);
      return inWhitespaceDelimiter
    }

    // `|`
    if (code === 124) {
      effects.enter('tableCellDivider');
      effects.consume(code);
      effects.exit('tableCellDivider');
      return atDelimiterRowBreak
    }

    return nok(code)
  }

  function rowEndDelimiter(code) {
    effects.exit('tableDelimiterRow');

    // Exit if there was no dash at all, or if the header cell count is not the
    // delimiter cell count.
    if (!hasDash || tableHeaderCount !== align.length) {
      return nok(code)
    }

    if (code === null) {
      return tableClose(code)
    }

    return effects.check(nextPrefixedOrBlank, tableClose, tableContinue)(code)
  }

  function tableClose(code) {
    effects.exit('table');
    return ok(code)
  }

  function tableContinue(code) {
    // Always a line ending.
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    // We checked that it’s not a prefixed or blank line, so we’re certain a
    // body is coming, though it may be indented.
    return createSpace(effects, bodyStart, 'linePrefix', 4)
  }

  function bodyStart(code) {
    effects.enter('tableBody');
    return rowStartBody(code)
  }

  function rowStartBody(code) {
    effects.enter('tableRow');

    // If we start with a pipe, we open a cell marker.
    if (code === 124) {
      return cellDividerBody(code)
    }

    effects.enter('temporaryTableCellContent');
    // Can’t be space or eols at the start of a construct, so we’re in a cell.
    return inCellContentBody(code)
  }

  function cellDividerBody(code) {
    // Always a pipe.
    effects.enter('tableCellDivider');
    effects.consume(code);
    effects.exit('tableCellDivider');
    return cellBreakBody
  }

  function cellBreakBody(code) {
    // EOF, CR, LF, CRLF.
    if (code === null || code === -5 || code === -4 || code === -3) {
      return atRowEndBody(code)
    }

    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.enter('whitespace');
      effects.consume(code);
      return inWhitespaceBody
    }

    // `|`
    if (code === 124) {
      return cellDividerBody(code)
    }

    // Anything else is cell content.
    effects.enter('temporaryTableCellContent');
    return inCellContentBody(code)
  }

  function inWhitespaceBody(code) {
    // HT, VS, SP.
    if (code === -2 || code === -1 || code === 32) {
      effects.consume(code);
      return inWhitespaceBody
    }

    effects.exit('whitespace');
    return cellBreakBody(code)
  }

  function inCellContentBody(code) {
    // EOF, whitespace, pipe
    if (code === null || code < 0 || code === 32 || code === 124) {
      effects.exit('temporaryTableCellContent');
      return cellBreakBody(code)
    }

    effects.consume(code);
    // `\`
    return code === 92 ? inCellContentEscapeBody : inCellContentBody
  }

  function inCellContentEscapeBody(code) {
    // `\` or `|`
    if (code === 92 || code === 124) {
      effects.consume(code);
      return inCellContentBody
    }

    // Anything else.
    return inCellContentBody(code)
  }

  function atRowEndBody(code) {
    effects.exit('tableRow');

    if (code === null) {
      return tableBodyClose(code)
    }

    return effects.check(
      nextPrefixedOrBlank,
      tableBodyClose,
      tableBodyContinue
    )(code)
  }

  function tableBodyClose(code) {
    effects.exit('tableBody');
    return tableClose(code)
  }

  function tableBodyContinue(code) {
    // Always a line ending.
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    // Support an optional prefix, then start a body row.
    return createSpace(effects, rowStartBody, 'linePrefix', 4)
  }
}

// Based on micromark, but that won’t work as we’re in a table, and that expects
// content.
// <https://github.com/micromark/micromark/blob/main/lib/tokenize/setext-underline.js>
function tokenizeSetextUnderlineMini(effects, ok, nok) {
  return start

  function start(code) {
    // `-`
    if (code !== 45) {
      return nok(code)
    }

    effects.enter('setextUnderline');
    return sequence(code)
  }

  function sequence(code) {
    if (code === 45) {
      effects.consume(code);
      return sequence
    }

    return whitespace(code)
  }

  function whitespace(code) {
    if (code === -2 || code === -1 || code === 32) {
      effects.consume(code);
      return whitespace
    }

    if (code === null || code === -5 || code === -4 || code === -3) {
      return ok(code)
    }

    return nok(code)
  }
}

function tokenizeNextPrefixedOrBlank(effects, ok, nok) {
  var size = 0;

  return start

  function start(code) {
    // This is a check, so we don’t care about tokens, but we open a bogus one
    // so we’re valid.
    effects.enter('check');
    // EOL.
    effects.consume(code);
    return whitespace
  }

  function whitespace(code) {
    // VS or SP.
    if (code === -1 || code === 32) {
      effects.consume(code);
      size++;
      return size === 4 ? ok : whitespace
    }

    // EOF or whitespace
    if (code === null || code < 0) {
      return ok(code)
    }

    // Anything else.
    return nok(code)
  }
}

var micromarkExtensionGfmTable = syntax$3;

var syntax$2 = {};

// Counts tabs based on their expanded size, and CR+LF as one character.

function sizeChunks$2(chunks) {
  var index = -1;
  var size = 0;

  while (++index < chunks.length) {
    size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
  }

  return size
}

var sizeChunks_1 = sizeChunks$2;

var sizeChunks$1 = sizeChunks_1;

function prefixSize$5(events, type) {
  var tail = events[events.length - 1];
  if (!tail || tail[1].type !== type) return 0
  return sizeChunks$1(tail[2].sliceStream(tail[1]))
}

var prefixSize_1 = prefixSize$5;

var markdownLineEndingOrSpace$7 = markdownLineEndingOrSpace_1;
var spaceFactory = factorySpace$h;
var prefixSize$4 = prefixSize_1;

var tasklistCheck = {tokenize: tokenizeTasklistCheck};

syntax$2.text = {91: tasklistCheck};

function tokenizeTasklistCheck(effects, ok, nok) {
  var self = this;

  return open

  function open(code) {
    if (
      // Exit if not `[`.
      code !== 91 ||
      // Exit if there’s stuff before.
      self.previous !== null ||
      // Exit if not in the first content that is the first child of a list
      // item.
      !self._gfmTasklistFirstContentOfListItem
    ) {
      return nok(code)
    }

    effects.enter('taskListCheck');
    effects.enter('taskListCheckMarker');
    effects.consume(code);
    effects.exit('taskListCheckMarker');
    return inside
  }

  function inside(code) {
    // Tab or space.
    if (code === -2 || code === 32) {
      effects.enter('taskListCheckValueUnchecked');
      effects.consume(code);
      effects.exit('taskListCheckValueUnchecked');
      return close
    }

    // Upper- and lower `x`.
    if (code === 88 || code === 120) {
      effects.enter('taskListCheckValueChecked');
      effects.consume(code);
      effects.exit('taskListCheckValueChecked');
      return close
    }

    return nok(code)
  }

  function close(code) {
    // `]`
    if (code === 93) {
      effects.enter('taskListCheckMarker');
      effects.consume(code);
      effects.exit('taskListCheckMarker');
      effects.exit('taskListCheck');
      return effects.check({tokenize: spaceThenNonSpace}, ok, nok)
    }

    return nok(code)
  }
}

function spaceThenNonSpace(effects, ok, nok) {
  var self = this;

  return spaceFactory(effects, after, 'whitespace')

  function after(code) {
    return prefixSize$4(self.events, 'whitespace') &&
      code !== null &&
      !markdownLineEndingOrSpace$7(code)
      ? ok(code)
      : nok(code)
  }
}

var micromarkExtensionGfmTaskListItem = syntax$2;

var combine = combineExtensions_1;
var autolink$2 = micromarkExtensionGfmAutolinkLiteral;
var strikethrough$2 = micromarkExtensionGfmStrikethrough;
var table$2 = micromarkExtensionGfmTable;
var tasklist = micromarkExtensionGfmTaskListItem;

var syntax$1 = create;

function create(options) {
  return combine([autolink$2, strikethrough$2(options), table$2, tasklist])
}

var micromarkExtensionGfm = syntax$1;

var fromMarkdown$7 = {};

var ccount_1 = ccount$1;

function ccount$1(source, character) {
  var value = String(source);
  var count = 0;
  var index;

  if (typeof character !== 'string') {
    throw new Error('Expected character')
  }

  index = value.indexOf(character);

  while (index !== -1) {
    count++;
    index = value.indexOf(character, index + character.length);
  }

  return count
}

var convert_1 = convert$4;

function convert$4(test) {
  if (test == null) {
    return ok$2
  }

  if (typeof test === 'string') {
    return typeFactory$2(test)
  }

  if (typeof test === 'object') {
    return 'length' in test ? anyFactory$2(test) : allFactory(test)
  }

  if (typeof test === 'function') {
    return test
  }

  throw new Error('Expected function, string, or object as test')
}

// Utility assert each property in `test` is represented in `node`, and each
// values are strictly equal.
function allFactory(test) {
  return all

  function all(node) {
    var key;

    for (key in test) {
      if (node[key] !== test[key]) return false
    }

    return true
  }
}

function anyFactory$2(tests) {
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert$4(tests[index]);
  }

  return any

  function any() {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

// Utility to convert a string into a function which checks a given node’s type
// for said string.
function typeFactory$2(test) {
  return type

  function type(node) {
    return Boolean(node && node.type === test)
  }
}

// Utility to return true.
function ok$2() {
  return true
}

var color_1 = color$2;
function color$2(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}

var unistUtilVisitParents = visitParents$1;

var convert$3 = convert_1;
var color$1 = color_1;

var CONTINUE$1 = true;
var SKIP$1 = 'skip';
var EXIT$1 = false;

visitParents$1.CONTINUE = CONTINUE$1;
visitParents$1.SKIP = SKIP$1;
visitParents$1.EXIT = EXIT$1;

function visitParents$1(tree, test, visitor, reverse) {
  var step;
  var is;

  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  is = convert$3(test);
  step = reverse ? -1 : 1;

  factory(tree, null, [])();

  function factory(node, index, parents) {
    var value = typeof node === 'object' && node !== null ? node : {};
    var name;

    if (typeof value.type === 'string') {
      name =
        typeof value.tagName === 'string'
          ? value.tagName
          : typeof value.name === 'string'
          ? value.name
          : undefined;

      visit.displayName =
        'node (' + color$1(value.type + (name ? '<' + name + '>' : '')) + ')';
    }

    return visit

    function visit() {
      var grandparents = parents.concat(node);
      var result = [];
      var subresult;
      var offset;

      if (!test || is(node, index, parents[parents.length - 1] || null)) {
        result = toResult$1(visitor(node, parents));

        if (result[0] === EXIT$1) {
          return result
        }
      }

      if (node.children && result[0] !== SKIP$1) {
        offset = (reverse ? node.children.length : -1) + step;

        while (offset > -1 && offset < node.children.length) {
          subresult = factory(node.children[offset], offset, grandparents)();

          if (subresult[0] === EXIT$1) {
            return subresult
          }

          offset =
            typeof subresult[1] === 'number' ? subresult[1] : offset + step;
        }
      }

      return result
    }
  }
}

function toResult$1(value) {
  if (value !== null && typeof value === 'object' && 'length' in value) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE$1, value]
  }

  return [value]
}

var escapeStringRegexp = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
};

var mdastUtilFindAndReplace = findAndReplace$1;

var visit$1 = unistUtilVisitParents;
var convert$2 = convert_1;
var escape = escapeStringRegexp;

var splice = [].splice;

function findAndReplace$1(tree, find, replace, options) {
  var settings;
  var schema;

  if (typeof find === 'string' || (find && typeof find.exec === 'function')) {
    schema = [[find, replace]];
  } else {
    schema = find;
    options = replace;
  }

  settings = options || {};

  search$1(tree, settings, handlerFactory(toPairs(schema)));

  return tree

  function handlerFactory(pairs) {
    var pair = pairs[0];

    return handler

    function handler(node, parent) {
      var find = pair[0];
      var replace = pair[1];
      var nodes = [];
      var start = 0;
      var index = parent.children.indexOf(node);
      var position;
      var match;
      var subhandler;
      var value;

      find.lastIndex = 0;

      match = find.exec(node.value);

      while (match) {
        position = match.index;
        value = replace.apply(
          null,
          [].concat(match, {index: match.index, input: match.input})
        );

        if (value !== false) {
          if (start !== position) {
            nodes.push({type: 'text', value: node.value.slice(start, position)});
          }

          if (typeof value === 'string' && value.length > 0) {
            value = {type: 'text', value: value};
          }

          if (value) {
            nodes = [].concat(nodes, value);
          }

          start = position + match[0].length;
        }

        if (!find.global) {
          break
        }

        match = find.exec(node.value);
      }

      if (position === undefined) {
        nodes = [node];
        index--;
      } else {
        if (start < node.value.length) {
          nodes.push({type: 'text', value: node.value.slice(start)});
        }

        nodes.unshift(index, 1);
        splice.apply(parent.children, nodes);
      }

      if (pairs.length > 1) {
        subhandler = handlerFactory(pairs.slice(1));
        position = -1;

        while (++position < nodes.length) {
          node = nodes[position];

          if (node.type === 'text') {
            subhandler(node, parent);
          } else {
            search$1(node, settings, subhandler);
          }
        }
      }

      return index + nodes.length + 1
    }
  }
}

function search$1(tree, settings, handler) {
  var ignored = convert$2(settings.ignore || []);
  var result = [];

  visit$1(tree, 'text', visitor);

  return result

  function visitor(node, parents) {
    var index = -1;
    var parent;
    var grandparent;

    while (++index < parents.length) {
      parent = parents[index];

      if (
        ignored(
          parent,
          grandparent ? grandparent.children.indexOf(parent) : undefined,
          grandparent
        )
      ) {
        return
      }

      grandparent = parent;
    }

    return handler(node, grandparent)
  }
}

function toPairs(schema) {
  var result = [];
  var key;
  var index;

  if (typeof schema !== 'object') {
    throw new Error('Expected array or object as schema')
  }

  if ('length' in schema) {
    index = -1;

    while (++index < schema.length) {
      result.push([
        toExpression(schema[index][0]),
        toFunction(schema[index][1])
      ]);
    }
  } else {
    for (key in schema) {
      result.push([toExpression(key), toFunction(schema[key])]);
    }
  }

  return result
}

function toExpression(find) {
  return typeof find === 'string' ? new RegExp(escape(find), 'g') : find
}

function toFunction(replace) {
  return typeof replace === 'function' ? replace : returner

  function returner() {
    return replace
  }
}

var ccount = ccount_1;
var findAndReplace = mdastUtilFindAndReplace;
var unicodePunctuation = unicodePunctuation_1;
var unicodeWhitespace = unicodeWhitespace_1;

fromMarkdown$7.transforms = [transformGfmAutolinkLiterals];
fromMarkdown$7.enter = {
  literalAutolink: enterLiteralAutolink,
  literalAutolinkEmail: enterLiteralAutolinkValue,
  literalAutolinkHttp: enterLiteralAutolinkValue,
  literalAutolinkWww: enterLiteralAutolinkValue
};
fromMarkdown$7.exit = {
  literalAutolink: exitLiteralAutolink,
  literalAutolinkEmail: exitLiteralAutolinkEmail,
  literalAutolinkHttp: exitLiteralAutolinkHttp,
  literalAutolinkWww: exitLiteralAutolinkWww
};

function enterLiteralAutolink(token) {
  this.enter({type: 'link', title: null, url: '', children: []}, token);
}

function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token);
}

function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token);
}

function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token);
  this.stack[this.stack.length - 1].url = 'http://' + this.sliceSerialize(token);
}

function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token);
}

function exitLiteralAutolink(token) {
  this.exit(token);
}

function transformGfmAutolinkLiterals(tree) {
  findAndReplace(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, findUrl],
      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, findEmail]
    ],
    {ignore: ['link', 'linkReference']}
  );
}

function findUrl($0, protocol, domain, path, match) {
  var prefix = '';
  var parts;
  var result;

  // Not an expected previous character.
  if (!previous$1(match)) {
    return false
  }

  // Treat `www` as part of the domain.
  if (/^w/i.test(protocol)) {
    domain = protocol + domain;
    protocol = '';
    prefix = 'http://';
  }

  if (!isCorrectDomain(domain)) {
    return false
  }

  parts = splitUrl(domain + path);

  if (!parts[0]) return false

  result = {
    type: 'link',
    title: null,
    url: prefix + protocol + parts[0],
    children: [{type: 'text', value: protocol + parts[0]}]
  };

  if (parts[1]) {
    result = [result, {type: 'text', value: parts[1]}];
  }

  return result
}

function findEmail($0, atext, label, match) {
  // Not an expected previous character.
  if (!previous$1(match, true) || /[_-]$/.test(label)) {
    return false
  }

  return {
    type: 'link',
    title: null,
    url: 'mailto:' + atext + '@' + label,
    children: [{type: 'text', value: atext + '@' + label}]
  }
}

function isCorrectDomain(domain) {
  var parts = domain.split('.');

  if (
    parts.length < 2 ||
    (parts[parts.length - 1] &&
      (/_/.test(parts[parts.length - 1]) ||
        !/[a-zA-Z\d]/.test(parts[parts.length - 1]))) ||
    (parts[parts.length - 2] &&
      (/_/.test(parts[parts.length - 2]) ||
        !/[a-zA-Z\d]/.test(parts[parts.length - 2])))
  ) {
    return false
  }

  return true
}

function splitUrl(url) {
  var trail = /[!"&'),.:;<>?\]}]+$/.exec(url);
  var closingParenIndex;
  var openingParens;
  var closingParens;

  if (trail) {
    url = url.slice(0, trail.index);
    trail = trail[0];
    closingParenIndex = trail.indexOf(')');
    openingParens = ccount(url, '(');
    closingParens = ccount(url, ')');

    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail.slice(0, closingParenIndex + 1);
      trail = trail.slice(closingParenIndex + 1);
      closingParenIndex = trail.indexOf(')');
      closingParens++;
    }
  }

  return [url, trail]
}

function previous$1(match, email) {
  var code = match.input.charCodeAt(match.index - 1);
  return (
    (code !== code || unicodeWhitespace(code) || unicodePunctuation(code)) &&
    (!email || code !== 47)
  )
}

var fromMarkdown$6 = {};

fromMarkdown$6.canContainEols = ['delete'];
fromMarkdown$6.enter = {strikethrough: enterStrikethrough};
fromMarkdown$6.exit = {strikethrough: exitStrikethrough};

function enterStrikethrough(token) {
  this.enter({type: 'delete', children: []}, token);
}

function exitStrikethrough(token) {
  this.exit(token);
}

var fromMarkdown$5 = {};

fromMarkdown$5.enter = {
  table: enterTable,
  tableData: enterCell,
  tableHeader: enterCell,
  tableRow: enterRow
};
fromMarkdown$5.exit = {
  codeText: exitCodeText,
  table: exitTable,
  tableData: exit$1,
  tableHeader: exit$1,
  tableRow: exit$1
};

function enterTable(token) {
  this.enter({type: 'table', align: token._align, children: []}, token);
  this.setData('inTable', true);
}

function exitTable(token) {
  this.exit(token);
  this.setData('inTable');
}

function enterRow(token) {
  this.enter({type: 'tableRow', children: []}, token);
}

function exit$1(token) {
  this.exit(token);
}

function enterCell(token) {
  this.enter({type: 'tableCell', children: []}, token);
}

// Overwrite the default code text data handler to unescape escaped pipes when
// they are in tables.
function exitCodeText(token) {
  var value = this.resume();

  if (this.getData('inTable')) {
    value = value.replace(/\\([\\|])/g, replace);
  }

  this.stack[this.stack.length - 1].value = value;
  this.exit(token);
}

function replace($0, $1) {
  // Pipes work, backslashes don’t (but can’t escape pipes).
  return $1 === '|' ? $1 : $0
}

var fromMarkdown$4 = {};

fromMarkdown$4.exit = {
  taskListCheckValueChecked: exitCheck,
  taskListCheckValueUnchecked: exitCheck,
  paragraph: exitParagraphWithTaskListItem
};

function exitCheck(token) {
  // We’re always in a paragraph, in a list item.
  this.stack[this.stack.length - 2].checked =
    token.type === 'taskListCheckValueChecked';
}

function exitParagraphWithTaskListItem(token) {
  var parent = this.stack[this.stack.length - 2];
  var node = this.stack[this.stack.length - 1];
  var siblings = parent.children;
  var head = node.children[0];
  var index = -1;
  var firstParaghraph;

  if (
    parent &&
    parent.type === 'listItem' &&
    typeof parent.checked === 'boolean' &&
    head &&
    head.type === 'text'
  ) {
    while (++index < siblings.length) {
      if (siblings[index].type === 'paragraph') {
        firstParaghraph = siblings[index];
        break
      }
    }

    if (firstParaghraph === node) {
      // Must start with a space or a tab.
      head.value = head.value.slice(1);

      if (head.value.length === 0) {
        node.children.shift();
      } else {
        head.position.start.column++;
        head.position.start.offset++;
        node.position.start = Object.assign({}, head.position.start);
      }
    }
  }

  this.exit(token);
}

var autolinkLiteral$1 = fromMarkdown$7;
var strikethrough$1 = fromMarkdown$6;
var table$1 = fromMarkdown$5;
var taskListItem$1 = fromMarkdown$4;

var own$8 = {}.hasOwnProperty;

var fromMarkdown$3 = configure$4([
  autolinkLiteral$1,
  strikethrough$1,
  table$1,
  taskListItem$1
]);

function configure$4(extensions) {
  var config = {transforms: [], canContainEols: []};
  var length = extensions.length;
  var index = -1;

  while (++index < length) {
    extension$1(config, extensions[index]);
  }

  return config
}

function extension$1(config, extension) {
  var key;
  var left;
  var right;

  for (key in extension) {
    left = own$8.call(config, key) ? config[key] : (config[key] = {});
    right = extension[key];

    if (key === 'canContainEols' || key === 'transforms') {
      config[key] = [].concat(left, right);
    } else {
      Object.assign(left, right);
    }
  }
}

var toMarkdown$6 = {};

var inConstruct = 'phrasing';
var notInConstruct = ['autolink', 'link', 'image', 'label'];

toMarkdown$6.unsafe = [
  {
    character: '@',
    before: '[+\\-.\\w]',
    after: '[\\-.\\w]',
    inConstruct: inConstruct,
    notInConstruct: notInConstruct
  },
  {
    character: '.',
    before: '[Ww]',
    after: '[\\-.\\w]',
    inConstruct: inConstruct,
    notInConstruct: notInConstruct
  },
  {
    character: ':',
    before: '[ps]',
    after: '\\/',
    inConstruct: inConstruct,
    notInConstruct: notInConstruct
  }
];

var toMarkdown$5 = {};

var containerPhrasing = phrasing$2;

function phrasing$2(parent, context, safeOptions) {
  var children = parent.children || [];
  var results = [];
  var index = -1;
  var before = safeOptions.before;
  var after;
  var handle;
  var child;

  while (++index < children.length) {
    child = children[index];

    if (index + 1 < children.length) {
      handle = context.handle.handlers[children[index + 1].type];
      if (handle && handle.peek) handle = handle.peek;
      after = handle
        ? handle(children[index + 1], parent, context, {
            before: '',
            after: ''
          }).charAt(0)
        : '';
    } else {
      after = safeOptions.after;
    }

    // In some cases, html (text) can be found in phrasing right after an eol.
    // When we’d serialize that, in most cases that would be seen as html
    // (flow).
    // As we can’t escape or so to prevent it from happening, we take a somewhat
    // reasonable approach: replace that eol with a space.
    // See: <https://github.com/syntax-tree/mdast-util-to-markdown/issues/15>
    if (
      results.length > 0 &&
      (before === '\r' || before === '\n') &&
      child.type === 'html'
    ) {
      results[results.length - 1] = results[results.length - 1].replace(
        /(\r?\n|\r)$/,
        ' '
      );
      before = ' ';
    }

    results.push(
      context.handle(child, parent, context, {
        before: before,
        after: after
      })
    );

    before = results[results.length - 1].slice(-1);
  }

  return results.join('')
}

var phrasing$1 = containerPhrasing;

toMarkdown$5.unsafe = [{character: '~', inConstruct: 'phrasing'}];
toMarkdown$5.handlers = {delete: handleDelete};

handleDelete.peek = peekDelete;

function handleDelete(node, _, context) {
  var exit = context.enter('emphasis');
  var value = phrasing$1(node, context, {before: '~', after: '~'});
  exit();
  return '~~' + value + '~~'
}

function peekDelete() {
  return '~'
}

var patternCompile_1 = patternCompile$2;

function patternCompile$2(pattern) {
  var before;
  var after;

  if (!pattern._compiled) {
    before = pattern.before ? '(?:' + pattern.before + ')' : '';
    after = pattern.after ? '(?:' + pattern.after + ')' : '';

    if (pattern.atBreak) {
      before = '[\\r\\n][\\t ]*' + before;
    }

    pattern._compiled = new RegExp(
      (before ? '(' + before + ')' : '') +
        (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
        pattern.character +
        (after || ''),
      'g'
    );
  }

  return pattern._compiled
}

var inlineCode_1 = inlineCode;
inlineCode.peek = inlineCodePeek;

var patternCompile$1 = patternCompile_1;

function inlineCode(node, parent, context) {
  var value = node.value || '';
  var sequence = '`';
  var index = -1;
  var pattern;
  var expression;
  var match;
  var position;

  // If there is a single grave accent on its own in the code, use a fence of
  // two.
  // If there are two in a row, use one.
  while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
    sequence += '`';
  }

  // If this is not just spaces or eols (tabs don’t count), and either the
  // first or last character are a space, eol, or tick, then pad with spaces.
  if (
    /[^ \r\n]/.test(value) &&
    (/[ \r\n`]/.test(value.charAt(0)) ||
      /[ \r\n`]/.test(value.charAt(value.length - 1)))
  ) {
    value = ' ' + value + ' ';
  }

  // We have a potential problem: certain characters after eols could result in
  // blocks being seen.
  // For example, if someone injected the string `'\n# b'`, then that would
  // result in an ATX heading.
  // We can’t escape characters in `inlineCode`, but because eols are
  // transformed to spaces when going from markdown to HTML anyway, we can swap
  // them out.
  while (++index < context.unsafe.length) {
    pattern = context.unsafe[index];

    // Only look for `atBreak`s.
    // Btw: note that `atBreak` patterns will always start the regex at LF or
    // CR.
    if (!pattern.atBreak) continue

    expression = patternCompile$1(pattern);

    while ((match = expression.exec(value))) {
      position = match.index;

      // Support CRLF (patterns only look for one of the characters).
      if (
        value.charCodeAt(position) === 10 /* `\n` */ &&
        value.charCodeAt(position - 1) === 13 /* `\r` */
      ) {
        position--;
      }

      value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
    }
  }

  return sequence + value + sequence
}

function inlineCodePeek() {
  return '`'
}

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

var repeatString = repeat$4;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat$4(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

var repeat$3 = repeatString;

var markdownTable_1 = markdownTable$1;

var trailingWhitespace = / +$/;

// Characters.
var space = ' ';
var lineFeed = '\n';
var dash$1 = '-';
var colon$1 = ':';
var verticalBar = '|';

var x = 0;
var C = 67;
var L$1 = 76;
var R = 82;
var c = 99;
var l$1 = 108;
var r = 114;

// Create a table from a matrix of strings.
function markdownTable$1(table, options) {
  var settings = options || {};
  var padding = settings.padding !== false;
  var start = settings.delimiterStart !== false;
  var end = settings.delimiterEnd !== false;
  var align = (settings.align || []).concat();
  var alignDelimiters = settings.alignDelimiters !== false;
  var alignments = [];
  var stringLength = settings.stringLength || defaultStringLength;
  var rowIndex = -1;
  var rowLength = table.length;
  var cellMatrix = [];
  var sizeMatrix = [];
  var row = [];
  var sizes = [];
  var longestCellByColumn = [];
  var mostCellsPerRow = 0;
  var cells;
  var columnIndex;
  var columnLength;
  var largest;
  var size;
  var cell;
  var lines;
  var line;
  var before;
  var after;
  var code;

  // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
  // do superfluous work when aligning, so optimize for aligning.
  while (++rowIndex < rowLength) {
    cells = table[rowIndex];
    columnIndex = -1;
    columnLength = cells.length;
    row = [];
    sizes = [];

    if (columnLength > mostCellsPerRow) {
      mostCellsPerRow = columnLength;
    }

    while (++columnIndex < columnLength) {
      cell = serialize(cells[columnIndex]);

      if (alignDelimiters === true) {
        size = stringLength(cell);
        sizes[columnIndex] = size;

        largest = longestCellByColumn[columnIndex];

        if (largest === undefined || size > largest) {
          longestCellByColumn[columnIndex] = size;
        }
      }

      row.push(cell);
    }

    cellMatrix[rowIndex] = row;
    sizeMatrix[rowIndex] = sizes;
  }

  // Figure out which alignments to use.
  columnIndex = -1;
  columnLength = mostCellsPerRow;

  if (typeof align === 'object' && 'length' in align) {
    while (++columnIndex < columnLength) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    code = toAlignment(align);

    while (++columnIndex < columnLength) {
      alignments[columnIndex] = code;
    }
  }

  // Inject the alignment row.
  columnIndex = -1;
  columnLength = mostCellsPerRow;
  row = [];
  sizes = [];

  while (++columnIndex < columnLength) {
    code = alignments[columnIndex];
    before = '';
    after = '';

    if (code === l$1) {
      before = colon$1;
    } else if (code === r) {
      after = colon$1;
    } else if (code === c) {
      before = colon$1;
      after = colon$1;
    }

    // There *must* be at least one hyphen-minus in each alignment cell.
    size = alignDelimiters
      ? Math.max(
          1,
          longestCellByColumn[columnIndex] - before.length - after.length
        )
      : 1;

    cell = before + repeat$3(dash$1, size) + after;

    if (alignDelimiters === true) {
      size = before.length + size + after.length;

      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }

      sizes[columnIndex] = size;
    }

    row[columnIndex] = cell;
  }

  // Inject the alignment row.
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);

  rowIndex = -1;
  rowLength = cellMatrix.length;
  lines = [];

  while (++rowIndex < rowLength) {
    row = cellMatrix[rowIndex];
    sizes = sizeMatrix[rowIndex];
    columnIndex = -1;
    columnLength = mostCellsPerRow;
    line = [];

    while (++columnIndex < columnLength) {
      cell = row[columnIndex] || '';
      before = '';
      after = '';

      if (alignDelimiters === true) {
        size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
        code = alignments[columnIndex];

        if (code === r) {
          before = repeat$3(space, size);
        } else if (code === c) {
          if (size % 2 === 0) {
            before = repeat$3(space, size / 2);
            after = before;
          } else {
            before = repeat$3(space, size / 2 + 0.5);
            after = repeat$3(space, size / 2 - 0.5);
          }
        } else {
          after = repeat$3(space, size);
        }
      }

      if (start === true && columnIndex === 0) {
        line.push(verticalBar);
      }

      if (
        padding === true &&
        // Don’t add the opening space if we’re not aligning and the cell is
        // empty: there will be a closing space.
        !(alignDelimiters === false && cell === '') &&
        (start === true || columnIndex !== 0)
      ) {
        line.push(space);
      }

      if (alignDelimiters === true) {
        line.push(before);
      }

      line.push(cell);

      if (alignDelimiters === true) {
        line.push(after);
      }

      if (padding === true) {
        line.push(space);
      }

      if (end === true || columnIndex !== columnLength - 1) {
        line.push(verticalBar);
      }
    }

    line = line.join('');

    if (end === false) {
      line = line.replace(trailingWhitespace, '');
    }

    lines.push(line);
  }

  return lines.join(lineFeed)
}

function serialize(value) {
  return value === null || value === undefined ? '' : String(value)
}

function defaultStringLength(value) {
  return value.length
}

function toAlignment(value) {
  var code = typeof value === 'string' ? value.charCodeAt(0) : x;

  return code === L$1 || code === l$1
    ? l$1
    : code === R || code === r
    ? r
    : code === C || code === c
    ? c
    : x
}

var phrasing = containerPhrasing;
var defaultInlineCode = inlineCode_1;
var markdownTable = markdownTable_1;

var toMarkdown_1$1 = toMarkdown$4;

function toMarkdown$4(options) {
  var settings = options || {};
  var padding = settings.tableCellPadding;
  var alignDelimiters = settings.tablePipeAlign;
  var stringLength = settings.stringLength;
  var around = padding ? ' ' : '|';

  return {
    unsafe: [
      {character: '\r', inConstruct: 'tableCell'},
      {character: '\n', inConstruct: 'tableCell'},
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      {atBreak: true, character: '|', after: '[\t :-]'},
      // A pipe in a cell must be encoded.
      {character: '|', inConstruct: 'tableCell'},
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      {atBreak: true, character: ':', after: '-'},
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      {atBreak: true, character: '-', after: '[:|-]'}
    ],
    handlers: {
      table: handleTable,
      tableRow: handleTableRow,
      tableCell: handleTableCell,
      inlineCode: inlineCodeWithTable
    }
  }

  function handleTable(node, _, context) {
    return serializeData(handleTableAsData(node, context), node.align)
  }

  // This function isn’t really used normally, because we handle rows at the
  // table level.
  // But, if someone passes in a table row, this ensures we make somewhat sense.
  function handleTableRow(node, _, context) {
    var row = handleTableRowAsData(node, context);
    // `markdown-table` will always add an align row
    var value = serializeData([row]);
    return value.slice(0, value.indexOf('\n'))
  }

  function handleTableCell(node, _, context) {
    var exit = context.enter('tableCell');
    var value = phrasing(node, context, {before: around, after: around});
    exit();
    return value
  }

  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align: align,
      alignDelimiters: alignDelimiters,
      padding: padding,
      stringLength: stringLength
    })
  }

  function handleTableAsData(node, context) {
    var children = node.children;
    var index = -1;
    var length = children.length;
    var result = [];
    var subexit = context.enter('table');

    while (++index < length) {
      result[index] = handleTableRowAsData(children[index], context);
    }

    subexit();

    return result
  }

  function handleTableRowAsData(node, context) {
    var children = node.children;
    var index = -1;
    var length = children.length;
    var result = [];
    var subexit = context.enter('tableRow');

    while (++index < length) {
      result[index] = handleTableCell(children[index], node, context);
    }

    subexit();

    return result
  }

  function inlineCodeWithTable(node, parent, context) {
    var value = defaultInlineCode(node, parent, context);

    if (context.stack.indexOf('tableCell') !== -1) {
      value = value.replace(/\|/g, '\\$&');
    }

    return value
  }
}

var toMarkdown$3 = {};

var checkBullet_1 = checkBullet$1;

function checkBullet$1(context) {
  var marker = context.options.bullet || '*';

  if (marker !== '*' && marker !== '+' && marker !== '-') {
    throw new Error(
      'Cannot serialize items with `' +
        marker +
        '` for `options.bullet`, expected `*`, `+`, or `-`'
    )
  }

  return marker
}

var checkListItemIndent_1 = checkListItemIndent$1;

function checkListItemIndent$1(context) {
  var style = context.options.listItemIndent || 'tab';

  if (style === 1 || style === '1') {
    return 'one'
  }

  if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
    throw new Error(
      'Cannot serialize items with `' +
        style +
        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
    )
  }

  return style
}

var containerFlow = flow$5;

var repeat$2 = repeatString;

function flow$5(parent, context) {
  var children = parent.children || [];
  var results = [];
  var index = -1;
  var child;

  while (++index < children.length) {
    child = children[index];

    results.push(
      context.handle(child, parent, context, {before: '\n', after: '\n'})
    );

    if (index + 1 < children.length) {
      results.push(between(child, children[index + 1]));
    }
  }

  return results.join('')

  function between(left, right) {
    var index = -1;
    var result;

    while (++index < context.join.length) {
      result = context.join[index](left, right, parent, context);

      if (result === true || result === 1) {
        break
      }

      if (typeof result === 'number') {
        return repeat$2('\n', 1 + Number(result))
      }

      if (result === false) {
        return '\n\n<!---->\n\n'
      }
    }

    return '\n\n'
  }
}

var indentLines_1 = indentLines$3;

var eol = /\r?\n|\r/g;

function indentLines$3(value, map) {
  var result = [];
  var start = 0;
  var line = 0;
  var match;

  while ((match = eol.exec(value))) {
    one(value.slice(start, match.index));
    result.push(match[0]);
    start = match.index + match[0].length;
    line++;
  }

  one(value.slice(start));

  return result.join('')

  function one(value) {
    result.push(map(value, line, !value));
  }
}

var listItem_1 = listItem;

var repeat$1 = repeatString;
var checkBullet = checkBullet_1;
var checkListItemIndent = checkListItemIndent_1;
var flow$4 = containerFlow;
var indentLines$2 = indentLines_1;

function listItem(node, parent, context) {
  var bullet = checkBullet(context);
  var listItemIndent = checkListItemIndent(context);
  var size;
  var value;
  var exit;

  if (parent && parent.ordered) {
    bullet =
      (parent.start > -1 ? parent.start : 1) +
      (context.options.incrementListMarker === false
        ? 0
        : parent.children.indexOf(node)) +
      '.';
  }

  size = bullet.length + 1;

  if (
    listItemIndent === 'tab' ||
    (listItemIndent === 'mixed' && ((parent && parent.spread) || node.spread))
  ) {
    size = Math.ceil(size / 4) * 4;
  }

  exit = context.enter('listItem');
  value = indentLines$2(flow$4(node, context), map);
  exit();

  return value

  function map(line, index, blank) {
    if (index) {
      return (blank ? '' : repeat$1(' ', size)) + line
    }

    return (blank ? bullet : bullet + repeat$1(' ', size - bullet.length)) + line
  }
}

var defaultListItem = listItem_1;

toMarkdown$3.unsafe = [{atBreak: true, character: '-', after: '[:|-]'}];

toMarkdown$3.handlers = {
  listItem: listItemWithTaskListItem
};

function listItemWithTaskListItem(node, parent, context) {
  var value = defaultListItem(node, parent, context);
  var head = node.children[0];

  if (typeof node.checked === 'boolean' && head && head.type === 'paragraph') {
    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
  }

  return value

  function check($0) {
    return $0 + '[' + (node.checked ? 'x' : ' ') + '] '
  }
}

var configure_1 = configure$3;

function configure$3(base, extension) {
  var index = -1;
  var key;

  // First do subextensions.
  if (extension.extensions) {
    while (++index < extension.extensions.length) {
      configure$3(base, extension.extensions[index]);
    }
  }

  for (key in extension) {
    if (key === 'extensions') ; else if (key === 'unsafe' || key === 'join') {
      base[key] = base[key].concat(extension[key] || []);
    } else if (key === 'handlers') {
      base[key] = Object.assign(base[key], extension[key] || {});
    } else {
      base.options[key] = extension[key];
    }
  }

  return base
}

var autolinkLiteral = toMarkdown$6;
var strikethrough = toMarkdown$5;
var table = toMarkdown_1$1;
var taskListItem = toMarkdown$3;
var configure$2 = configure_1;

var toMarkdown_1 = toMarkdown$2;

function toMarkdown$2(options) {
  var config = configure$2(
    {handlers: {}, join: [], unsafe: [], options: {}},
    {
      extensions: [autolinkLiteral, strikethrough, table(options), taskListItem]
    }
  );

  return Object.assign(config.options, {
    handlers: config.handlers,
    join: config.join,
    unsafe: config.unsafe
  })
}

var syntax = micromarkExtensionGfm;
var fromMarkdown$2 = fromMarkdown$3;
var toMarkdown$1 = toMarkdown_1;

var warningIssued;

var remarkGfm = gfm;

function gfm(options) {
  var data = this.data();

  /* istanbul ignore next - old remark. */
  if (
    !warningIssued &&
    ((this.Parser &&
      this.Parser.prototype &&
      this.Parser.prototype.blockTokenizers) ||
      (this.Compiler &&
        this.Compiler.prototype &&
        this.Compiler.prototype.visitors))
  ) {
    warningIssued = true;
    console.warn(
      '[remark-gfm] Warning: please upgrade to remark 13 to use this plugin'
    );
  }

  add('micromarkExtensions', syntax(options));
  add('fromMarkdownExtensions', fromMarkdown$2);
  add('toMarkdownExtensions', toMarkdown$1(options));

  function add(field, value) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) data[field].push(value);
    else data[field] = [value];
  }
}

var mdastUtilToString = toString$4;

// Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children,
// and if the given value is an array, serialize the nodes in it.
function toString$4(node) {
  return (
    (node &&
      (node.value ||
        node.alt ||
        node.title ||
        ('children' in node && all$1(node.children)) ||
        ('length' in node && all$1(node)))) ||
    ''
  )
}

function all$1(values) {
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = toString$4(values[index]);
  }

  return result.join('')
}

function normalizeIdentifier$3(value) {
  return (
    value // Collapse Markdown whitespace.
      .replace(/[\t\n\r ]+/g, ' ') // Trim.
      .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
      // counterpart is uppercased will result in a different uppercase
      // character.
      // Hence, to get that form, we perform both lower- and uppercase.
      // Upper case makes sure keys will not interact with default prototypal
      // methods: no object method is uppercase.
      .toLowerCase()
      .toUpperCase()
  )
}

var normalizeIdentifier_1 = normalizeIdentifier$3;

var fromCharCode$2 = fromCharCode_1;

function safeFromInt$1(value, base) {
  var code = parseInt(value, base);

  if (
    // C0 except for HT, LF, FF, CR, space
    code < 9 ||
    code === 11 ||
    (code > 13 && code < 32) || // Control character (DEL) of the basic block and C1 controls.
    (code > 126 && code < 160) || // Lone high surrogates and low surrogates.
    (code > 55295 && code < 57344) || // Noncharacters.
    (code > 64975 && code < 65008) ||
    (code & 65535) === 65535 ||
    (code & 65535) === 65534 || // Out of range
    code > 1114111
  ) {
    return '\uFFFD'
  }

  return fromCharCode$2(code)
}

var safeFromInt_1 = safeFromInt$1;

var content$3 = {};

Object.defineProperty(content$3, '__esModule', {value: true});

var markdownLineEnding$i = markdownLineEnding_1;
var factorySpace$g = factorySpace$h;

var tokenize$2 = initializeContent;

function initializeContent(effects) {
  var contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  var previous;
  return contentStart

  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$g(effects, contentStart, 'linePrefix')
  }

  function paragraphInitial(code) {
    effects.enter('paragraph');
    return lineStart(code)
  }

  function lineStart(code) {
    var token = effects.enter('chunkText', {
      contentType: 'text',
      previous: previous
    });

    if (previous) {
      previous.next = token;
    }

    previous = token;
    return data(code)
  }

  function data(code) {
    if (code === null) {
      effects.exit('chunkText');
      effects.exit('paragraph');
      effects.consume(code);
      return
    }

    if (markdownLineEnding$i(code)) {
      effects.consume(code);
      effects.exit('chunkText');
      return lineStart
    } // Data.

    effects.consume(code);
    return data
  }
}

content$3.tokenize = tokenize$2;

var document$2 = {};

var markdownLineEnding$h = markdownLineEnding_1;
var factorySpace$f = factorySpace$h;

var partialBlankLine$4 = {
  tokenize: tokenizePartialBlankLine,
  partial: true
};

function tokenizePartialBlankLine(effects, ok, nok) {
  return factorySpace$f(effects, afterWhitespace, 'linePrefix')

  function afterWhitespace(code) {
    return code === null || markdownLineEnding$h(code) ? ok(code) : nok(code)
  }
}

var partialBlankLine_1 = partialBlankLine$4;

Object.defineProperty(document$2, '__esModule', {value: true});

var markdownLineEnding$g = markdownLineEnding_1;
var factorySpace$e = factorySpace$h;
var partialBlankLine$3 = partialBlankLine_1;

var tokenize$1 = initializeDocument;
var containerConstruct = {
  tokenize: tokenizeContainer
};
var lazyFlowConstruct = {
  tokenize: tokenizeLazyFlow
};

function initializeDocument(effects) {
  var self = this;
  var stack = [];
  var continued = 0;
  var inspectConstruct = {
    tokenize: tokenizeInspect,
    partial: true
  };
  var inspectResult;
  var childFlow;
  var childToken;
  return start

  function start(code) {
    if (continued < stack.length) {
      self.containerState = stack[continued][1];
      return effects.attempt(
        stack[continued][0].continuation,
        documentContinue,
        documentContinued
      )(code)
    }

    return documentContinued(code)
  }

  function documentContinue(code) {
    continued++;
    return start(code)
  }

  function documentContinued(code) {
    // If we’re in a concrete construct (such as when expecting another line of
    // HTML, or we resulted in lazy content), we can immediately start flow.
    if (inspectResult && inspectResult.flowContinue) {
      return flowStart(code)
    }

    self.interrupt =
      childFlow &&
      childFlow.currentConstruct &&
      childFlow.currentConstruct.interruptible;
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code)
  }

  function containerContinue(code) {
    stack.push([self.currentConstruct, self.containerState]);
    self.containerState = undefined;
    return documentContinued(code)
  }

  function flowStart(code) {
    if (code === null) {
      exitContainers(0, true);
      effects.consume(code);
      return
    }

    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter('chunkFlow', {
      contentType: 'flow',
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code)
  }

  function flowContinue(code) {
    if (code === null) {
      continueFlow(effects.exit('chunkFlow'));
      return flowStart(code)
    }

    if (markdownLineEnding$g(code)) {
      effects.consume(code);
      continueFlow(effects.exit('chunkFlow'));
      return effects.check(inspectConstruct, documentAfterPeek)
    }

    effects.consume(code);
    return flowContinue
  }

  function documentAfterPeek(code) {
    exitContainers(
      inspectResult.continued,
      inspectResult && inspectResult.flowEnd
    );
    continued = 0;
    return start(code)
  }

  function continueFlow(token) {
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.lazy = inspectResult && inspectResult.lazy;
    childFlow.defineSkip(token.start);
    childFlow.write(self.sliceStream(token));
  }

  function exitContainers(size, end) {
    var index = stack.length; // Close the flow.

    if (childFlow && end) {
      childFlow.write([null]);
      childToken = childFlow = undefined;
    } // Exit open containers.

    while (index-- > size) {
      self.containerState = stack[index][1];
      stack[index][0].exit.call(self, effects);
    }

    stack.length = size;
  }

  function tokenizeInspect(effects, ok) {
    var subcontinued = 0;
    inspectResult = {};
    return inspectStart

    function inspectStart(code) {
      if (subcontinued < stack.length) {
        self.containerState = stack[subcontinued][1];
        return effects.attempt(
          stack[subcontinued][0].continuation,
          inspectContinue,
          inspectLess
        )(code)
      } // If we’re continued but in a concrete flow, we can’t have more
      // containers.

      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        inspectResult.flowContinue = true;
        return inspectDone(code)
      }

      self.interrupt =
        childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
      self.containerState = {};
      return effects.attempt(
        containerConstruct,
        inspectFlowEnd,
        inspectDone
      )(code)
    }

    function inspectContinue(code) {
      subcontinued++;
      return self.containerState._closeFlow
        ? inspectFlowEnd(code)
        : inspectStart(code)
    }

    function inspectLess(code) {
      if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
        // Maybe another container?
        self.containerState = {};
        return effects.attempt(
          containerConstruct,
          inspectFlowEnd, // Maybe flow, or a blank line?
          effects.attempt(
            lazyFlowConstruct,
            inspectFlowEnd,
            effects.check(partialBlankLine$3, inspectFlowEnd, inspectLazy)
          )
        )(code)
      } // Otherwise we’re interrupting.

      return inspectFlowEnd(code)
    }

    function inspectLazy(code) {
      // Act as if all containers are continued.
      subcontinued = stack.length;
      inspectResult.lazy = true;
      inspectResult.flowContinue = true;
      return inspectDone(code)
    } // We’re done with flow if we have more containers, or an interruption.

    function inspectFlowEnd(code) {
      inspectResult.flowEnd = true;
      return inspectDone(code)
    }

    function inspectDone(code) {
      inspectResult.continued = subcontinued;
      self.interrupt = self.containerState = undefined;
      return ok(code)
    }
  }
}

function tokenizeContainer(effects, ok, nok) {
  return factorySpace$e(
    effects,
    effects.attempt(this.parser.constructs.document, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

function tokenizeLazyFlow(effects, ok, nok) {
  return factorySpace$e(
    effects,
    effects.lazy(this.parser.constructs.flow, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

document$2.tokenize = tokenize$1;

var flow$3 = {};

var assign$3 = assign_1;
var chunkedSplice$6 = chunkedSplice_1;
var shallow$5 = shallow_1;

function subtokenize$2(events) {
  var jumps = {};
  var index = -1;
  var event;
  var lineIndex;
  var otherIndex;
  var otherEvent;
  var parameters;
  var subevents;
  var more;

  while (++index < events.length) {
    while (index in jumps) {
      index = jumps[index];
    }

    event = events[index]; // Add a hook for the GFM tasklist extension, which needs to know if text
    // is in the first content of a list item.

    if (
      index &&
      event[1].type === 'chunkFlow' &&
      events[index - 1][1].type === 'listItemPrefix'
    ) {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === 'lineEndingBlank'
      ) {
        otherIndex += 2;
      }

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === 'content'
      ) {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === 'content') {
            break
          }

          if (subevents[otherIndex][1].type === 'chunkText') {
            subevents[otherIndex][1].isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    } // Enter.

    if (event[0] === 'enter') {
      if (event[1].contentType) {
        assign$3(jumps, subcontent(events, index));
        index = jumps[index];
        more = true;
      }
    } // Exit.
    else if (event[1]._container || event[1]._movePreviousLineEndings) {
      otherIndex = index;
      lineIndex = undefined;

      while (otherIndex--) {
        otherEvent = events[otherIndex];

        if (
          otherEvent[1].type === 'lineEnding' ||
          otherEvent[1].type === 'lineEndingBlank'
        ) {
          if (otherEvent[0] === 'enter') {
            if (lineIndex) {
              events[lineIndex][1].type = 'lineEndingBlank';
            }

            otherEvent[1].type = 'lineEnding';
            lineIndex = otherIndex;
          }
        } else {
          break
        }
      }

      if (lineIndex) {
        // Fix position.
        event[1].end = shallow$5(events[lineIndex][1].start); // Switch container exit w/ line endings.

        parameters = events.slice(lineIndex, index);
        parameters.unshift(event);
        chunkedSplice$6(events, lineIndex, index - lineIndex + 1, parameters);
      }
    }
  }

  return !more
}

function subcontent(events, eventIndex) {
  var token = events[eventIndex][1];
  var context = events[eventIndex][2];
  var startPosition = eventIndex - 1;
  var startPositions = [];
  var tokenizer =
    token._tokenizer || context.parser[token.contentType](token.start);
  var childEvents = tokenizer.events;
  var jumps = [];
  var gaps = {};
  var stream;
  var previous;
  var index;
  var entered;
  var end;
  var adjust; // Loop forward through the linked tokens to pass them in order to the
  // subtokenizer.

  while (token) {
    // Find the position of the event for this token.
    while (events[++startPosition][1] !== token) {
      // Empty.
    }

    startPositions.push(startPosition);

    if (!token._tokenizer) {
      stream = context.sliceStream(token);

      if (!token.next) {
        stream.push(null);
      }

      if (previous) {
        tokenizer.defineSkip(token.start);
      }

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }

      tokenizer.write(stream);

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
      }
    } // Unravel the next token.

    previous = token;
    token = token.next;
  } // Now, loop back through all events (and linked tokens), to figure out which
  // parts belong where.

  token = previous;
  index = childEvents.length;

  while (index--) {
    // Make sure we’ve at least seen something (final eol is part of the last
    // token).
    if (childEvents[index][0] === 'enter') {
      entered = true;
    } else if (
      // Find a void token that includes a break.
      entered &&
      childEvents[index][1].type === childEvents[index - 1][1].type &&
      childEvents[index][1].start.line !== childEvents[index][1].end.line
    ) {
      add(childEvents.slice(index + 1, end));
      // Help GC.
      token._tokenizer = token.next = undefined;
      token = token.previous;
      end = index + 1;
    }
  }

  // Help GC.
  tokenizer.events = token._tokenizer = token.next = undefined; // Do head:

  add(childEvents.slice(0, end));
  index = -1;
  adjust = 0;

  while (++index < jumps.length) {
    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
    adjust += jumps[index][1] - jumps[index][0] - 1;
  }

  return gaps

  function add(slice) {
    var start = startPositions.pop();
    jumps.unshift([start, start + slice.length - 1]);
    chunkedSplice$6(events, start, 2, slice);
  }
}

var subtokenize_1 = subtokenize$2;

var markdownLineEnding$f = markdownLineEnding_1;
var prefixSize$3 = prefixSize_1;
var subtokenize$1 = subtokenize_1;
var factorySpace$d = factorySpace$h;

// No name because it must not be turned off.
var content$2 = {
  tokenize: tokenizeContent,
  resolve: resolveContent,
  interruptible: true,
  lazy: true
};
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
}; // Content is transparent: it’s parsed right now. That way, definitions are also
// parsed right now: before text in paragraphs (specifically, media) are parsed.

function resolveContent(events) {
  subtokenize$1(events);
  return events
}

function tokenizeContent(effects, ok) {
  var previous;
  return start

  function start(code) {
    effects.enter('content');
    previous = effects.enter('chunkContent', {
      contentType: 'content'
    });
    return data(code)
  }

  function data(code) {
    if (code === null) {
      return contentEnd(code)
    }

    if (markdownLineEnding$f(code)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code)
    } // Data.

    effects.consume(code);
    return data
  }

  function contentEnd(code) {
    effects.exit('chunkContent');
    effects.exit('content');
    return ok(code)
  }

  function contentContinue(code) {
    effects.consume(code);
    effects.exit('chunkContent');
    previous = previous.next = effects.enter('chunkContent', {
      contentType: 'content',
      previous: previous
    });
    return data
  }
}

function tokenizeContinuation(effects, ok, nok) {
  var self = this;
  return startLookahead

  function startLookahead(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$d(effects, prefixed, 'linePrefix')
  }

  function prefixed(code) {
    if (code === null || markdownLineEnding$f(code)) {
      return nok(code)
    }

    if (
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
      prefixSize$3(self.events, 'linePrefix') < 4
    ) {
      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
    }

    return ok(code)
  }
}

var content_1 = content$2;

Object.defineProperty(flow$3, '__esModule', {value: true});

var content$1 = content_1;
var factorySpace$c = factorySpace$h;
var partialBlankLine$2 = partialBlankLine_1;

var tokenize = initializeFlow;

function initializeFlow(effects) {
  var self = this;
  var initial = effects.attempt(
    // Try to parse a blank line.
    partialBlankLine$2,
    atBlankEnding, // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace$c(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content$1, afterConstruct)
        ),
        'linePrefix'
      )
    )
  );
  return initial

  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    self.currentConstruct = undefined;
    return initial
  }

  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    self.currentConstruct = undefined;
    return initial
  }
}

flow$3.tokenize = tokenize;

var text$4 = {};

Object.defineProperty(text$4, '__esModule', {value: true});

var assign$2 = assign_1;
var shallow$4 = shallow_1;

var text$3 = initializeFactory('text');
var string$1 = initializeFactory('string');
var resolver = {
  resolveAll: createResolver()
};

function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === 'text' ? resolveAllLineSuffixes : undefined
    )
  }

  function initializeText(effects) {
    var self = this;
    var constructs = this.parser.constructs[field];
    var text = effects.attempt(constructs, start, notText);
    return start

    function start(code) {
      return atBreak(code) ? text(code) : notText(code)
    }

    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return
      }

      effects.enter('data');
      effects.consume(code);
      return data
    }

    function data(code) {
      if (atBreak(code)) {
        effects.exit('data');
        return text(code)
      } // Data.

      effects.consume(code);
      return data
    }

    function atBreak(code) {
      var list = constructs[code];
      var index = -1;

      if (code === null) {
        return true
      }

      if (list) {
        while (++index < list.length) {
          if (
            !list[index].previous ||
            list[index].previous.call(self, self.previous)
          ) {
            return true
          }
        }
      }
    }
  }
}

function createResolver(extraResolver) {
  return resolveAllText

  function resolveAllText(events, context) {
    var index = -1;
    var enter; // A rather boring computation (to merge adjacent `data` events) which
    // improves mm performance by 29%.

    while (++index <= events.length) {
      if (enter === undefined) {
        if (events[index] && events[index][1].type === 'data') {
          enter = index;
          index++;
        }
      } else if (!events[index] || events[index][1].type !== 'data') {
        // Don’t do anything if there is one data token.
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          index = enter + 2;
        }

        enter = undefined;
      }
    }

    return extraResolver ? extraResolver(events, context) : events
  }
} // A rather ugly set of instructions which again looks at chunks in the input
// stream.
// The reason to do this here is that it is *much* faster to parse in reverse.
// And that we can’t hook into `null` to split the line suffix before an EOF.
// To do: figure out if we can make this into a clean utility, or even in core.
// As it will be useful for GFMs literal autolink extension (and maybe even
// tables?)

function resolveAllLineSuffixes(events, context) {
  var eventIndex = -1;
  var chunks;
  var data;
  var chunk;
  var index;
  var bufferIndex;
  var size;
  var tabs;
  var token;

  while (++eventIndex <= events.length) {
    if (
      (eventIndex === events.length ||
        events[eventIndex][1].type === 'lineEnding') &&
      events[eventIndex - 1][1].type === 'data'
    ) {
      data = events[eventIndex - 1][1];
      chunks = context.sliceStream(data);
      index = chunks.length;
      bufferIndex = -1;
      size = 0;
      tabs = undefined;

      while (index--) {
        chunk = chunks[index];

        if (typeof chunk === 'string') {
          bufferIndex = chunk.length;

          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }

          if (bufferIndex) break
          bufferIndex = -1;
        } // Number
        else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1);
        else {
          // Replacement character, exit.
          index++;
          break
        }
      }

      if (size) {
        token = {
          type:
            eventIndex === events.length || tabs || size < 2
              ? 'lineSuffix'
              : 'hardBreakTrailing',
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index,
            _bufferIndex: index
              ? bufferIndex
              : data.start._bufferIndex + bufferIndex
          },
          end: shallow$4(data.end)
        };
        data.end = shallow$4(token.start);

        if (data.start.offset === data.end.offset) {
          assign$2(data, token);
        } else {
          events.splice(
            eventIndex,
            0,
            ['enter', token, context],
            ['exit', token, context]
          );
          eventIndex += 2;
        }
      }

      eventIndex++;
    }
  }

  return events
}

text$4.resolver = resolver;
text$4.string = string$1;
text$4.text = text$3;

var chunkedSplice$5 = chunkedSplice_1;

function chunkedPush$3(list, items) {
  if (list.length) {
    chunkedSplice$5(list, list.length, 0, items);
    return list
  }

  return items
}

var chunkedPush_1 = chunkedPush$3;

var fromCharCode$1 = fromCharCode_1;

function serializeChunks$1(chunks) {
  var index = -1;
  var result = [];
  var chunk;
  var value;
  var atTab;

  while (++index < chunks.length) {
    chunk = chunks[index];

    if (typeof chunk === 'string') {
      value = chunk;
    } else if (chunk === -5) {
      value = '\r';
    } else if (chunk === -4) {
      value = '\n';
    } else if (chunk === -3) {
      value = '\r' + '\n';
    } else if (chunk === -2) {
      value = '\t';
    } else if (chunk === -1) {
      if (atTab) continue
      value = ' ';
    } else {
      // Currently only replacement character.
      value = fromCharCode$1(chunk);
    }

    atTab = chunk === -2;
    result.push(value);
  }

  return result.join('')
}

var serializeChunks_1 = serializeChunks$1;

function sliceChunks$1(chunks, token) {
  var startIndex = token.start._index;
  var startBufferIndex = token.start._bufferIndex;
  var endIndex = token.end._index;
  var endBufferIndex = token.end._bufferIndex;
  var view;

  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);

    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }

    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }

  return view
}

var sliceChunks_1 = sliceChunks$1;

var assign$1 = assign_1;
var markdownLineEnding$e = markdownLineEnding_1;
var chunkedPush$2 = chunkedPush_1;
var chunkedSplice$4 = chunkedSplice_1;
var miniflat$1 = miniflat_1;
var resolveAll$2 = resolveAll_1;
var serializeChunks = serializeChunks_1;
var shallow$3 = shallow_1;
var sliceChunks = sliceChunks_1;

// Create a tokenizer.
// Tokenizers deal with one type of data (e.g., containers, flow, text).
// The parser is the object dealing with it all.
// `initialize` works like other constructs, except that only its `tokenize`
// function is used, in which case it doesn’t receive an `ok` or `nok`.
// `from` can be given to set the point before the first character, although
// when further lines are indented, they must be set with `defineSkip`.
function createTokenizer$1(parser, initialize, from) {
  var point = from
    ? shallow$3(from)
    : {
        line: 1,
        column: 1,
        offset: 0
      };
  var columnStart = {};
  var resolveAllConstructs = [];
  var chunks = [];
  var stack = [];

  var effects = {
    consume: consume,
    enter: enter,
    exit: exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    }),
    lazy: constructFactory(onsuccessfulcheck, {
      lazy: true
    })
  }; // State and tools for resolving and serializing.

  var context = {
    previous: null,
    events: [],
    parser: parser,
    sliceStream: sliceStream,
    sliceSerialize: sliceSerialize,
    now: now,
    defineSkip: skip,
    write: write
  }; // The state function.

  var state = initialize.tokenize.call(context, effects); // Track which character we expect to be consumed, to catch bugs.

  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  } // Store where we are in the input stream.

  point._index = 0;
  point._bufferIndex = -1;
  return context

  function write(slice) {
    chunks = chunkedPush$2(chunks, slice);
    main(); // Exit if we’re not done, resolve might change stuff.

    if (chunks[chunks.length - 1] !== null) {
      return []
    }

    addResult(initialize, 0); // Otherwise, resolve, and exit.

    context.events = resolveAll$2(resolveAllConstructs, context.events, context);
    return context.events
  } //
  // Tools.
  //

  function sliceSerialize(token) {
    return serializeChunks(sliceStream(token))
  }

  function sliceStream(token) {
    return sliceChunks(chunks, token)
  }

  function now() {
    return shallow$3(point)
  }

  function skip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  } //
  // State management.
  //
  // Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
  // `consume`).
  // Here is where we walk through the chunks, which either include strings of
  // several characters, or numerical character codes.
  // The reason to do this in a loop instead of a call is so the stack can
  // drain.

  function main() {
    var chunkIndex;
    var chunk;

    while (point._index < chunks.length) {
      chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

      if (typeof chunk === 'string') {
        chunkIndex = point._index;

        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }

        while (
          point._index === chunkIndex &&
          point._bufferIndex < chunk.length
        ) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  } // Deal with one code.

  function go(code) {
    state = state(code);
  } // Move a character forward.

  function consume(code) {
    if (markdownLineEnding$e(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    } // Not in a string chunk.

    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++; // At end of string chunk.

      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    } // Expose the previous character.

    context.previous = code; // Mark as consumed.
  } // Start a token.

  function enter(type, fields) {
    var token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(['enter', token, context]);
    stack.push(token);
    return token
  } // Stop a token.

  function exit(type) {
    var token = stack.pop();
    token.end = now();
    context.events.push(['exit', token, context]);
    return token
  } // Use results.

  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  } // Discard results.

  function onsuccessfulcheck(construct, info) {
    info.restore();
  } // Factory to attempt/check/interrupt.

  function constructFactory(onreturn, fields) {
    return hook // Handle either an object mapping codes to constructs, a list of
    // constructs, or a single construct.

    function hook(constructs, returnState, bogusState) {
      var listOfConstructs;
      var constructIndex;
      var currentConstruct;
      var info;
      return constructs.tokenize || 'length' in constructs
        ? handleListOfConstructs(miniflat$1(constructs))
        : handleMapOfConstructs

      function handleMapOfConstructs(code) {
        if (code in constructs || null in constructs) {
          return handleListOfConstructs(
            constructs.null
              ? /* c8 ignore next */
                miniflat$1(constructs[code]).concat(miniflat$1(constructs.null))
              : constructs[code]
          )(code)
        }

        return bogusState(code)
      }

      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        return handleConstruct(list[constructIndex])
      }

      function handleConstruct(construct) {
        return start

        function start(code) {
          // To do: not nede to store if there is no bogus state, probably?
          // Currently doesn’t work because `inspect` in document does a check
          // w/o a bogus, which doesn’t make sense. But it does seem to help perf
          // by not storing.
          info = store();
          currentConstruct = construct;

          if (!construct.partial) {
            context.currentConstruct = construct;
          }

          if (
            construct.name &&
            context.parser.constructs.disable.null.indexOf(construct.name) > -1
          ) {
            return nok()
          }

          return construct.tokenize.call(
            fields ? assign$1({}, context, fields) : context,
            effects,
            ok,
            nok
          )(code)
        }
      }

      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState
      }

      function nok(code) {
        info.restore();

        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex])
        }

        return bogusState
      }
    }
  }

  function addResult(construct, from) {
    if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
      resolveAllConstructs.push(construct);
    }

    if (construct.resolve) {
      chunkedSplice$4(
        context.events,
        from,
        context.events.length - from,
        construct.resolve(context.events.slice(from), context)
      );
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }

  function store() {
    var startPoint = now();
    var startPrevious = context.previous;
    var startCurrentConstruct = context.currentConstruct;
    var startEventsIndex = context.events.length;
    var startStack = Array.from(stack);
    return {
      restore: restore,
      from: startEventsIndex
    }

    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }

  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}

var createTokenizer_1 = createTokenizer$1;

var constructs$1 = {};

// chunks (replacement characters, tabs, or line endings).

function movePoint$1(point, offset) {
  point.column += offset;
  point.offset += offset;
  point._bufferIndex += offset;
  return point
}

var movePoint_1 = movePoint$1;

var chunkedPush$1 = chunkedPush_1;
var chunkedSplice$3 = chunkedSplice_1;
var classifyCharacter = classifyCharacter_1;
var movePoint = movePoint_1;
var resolveAll$1 = resolveAll_1;
var shallow$2 = shallow_1;

var attention$1 = {
  name: 'attention',
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};

function resolveAllAttention(events, context) {
  var index = -1;
  var open;
  var group;
  var text;
  var openingSequence;
  var closingSequence;
  var use;
  var nextEvents;
  var offset; // Walk through all events.
  //
  // Note: performance of this is fine on an mb of normal markdown, but it’s
  // a bottleneck for malicious stuff.

  while (++index < events.length) {
    // Find a token that can close.
    if (
      events[index][0] === 'enter' &&
      events[index][1].type === 'attentionSequence' &&
      events[index][1]._close
    ) {
      open = index; // Now walk back to find an opener.

      while (open--) {
        // Find a token that can open the closer.
        if (
          events[open][0] === 'exit' &&
          events[open][1].type === 'attentionSequence' &&
          events[open][1]._open && // If the markers are the same:
          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
            context.sliceSerialize(events[index][1]).charCodeAt(0)
        ) {
          // If the opening can close or the closing can open,
          // and the close size *is not* a multiple of three,
          // but the sum of the opening and closing size *is* multiple of three,
          // then don’t match.
          if (
            (events[open][1]._close || events[index][1]._open) &&
            (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
            !(
              (events[open][1].end.offset -
                events[open][1].start.offset +
                events[index][1].end.offset -
                events[index][1].start.offset) %
              3
            )
          ) {
            continue
          } // Number of markers to use from the sequence.

          use =
            events[open][1].end.offset - events[open][1].start.offset > 1 &&
            events[index][1].end.offset - events[index][1].start.offset > 1
              ? 2
              : 1;
          openingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: movePoint(shallow$2(events[open][1].end), -use),
            end: shallow$2(events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: shallow$2(events[index][1].start),
            end: movePoint(shallow$2(events[index][1].start), use)
          };
          text = {
            type: use > 1 ? 'strongText' : 'emphasisText',
            start: shallow$2(events[open][1].end),
            end: shallow$2(events[index][1].start)
          };
          group = {
            type: use > 1 ? 'strong' : 'emphasis',
            start: shallow$2(openingSequence.start),
            end: shallow$2(closingSequence.end)
          };
          events[open][1].end = shallow$2(openingSequence.start);
          events[index][1].start = shallow$2(closingSequence.end);
          nextEvents = []; // If there are more markers in the opening, add them before.

          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = chunkedPush$1(nextEvents, [
              ['enter', events[open][1], context],
              ['exit', events[open][1], context]
            ]);
          } // Opening.

          nextEvents = chunkedPush$1(nextEvents, [
            ['enter', group, context],
            ['enter', openingSequence, context],
            ['exit', openingSequence, context],
            ['enter', text, context]
          ]); // Between.

          nextEvents = chunkedPush$1(
            nextEvents,
            resolveAll$1(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index),
              context
            )
          ); // Closing.

          nextEvents = chunkedPush$1(nextEvents, [
            ['exit', text, context],
            ['enter', closingSequence, context],
            ['exit', closingSequence, context],
            ['exit', group, context]
          ]); // If there are more markers in the closing, add them after.

          if (events[index][1].end.offset - events[index][1].start.offset) {
            offset = 2;
            nextEvents = chunkedPush$1(nextEvents, [
              ['enter', events[index][1], context],
              ['exit', events[index][1], context]
            ]);
          } else {
            offset = 0;
          }

          chunkedSplice$3(events, open - 1, index - open + 3, nextEvents);
          index = open + nextEvents.length - offset - 2;
          break
        }
      }
    }
  } // Remove remaining sequences.

  index = -1;

  while (++index < events.length) {
    if (events[index][1].type === 'attentionSequence') {
      events[index][1].type = 'data';
    }
  }

  return events
}

function tokenizeAttention(effects, ok) {
  var before = classifyCharacter(this.previous);
  var marker;
  return start

  function start(code) {
    effects.enter('attentionSequence');
    marker = code;
    return sequence(code)
  }

  function sequence(code) {
    var token;
    var after;
    var open;
    var close;

    if (code === marker) {
      effects.consume(code);
      return sequence
    }

    token = effects.exit('attentionSequence');
    after = classifyCharacter(code);
    open = !after || (after === 2 && before);
    close = !before || (before === 2 && after);
    token._open = marker === 42 ? open : open && (before || !close);
    token._close = marker === 42 ? close : close && (after || !open);
    return ok(code)
  }
}

var attention_1 = attention$1;

var regexCheck$3 = regexCheck_1;

var asciiAtext$1 = regexCheck$3(/[#-'*+\--9=?A-Z^-~]/);

var asciiAtext_1 = asciiAtext$1;

var asciiAlpha$2 = asciiAlpha_1;
var asciiAlphanumeric$3 = asciiAlphanumeric_1;
var asciiAtext = asciiAtext_1;
var asciiControl$1 = asciiControl_1;

var autolink$1 = {
  name: 'autolink',
  tokenize: tokenizeAutolink
};

function tokenizeAutolink(effects, ok, nok) {
  var size = 1;
  return start

  function start(code) {
    effects.enter('autolink');
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.enter('autolinkProtocol');
    return open
  }

  function open(code) {
    if (asciiAlpha$2(code)) {
      effects.consume(code);
      return schemeOrEmailAtext
    }

    return asciiAtext(code) ? emailAtext(code) : nok(code)
  }

  function schemeOrEmailAtext(code) {
    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric$3(code)
      ? schemeInsideOrEmailAtext(code)
      : emailAtext(code)
  }

  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      return urlInside
    }

    if (
      (code === 43 || code === 45 || code === 46 || asciiAlphanumeric$3(code)) &&
      size++ < 32
    ) {
      effects.consume(code);
      return schemeInsideOrEmailAtext
    }

    return emailAtext(code)
  }

  function urlInside(code) {
    if (code === 62) {
      effects.exit('autolinkProtocol');
      return end(code)
    }

    if (code === 32 || code === 60 || asciiControl$1(code)) {
      return nok(code)
    }

    effects.consume(code);
    return urlInside
  }

  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot
    }

    if (asciiAtext(code)) {
      effects.consume(code);
      return emailAtext
    }

    return nok(code)
  }

  function emailAtSignOrDot(code) {
    return asciiAlphanumeric$3(code) ? emailLabel(code) : nok(code)
  }

  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot
    }

    if (code === 62) {
      // Exit, then change the type.
      effects.exit('autolinkProtocol').type = 'autolinkEmail';
      return end(code)
    }

    return emailValue(code)
  }

  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric$3(code)) && size++ < 63) {
      effects.consume(code);
      return code === 45 ? emailValue : emailLabel
    }

    return nok(code)
  }

  function end(code) {
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.exit('autolink');
    return ok
  }
}

var autolink_1 = autolink$1;

var markdownSpace$7 = markdownSpace_1;
var factorySpace$b = factorySpace$h;

var blockQuote$1 = {
  name: 'blockQuote',
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit: exit
};

function tokenizeBlockQuoteStart(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    if (code === 62) {
      if (!self.containerState.open) {
        effects.enter('blockQuote', {
          _container: true
        });
        self.containerState.open = true;
      }

      effects.enter('blockQuotePrefix');
      effects.enter('blockQuoteMarker');
      effects.consume(code);
      effects.exit('blockQuoteMarker');
      return after
    }

    return nok(code)
  }

  function after(code) {
    if (markdownSpace$7(code)) {
      effects.enter('blockQuotePrefixWhitespace');
      effects.consume(code);
      effects.exit('blockQuotePrefixWhitespace');
      effects.exit('blockQuotePrefix');
      return ok
    }

    effects.exit('blockQuotePrefix');
    return ok(code)
  }
}

function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  return factorySpace$b(
    effects,
    effects.attempt(blockQuote$1, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

function exit(effects) {
  effects.exit('blockQuote');
}

var blockQuote_1 = blockQuote$1;

var regexCheck$2 = regexCheck_1;

var asciiPunctuation$1 = regexCheck$2(/[!-/:-@[-`{-~]/);

var asciiPunctuation_1 = asciiPunctuation$1;

var asciiPunctuation = asciiPunctuation_1;

var characterEscape$1 = {
  name: 'characterEscape',
  tokenize: tokenizeCharacterEscape
};

function tokenizeCharacterEscape(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('characterEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    effects.exit('escapeMarker');
    return open
  }

  function open(code) {
    if (asciiPunctuation(code)) {
      effects.enter('characterEscapeValue');
      effects.consume(code);
      effects.exit('characterEscapeValue');
      effects.exit('characterEscape');
      return ok
    }

    return nok(code)
  }
}

var characterEscape_1 = characterEscape$1;

var AEli = "Æ";
var AElig = "Æ";
var AM = "&";
var AMP = "&";
var Aacut = "Á";
var Aacute = "Á";
var Abreve = "Ă";
var Acir = "Â";
var Acirc = "Â";
var Acy = "А";
var Afr = "𝔄";
var Agrav = "À";
var Agrave = "À";
var Alpha = "Α";
var Amacr = "Ā";
var And = "⩓";
var Aogon = "Ą";
var Aopf = "𝔸";
var ApplyFunction = "⁡";
var Arin = "Å";
var Aring = "Å";
var Ascr = "𝒜";
var Assign = "≔";
var Atild = "Ã";
var Atilde = "Ã";
var Aum = "Ä";
var Auml = "Ä";
var Backslash = "∖";
var Barv = "⫧";
var Barwed = "⌆";
var Bcy = "Б";
var Because = "∵";
var Bernoullis = "ℬ";
var Beta = "Β";
var Bfr = "𝔅";
var Bopf = "𝔹";
var Breve = "˘";
var Bscr = "ℬ";
var Bumpeq = "≎";
var CHcy = "Ч";
var COP = "©";
var COPY = "©";
var Cacute = "Ć";
var Cap = "⋒";
var CapitalDifferentialD = "ⅅ";
var Cayleys = "ℭ";
var Ccaron = "Č";
var Ccedi = "Ç";
var Ccedil = "Ç";
var Ccirc = "Ĉ";
var Cconint = "∰";
var Cdot = "Ċ";
var Cedilla = "¸";
var CenterDot = "·";
var Cfr = "ℭ";
var Chi = "Χ";
var CircleDot = "⊙";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var Colon = "∷";
var Colone = "⩴";
var Congruent = "≡";
var Conint = "∯";
var ContourIntegral = "∮";
var Copf = "ℂ";
var Coproduct = "∐";
var CounterClockwiseContourIntegral = "∳";
var Cross = "⨯";
var Cscr = "𝒞";
var Cup = "⋓";
var CupCap = "≍";
var DD = "ⅅ";
var DDotrahd = "⤑";
var DJcy = "Ђ";
var DScy = "Ѕ";
var DZcy = "Џ";
var Dagger = "‡";
var Darr = "↡";
var Dashv = "⫤";
var Dcaron = "Ď";
var Dcy = "Д";
var Del = "∇";
var Delta = "Δ";
var Dfr = "𝔇";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var Diamond = "⋄";
var DifferentialD = "ⅆ";
var Dopf = "𝔻";
var Dot = "¨";
var DotDot = "⃜";
var DotEqual = "≐";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrow = "↓";
var DownArrowBar = "⤓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVector = "↽";
var DownLeftVectorBar = "⥖";
var DownRightTeeVector = "⥟";
var DownRightVector = "⇁";
var DownRightVectorBar = "⥗";
var DownTee = "⊤";
var DownTeeArrow = "↧";
var Downarrow = "⇓";
var Dscr = "𝒟";
var Dstrok = "Đ";
var ENG = "Ŋ";
var ET = "Ð";
var ETH = "Ð";
var Eacut = "É";
var Eacute = "É";
var Ecaron = "Ě";
var Ecir = "Ê";
var Ecirc = "Ê";
var Ecy = "Э";
var Edot = "Ė";
var Efr = "𝔈";
var Egrav = "È";
var Egrave = "È";
var Element = "∈";
var Emacr = "Ē";
var EmptySmallSquare = "◻";
var EmptyVerySmallSquare = "▫";
var Eogon = "Ę";
var Eopf = "𝔼";
var Epsilon = "Ε";
var Equal = "⩵";
var EqualTilde = "≂";
var Equilibrium = "⇌";
var Escr = "ℰ";
var Esim = "⩳";
var Eta = "Η";
var Eum = "Ë";
var Euml = "Ë";
var Exists = "∃";
var ExponentialE = "ⅇ";
var Fcy = "Ф";
var Ffr = "𝔉";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var Fopf = "𝔽";
var ForAll = "∀";
var Fouriertrf = "ℱ";
var Fscr = "ℱ";
var GJcy = "Ѓ";
var G = ">";
var GT = ">";
var Gamma = "Γ";
var Gammad = "Ϝ";
var Gbreve = "Ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var Gcy = "Г";
var Gdot = "Ġ";
var Gfr = "𝔊";
var Gg = "⋙";
var Gopf = "𝔾";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var Gt = "≫";
var HARDcy = "Ъ";
var Hacek = "ˇ";
var Hat = "^";
var Hcirc = "Ĥ";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var Hopf = "ℍ";
var HorizontalLine = "─";
var Hscr = "ℋ";
var Hstrok = "Ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var IEcy = "Е";
var IJlig = "Ĳ";
var IOcy = "Ё";
var Iacut = "Í";
var Iacute = "Í";
var Icir = "Î";
var Icirc = "Î";
var Icy = "И";
var Idot = "İ";
var Ifr = "ℑ";
var Igrav = "Ì";
var Igrave = "Ì";
var Im = "ℑ";
var Imacr = "Ī";
var ImaginaryI = "ⅈ";
var Implies = "⇒";
var Int = "∬";
var Integral = "∫";
var Intersection = "⋂";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var Iogon = "Į";
var Iopf = "𝕀";
var Iota = "Ι";
var Iscr = "ℐ";
var Itilde = "Ĩ";
var Iukcy = "І";
var Ium = "Ï";
var Iuml = "Ï";
var Jcirc = "Ĵ";
var Jcy = "Й";
var Jfr = "𝔍";
var Jopf = "𝕁";
var Jscr = "𝒥";
var Jsercy = "Ј";
var Jukcy = "Є";
var KHcy = "Х";
var KJcy = "Ќ";
var Kappa = "Κ";
var Kcedil = "Ķ";
var Kcy = "К";
var Kfr = "𝔎";
var Kopf = "𝕂";
var Kscr = "𝒦";
var LJcy = "Љ";
var L = "<";
var LT = "<";
var Lacute = "Ĺ";
var Lambda = "Λ";
var Lang = "⟪";
var Laplacetrf = "ℒ";
var Larr = "↞";
var Lcaron = "Ľ";
var Lcedil = "Ļ";
var Lcy = "Л";
var LeftAngleBracket = "⟨";
var LeftArrow = "←";
var LeftArrowBar = "⇤";
var LeftArrowRightArrow = "⇆";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVector = "⇃";
var LeftDownVectorBar = "⥙";
var LeftFloor = "⌊";
var LeftRightArrow = "↔";
var LeftRightVector = "⥎";
var LeftTee = "⊣";
var LeftTeeArrow = "↤";
var LeftTeeVector = "⥚";
var LeftTriangle = "⊲";
var LeftTriangleBar = "⧏";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVector = "↿";
var LeftUpVectorBar = "⥘";
var LeftVector = "↼";
var LeftVectorBar = "⥒";
var Leftarrow = "⇐";
var Leftrightarrow = "⇔";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var LessLess = "⪡";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var Lfr = "𝔏";
var Ll = "⋘";
var Lleftarrow = "⇚";
var Lmidot = "Ŀ";
var LongLeftArrow = "⟵";
var LongLeftRightArrow = "⟷";
var LongRightArrow = "⟶";
var Longleftarrow = "⟸";
var Longleftrightarrow = "⟺";
var Longrightarrow = "⟹";
var Lopf = "𝕃";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var Lscr = "ℒ";
var Lsh = "↰";
var Lstrok = "Ł";
var Lt = "≪";
var Mcy = "М";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var MinusPlus = "∓";
var Mopf = "𝕄";
var Mscr = "ℳ";
var Mu = "Μ";
var NJcy = "Њ";
var Nacute = "Ń";
var Ncaron = "Ň";
var Ncedil = "Ņ";
var Ncy = "Н";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var Nfr = "𝔑";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var Nopf = "ℕ";
var Not = "⫬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangle = "⋫";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var Nscr = "𝒩";
var Ntild = "Ñ";
var Ntilde = "Ñ";
var Nu = "Ν";
var OElig = "Œ";
var Oacut = "Ó";
var Oacute = "Ó";
var Ocir = "Ô";
var Ocirc = "Ô";
var Ocy = "О";
var Odblac = "Ő";
var Ofr = "𝔒";
var Ograv = "Ò";
var Ograve = "Ò";
var Omacr = "Ō";
var Omega = "Ω";
var Omicron = "Ο";
var Oopf = "𝕆";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var Or = "⩔";
var Oscr = "𝒪";
var Oslas = "Ø";
var Oslash = "Ø";
var Otild = "Õ";
var Otilde = "Õ";
var Otimes = "⨷";
var Oum = "Ö";
var Ouml = "Ö";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var PartialD = "∂";
var Pcy = "П";
var Pfr = "𝔓";
var Phi = "Φ";
var Pi = "Π";
var PlusMinus = "±";
var Poincareplane = "ℌ";
var Popf = "ℙ";
var Pr = "⪻";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var Prime = "″";
var Product = "∏";
var Proportion = "∷";
var Proportional = "∝";
var Pscr = "𝒫";
var Psi = "Ψ";
var QUO = "\"";
var QUOT = "\"";
var Qfr = "𝔔";
var Qopf = "ℚ";
var Qscr = "𝒬";
var RBarr = "⤐";
var RE = "®";
var REG = "®";
var Racute = "Ŕ";
var Rang = "⟫";
var Rarr = "↠";
var Rarrtl = "⤖";
var Rcaron = "Ř";
var Rcedil = "Ŗ";
var Rcy = "Р";
var Re = "ℜ";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var Rfr = "ℜ";
var Rho = "Ρ";
var RightAngleBracket = "⟩";
var RightArrow = "→";
var RightArrowBar = "⇥";
var RightArrowLeftArrow = "⇄";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVector = "⇂";
var RightDownVectorBar = "⥕";
var RightFloor = "⌋";
var RightTee = "⊢";
var RightTeeArrow = "↦";
var RightTeeVector = "⥛";
var RightTriangle = "⊳";
var RightTriangleBar = "⧐";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVector = "↾";
var RightUpVectorBar = "⥔";
var RightVector = "⇀";
var RightVectorBar = "⥓";
var Rightarrow = "⇒";
var Ropf = "ℝ";
var RoundImplies = "⥰";
var Rrightarrow = "⇛";
var Rscr = "ℛ";
var Rsh = "↱";
var RuleDelayed = "⧴";
var SHCHcy = "Щ";
var SHcy = "Ш";
var SOFTcy = "Ь";
var Sacute = "Ś";
var Sc = "⪼";
var Scaron = "Š";
var Scedil = "Ş";
var Scirc = "Ŝ";
var Scy = "С";
var Sfr = "𝔖";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var Sigma = "Σ";
var SmallCircle = "∘";
var Sopf = "𝕊";
var Sqrt = "√";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var Sscr = "𝒮";
var Star = "⋆";
var Sub = "⋐";
var Subset = "⋐";
var SubsetEqual = "⊆";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var SuchThat = "∋";
var Sum = "∑";
var Sup = "⋑";
var Superset = "⊃";
var SupersetEqual = "⊇";
var Supset = "⋑";
var THOR = "Þ";
var THORN = "Þ";
var TRADE = "™";
var TSHcy = "Ћ";
var TScy = "Ц";
var Tab = "\t";
var Tau = "Τ";
var Tcaron = "Ť";
var Tcedil = "Ţ";
var Tcy = "Т";
var Tfr = "𝔗";
var Therefore = "∴";
var Theta = "Θ";
var ThickSpace = "  ";
var ThinSpace = " ";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var Topf = "𝕋";
var TripleDot = "⃛";
var Tscr = "𝒯";
var Tstrok = "Ŧ";
var Uacut = "Ú";
var Uacute = "Ú";
var Uarr = "↟";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var Ubreve = "Ŭ";
var Ucir = "Û";
var Ucirc = "Û";
var Ucy = "У";
var Udblac = "Ű";
var Ufr = "𝔘";
var Ugrav = "Ù";
var Ugrave = "Ù";
var Umacr = "Ū";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var Uopf = "𝕌";
var UpArrow = "↑";
var UpArrowBar = "⤒";
var UpArrowDownArrow = "⇅";
var UpDownArrow = "↕";
var UpEquilibrium = "⥮";
var UpTee = "⊥";
var UpTeeArrow = "↥";
var Uparrow = "⇑";
var Updownarrow = "⇕";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var Upsi = "ϒ";
var Upsilon = "Υ";
var Uring = "Ů";
var Uscr = "𝒰";
var Utilde = "Ũ";
var Uum = "Ü";
var Uuml = "Ü";
var VDash = "⊫";
var Vbar = "⫫";
var Vcy = "В";
var Vdash = "⊩";
var Vdashl = "⫦";
var Vee = "⋁";
var Verbar = "‖";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var Vopf = "𝕍";
var Vscr = "𝒱";
var Vvdash = "⊪";
var Wcirc = "Ŵ";
var Wedge = "⋀";
var Wfr = "𝔚";
var Wopf = "𝕎";
var Wscr = "𝒲";
var Xfr = "𝔛";
var Xi = "Ξ";
var Xopf = "𝕏";
var Xscr = "𝒳";
var YAcy = "Я";
var YIcy = "Ї";
var YUcy = "Ю";
var Yacut = "Ý";
var Yacute = "Ý";
var Ycirc = "Ŷ";
var Ycy = "Ы";
var Yfr = "𝔜";
var Yopf = "𝕐";
var Yscr = "𝒴";
var Yuml = "Ÿ";
var ZHcy = "Ж";
var Zacute = "Ź";
var Zcaron = "Ž";
var Zcy = "З";
var Zdot = "Ż";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var Zfr = "ℨ";
var Zopf = "ℤ";
var Zscr = "𝒵";
var aacut = "á";
var aacute = "á";
var abreve = "ă";
var ac = "∾";
var acE = "∾̳";
var acd = "∿";
var acir = "â";
var acirc = "â";
var acut = "´";
var acute = "´";
var acy = "а";
var aeli = "æ";
var aelig = "æ";
var af = "⁡";
var afr = "𝔞";
var agrav = "à";
var agrave = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var alpha = "α";
var amacr = "ā";
var amalg = "⨿";
var am = "&";
var amp = "&";
var and = "∧";
var andand = "⩕";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsd = "∡";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var aogon = "ą";
var aopf = "𝕒";
var ap = "≈";
var apE = "⩰";
var apacir = "⩯";
var ape = "≊";
var apid = "≋";
var apos = "'";
var approx = "≈";
var approxeq = "≊";
var arin = "å";
var aring = "å";
var ascr = "𝒶";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var atild = "ã";
var atilde = "ã";
var aum = "ä";
var auml = "ä";
var awconint = "∳";
var awint = "⨑";
var bNot = "⫭";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var barvee = "⊽";
var barwed = "⌅";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bnot = "⌐";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxDL = "╗";
var boxDR = "╔";
var boxDl = "╖";
var boxDr = "╓";
var boxH = "═";
var boxHD = "╦";
var boxHU = "╩";
var boxHd = "╤";
var boxHu = "╧";
var boxUL = "╝";
var boxUR = "╚";
var boxUl = "╜";
var boxUr = "╙";
var boxV = "║";
var boxVH = "╬";
var boxVL = "╣";
var boxVR = "╠";
var boxVh = "╫";
var boxVl = "╢";
var boxVr = "╟";
var boxbox = "⧉";
var boxdL = "╕";
var boxdR = "╒";
var boxdl = "┐";
var boxdr = "┌";
var boxh = "─";
var boxhD = "╥";
var boxhU = "╨";
var boxhd = "┬";
var boxhu = "┴";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxuL = "╛";
var boxuR = "╘";
var boxul = "┘";
var boxur = "└";
var boxv = "│";
var boxvH = "╪";
var boxvL = "╡";
var boxvR = "╞";
var boxvh = "┼";
var boxvl = "┤";
var boxvr = "├";
var bprime = "‵";
var breve = "˘";
var brvba = "¦";
var brvbar = "¦";
var bscr = "𝒷";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsol = "\\";
var bsolb = "⧅";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var bumpeq = "≏";
var cacute = "ć";
var cap = "∩";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var capcup = "⩇";
var capdot = "⩀";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var ccaps = "⩍";
var ccaron = "č";
var ccedi = "ç";
var ccedil = "ç";
var ccirc = "ĉ";
var ccups = "⩌";
var ccupssm = "⩐";
var cdot = "ċ";
var cedi = "¸";
var cedil = "¸";
var cemptyv = "⦲";
var cen = "¢";
var cent = "¢";
var centerdot = "·";
var cfr = "𝔠";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var chi = "χ";
var cir = "○";
var cirE = "⧃";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledR = "®";
var circledS = "Ⓢ";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var clubs = "♣";
var clubsuit = "♣";
var colon = ":";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var conint = "∮";
var copf = "𝕔";
var coprod = "∐";
var cop = "©";
var copy = "©";
var copysr = "℗";
var crarr = "↵";
var cross = "✗";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cup = "∪";
var cupbrcap = "⩈";
var cupcap = "⩆";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curre = "¤";
var curren = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dArr = "⇓";
var dHar = "⥥";
var dagger = "†";
var daleth = "ℸ";
var darr = "↓";
var dash = "‐";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var dcaron = "ď";
var dcy = "д";
var dd = "ⅆ";
var ddagger = "‡";
var ddarr = "⇊";
var ddotseq = "⩷";
var de = "°";
var deg = "°";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var dfr = "𝔡";
var dharl = "⇃";
var dharr = "⇂";
var diam = "⋄";
var diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divid = "÷";
var divide = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var dopf = "𝕕";
var dot = "˙";
var doteq = "≐";
var doteqdot = "≑";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var downarrow = "↓";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var dscr = "𝒹";
var dscy = "ѕ";
var dsol = "⧶";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var dzcy = "џ";
var dzigrarr = "⟿";
var eDDot = "⩷";
var eDot = "≑";
var eacut = "é";
var eacute = "é";
var easter = "⩮";
var ecaron = "ě";
var ecir = "ê";
var ecirc = "ê";
var ecolon = "≕";
var ecy = "э";
var edot = "ė";
var ee = "ⅇ";
var efDot = "≒";
var efr = "𝔢";
var eg = "⪚";
var egrav = "è";
var egrave = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var emacr = "ē";
var empty$1 = "∅";
var emptyset = "∅";
var emptyv = "∅";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var eng = "ŋ";
var ensp = " ";
var eogon = "ę";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var equals = "=";
var equest = "≟";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erDot = "≓";
var erarr = "⥱";
var escr = "ℯ";
var esdot = "≐";
var esim = "≂";
var eta = "η";
var et = "ð";
var eth = "ð";
var eum = "ë";
var euml = "ë";
var euro = "€";
var excl = "!";
var exist = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var fallingdotseq = "≒";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var ffr = "𝔣";
var filig = "ﬁ";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var fopf = "𝕗";
var forall = "∀";
var fork = "⋔";
var forkv = "⫙";
var fpartint = "⨍";
var frac1 = "¼";
var frac12 = "½";
var frac13 = "⅓";
var frac14 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac3 = "¾";
var frac34 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var gE = "≧";
var gEl = "⪌";
var gacute = "ǵ";
var gamma = "γ";
var gammad = "ϝ";
var gap = "⪆";
var gbreve = "ğ";
var gcirc = "ĝ";
var gcy = "г";
var gdot = "ġ";
var ge = "≥";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var ges = "⩾";
var gescc = "⪩";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var gfr = "𝔤";
var gg = "≫";
var ggg = "⋙";
var gimel = "ℷ";
var gjcy = "ѓ";
var gl = "≷";
var glE = "⪒";
var gla = "⪥";
var glj = "⪤";
var gnE = "≩";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var gopf = "𝕘";
var grave = "`";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var g = ">";
var gt = ">";
var gtcc = "⪧";
var gtcir = "⩺";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var hArr = "⇔";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var hardcy = "ъ";
var harr = "↔";
var harrcir = "⥈";
var harrw = "↭";
var hbar = "ℏ";
var hcirc = "ĥ";
var hearts = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var horbar = "―";
var hscr = "𝒽";
var hslash = "ℏ";
var hstrok = "ħ";
var hybull = "⁃";
var hyphen = "‐";
var iacut = "í";
var iacute = "í";
var ic = "⁣";
var icir = "î";
var icirc = "î";
var icy = "и";
var iecy = "е";
var iexc = "¡";
var iexcl = "¡";
var iff = "⇔";
var ifr = "𝔦";
var igrav = "ì";
var igrave = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var ijlig = "ĳ";
var imacr = "ī";
var image = "ℑ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var imof = "⊷";
var imped = "Ƶ";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var int = "∫";
var intcal = "⊺";
var integers = "ℤ";
var intercal = "⊺";
var intlarhk = "⨗";
var intprod = "⨼";
var iocy = "ё";
var iogon = "į";
var iopf = "𝕚";
var iota = "ι";
var iprod = "⨼";
var iques = "¿";
var iquest = "¿";
var iscr = "𝒾";
var isin = "∈";
var isinE = "⋹";
var isindot = "⋵";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var itilde = "ĩ";
var iukcy = "і";
var ium = "ï";
var iuml = "ï";
var jcirc = "ĵ";
var jcy = "й";
var jfr = "𝔧";
var jmath = "ȷ";
var jopf = "𝕛";
var jscr = "𝒿";
var jsercy = "ј";
var jukcy = "є";
var kappa = "κ";
var kappav = "ϰ";
var kcedil = "ķ";
var kcy = "к";
var kfr = "𝔨";
var kgreen = "ĸ";
var khcy = "х";
var kjcy = "ќ";
var kopf = "𝕜";
var kscr = "𝓀";
var lAarr = "⇚";
var lArr = "⇐";
var lAtail = "⤛";
var lBarr = "⤎";
var lE = "≦";
var lEg = "⪋";
var lHar = "⥢";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var lambda = "λ";
var lang = "⟨";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var laqu = "«";
var laquo = "«";
var larr = "←";
var larrb = "⇤";
var larrbfs = "⤟";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var lat = "⪫";
var latail = "⤙";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var lcaron = "ľ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var leftarrow = "←";
var leftarrowtail = "↢";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var leftthreetimes = "⋋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var les = "⩽";
var lescc = "⪨";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var lessgtr = "≶";
var lesssim = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var ljcy = "љ";
var ll = "≪";
var llarr = "⇇";
var llcorner = "⌞";
var llhard = "⥫";
var lltri = "◺";
var lmidot = "ŀ";
var lmoust = "⎰";
var lmoustache = "⎰";
var lnE = "≨";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var longleftrightarrow = "⟷";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var lstrok = "ł";
var l = "<";
var lt = "<";
var ltcc = "⪦";
var ltcir = "⩹";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltrPar = "⦖";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var mDDot = "∺";
var mac = "¯";
var macr = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map$2 = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var mcy = "м";
var mdash = "—";
var measuredangle = "∡";
var mfr = "𝔪";
var mho = "℧";
var micr = "µ";
var micro = "µ";
var mid = "∣";
var midast = "*";
var midcir = "⫰";
var middo = "·";
var middot = "·";
var minus = "−";
var minusb = "⊟";
var minusd = "∸";
var minusdu = "⨪";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var mstpos = "∾";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nGg = "⋙̸";
var nGt = "≫⃒";
var nGtv = "≫̸";
var nLeftarrow = "⇍";
var nLeftrightarrow = "⇎";
var nLl = "⋘̸";
var nLt = "≪⃒";
var nLtv = "≪̸";
var nRightarrow = "⇏";
var nVDash = "⊯";
var nVdash = "⊮";
var nabla = "∇";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natur = "♮";
var natural = "♮";
var naturals = "ℕ";
var nbs = " ";
var nbsp = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var ncaron = "ň";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var ncy = "н";
var ndash = "–";
var ne = "≠";
var neArr = "⇗";
var nearhk = "⤤";
var nearr = "↗";
var nearrow = "↗";
var nedot = "≐̸";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var nexist = "∄";
var nexists = "∄";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var ngsim = "≵";
var ngt = "≯";
var ngtr = "≯";
var nhArr = "⇎";
var nharr = "↮";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var njcy = "њ";
var nlArr = "⇍";
var nlE = "≦̸";
var nlarr = "↚";
var nldr = "‥";
var nle = "≰";
var nleftarrow = "↚";
var nleftrightarrow = "↮";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nlsim = "≴";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nmid = "∤";
var nopf = "𝕟";
var no = "¬";
var not$1 = "¬";
var notin = "∉";
var notinE = "⋹̸";
var notindot = "⋵̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var npar = "∦";
var nparallel = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var npre = "⪯̸";
var nprec = "⊀";
var npreceq = "⪯̸";
var nrArr = "⇏";
var nrarr = "↛";
var nrarrc = "⤳̸";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var ntild = "ñ";
var ntilde = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvDash = "⊭";
var nvHarr = "⤄";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwArr = "⇖";
var nwarhk = "⤣";
var nwarr = "↖";
var nwarrow = "↖";
var nwnear = "⤧";
var oS = "Ⓢ";
var oacut = "ó";
var oacute = "ó";
var oast = "⊛";
var ocir = "ô";
var ocirc = "ô";
var ocy = "о";
var odash = "⊝";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var oelig = "œ";
var ofcir = "⦿";
var ofr = "𝔬";
var ogon = "˛";
var ograv = "ò";
var ograve = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var omacr = "ō";
var omega = "ω";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var oopf = "𝕠";
var opar = "⦷";
var operp = "⦹";
var oplus = "⊕";
var or = "∨";
var orarr = "↻";
var ord = "º";
var order$1 = "ℴ";
var orderof = "ℴ";
var ordf = "ª";
var ordm = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oscr = "ℴ";
var oslas = "ø";
var oslash = "ø";
var osol = "⊘";
var otild = "õ";
var otilde = "õ";
var otimes = "⊗";
var otimesas = "⨶";
var oum = "ö";
var ouml = "ö";
var ovbar = "⌽";
var par = "¶";
var para = "¶";
var parallel = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var pfr = "𝔭";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plus = "+";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var plusm = "±";
var plusmn = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var pointint = "⨕";
var popf = "𝕡";
var poun = "£";
var pound = "£";
var pr = "≺";
var prE = "⪳";
var prap = "⪷";
var prcue = "≼";
var pre = "⪯";
var prec = "≺";
var precapprox = "⪷";
var preccurlyeq = "≼";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var precsim = "≾";
var prime = "′";
var primes = "ℙ";
var prnE = "⪵";
var prnap = "⪹";
var prnsim = "⋨";
var prod = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var pscr = "𝓅";
var psi = "ψ";
var puncsp = " ";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var qprime = "⁗";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quo = "\"";
var quot = "\"";
var rAarr = "⇛";
var rArr = "⇒";
var rAtail = "⤜";
var rBarr = "⤏";
var rHar = "⥤";
var race = "∽̱";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raqu = "»";
var raquo = "»";
var rarr = "→";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var rcaron = "ř";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var rect = "▭";
var re = "®";
var reg = "®";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var rho = "ρ";
var rhov = "ϱ";
var rightarrow = "→";
var rightarrowtail = "↣";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var rightthreetimes = "⋌";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoust = "⎱";
var rmoustache = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var roplus = "⨮";
var rotimes = "⨵";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var rsaquo = "›";
var rscr = "𝓇";
var rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var ruluhar = "⥨";
var rx = "℞";
var sacute = "ś";
var sbquo = "‚";
var sc = "≻";
var scE = "⪴";
var scap = "⪸";
var scaron = "š";
var sccue = "≽";
var sce = "⪰";
var scedil = "ş";
var scirc = "ŝ";
var scnE = "⪶";
var scnap = "⪺";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var scy = "с";
var sdot = "⋅";
var sdotb = "⊡";
var sdote = "⩦";
var seArr = "⇘";
var searhk = "⤥";
var searr = "↘";
var searrow = "↘";
var sec = "§";
var sect = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var shchcy = "щ";
var shcy = "ш";
var shortmid = "∣";
var shortparallel = "∥";
var sh = "­";
var shy = "­";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var softcy = "ь";
var sol = "/";
var solb = "⧄";
var solbar = "⌿";
var sopf = "𝕤";
var spades = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var squ = "□";
var square = "□";
var squarf = "▪";
var squf = "▪";
var srarr = "→";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var star = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var subE = "⫅";
var subdot = "⪽";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var subseteq = "⊆";
var subseteqq = "⫅";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succ = "≻";
var succapprox = "⪸";
var succcurlyeq = "≽";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var sum = "∑";
var sung = "♪";
var sup = "⊃";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var supE = "⫆";
var supdot = "⪾";
var supdsub = "⫘";
var supe = "⊇";
var supedot = "⫄";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swArr = "⇙";
var swarhk = "⤦";
var swarr = "↙";
var swarrow = "↙";
var swnwar = "⤪";
var szli = "ß";
var szlig = "ß";
var target = "⌖";
var tau = "τ";
var tbrk = "⎴";
var tcaron = "ť";
var tcedil = "ţ";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var thor = "þ";
var thorn = "þ";
var tilde = "˜";
var time = "×";
var times = "×";
var timesb = "⊠";
var timesbar = "⨱";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var top = "⊤";
var topbot = "⌶";
var topcir = "⫱";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var tscr = "𝓉";
var tscy = "ц";
var tshcy = "ћ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var uArr = "⇑";
var uHar = "⥣";
var uacut = "ú";
var uacute = "ú";
var uarr = "↑";
var ubrcy = "ў";
var ubreve = "ŭ";
var ucir = "û";
var ucirc = "û";
var ucy = "у";
var udarr = "⇅";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var ufr = "𝔲";
var ugrav = "ù";
var ugrave = "ù";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var umacr = "ū";
var um = "¨";
var uml = "¨";
var uogon = "ų";
var uopf = "𝕦";
var uparrow = "↑";
var updownarrow = "↕";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var upsi = "υ";
var upsih = "ϒ";
var upsilon = "υ";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var uring = "ů";
var urtri = "◹";
var uscr = "𝓊";
var utdot = "⋰";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var uum = "ü";
var uuml = "ü";
var uwangle = "⦧";
var vArr = "⇕";
var vBar = "⫨";
var vBarv = "⫩";
var vDash = "⊨";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vcy = "в";
var vdash = "⊢";
var vee = "∨";
var veebar = "⊻";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var vert = "|";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var vzigzag = "⦚";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var wedgeq = "≙";
var weierp = "℘";
var wfr = "𝔴";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var xfr = "𝔵";
var xhArr = "⟺";
var xharr = "⟷";
var xi = "ξ";
var xlArr = "⟸";
var xlarr = "⟵";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrArr = "⟹";
var xrarr = "⟶";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var yacut = "ý";
var yacute = "ý";
var yacy = "я";
var ycirc = "ŷ";
var ycy = "ы";
var ye = "¥";
var yen = "¥";
var yfr = "𝔶";
var yicy = "ї";
var yopf = "𝕪";
var yscr = "𝓎";
var yucy = "ю";
var yum = "ÿ";
var yuml = "ÿ";
var zacute = "ź";
var zcaron = "ž";
var zcy = "з";
var zdot = "ż";
var zeetrf = "ℨ";
var zeta = "ζ";
var zfr = "𝔷";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var require$$0 = {
	AEli: AEli,
	AElig: AElig,
	AM: AM,
	AMP: AMP,
	Aacut: Aacut,
	Aacute: Aacute,
	Abreve: Abreve,
	Acir: Acir,
	Acirc: Acirc,
	Acy: Acy,
	Afr: Afr,
	Agrav: Agrav,
	Agrave: Agrave,
	Alpha: Alpha,
	Amacr: Amacr,
	And: And,
	Aogon: Aogon,
	Aopf: Aopf,
	ApplyFunction: ApplyFunction,
	Arin: Arin,
	Aring: Aring,
	Ascr: Ascr,
	Assign: Assign,
	Atild: Atild,
	Atilde: Atilde,
	Aum: Aum,
	Auml: Auml,
	Backslash: Backslash,
	Barv: Barv,
	Barwed: Barwed,
	Bcy: Bcy,
	Because: Because,
	Bernoullis: Bernoullis,
	Beta: Beta,
	Bfr: Bfr,
	Bopf: Bopf,
	Breve: Breve,
	Bscr: Bscr,
	Bumpeq: Bumpeq,
	CHcy: CHcy,
	COP: COP,
	COPY: COPY,
	Cacute: Cacute,
	Cap: Cap,
	CapitalDifferentialD: CapitalDifferentialD,
	Cayleys: Cayleys,
	Ccaron: Ccaron,
	Ccedi: Ccedi,
	Ccedil: Ccedil,
	Ccirc: Ccirc,
	Cconint: Cconint,
	Cdot: Cdot,
	Cedilla: Cedilla,
	CenterDot: CenterDot,
	Cfr: Cfr,
	Chi: Chi,
	CircleDot: CircleDot,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	Colon: Colon,
	Colone: Colone,
	Congruent: Congruent,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	Copf: Copf,
	Coproduct: Coproduct,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	Cross: Cross,
	Cscr: Cscr,
	Cup: Cup,
	CupCap: CupCap,
	DD: DD,
	DDotrahd: DDotrahd,
	DJcy: DJcy,
	DScy: DScy,
	DZcy: DZcy,
	Dagger: Dagger,
	Darr: Darr,
	Dashv: Dashv,
	Dcaron: Dcaron,
	Dcy: Dcy,
	Del: Del,
	Delta: Delta,
	Dfr: Dfr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	Diamond: Diamond,
	DifferentialD: DifferentialD,
	Dopf: Dopf,
	Dot: Dot,
	DotDot: DotDot,
	DotEqual: DotEqual,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrow: DownArrow,
	DownArrowBar: DownArrowBar,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVector: DownLeftVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVector: DownRightVector,
	DownRightVectorBar: DownRightVectorBar,
	DownTee: DownTee,
	DownTeeArrow: DownTeeArrow,
	Downarrow: Downarrow,
	Dscr: Dscr,
	Dstrok: Dstrok,
	ENG: ENG,
	ET: ET,
	ETH: ETH,
	Eacut: Eacut,
	Eacute: Eacute,
	Ecaron: Ecaron,
	Ecir: Ecir,
	Ecirc: Ecirc,
	Ecy: Ecy,
	Edot: Edot,
	Efr: Efr,
	Egrav: Egrav,
	Egrave: Egrave,
	Element: Element,
	Emacr: Emacr,
	EmptySmallSquare: EmptySmallSquare,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	Eogon: Eogon,
	Eopf: Eopf,
	Epsilon: Epsilon,
	Equal: Equal,
	EqualTilde: EqualTilde,
	Equilibrium: Equilibrium,
	Escr: Escr,
	Esim: Esim,
	Eta: Eta,
	Eum: Eum,
	Euml: Euml,
	Exists: Exists,
	ExponentialE: ExponentialE,
	Fcy: Fcy,
	Ffr: Ffr,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	Fopf: Fopf,
	ForAll: ForAll,
	Fouriertrf: Fouriertrf,
	Fscr: Fscr,
	GJcy: GJcy,
	G: G,
	GT: GT,
	Gamma: Gamma,
	Gammad: Gammad,
	Gbreve: Gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	Gcy: Gcy,
	Gdot: Gdot,
	Gfr: Gfr,
	Gg: Gg,
	Gopf: Gopf,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	Gt: Gt,
	HARDcy: HARDcy,
	Hacek: Hacek,
	Hat: Hat,
	Hcirc: Hcirc,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	Hopf: Hopf,
	HorizontalLine: HorizontalLine,
	Hscr: Hscr,
	Hstrok: Hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	IEcy: IEcy,
	IJlig: IJlig,
	IOcy: IOcy,
	Iacut: Iacut,
	Iacute: Iacute,
	Icir: Icir,
	Icirc: Icirc,
	Icy: Icy,
	Idot: Idot,
	Ifr: Ifr,
	Igrav: Igrav,
	Igrave: Igrave,
	Im: Im,
	Imacr: Imacr,
	ImaginaryI: ImaginaryI,
	Implies: Implies,
	Int: Int,
	Integral: Integral,
	Intersection: Intersection,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	Iogon: Iogon,
	Iopf: Iopf,
	Iota: Iota,
	Iscr: Iscr,
	Itilde: Itilde,
	Iukcy: Iukcy,
	Ium: Ium,
	Iuml: Iuml,
	Jcirc: Jcirc,
	Jcy: Jcy,
	Jfr: Jfr,
	Jopf: Jopf,
	Jscr: Jscr,
	Jsercy: Jsercy,
	Jukcy: Jukcy,
	KHcy: KHcy,
	KJcy: KJcy,
	Kappa: Kappa,
	Kcedil: Kcedil,
	Kcy: Kcy,
	Kfr: Kfr,
	Kopf: Kopf,
	Kscr: Kscr,
	LJcy: LJcy,
	L: L,
	LT: LT,
	Lacute: Lacute,
	Lambda: Lambda,
	Lang: Lang,
	Laplacetrf: Laplacetrf,
	Larr: Larr,
	Lcaron: Lcaron,
	Lcedil: Lcedil,
	Lcy: Lcy,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrow: LeftArrow,
	LeftArrowBar: LeftArrowBar,
	LeftArrowRightArrow: LeftArrowRightArrow,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVector: LeftDownVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftFloor: LeftFloor,
	LeftRightArrow: LeftRightArrow,
	LeftRightVector: LeftRightVector,
	LeftTee: LeftTee,
	LeftTeeArrow: LeftTeeArrow,
	LeftTeeVector: LeftTeeVector,
	LeftTriangle: LeftTriangle,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVector: LeftUpVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftVector: LeftVector,
	LeftVectorBar: LeftVectorBar,
	Leftarrow: Leftarrow,
	Leftrightarrow: Leftrightarrow,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	LessLess: LessLess,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	Lfr: Lfr,
	Ll: Ll,
	Lleftarrow: Lleftarrow,
	Lmidot: Lmidot,
	LongLeftArrow: LongLeftArrow,
	LongLeftRightArrow: LongLeftRightArrow,
	LongRightArrow: LongRightArrow,
	Longleftarrow: Longleftarrow,
	Longleftrightarrow: Longleftrightarrow,
	Longrightarrow: Longrightarrow,
	Lopf: Lopf,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	Lscr: Lscr,
	Lsh: Lsh,
	Lstrok: Lstrok,
	Lt: Lt,
	"Map": "⤅",
	Mcy: Mcy,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	MinusPlus: MinusPlus,
	Mopf: Mopf,
	Mscr: Mscr,
	Mu: Mu,
	NJcy: NJcy,
	Nacute: Nacute,
	Ncaron: Ncaron,
	Ncedil: Ncedil,
	Ncy: Ncy,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	Nfr: Nfr,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	Nopf: Nopf,
	Not: Not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	Nscr: Nscr,
	Ntild: Ntild,
	Ntilde: Ntilde,
	Nu: Nu,
	OElig: OElig,
	Oacut: Oacut,
	Oacute: Oacute,
	Ocir: Ocir,
	Ocirc: Ocirc,
	Ocy: Ocy,
	Odblac: Odblac,
	Ofr: Ofr,
	Ograv: Ograv,
	Ograve: Ograve,
	Omacr: Omacr,
	Omega: Omega,
	Omicron: Omicron,
	Oopf: Oopf,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	Or: Or,
	Oscr: Oscr,
	Oslas: Oslas,
	Oslash: Oslash,
	Otild: Otild,
	Otilde: Otilde,
	Otimes: Otimes,
	Oum: Oum,
	Ouml: Ouml,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	PartialD: PartialD,
	Pcy: Pcy,
	Pfr: Pfr,
	Phi: Phi,
	Pi: Pi,
	PlusMinus: PlusMinus,
	Poincareplane: Poincareplane,
	Popf: Popf,
	Pr: Pr,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	Prime: Prime,
	Product: Product,
	Proportion: Proportion,
	Proportional: Proportional,
	Pscr: Pscr,
	Psi: Psi,
	QUO: QUO,
	QUOT: QUOT,
	Qfr: Qfr,
	Qopf: Qopf,
	Qscr: Qscr,
	RBarr: RBarr,
	RE: RE,
	REG: REG,
	Racute: Racute,
	Rang: Rang,
	Rarr: Rarr,
	Rarrtl: Rarrtl,
	Rcaron: Rcaron,
	Rcedil: Rcedil,
	Rcy: Rcy,
	Re: Re,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	Rfr: Rfr,
	Rho: Rho,
	RightAngleBracket: RightAngleBracket,
	RightArrow: RightArrow,
	RightArrowBar: RightArrowBar,
	RightArrowLeftArrow: RightArrowLeftArrow,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVector: RightDownVector,
	RightDownVectorBar: RightDownVectorBar,
	RightFloor: RightFloor,
	RightTee: RightTee,
	RightTeeArrow: RightTeeArrow,
	RightTeeVector: RightTeeVector,
	RightTriangle: RightTriangle,
	RightTriangleBar: RightTriangleBar,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVector: RightUpVector,
	RightUpVectorBar: RightUpVectorBar,
	RightVector: RightVector,
	RightVectorBar: RightVectorBar,
	Rightarrow: Rightarrow,
	Ropf: Ropf,
	RoundImplies: RoundImplies,
	Rrightarrow: Rrightarrow,
	Rscr: Rscr,
	Rsh: Rsh,
	RuleDelayed: RuleDelayed,
	SHCHcy: SHCHcy,
	SHcy: SHcy,
	SOFTcy: SOFTcy,
	Sacute: Sacute,
	Sc: Sc,
	Scaron: Scaron,
	Scedil: Scedil,
	Scirc: Scirc,
	Scy: Scy,
	Sfr: Sfr,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	Sigma: Sigma,
	SmallCircle: SmallCircle,
	Sopf: Sopf,
	Sqrt: Sqrt,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	Sscr: Sscr,
	Star: Star,
	Sub: Sub,
	Subset: Subset,
	SubsetEqual: SubsetEqual,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	SuchThat: SuchThat,
	Sum: Sum,
	Sup: Sup,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	Supset: Supset,
	THOR: THOR,
	THORN: THORN,
	TRADE: TRADE,
	TSHcy: TSHcy,
	TScy: TScy,
	Tab: Tab,
	Tau: Tau,
	Tcaron: Tcaron,
	Tcedil: Tcedil,
	Tcy: Tcy,
	Tfr: Tfr,
	Therefore: Therefore,
	Theta: Theta,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	Topf: Topf,
	TripleDot: TripleDot,
	Tscr: Tscr,
	Tstrok: Tstrok,
	Uacut: Uacut,
	Uacute: Uacute,
	Uarr: Uarr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	Ubreve: Ubreve,
	Ucir: Ucir,
	Ucirc: Ucirc,
	Ucy: Ucy,
	Udblac: Udblac,
	Ufr: Ufr,
	Ugrav: Ugrav,
	Ugrave: Ugrave,
	Umacr: Umacr,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	Uopf: Uopf,
	UpArrow: UpArrow,
	UpArrowBar: UpArrowBar,
	UpArrowDownArrow: UpArrowDownArrow,
	UpDownArrow: UpDownArrow,
	UpEquilibrium: UpEquilibrium,
	UpTee: UpTee,
	UpTeeArrow: UpTeeArrow,
	Uparrow: Uparrow,
	Updownarrow: Updownarrow,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	Upsi: Upsi,
	Upsilon: Upsilon,
	Uring: Uring,
	Uscr: Uscr,
	Utilde: Utilde,
	Uum: Uum,
	Uuml: Uuml,
	VDash: VDash,
	Vbar: Vbar,
	Vcy: Vcy,
	Vdash: Vdash,
	Vdashl: Vdashl,
	Vee: Vee,
	Verbar: Verbar,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	Vopf: Vopf,
	Vscr: Vscr,
	Vvdash: Vvdash,
	Wcirc: Wcirc,
	Wedge: Wedge,
	Wfr: Wfr,
	Wopf: Wopf,
	Wscr: Wscr,
	Xfr: Xfr,
	Xi: Xi,
	Xopf: Xopf,
	Xscr: Xscr,
	YAcy: YAcy,
	YIcy: YIcy,
	YUcy: YUcy,
	Yacut: Yacut,
	Yacute: Yacute,
	Ycirc: Ycirc,
	Ycy: Ycy,
	Yfr: Yfr,
	Yopf: Yopf,
	Yscr: Yscr,
	Yuml: Yuml,
	ZHcy: ZHcy,
	Zacute: Zacute,
	Zcaron: Zcaron,
	Zcy: Zcy,
	Zdot: Zdot,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	Zfr: Zfr,
	Zopf: Zopf,
	Zscr: Zscr,
	aacut: aacut,
	aacute: aacute,
	abreve: abreve,
	ac: ac,
	acE: acE,
	acd: acd,
	acir: acir,
	acirc: acirc,
	acut: acut,
	acute: acute,
	acy: acy,
	aeli: aeli,
	aelig: aelig,
	af: af,
	afr: afr,
	agrav: agrav,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	alpha: alpha,
	amacr: amacr,
	amalg: amalg,
	am: am,
	amp: amp,
	and: and,
	andand: andand,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsd: angmsd,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	aogon: aogon,
	aopf: aopf,
	ap: ap,
	apE: apE,
	apacir: apacir,
	ape: ape,
	apid: apid,
	apos: apos,
	approx: approx,
	approxeq: approxeq,
	arin: arin,
	aring: aring,
	ascr: ascr,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	atild: atild,
	atilde: atilde,
	aum: aum,
	auml: auml,
	awconint: awconint,
	awint: awint,
	bNot: bNot,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	barvee: barvee,
	barwed: barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	beta: beta,
	beth: beth,
	between: between,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bnot: bnot,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxDL: boxDL,
	boxDR: boxDR,
	boxDl: boxDl,
	boxDr: boxDr,
	boxH: boxH,
	boxHD: boxHD,
	boxHU: boxHU,
	boxHd: boxHd,
	boxHu: boxHu,
	boxUL: boxUL,
	boxUR: boxUR,
	boxUl: boxUl,
	boxUr: boxUr,
	boxV: boxV,
	boxVH: boxVH,
	boxVL: boxVL,
	boxVR: boxVR,
	boxVh: boxVh,
	boxVl: boxVl,
	boxVr: boxVr,
	boxbox: boxbox,
	boxdL: boxdL,
	boxdR: boxdR,
	boxdl: boxdl,
	boxdr: boxdr,
	boxh: boxh,
	boxhD: boxhD,
	boxhU: boxhU,
	boxhd: boxhd,
	boxhu: boxhu,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxuL: boxuL,
	boxuR: boxuR,
	boxul: boxul,
	boxur: boxur,
	boxv: boxv,
	boxvH: boxvH,
	boxvL: boxvL,
	boxvR: boxvR,
	boxvh: boxvh,
	boxvl: boxvl,
	boxvr: boxvr,
	bprime: bprime,
	breve: breve,
	brvba: brvba,
	brvbar: brvbar,
	bscr: bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsol: bsol,
	bsolb: bsolb,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	bumpeq: bumpeq,
	cacute: cacute,
	cap: cap,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	capcup: capcup,
	capdot: capdot,
	caps: caps,
	caret: caret,
	caron: caron,
	ccaps: ccaps,
	ccaron: ccaron,
	ccedi: ccedi,
	ccedil: ccedil,
	ccirc: ccirc,
	ccups: ccups,
	ccupssm: ccupssm,
	cdot: cdot,
	cedi: cedi,
	cedil: cedil,
	cemptyv: cemptyv,
	cen: cen,
	cent: cent,
	centerdot: centerdot,
	cfr: cfr,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	chi: chi,
	cir: cir,
	cirE: cirE,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledR: circledR,
	circledS: circledS,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	conint: conint,
	copf: copf,
	coprod: coprod,
	cop: cop,
	copy: copy,
	copysr: copysr,
	crarr: crarr,
	cross: cross,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cup: cup,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curre: curre,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dArr: dArr,
	dHar: dHar,
	dagger: dagger,
	daleth: daleth,
	darr: darr,
	dash: dash,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	dcaron: dcaron,
	dcy: dcy,
	dd: dd,
	ddagger: ddagger,
	ddarr: ddarr,
	ddotseq: ddotseq,
	de: de,
	deg: deg,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	dfr: dfr,
	dharl: dharl,
	dharr: dharr,
	diam: diam,
	diamond: diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	digamma: digamma,
	disin: disin,
	div: div,
	divid: divid,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	dopf: dopf,
	dot: dot,
	doteq: doteq,
	doteqdot: doteqdot,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	downarrow: downarrow,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	dscr: dscr,
	dscy: dscy,
	dsol: dsol,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	eDDot: eDDot,
	eDot: eDot,
	eacut: eacut,
	eacute: eacute,
	easter: easter,
	ecaron: ecaron,
	ecir: ecir,
	ecirc: ecirc,
	ecolon: ecolon,
	ecy: ecy,
	edot: edot,
	ee: ee,
	efDot: efDot,
	efr: efr,
	eg: eg,
	egrav: egrav,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	emacr: emacr,
	empty: empty$1,
	emptyset: emptyset,
	emptyv: emptyv,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	eng: eng,
	ensp: ensp,
	eogon: eogon,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	equals: equals,
	equest: equest,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erDot: erDot,
	erarr: erarr,
	escr: escr,
	esdot: esdot,
	esim: esim,
	eta: eta,
	et: et,
	eth: eth,
	eum: eum,
	euml: euml,
	euro: euro,
	excl: excl,
	exist: exist,
	expectation: expectation,
	exponentiale: exponentiale,
	fallingdotseq: fallingdotseq,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	ffr: ffr,
	filig: filig,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	fopf: fopf,
	forall: forall,
	fork: fork,
	forkv: forkv,
	fpartint: fpartint,
	frac1: frac1,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac3: frac3,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	gE: gE,
	gEl: gEl,
	gacute: gacute,
	gamma: gamma,
	gammad: gammad,
	gap: gap,
	gbreve: gbreve,
	gcirc: gcirc,
	gcy: gcy,
	gdot: gdot,
	ge: ge,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	ges: ges,
	gescc: gescc,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	gfr: gfr,
	gg: gg,
	ggg: ggg,
	gimel: gimel,
	gjcy: gjcy,
	gl: gl,
	glE: glE,
	gla: gla,
	glj: glj,
	gnE: gnE,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	gopf: gopf,
	grave: grave,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	g: g,
	gt: gt,
	gtcc: gtcc,
	gtcir: gtcir,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	hArr: hArr,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	hardcy: hardcy,
	harr: harr,
	harrcir: harrcir,
	harrw: harrw,
	hbar: hbar,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	horbar: horbar,
	hscr: hscr,
	hslash: hslash,
	hstrok: hstrok,
	hybull: hybull,
	hyphen: hyphen,
	iacut: iacut,
	iacute: iacute,
	ic: ic,
	icir: icir,
	icirc: icirc,
	icy: icy,
	iecy: iecy,
	iexc: iexc,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	igrav: igrav,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	ijlig: ijlig,
	imacr: imacr,
	image: image,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	imof: imof,
	imped: imped,
	"in": "∈",
	incare: incare,
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	int: int,
	intcal: intcal,
	integers: integers,
	intercal: intercal,
	intlarhk: intlarhk,
	intprod: intprod,
	iocy: iocy,
	iogon: iogon,
	iopf: iopf,
	iota: iota,
	iprod: iprod,
	iques: iques,
	iquest: iquest,
	iscr: iscr,
	isin: isin,
	isinE: isinE,
	isindot: isindot,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	itilde: itilde,
	iukcy: iukcy,
	ium: ium,
	iuml: iuml,
	jcirc: jcirc,
	jcy: jcy,
	jfr: jfr,
	jmath: jmath,
	jopf: jopf,
	jscr: jscr,
	jsercy: jsercy,
	jukcy: jukcy,
	kappa: kappa,
	kappav: kappav,
	kcedil: kcedil,
	kcy: kcy,
	kfr: kfr,
	kgreen: kgreen,
	khcy: khcy,
	kjcy: kjcy,
	kopf: kopf,
	kscr: kscr,
	lAarr: lAarr,
	lArr: lArr,
	lAtail: lAtail,
	lBarr: lBarr,
	lE: lE,
	lEg: lEg,
	lHar: lHar,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	lambda: lambda,
	lang: lang,
	langd: langd,
	langle: langle,
	lap: lap,
	laqu: laqu,
	laquo: laquo,
	larr: larr,
	larrb: larrb,
	larrbfs: larrbfs,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	lat: lat,
	latail: latail,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	lcaron: lcaron,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	leftarrow: leftarrow,
	leftarrowtail: leftarrowtail,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	leftthreetimes: leftthreetimes,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	les: les,
	lescc: lescc,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	lessgtr: lessgtr,
	lesssim: lesssim,
	lfisht: lfisht,
	lfloor: lfloor,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	ljcy: ljcy,
	ll: ll,
	llarr: llarr,
	llcorner: llcorner,
	llhard: llhard,
	lltri: lltri,
	lmidot: lmidot,
	lmoust: lmoust,
	lmoustache: lmoustache,
	lnE: lnE,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	longleftrightarrow: longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	lsh: lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	lstrok: lstrok,
	l: l,
	lt: lt,
	ltcc: ltcc,
	ltcir: ltcir,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltrPar: ltrPar,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	mDDot: mDDot,
	mac: mac,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	map: map$2,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	mcy: mcy,
	mdash: mdash,
	measuredangle: measuredangle,
	mfr: mfr,
	mho: mho,
	micr: micr,
	micro: micro,
	mid: mid,
	midast: midast,
	midcir: midcir,
	middo: middo,
	middot: middot,
	minus: minus,
	minusb: minusb,
	minusd: minusd,
	minusdu: minusdu,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	mstpos: mstpos,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nGg: nGg,
	nGt: nGt,
	nGtv: nGtv,
	nLeftarrow: nLeftarrow,
	nLeftrightarrow: nLeftrightarrow,
	nLl: nLl,
	nLt: nLt,
	nLtv: nLtv,
	nRightarrow: nRightarrow,
	nVDash: nVDash,
	nVdash: nVdash,
	nabla: nabla,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natur: natur,
	natural: natural,
	naturals: naturals,
	nbs: nbs,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	ncaron: ncaron,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	ncy: ncy,
	ndash: ndash,
	ne: ne,
	neArr: neArr,
	nearhk: nearhk,
	nearr: nearr,
	nearrow: nearrow,
	nedot: nedot,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	nexist: nexist,
	nexists: nexists,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	ngsim: ngsim,
	ngt: ngt,
	ngtr: ngtr,
	nhArr: nhArr,
	nharr: nharr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	njcy: njcy,
	nlArr: nlArr,
	nlE: nlE,
	nlarr: nlarr,
	nldr: nldr,
	nle: nle,
	nleftarrow: nleftarrow,
	nleftrightarrow: nleftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nlsim: nlsim,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nmid: nmid,
	nopf: nopf,
	no: no,
	not: not$1,
	notin: notin,
	notinE: notinE,
	notindot: notindot,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	npar: npar,
	nparallel: nparallel,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	npre: npre,
	nprec: nprec,
	npreceq: npreceq,
	nrArr: nrArr,
	nrarr: nrarr,
	nrarrc: nrarrc,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	ntild: ntild,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvDash: nvDash,
	nvHarr: nvHarr,
	nvap: nvap,
	nvdash: nvdash,
	nvge: nvge,
	nvgt: nvgt,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwArr: nwArr,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	oS: oS,
	oacut: oacut,
	oacute: oacute,
	oast: oast,
	ocir: ocir,
	ocirc: ocirc,
	ocy: ocy,
	odash: odash,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	oelig: oelig,
	ofcir: ofcir,
	ofr: ofr,
	ogon: ogon,
	ograv: ograv,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	omacr: omacr,
	omega: omega,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	oopf: oopf,
	opar: opar,
	operp: operp,
	oplus: oplus,
	or: or,
	orarr: orarr,
	ord: ord,
	order: order$1,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oscr: oscr,
	oslas: oslas,
	oslash: oslash,
	osol: osol,
	otild: otild,
	otilde: otilde,
	otimes: otimes,
	otimesas: otimesas,
	oum: oum,
	ouml: ouml,
	ovbar: ovbar,
	par: par,
	para: para,
	parallel: parallel,
	parsim: parsim,
	parsl: parsl,
	part: part,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	pfr: pfr,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plus: plus,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	plusm: plusm,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	pointint: pointint,
	popf: popf,
	poun: poun,
	pound: pound,
	pr: pr,
	prE: prE,
	prap: prap,
	prcue: prcue,
	pre: pre,
	prec: prec,
	precapprox: precapprox,
	preccurlyeq: preccurlyeq,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	precsim: precsim,
	prime: prime,
	primes: primes,
	prnE: prnE,
	prnap: prnap,
	prnsim: prnsim,
	prod: prod,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	pscr: pscr,
	psi: psi,
	puncsp: puncsp,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	qprime: qprime,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quo: quo,
	quot: quot,
	rAarr: rAarr,
	rArr: rArr,
	rAtail: rAtail,
	rBarr: rBarr,
	rHar: rHar,
	race: race,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raqu: raqu,
	raquo: raquo,
	rarr: rarr,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	rcaron: rcaron,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	rect: rect,
	re: re,
	reg: reg,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	rho: rho,
	rhov: rhov,
	rightarrow: rightarrow,
	rightarrowtail: rightarrowtail,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	rightthreetimes: rightthreetimes,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoust: rmoust,
	rmoustache: rmoustache,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	roplus: roplus,
	rotimes: rotimes,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	rsaquo: rsaquo,
	rscr: rscr,
	rsh: rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	ruluhar: ruluhar,
	rx: rx,
	sacute: sacute,
	sbquo: sbquo,
	sc: sc,
	scE: scE,
	scap: scap,
	scaron: scaron,
	sccue: sccue,
	sce: sce,
	scedil: scedil,
	scirc: scirc,
	scnE: scnE,
	scnap: scnap,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	scy: scy,
	sdot: sdot,
	sdotb: sdotb,
	sdote: sdote,
	seArr: seArr,
	searhk: searhk,
	searr: searr,
	searrow: searrow,
	sec: sec,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	shchcy: shchcy,
	shcy: shcy,
	shortmid: shortmid,
	shortparallel: shortparallel,
	sh: sh,
	shy: shy,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	softcy: softcy,
	sol: sol,
	solb: solb,
	solbar: solbar,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	squ: squ,
	square: square,
	squarf: squarf,
	squf: squf,
	srarr: srarr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	subE: subE,
	subdot: subdot,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succ: succ,
	succapprox: succapprox,
	succcurlyeq: succcurlyeq,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	sum: sum,
	sung: sung,
	sup: sup,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	supE: supE,
	supdot: supdot,
	supdsub: supdsub,
	supe: supe,
	supedot: supedot,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swArr: swArr,
	swarhk: swarhk,
	swarr: swarr,
	swarrow: swarrow,
	swnwar: swnwar,
	szli: szli,
	szlig: szlig,
	target: target,
	tau: tau,
	tbrk: tbrk,
	tcaron: tcaron,
	tcedil: tcedil,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	thor: thor,
	thorn: thorn,
	tilde: tilde,
	time: time,
	times: times,
	timesb: timesb,
	timesbar: timesbar,
	timesd: timesd,
	tint: tint,
	toea: toea,
	top: top,
	topbot: topbot,
	topcir: topcir,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	tscr: tscr,
	tscy: tscy,
	tshcy: tshcy,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	uArr: uArr,
	uHar: uHar,
	uacut: uacut,
	uacute: uacute,
	uarr: uarr,
	ubrcy: ubrcy,
	ubreve: ubreve,
	ucir: ucir,
	ucirc: ucirc,
	ucy: ucy,
	udarr: udarr,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	ufr: ufr,
	ugrav: ugrav,
	ugrave: ugrave,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	umacr: umacr,
	um: um,
	uml: uml,
	uogon: uogon,
	uopf: uopf,
	uparrow: uparrow,
	updownarrow: updownarrow,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	upsi: upsi,
	upsih: upsih,
	upsilon: upsilon,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	uring: uring,
	urtri: urtri,
	uscr: uscr,
	utdot: utdot,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	uum: uum,
	uuml: uuml,
	uwangle: uwangle,
	vArr: vArr,
	vBar: vBar,
	vBarv: vBarv,
	vDash: vDash,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vcy: vcy,
	vdash: vdash,
	vee: vee,
	veebar: veebar,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	vert: vert,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	vzigzag: vzigzag,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	wfr: wfr,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	xfr: xfr,
	xhArr: xhArr,
	xharr: xharr,
	xi: xi,
	xlArr: xlArr,
	xlarr: xlarr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrArr: xrArr,
	xrarr: xrarr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	yacut: yacut,
	yacute: yacute,
	yacy: yacy,
	ycirc: ycirc,
	ycy: ycy,
	ye: ye,
	yen: yen,
	yfr: yfr,
	yicy: yicy,
	yopf: yopf,
	yscr: yscr,
	yucy: yucy,
	yum: yum,
	yuml: yuml,
	zacute: zacute,
	zcaron: zcaron,
	zcy: zcy,
	zdot: zdot,
	zeetrf: zeetrf,
	zeta: zeta,
	zfr: zfr,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj
};

var characterEntities = require$$0;

var decodeEntity_1 = decodeEntity$1;

var own$7 = {}.hasOwnProperty;

function decodeEntity$1(characters) {
  return own$7.call(characterEntities, characters)
    ? characterEntities[characters]
    : false
}

var regexCheck$1 = regexCheck_1;

var asciiDigit$2 = regexCheck$1(/\d/);

var asciiDigit_1 = asciiDigit$2;

var regexCheck = regexCheck_1;

var asciiHexDigit$1 = regexCheck(/[\dA-Fa-f]/);

var asciiHexDigit_1 = asciiHexDigit$1;

var decodeEntity = decodeEntity_1;
var asciiAlphanumeric$2 = asciiAlphanumeric_1;
var asciiDigit$1 = asciiDigit_1;
var asciiHexDigit = asciiHexDigit_1;

function _interopDefaultLegacy$1(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var decodeEntity__default = /*#__PURE__*/ _interopDefaultLegacy$1(decodeEntity);

var characterReference$1 = {
  name: 'characterReference',
  tokenize: tokenizeCharacterReference
};

function tokenizeCharacterReference(effects, ok, nok) {
  var self = this;
  var size = 0;
  var max;
  var test;
  return start

  function start(code) {
    effects.enter('characterReference');
    effects.enter('characterReferenceMarker');
    effects.consume(code);
    effects.exit('characterReferenceMarker');
    return open
  }

  function open(code) {
    if (code === 35) {
      effects.enter('characterReferenceMarkerNumeric');
      effects.consume(code);
      effects.exit('characterReferenceMarkerNumeric');
      return numeric
    }

    effects.enter('characterReferenceValue');
    max = 31;
    test = asciiAlphanumeric$2;
    return value(code)
  }

  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter('characterReferenceMarkerHexadecimal');
      effects.consume(code);
      effects.exit('characterReferenceMarkerHexadecimal');
      effects.enter('characterReferenceValue');
      max = 6;
      test = asciiHexDigit;
      return value
    }

    effects.enter('characterReferenceValue');
    max = 7;
    test = asciiDigit$1;
    return value(code)
  }

  function value(code) {
    var token;

    if (code === 59 && size) {
      token = effects.exit('characterReferenceValue');

      if (
        test === asciiAlphanumeric$2 &&
        !decodeEntity__default['default'](self.sliceSerialize(token))
      ) {
        return nok(code)
      }

      effects.enter('characterReferenceMarker');
      effects.consume(code);
      effects.exit('characterReferenceMarker');
      effects.exit('characterReference');
      return ok
    }

    if (test(code) && size++ < max) {
      effects.consume(code);
      return value
    }

    return nok(code)
  }
}

var characterReference_1 = characterReference$1;

var markdownLineEnding$d = markdownLineEnding_1;
var markdownLineEndingOrSpace$6 = markdownLineEndingOrSpace_1;
var prefixSize$2 = prefixSize_1;
var factorySpace$a = factorySpace$h;

var codeFenced$1 = {
  name: 'codeFenced',
  tokenize: tokenizeCodeFenced,
  concrete: true
};

function tokenizeCodeFenced(effects, ok, nok) {
  var self = this;
  var closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  var initialPrefix = prefixSize$2(this.events, 'linePrefix');
  var sizeOpen = 0;
  var marker;
  return start

  function start(code) {
    effects.enter('codeFenced');
    effects.enter('codeFencedFence');
    effects.enter('codeFencedFenceSequence');
    marker = code;
    return sequenceOpen(code)
  }

  function sequenceOpen(code) {
    if (code === marker) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen
    }

    effects.exit('codeFencedFenceSequence');
    return sizeOpen < 3
      ? nok(code)
      : factorySpace$a(effects, infoOpen, 'whitespace')(code)
  }

  function infoOpen(code) {
    if (code === null || markdownLineEnding$d(code)) {
      return openAfter(code)
    }

    effects.enter('codeFencedFenceInfo');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return info(code)
  }

  function info(code) {
    if (code === null || markdownLineEndingOrSpace$6(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceInfo');
      return factorySpace$a(effects, infoAfter, 'whitespace')(code)
    }

    if (code === 96 && code === marker) return nok(code)
    effects.consume(code);
    return info
  }

  function infoAfter(code) {
    if (code === null || markdownLineEnding$d(code)) {
      return openAfter(code)
    }

    effects.enter('codeFencedFenceMeta');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return meta(code)
  }

  function meta(code) {
    if (code === null || markdownLineEnding$d(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceMeta');
      return openAfter(code)
    }

    if (code === 96 && code === marker) return nok(code)
    effects.consume(code);
    return meta
  }

  function openAfter(code) {
    effects.exit('codeFencedFence');
    return self.interrupt ? ok(code) : content(code)
  }

  function content(code) {
    if (code === null) {
      return after(code)
    }

    if (markdownLineEnding$d(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return effects.attempt(
        closingFenceConstruct,
        after,
        initialPrefix
          ? factorySpace$a(effects, content, 'linePrefix', initialPrefix + 1)
          : content
      )
    }

    effects.enter('codeFlowValue');
    return contentContinue(code)
  }

  function contentContinue(code) {
    if (code === null || markdownLineEnding$d(code)) {
      effects.exit('codeFlowValue');
      return content(code)
    }

    effects.consume(code);
    return contentContinue
  }

  function after(code) {
    effects.exit('codeFenced');
    return ok(code)
  }

  function tokenizeClosingFence(effects, ok, nok) {
    var size = 0;
    return factorySpace$a(
      effects,
      closingSequenceStart,
      'linePrefix',
      this.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )

    function closingSequenceStart(code) {
      effects.enter('codeFencedFence');
      effects.enter('codeFencedFenceSequence');
      return closingSequence(code)
    }

    function closingSequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return closingSequence
      }

      if (size < sizeOpen) return nok(code)
      effects.exit('codeFencedFenceSequence');
      return factorySpace$a(effects, closingSequenceEnd, 'whitespace')(code)
    }

    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding$d(code)) {
        effects.exit('codeFencedFence');
        return ok(code)
      }

      return nok(code)
    }
  }
}

var codeFenced_1 = codeFenced$1;

var markdownLineEnding$c = markdownLineEnding_1;
var chunkedSplice$2 = chunkedSplice_1;
var prefixSize$1 = prefixSize_1;
var factorySpace$9 = factorySpace$h;

var codeIndented$1 = {
  name: 'codeIndented',
  tokenize: tokenizeCodeIndented,
  resolve: resolveCodeIndented
};
var indentedContentConstruct = {
  tokenize: tokenizeIndentedContent,
  partial: true
};

function resolveCodeIndented(events, context) {
  var code = {
    type: 'codeIndented',
    start: events[0][1].start,
    end: events[events.length - 1][1].end
  };
  chunkedSplice$2(events, 0, 0, [['enter', code, context]]);
  chunkedSplice$2(events, events.length, 0, [['exit', code, context]]);
  return events
}

function tokenizeCodeIndented(effects, ok, nok) {
  return effects.attempt(indentedContentConstruct, afterPrefix, nok)

  function afterPrefix(code) {
    if (code === null) {
      return ok(code)
    }

    if (markdownLineEnding$c(code)) {
      return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code)
    }

    effects.enter('codeFlowValue');
    return content(code)
  }

  function content(code) {
    if (code === null || markdownLineEnding$c(code)) {
      effects.exit('codeFlowValue');
      return afterPrefix(code)
    }

    effects.consume(code);
    return content
  }
}

function tokenizeIndentedContent(effects, ok, nok) {
  var self = this;
  return factorySpace$9(effects, afterPrefix, 'linePrefix', 4 + 1)

  function afterPrefix(code) {
    if (markdownLineEnding$c(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace$9(effects, afterPrefix, 'linePrefix', 4 + 1)
    }

    return prefixSize$1(self.events, 'linePrefix') < 4 ? nok(code) : ok(code)
  }
}

var codeIndented_1 = codeIndented$1;

var markdownLineEnding$b = markdownLineEnding_1;

var codeText$1 = {
  name: 'codeText',
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous: previous
};

function resolveCodeText(events) {
  var tailExitIndex = events.length - 4;
  var headEnterIndex = 3;
  var index;
  var enter; // If we start and end with an EOL or a space.

  if (
    (events[headEnterIndex][1].type === 'lineEnding' ||
      events[headEnterIndex][1].type === 'space') &&
    (events[tailExitIndex][1].type === 'lineEnding' ||
      events[tailExitIndex][1].type === 'space')
  ) {
    index = headEnterIndex; // And we have data.

    while (++index < tailExitIndex) {
      if (events[index][1].type === 'codeTextData') {
        // Then we have padding.
        events[tailExitIndex][1].type = events[headEnterIndex][1].type =
          'codeTextPadding';
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break
      }
    }
  } // Merge adjacent spaces and data.

  index = headEnterIndex - 1;
  tailExitIndex++;

  while (++index <= tailExitIndex) {
    if (enter === undefined) {
      if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
        enter = index;
      }
    } else if (
      index === tailExitIndex ||
      events[index][1].type === 'lineEnding'
    ) {
      events[enter][1].type = 'codeTextData';

      if (index !== enter + 2) {
        events[enter][1].end = events[index - 1][1].end;
        events.splice(enter + 2, index - enter - 2);
        tailExitIndex -= index - enter - 2;
        index = enter + 2;
      }

      enter = undefined;
    }
  }

  return events
}

function previous(code) {
  // If there is a previous code, there will always be a tail.
  return (
    code !== 96 ||
    this.events[this.events.length - 1][1].type === 'characterEscape'
  )
}

function tokenizeCodeText(effects, ok, nok) {
  var sizeOpen = 0;
  var size;
  var token;
  return start

  function start(code) {
    effects.enter('codeText');
    effects.enter('codeTextSequence');
    return openingSequence(code)
  }

  function openingSequence(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return openingSequence
    }

    effects.exit('codeTextSequence');
    return gap(code)
  }

  function gap(code) {
    // EOF.
    if (code === null) {
      return nok(code)
    } // Closing fence?
    // Could also be data.

    if (code === 96) {
      token = effects.enter('codeTextSequence');
      size = 0;
      return closingSequence(code)
    } // Tabs don’t work, and virtual spaces don’t make sense.

    if (code === 32) {
      effects.enter('space');
      effects.consume(code);
      effects.exit('space');
      return gap
    }

    if (markdownLineEnding$b(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return gap
    } // Data.

    effects.enter('codeTextData');
    return data(code)
  } // In code.

  function data(code) {
    if (
      code === null ||
      code === 32 ||
      code === 96 ||
      markdownLineEnding$b(code)
    ) {
      effects.exit('codeTextData');
      return gap(code)
    }

    effects.consume(code);
    return data
  } // Closing fence.

  function closingSequence(code) {
    // More.
    if (code === 96) {
      effects.consume(code);
      size++;
      return closingSequence
    } // Done!

    if (size === sizeOpen) {
      effects.exit('codeTextSequence');
      effects.exit('codeText');
      return ok(code)
    } // More or less accents: mark as data.

    token.type = 'codeTextData';
    return data(code)
  }
}

var codeText_1 = codeText$1;

var asciiControl = asciiControl_1;
var markdownLineEndingOrSpace$5 = markdownLineEndingOrSpace_1;
var markdownLineEnding$a = markdownLineEnding_1;

// eslint-disable-next-line max-params
function destinationFactory(
  effects,
  ok,
  nok,
  type,
  literalType,
  literalMarkerType,
  rawType,
  stringType,
  max
) {
  var limit = max || Infinity;
  var balance = 0;
  return start

  function start(code) {
    if (code === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore
    }

    if (asciiControl(code) || code === 41) {
      return nok(code)
    }

    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationRaw(code)
  }

  function destinationEnclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok
    }

    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationEnclosed(code)
  }

  function destinationEnclosed(code) {
    if (code === 62) {
      effects.exit('chunkString');
      effects.exit(stringType);
      return destinationEnclosedBefore(code)
    }

    if (code === null || code === 60 || markdownLineEnding$a(code)) {
      return nok(code)
    }

    effects.consume(code);
    return code === 92 ? destinationEnclosedEscape : destinationEnclosed
  }

  function destinationEnclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return destinationEnclosed
    }

    return destinationEnclosed(code)
  }

  function destinationRaw(code) {
    if (code === 40) {
      if (++balance > limit) return nok(code)
      effects.consume(code);
      return destinationRaw
    }

    if (code === 41) {
      if (!balance--) {
        effects.exit('chunkString');
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok(code)
      }

      effects.consume(code);
      return destinationRaw
    }

    if (code === null || markdownLineEndingOrSpace$5(code)) {
      if (balance) return nok(code)
      effects.exit('chunkString');
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok(code)
    }

    if (asciiControl(code)) return nok(code)
    effects.consume(code);
    return code === 92 ? destinationRawEscape : destinationRaw
  }

  function destinationRawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return destinationRaw
    }

    return destinationRaw(code)
  }
}

var factoryDestination$2 = destinationFactory;

var markdownLineEnding$9 = markdownLineEnding_1;
var markdownSpace$6 = markdownSpace_1;

// eslint-disable-next-line max-params
function labelFactory(effects, ok, nok, type, markerType, stringType) {
  var self = this;
  var size = 0;
  var data;
  return start

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak
  }

  function atBreak(code) {
    if (
      code === null ||
      code === 91 ||
      (code === 93 && !data) ||
      /* c8 ignore next */
      (code === 94 &&
        /* c8 ignore next */
        !size &&
        /* c8 ignore next */
        '_hiddenFootnoteSupport' in self.parser.constructs) ||
      size > 999
    ) {
      return nok(code)
    }

    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok
    }

    if (markdownLineEnding$9(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return atBreak
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return label(code)
  }

  function label(code) {
    if (
      code === null ||
      code === 91 ||
      code === 93 ||
      markdownLineEnding$9(code) ||
      size++ > 999
    ) {
      effects.exit('chunkString');
      return atBreak(code)
    }

    effects.consume(code);
    data = data || !markdownSpace$6(code);
    return code === 92 ? labelEscape : label
  }

  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return label
    }

    return label(code)
  }
}

var factoryLabel$2 = labelFactory;

var markdownLineEnding$8 = markdownLineEnding_1;
var markdownSpace$5 = markdownSpace_1;
var factorySpace$8 = factorySpace$h;

function whitespaceFactory(effects, ok) {
  var seen;
  return start

  function start(code) {
    if (markdownLineEnding$8(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      seen = true;
      return start
    }

    if (markdownSpace$5(code)) {
      return factorySpace$8(
        effects,
        start,
        seen ? 'linePrefix' : 'lineSuffix'
      )(code)
    }

    return ok(code)
  }
}

var factoryWhitespace$2 = whitespaceFactory;

var markdownLineEnding$7 = markdownLineEnding_1;
var factorySpace$7 = factorySpace$h;

function titleFactory(effects, ok, nok, type, markerType, stringType) {
  var marker;
  return start

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    marker = code === 40 ? 41 : code;
    return atFirstTitleBreak
  }

  function atFirstTitleBreak(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok
    }

    effects.enter(stringType);
    return atTitleBreak(code)
  }

  function atTitleBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker)
    }

    if (code === null) {
      return nok(code)
    } // Note: blank lines can’t exist in content.

    if (markdownLineEnding$7(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace$7(effects, atTitleBreak, 'linePrefix')
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return title(code)
  }

  function title(code) {
    if (code === marker || code === null || markdownLineEnding$7(code)) {
      effects.exit('chunkString');
      return atTitleBreak(code)
    }

    effects.consume(code);
    return code === 92 ? titleEscape : title
  }

  function titleEscape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return title
    }

    return title(code)
  }
}

var factoryTitle$2 = titleFactory;

var markdownLineEnding$6 = markdownLineEnding_1;
var markdownLineEndingOrSpace$4 = markdownLineEndingOrSpace_1;
var normalizeIdentifier$2 = normalizeIdentifier_1;
var factoryDestination$1 = factoryDestination$2;
var factoryLabel$1 = factoryLabel$2;
var factorySpace$6 = factorySpace$h;
var factoryWhitespace$1 = factoryWhitespace$2;
var factoryTitle$1 = factoryTitle$2;

var definition$1 = {
  name: 'definition',
  tokenize: tokenizeDefinition
};
var titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};

function tokenizeDefinition(effects, ok, nok) {
  var self = this;
  var identifier;
  return start

  function start(code) {
    effects.enter('definition');
    return factoryLabel$1.call(
      self,
      effects,
      labelAfter,
      nok,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString'
    )(code)
  }

  function labelAfter(code) {
    identifier = normalizeIdentifier$2(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    );

    if (code === 58) {
      effects.enter('definitionMarker');
      effects.consume(code);
      effects.exit('definitionMarker'); // Note: blank lines can’t exist in content.

      return factoryWhitespace$1(
        effects,
        factoryDestination$1(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace$6(effects, after, 'whitespace'),
            factorySpace$6(effects, after, 'whitespace')
          ),
          nok,
          'definitionDestination',
          'definitionDestinationLiteral',
          'definitionDestinationLiteralMarker',
          'definitionDestinationRaw',
          'definitionDestinationString'
        )
      )
    }

    return nok(code)
  }

  function after(code) {
    if (code === null || markdownLineEnding$6(code)) {
      effects.exit('definition');

      if (self.parser.defined.indexOf(identifier) < 0) {
        self.parser.defined.push(identifier);
      }

      return ok(code)
    }

    return nok(code)
  }
}

function tokenizeTitle(effects, ok, nok) {
  return start

  function start(code) {
    return markdownLineEndingOrSpace$4(code)
      ? factoryWhitespace$1(effects, before)(code)
      : nok(code)
  }

  function before(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle$1(
        effects,
        factorySpace$6(effects, after, 'whitespace'),
        nok,
        'definitionTitle',
        'definitionTitleMarker',
        'definitionTitleString'
      )(code)
    }

    return nok(code)
  }

  function after(code) {
    return code === null || markdownLineEnding$6(code) ? ok(code) : nok(code)
  }
}

var definition_1 = definition$1;

var markdownLineEnding$5 = markdownLineEnding_1;

var hardBreakEscape$1 = {
  name: 'hardBreakEscape',
  tokenize: tokenizeHardBreakEscape
};

function tokenizeHardBreakEscape(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('hardBreakEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (markdownLineEnding$5(code)) {
      effects.exit('escapeMarker');
      effects.exit('hardBreakEscape');
      return ok(code)
    }

    return nok(code)
  }
}

var hardBreakEscape_1 = hardBreakEscape$1;

var markdownLineEnding$4 = markdownLineEnding_1;
var markdownLineEndingOrSpace$3 = markdownLineEndingOrSpace_1;
var markdownSpace$4 = markdownSpace_1;
var chunkedSplice$1 = chunkedSplice_1;
var factorySpace$5 = factorySpace$h;

var headingAtx$1 = {
  name: 'headingAtx',
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};

function resolveHeadingAtx(events, context) {
  var contentEnd = events.length - 2;
  var contentStart = 3;
  var content;
  var text; // Prefix whitespace, part of the opening.

  if (events[contentStart][1].type === 'whitespace') {
    contentStart += 2;
  } // Suffix whitespace, part of the closing.

  if (
    contentEnd - 2 > contentStart &&
    events[contentEnd][1].type === 'whitespace'
  ) {
    contentEnd -= 2;
  }

  if (
    events[contentEnd][1].type === 'atxHeadingSequence' &&
    (contentStart === contentEnd - 1 ||
      (contentEnd - 4 > contentStart &&
        events[contentEnd - 2][1].type === 'whitespace'))
  ) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }

  if (contentEnd > contentStart) {
    content = {
      type: 'atxHeadingText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text = {
      type: 'chunkText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: 'text'
    };
    chunkedSplice$1(events, contentStart, contentEnd - contentStart + 1, [
      ['enter', content, context],
      ['enter', text, context],
      ['exit', text, context],
      ['exit', content, context]
    ]);
  }

  return events
}

function tokenizeHeadingAtx(effects, ok, nok) {
  var self = this;
  var size = 0;
  return start

  function start(code) {
    effects.enter('atxHeading');
    effects.enter('atxHeadingSequence');
    return fenceOpenInside(code)
  }

  function fenceOpenInside(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return fenceOpenInside
    }

    if (code === null || markdownLineEndingOrSpace$3(code)) {
      effects.exit('atxHeadingSequence');
      return self.interrupt ? ok(code) : headingBreak(code)
    }

    return nok(code)
  }

  function headingBreak(code) {
    if (code === 35) {
      effects.enter('atxHeadingSequence');
      return sequence(code)
    }

    if (code === null || markdownLineEnding$4(code)) {
      effects.exit('atxHeading');
      return ok(code)
    }

    if (markdownSpace$4(code)) {
      return factorySpace$5(effects, headingBreak, 'whitespace')(code)
    }

    effects.enter('atxHeadingText');
    return data(code)
  }

  function sequence(code) {
    if (code === 35) {
      effects.consume(code);
      return sequence
    }

    effects.exit('atxHeadingSequence');
    return headingBreak(code)
  }

  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace$3(code)) {
      effects.exit('atxHeadingText');
      return headingBreak(code)
    }

    effects.consume(code);
    return data
  }
}

var headingAtx_1 = headingAtx$1;

// This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
var basics = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

var htmlBlockNames$1 = basics;

// This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
var raws = ['pre', 'script', 'style', 'textarea'];

var htmlRawNames$1 = raws;

var asciiAlpha$1 = asciiAlpha_1;
var asciiAlphanumeric$1 = asciiAlphanumeric_1;
var markdownLineEnding$3 = markdownLineEnding_1;
var markdownLineEndingOrSpace$2 = markdownLineEndingOrSpace_1;
var markdownSpace$3 = markdownSpace_1;
var fromCharCode = fromCharCode_1;
var htmlBlockNames = htmlBlockNames$1;
var htmlRawNames = htmlRawNames$1;
var partialBlankLine$1 = partialBlankLine_1;

var htmlFlow$1 = {
  name: 'htmlFlow',
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
var nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};

function resolveToHtmlFlow(events) {
  var index = events.length;

  while (index--) {
    if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
      break
    }
  }

  if (index > 1 && events[index - 2][1].type === 'linePrefix') {
    // Add the prefix start to the HTML token.
    events[index][1].start = events[index - 2][1].start; // Add the prefix start to the HTML line token.

    events[index + 1][1].start = events[index - 2][1].start; // Remove the line prefix.

    events.splice(index - 2, 2);
  }

  return events
}

function tokenizeHtmlFlow(effects, ok, nok) {
  var self = this;
  var kind;
  var startTag;
  var buffer;
  var index;
  var marker;
  return start

  function start(code) {
    effects.enter('htmlFlow');
    effects.enter('htmlFlowData');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationStart
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart
    }

    if (code === 63) {
      effects.consume(code);
      kind = 3; // While we’re in an instruction instead of a declaration, we’re on a `?`
      // right now, so we do need to search for `>`, similar to declarations.

      return self.interrupt ? ok : continuationDeclarationInside
    }

    if (asciiAlpha$1(code)) {
      effects.consume(code);
      buffer = fromCharCode(code);
      startTag = true;
      return tagName
    }

    return nok(code)
  }

  function declarationStart(code) {
    if (code === 45) {
      effects.consume(code);
      kind = 2;
      return commentOpenInside
    }

    if (code === 91) {
      effects.consume(code);
      kind = 5;
      buffer = 'CDATA[';
      index = 0;
      return cdataOpenInside
    }

    if (asciiAlpha$1(code)) {
      effects.consume(code);
      kind = 4;
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  function cdataOpenInside(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length
        ? self.interrupt
          ? ok
          : continuation
        : cdataOpenInside
    }

    return nok(code)
  }

  function tagCloseStart(code) {
    if (asciiAlpha$1(code)) {
      effects.consume(code);
      buffer = fromCharCode(code);
      return tagName
    }

    return nok(code)
  }

  function tagName(code) {
    if (
      code === null ||
      code === 47 ||
      code === 62 ||
      markdownLineEndingOrSpace$2(code)
    ) {
      if (
        code !== 47 &&
        startTag &&
        htmlRawNames.indexOf(buffer.toLowerCase()) > -1
      ) {
        kind = 1;
        return self.interrupt ? ok(code) : continuation(code)
      }

      if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
        kind = 6;

        if (code === 47) {
          effects.consume(code);
          return basicSelfClosing
        }

        return self.interrupt ? ok(code) : continuation(code)
      }

      kind = 7; // Do not support complete HTML when interrupting.

      return self.interrupt
        ? nok(code)
        : startTag
        ? completeAttributeNameBefore(code)
        : completeClosingTagAfter(code)
    }

    if (code === 45 || asciiAlphanumeric$1(code)) {
      effects.consume(code);
      buffer += fromCharCode(code);
      return tagName
    }

    return nok(code)
  }

  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      return self.interrupt ? ok : continuation
    }

    return nok(code)
  }

  function completeClosingTagAfter(code) {
    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeClosingTagAfter
    }

    return completeEnd(code)
  }

  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd
    }

    if (code === 58 || code === 95 || asciiAlpha$1(code)) {
      effects.consume(code);
      return completeAttributeName
    }

    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAttributeNameBefore
    }

    return completeEnd(code)
  }

  function completeAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric$1(code)
    ) {
      effects.consume(code);
      return completeAttributeName
    }

    return completeAttributeNameAfter(code)
  }

  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore
    }

    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAttributeNameAfter
    }

    return completeAttributeNameBefore(code)
  }

  function completeAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return completeAttributeValueQuoted
    }

    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAttributeValueBefore
    }

    marker = undefined;
    return completeAttributeValueUnquoted(code)
  }

  function completeAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return completeAttributeValueQuotedAfter
    }

    if (code === null || markdownLineEnding$3(code)) {
      return nok(code)
    }

    effects.consume(code);
    return completeAttributeValueQuoted
  }

  function completeAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96 ||
      markdownLineEndingOrSpace$2(code)
    ) {
      return completeAttributeNameAfter(code)
    }

    effects.consume(code);
    return completeAttributeValueUnquoted
  }

  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace$3(code)) {
      return completeAttributeNameBefore(code)
    }

    return nok(code)
  }

  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter
    }

    return nok(code)
  }

  function completeAfter(code) {
    if (markdownSpace$3(code)) {
      effects.consume(code);
      return completeAfter
    }

    return code === null || markdownLineEnding$3(code)
      ? continuation(code)
      : nok(code)
  }

  function continuation(code) {
    if (code === 45 && kind === 2) {
      effects.consume(code);
      return continuationCommentInside
    }

    if (code === 60 && kind === 1) {
      effects.consume(code);
      return continuationRawTagOpen
    }

    if (code === 62 && kind === 4) {
      effects.consume(code);
      return continuationClose
    }

    if (code === 63 && kind === 3) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    if (code === 93 && kind === 5) {
      effects.consume(code);
      return continuationCharacterDataInside
    }

    if (markdownLineEnding$3(code) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code)
    }

    if (code === null || markdownLineEnding$3(code)) {
      return continuationAtLineEnding(code)
    }

    effects.consume(code);
    return continuation
  }

  function continuationAtLineEnding(code) {
    effects.exit('htmlFlowData');
    return htmlContinueStart(code)
  }

  function htmlContinueStart(code) {
    if (code === null) {
      return done(code)
    }

    if (markdownLineEnding$3(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return htmlContinueStart
    }

    effects.enter('htmlFlowData');
    return continuation(code)
  }

  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = '';
      return continuationRawEndTag
    }

    return continuation(code)
  }

  function continuationRawEndTag(code) {
    if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
      effects.consume(code);
      return continuationClose
    }

    if (asciiAlpha$1(code) && buffer.length < 8) {
      effects.consume(code);
      buffer += fromCharCode(code);
      return continuationRawEndTag
    }

    return continuation(code)
  }

  function continuationCharacterDataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose
    }

    return continuation(code)
  }

  function continuationClose(code) {
    if (code === null || markdownLineEnding$3(code)) {
      effects.exit('htmlFlowData');
      return done(code)
    }

    effects.consume(code);
    return continuationClose
  }

  function done(code) {
    effects.exit('htmlFlow');
    return ok(code)
  }
}

function tokenizeNextBlank(effects, ok, nok) {
  return start

  function start(code) {
    effects.exit('htmlFlowData');
    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    return effects.attempt(partialBlankLine$1, ok, nok)
  }
}

var htmlFlow_1 = htmlFlow$1;

var asciiAlpha = asciiAlpha_1;
var asciiAlphanumeric = asciiAlphanumeric_1;
var markdownLineEnding$2 = markdownLineEnding_1;
var markdownLineEndingOrSpace$1 = markdownLineEndingOrSpace_1;
var markdownSpace$2 = markdownSpace_1;
var factorySpace$4 = factorySpace$h;

var htmlText$1 = {
  name: 'htmlText',
  tokenize: tokenizeHtmlText
};

function tokenizeHtmlText(effects, ok, nok) {
  var self = this;
  var marker;
  var buffer;
  var index;
  var returnState;
  return start

  function start(code) {
    effects.enter('htmlText');
    effects.enter('htmlTextData');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart
    }

    if (code === 63) {
      effects.consume(code);
      return instruction
    }

    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagOpen
    }

    return nok(code)
  }

  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpen
    }

    if (code === 91) {
      effects.consume(code);
      buffer = 'CDATA[';
      index = 0;
      return cdataOpen
    }

    if (asciiAlpha(code)) {
      effects.consume(code);
      return declaration
    }

    return nok(code)
  }

  function commentOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentStart
    }

    return nok(code)
  }

  function commentStart(code) {
    if (code === null || code === 62) {
      return nok(code)
    }

    if (code === 45) {
      effects.consume(code);
      return commentStartDash
    }

    return comment(code)
  }

  function commentStartDash(code) {
    if (code === null || code === 62) {
      return nok(code)
    }

    return comment(code)
  }

  function comment(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 45) {
      effects.consume(code);
      return commentClose
    }

    if (markdownLineEnding$2(code)) {
      returnState = comment;
      return atLineEnding(code)
    }

    effects.consume(code);
    return comment
  }

  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return end
    }

    return comment(code)
  }

  function cdataOpen(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length ? cdata : cdataOpen
    }

    return nok(code)
  }

  function cdata(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 93) {
      effects.consume(code);
      return cdataClose
    }

    if (markdownLineEnding$2(code)) {
      returnState = cdata;
      return atLineEnding(code)
    }

    effects.consume(code);
    return cdata
  }

  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd
    }

    return cdata(code)
  }

  function cdataEnd(code) {
    if (code === 62) {
      return end(code)
    }

    if (code === 93) {
      effects.consume(code);
      return cdataEnd
    }

    return cdata(code)
  }

  function declaration(code) {
    if (code === null || code === 62) {
      return end(code)
    }

    if (markdownLineEnding$2(code)) {
      returnState = declaration;
      return atLineEnding(code)
    }

    effects.consume(code);
    return declaration
  }

  function instruction(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 63) {
      effects.consume(code);
      return instructionClose
    }

    if (markdownLineEnding$2(code)) {
      returnState = instruction;
      return atLineEnding(code)
    }

    effects.consume(code);
    return instruction
  }

  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code)
  }

  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagClose
    }

    return nok(code)
  }

  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagClose
    }

    return tagCloseBetween(code)
  }

  function tagCloseBetween(code) {
    if (markdownLineEnding$2(code)) {
      returnState = tagCloseBetween;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagCloseBetween
    }

    return end(code)
  }

  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpen
    }

    if (code === 47 || code === 62 || markdownLineEndingOrSpace$1(code)) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end
    }

    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return tagOpenAttributeName
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenBetween;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagOpenBetween
    }

    return end(code)
  }

  function tagOpenAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric(code)
    ) {
      effects.consume(code);
      return tagOpenAttributeName
    }

    return tagOpenAttributeNameAfter(code)
  }

  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter
    }

    return tagOpenBetween(code)
  }

  function tagOpenAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code)
    }

    if (markdownSpace$2(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore
    }

    effects.consume(code);
    marker = undefined;
    return tagOpenAttributeValueUnquoted
  }

  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return tagOpenAttributeValueQuotedAfter
    }

    if (code === null) {
      return nok(code)
    }

    if (markdownLineEnding$2(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code)
    }

    effects.consume(code);
    return tagOpenAttributeValueQuoted
  }

  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 62 || code === 47 || markdownLineEndingOrSpace$1(code)) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  function tagOpenAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 62 || markdownLineEndingOrSpace$1(code)) {
      return tagOpenBetween(code)
    }

    effects.consume(code);
    return tagOpenAttributeValueUnquoted
  } // We can’t have blank lines in content, so no need to worry about empty
  // tokens.

  function atLineEnding(code) {
    effects.exit('htmlTextData');
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$4(
      effects,
      afterPrefix,
      'linePrefix',
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )
  }

  function afterPrefix(code) {
    effects.enter('htmlTextData');
    return returnState(code)
  }

  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit('htmlTextData');
      effects.exit('htmlText');
      return ok
    }

    return nok(code)
  }
}

var htmlText_1 = htmlText$1;

var markdownLineEndingOrSpace = markdownLineEndingOrSpace_1;
var chunkedPush = chunkedPush_1;
var chunkedSplice = chunkedSplice_1;
var normalizeIdentifier$1 = normalizeIdentifier_1;
var resolveAll = resolveAll_1;
var shallow$1 = shallow_1;
var factoryDestination = factoryDestination$2;
var factoryLabel = factoryLabel$2;
var factoryTitle = factoryTitle$2;
var factoryWhitespace = factoryWhitespace$2;

var labelEnd$3 = {
  name: 'labelEnd',
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
var collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};

function resolveAllLabelEnd(events) {
  var index = -1;
  var token;

  while (++index < events.length) {
    token = events[index][1];

    if (
      !token._used &&
      (token.type === 'labelImage' ||
        token.type === 'labelLink' ||
        token.type === 'labelEnd')
    ) {
      // Remove the marker.
      events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
      token.type = 'data';
      index++;
    }
  }

  return events
}

function resolveToLabelEnd(events, context) {
  var index = events.length;
  var offset = 0;
  var group;
  var label;
  var text;
  var token;
  var open;
  var close;
  var media; // Find an opening.

  while (index--) {
    token = events[index][1];

    if (open) {
      // If we see another link, or inactive link label, we’ve been here before.
      if (
        token.type === 'link' ||
        (token.type === 'labelLink' && token._inactive)
      ) {
        break
      } // Mark other link openings as inactive, as we can’t have links in
      // links.

      if (events[index][0] === 'enter' && token.type === 'labelLink') {
        token._inactive = true;
      }
    } else if (close) {
      if (
        events[index][0] === 'enter' &&
        (token.type === 'labelImage' || token.type === 'labelLink') &&
        !token._balanced
      ) {
        open = index;

        if (token.type !== 'labelLink') {
          offset = 2;
          break
        }
      }
    } else if (token.type === 'labelEnd') {
      close = index;
    }
  }

  group = {
    type: events[open][1].type === 'labelLink' ? 'link' : 'image',
    start: shallow$1(events[open][1].start),
    end: shallow$1(events[events.length - 1][1].end)
  };
  label = {
    type: 'label',
    start: shallow$1(events[open][1].start),
    end: shallow$1(events[close][1].end)
  };
  text = {
    type: 'labelText',
    start: shallow$1(events[open + offset + 2][1].end),
    end: shallow$1(events[close - 2][1].start)
  };
  media = [
    ['enter', group, context],
    ['enter', label, context]
  ]; // Opening marker.

  media = chunkedPush(media, events.slice(open + 1, open + offset + 3)); // Text open.

  media = chunkedPush(media, [['enter', text, context]]); // Between.

  media = chunkedPush(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close - 3),
      context
    )
  ); // Text close, marker close, label close.

  media = chunkedPush(media, [
    ['exit', text, context],
    events[close - 2],
    events[close - 1],
    ['exit', label, context]
  ]); // Reference, resource, or so.

  media = chunkedPush(media, events.slice(close + 1)); // Media close.

  media = chunkedPush(media, [['exit', group, context]]);
  chunkedSplice(events, open, events.length, media);
  return events
}

function tokenizeLabelEnd(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var labelStart;
  var defined; // Find an opening.

  while (index--) {
    if (
      (self.events[index][1].type === 'labelImage' ||
        self.events[index][1].type === 'labelLink') &&
      !self.events[index][1]._balanced
    ) {
      labelStart = self.events[index][1];
      break
    }
  }

  return start

  function start(code) {
    if (!labelStart) {
      return nok(code)
    } // It’s a balanced bracket, but contains a link.

    if (labelStart._inactive) return balanced(code)
    defined =
      self.parser.defined.indexOf(
        normalizeIdentifier$1(
          self.sliceSerialize({
            start: labelStart.end,
            end: self.now()
          })
        )
      ) > -1;
    effects.enter('labelEnd');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelEnd');
    return afterLabelEnd
  }

  function afterLabelEnd(code) {
    // Resource: `[asd](fgh)`.
    if (code === 40) {
      return effects.attempt(
        resourceConstruct,
        ok,
        defined ? ok : balanced
      )(code)
    } // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?

    if (code === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok,
        defined
          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
          : balanced
      )(code)
    } // Shortcut reference: `[asd]`?

    return defined ? ok(code) : balanced(code)
  }

  function balanced(code) {
    labelStart._balanced = true;
    return nok(code)
  }
}

function tokenizeResource(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('resource');
    effects.enter('resourceMarker');
    effects.consume(code);
    effects.exit('resourceMarker');
    return factoryWhitespace(effects, open)
  }

  function open(code) {
    if (code === 41) {
      return end(code)
    }

    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      'resourceDestination',
      'resourceDestinationLiteral',
      'resourceDestinationLiteralMarker',
      'resourceDestinationRaw',
      'resourceDestinationString',
      3
    )(code)
  }

  function destinationAfter(code) {
    return markdownLineEndingOrSpace(code)
      ? factoryWhitespace(effects, between)(code)
      : end(code)
  }

  function between(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end),
        nok,
        'resourceTitle',
        'resourceTitleMarker',
        'resourceTitleString'
      )(code)
    }

    return end(code)
  }

  function end(code) {
    if (code === 41) {
      effects.enter('resourceMarker');
      effects.consume(code);
      effects.exit('resourceMarker');
      effects.exit('resource');
      return ok
    }

    return nok(code)
  }
}

function tokenizeFullReference(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    return factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      'reference',
      'referenceMarker',
      'referenceString'
    )(code)
  }

  function afterLabel(code) {
    return self.parser.defined.indexOf(
      normalizeIdentifier$1(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    ) < 0
      ? nok(code)
      : ok(code)
  }
}

function tokenizeCollapsedReference(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('reference');
    effects.enter('referenceMarker');
    effects.consume(code);
    effects.exit('referenceMarker');
    return open
  }

  function open(code) {
    if (code === 93) {
      effects.enter('referenceMarker');
      effects.consume(code);
      effects.exit('referenceMarker');
      effects.exit('reference');
      return ok
    }

    return nok(code)
  }
}

var labelEnd_1 = labelEnd$3;

var labelEnd$2 = labelEnd_1;

var labelStartImage$1 = {
  name: 'labelStartImage',
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd$2.resolveAll
};

function tokenizeLabelStartImage(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    effects.enter('labelImage');
    effects.enter('labelImageMarker');
    effects.consume(code);
    effects.exit('labelImageMarker');
    return open
  }

  function open(code) {
    if (code === 91) {
      effects.enter('labelMarker');
      effects.consume(code);
      effects.exit('labelMarker');
      effects.exit('labelImage');
      return after
    }

    return nok(code)
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
      /* c8 ignore next */
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? /* c8 ignore next */
        nok(code)
      : ok(code)
  }
}

var labelStartImage_1 = labelStartImage$1;

var labelEnd$1 = labelEnd_1;

var labelStartLink$1 = {
  name: 'labelStartLink',
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd$1.resolveAll
};

function tokenizeLabelStartLink(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    effects.enter('labelLink');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelLink');
    return after
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
      /* c8 ignore next */
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? /* c8 ignore next */
        nok(code)
      : ok(code)
  }
}

var labelStartLink_1 = labelStartLink$1;

var factorySpace$3 = factorySpace$h;

var lineEnding$1 = {
  name: 'lineEnding',
  tokenize: tokenizeLineEnding
};

function tokenizeLineEnding(effects, ok) {
  return start

  function start(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace$3(effects, ok, 'linePrefix')
  }
}

var lineEnding_1 = lineEnding$1;

var markdownLineEnding$1 = markdownLineEnding_1;
var markdownSpace$1 = markdownSpace_1;
var factorySpace$2 = factorySpace$h;

var thematicBreak$2 = {
  name: 'thematicBreak',
  tokenize: tokenizeThematicBreak
};

function tokenizeThematicBreak(effects, ok, nok) {
  var size = 0;
  var marker;
  return start

  function start(code) {
    effects.enter('thematicBreak');
    marker = code;
    return atBreak(code)
  }

  function atBreak(code) {
    if (code === marker) {
      effects.enter('thematicBreakSequence');
      return sequence(code)
    }

    if (markdownSpace$1(code)) {
      return factorySpace$2(effects, atBreak, 'whitespace')(code)
    }

    if (size < 3 || (code !== null && !markdownLineEnding$1(code))) {
      return nok(code)
    }

    effects.exit('thematicBreak');
    return ok(code)
  }

  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence
    }

    effects.exit('thematicBreakSequence');
    return atBreak(code)
  }
}

var thematicBreak_1 = thematicBreak$2;

var asciiDigit = asciiDigit_1;
var markdownSpace = markdownSpace_1;
var prefixSize = prefixSize_1;
var sizeChunks = sizeChunks_1;
var factorySpace$1 = factorySpace$h;
var partialBlankLine = partialBlankLine_1;
var thematicBreak$1 = thematicBreak_1;

var list$1 = {
  name: 'list',
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};

function tokenizeListStart(effects, ok, nok) {
  var self = this;
  var initialSize = prefixSize(self.events, 'linePrefix');
  var size = 0;
  return start

  function start(code) {
    var kind =
      self.containerState.type ||
      (code === 42 || code === 43 || code === 45
        ? 'listUnordered'
        : 'listOrdered');

    if (
      kind === 'listUnordered'
        ? !self.containerState.marker || code === self.containerState.marker
        : asciiDigit(code)
    ) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }

      if (kind === 'listUnordered') {
        effects.enter('listItemPrefix');
        return code === 42 || code === 45
          ? effects.check(thematicBreak$1, nok, atMarker)(code)
          : atMarker(code)
      }

      if (!self.interrupt || code === 49) {
        effects.enter('listItemPrefix');
        effects.enter('listItemValue');
        return inside(code)
      }
    }

    return nok(code)
  }

  function inside(code) {
    if (asciiDigit(code) && ++size < 10) {
      effects.consume(code);
      return inside
    }

    if (
      (!self.interrupt || size < 2) &&
      (self.containerState.marker
        ? code === self.containerState.marker
        : code === 41 || code === 46)
    ) {
      effects.exit('listItemValue');
      return atMarker(code)
    }

    return nok(code)
  }

  function atMarker(code) {
    effects.enter('listItemMarker');
    effects.consume(code);
    effects.exit('listItemMarker');
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(
      partialBlankLine, // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    )
  }

  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code)
  }

  function otherPrefix(code) {
    if (markdownSpace(code)) {
      effects.enter('listItemPrefixWhitespace');
      effects.consume(code);
      effects.exit('listItemPrefixWhitespace');
      return endOfPrefix
    }

    return nok(code)
  }

  function endOfPrefix(code) {
    self.containerState.size =
      initialSize + sizeChunks(self.sliceStream(effects.exit('listItemPrefix')));
    return ok(code)
  }
}

function tokenizeListContinuation(effects, ok, nok) {
  var self = this;
  self.containerState._closeFlow = undefined;
  return effects.check(partialBlankLine, onBlank, notBlank)

  function onBlank(code) {
    self.containerState.furtherBlankLines =
      self.containerState.furtherBlankLines ||
      self.containerState.initialBlankLine; // We have a blank line.
    // Still, try to consume at most the items size.

    return factorySpace$1(
      effects,
      ok,
      'listItemIndent',
      self.containerState.size + 1
    )(code)
  }

  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
      self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
      return notInCurrentItem(code)
    }

    self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
  }

  function notInCurrentItem(code) {
    // While we do continue, we signal that the flow should be closed.
    self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

    self.interrupt = undefined;
    return factorySpace$1(
      effects,
      effects.attempt(list$1, ok, nok),
      'linePrefix',
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )(code)
  }
}

function tokenizeIndent(effects, ok, nok) {
  var self = this;
  return factorySpace$1(
    effects,
    afterPrefix,
    'listItemIndent',
    self.containerState.size + 1
  )

  function afterPrefix(code) {
    return prefixSize(self.events, 'listItemIndent') ===
      self.containerState.size
      ? ok(code)
      : nok(code)
  }
}

function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}

function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  var self = this;
  return factorySpace$1(
    effects,
    afterPrefix,
    'listItemPrefixWhitespace',
    self.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4 + 1
  )

  function afterPrefix(code) {
    return markdownSpace(code) ||
      !prefixSize(self.events, 'listItemPrefixWhitespace')
      ? nok(code)
      : ok(code)
  }
}

var list_1 = list$1;

var markdownLineEnding = markdownLineEnding_1;
var shallow = shallow_1;
var factorySpace = factorySpace$h;

var setextUnderline$1 = {
  name: 'setextUnderline',
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};

function resolveToSetextUnderline(events, context) {
  var index = events.length;
  var content;
  var text;
  var definition;
  var heading; // Find the opening of the content.
  // It’ll always exist: we don’t tokenize if it isn’t there.

  while (index--) {
    if (events[index][0] === 'enter') {
      if (events[index][1].type === 'content') {
        content = index;
        break
      }

      if (events[index][1].type === 'paragraph') {
        text = index;
      }
    } // Exit
    else {
      if (events[index][1].type === 'content') {
        // Remove the content end (if needed we’ll add it later)
        events.splice(index, 1);
      }

      if (!definition && events[index][1].type === 'definition') {
        definition = index;
      }
    }
  }

  heading = {
    type: 'setextHeading',
    start: shallow(events[text][1].start),
    end: shallow(events[events.length - 1][1].end)
  }; // Change the paragraph to setext heading text.

  events[text][1].type = 'setextHeadingText'; // If we have definitions in the content, we’ll keep on having content,
  // but we need move it.

  if (definition) {
    events.splice(text, 0, ['enter', heading, context]);
    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
    events[content][1].end = shallow(events[definition][1].end);
  } else {
    events[content][1] = heading;
  } // Add the heading exit at the end.

  events.push(['exit', heading, context]);
  return events
}

function tokenizeSetextUnderline(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var marker;
  var paragraph; // Find an opening.

  while (index--) {
    // Skip enter/exit of line ending, line prefix, and content.
    // We can now either have a definition or a paragraph.
    if (
      self.events[index][1].type !== 'lineEnding' &&
      self.events[index][1].type !== 'linePrefix' &&
      self.events[index][1].type !== 'content'
    ) {
      paragraph = self.events[index][1].type === 'paragraph';
      break
    }
  }

  return start

  function start(code) {
    if (!self.lazy && (self.interrupt || paragraph)) {
      effects.enter('setextHeadingLine');
      effects.enter('setextHeadingLineSequence');
      marker = code;
      return closingSequence(code)
    }

    return nok(code)
  }

  function closingSequence(code) {
    if (code === marker) {
      effects.consume(code);
      return closingSequence
    }

    effects.exit('setextHeadingLineSequence');
    return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code)
  }

  function closingSequenceEnd(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit('setextHeadingLine');
      return ok(code)
    }

    return nok(code)
  }
}

var setextUnderline_1 = setextUnderline$1;

Object.defineProperty(constructs$1, '__esModule', {value: true});

var text$1 = text$4;
var attention = attention_1;
var autolink = autolink_1;
var blockQuote = blockQuote_1;
var characterEscape = characterEscape_1;
var characterReference = characterReference_1;
var codeFenced = codeFenced_1;
var codeIndented = codeIndented_1;
var codeText = codeText_1;
var definition = definition_1;
var hardBreakEscape = hardBreakEscape_1;
var headingAtx = headingAtx_1;
var htmlFlow = htmlFlow_1;
var htmlText = htmlText_1;
var labelEnd = labelEnd_1;
var labelStartImage = labelStartImage_1;
var labelStartLink = labelStartLink_1;
var lineEnding = lineEnding_1;
var list = list_1;
var setextUnderline = setextUnderline_1;
var thematicBreak = thematicBreak_1;

var document$1 = {
  42: list,
  // Asterisk
  43: list,
  // Plus sign
  45: list,
  // Dash
  48: list,
  // 0
  49: list,
  // 1
  50: list,
  // 2
  51: list,
  // 3
  52: list,
  // 4
  53: list,
  // 5
  54: list,
  // 6
  55: list,
  // 7
  56: list,
  // 8
  57: list,
  // 9
  62: blockQuote // Greater than
};
var contentInitial = {
  91: definition // Left square bracket
};
var flowInitial = {
  '-2': codeIndented,
  // Horizontal tab
  '-1': codeIndented,
  // Virtual space
  32: codeIndented // Space
};
var flow$2 = {
  35: headingAtx,
  // Number sign
  42: thematicBreak,
  // Asterisk
  45: [setextUnderline, thematicBreak],
  // Dash
  60: htmlFlow,
  // Less than
  61: setextUnderline,
  // Equals to
  95: thematicBreak,
  // Underscore
  96: codeFenced,
  // Grave accent
  126: codeFenced // Tilde
};
var string = {
  38: characterReference,
  // Ampersand
  92: characterEscape // Backslash
};
var text$2 = {
  '-5': lineEnding,
  // Carriage return
  '-4': lineEnding,
  // Line feed
  '-3': lineEnding,
  // Carriage return + line feed
  33: labelStartImage,
  // Exclamation mark
  38: characterReference,
  // Ampersand
  42: attention,
  // Asterisk
  60: [autolink, htmlText],
  // Less than
  91: labelStartLink,
  // Left square bracket
  92: [hardBreakEscape, characterEscape],
  // Backslash
  93: labelEnd,
  // Right square bracket
  95: attention,
  // Underscore
  96: codeText // Grave accent
};
var insideSpan = {
  null: [attention, text$1.resolver]
};
var disable = {
  null: []
};

constructs$1.contentInitial = contentInitial;
constructs$1.disable = disable;
constructs$1.document = document$1;
constructs$1.flow = flow$2;
constructs$1.flowInitial = flowInitial;
constructs$1.insideSpan = insideSpan;
constructs$1.string = string;
constructs$1.text = text$2;

var content = content$3;
var document = document$2;
var flow$1 = flow$3;
var text = text$4;
var combineExtensions = combineExtensions_1;
var createTokenizer = createTokenizer_1;
var miniflat = miniflat_1;
var constructs = constructs$1;

function parse$7(options) {
  var settings = options || {};
  var parser = {
    defined: [],
    constructs: combineExtensions(
      [constructs].concat(miniflat(settings.extensions))
    ),
    content: create(content),
    document: create(document),
    flow: create(flow$1),
    string: create(text.string),
    text: create(text.text)
  };
  return parser

  function create(initializer) {
    return creator

    function creator(from) {
      return createTokenizer(parser, initializer, from)
    }
  }
}

var parse_1 = parse$7;

var search = /[\0\t\n\r]/g;

function preprocess() {
  var start = true;
  var column = 1;
  var buffer = '';
  var atCarriageReturn;
  return preprocessor

  function preprocessor(value, encoding, end) {
    var chunks = [];
    var match;
    var next;
    var startPosition;
    var endPosition;
    var code;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = '';

    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }

      start = undefined;
    }

    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match ? match.index : value.length;
      code = value.charCodeAt(endPosition);

      if (!match) {
        buffer = value.slice(startPosition);
        break
      }

      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = undefined;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = undefined;
        }

        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }

        if (code === 0) {
          chunks.push(65533);
          column++;
        } else if (code === 9) {
          next = Math.ceil(column / 4) * 4;
          chunks.push(-2);

          while (column++ < next) chunks.push(-1);
        } else if (code === 10) {
          chunks.push(-4);
          column = 1;
        } // Must be carriage return.
        else {
          atCarriageReturn = true;
          column = 1;
        }
      }

      startPosition = endPosition + 1;
    }

    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }

    return chunks
  }
}

var preprocess_1 = preprocess;

var subtokenize = subtokenize_1;

function postprocess$1(events) {
  while (!subtokenize(events)) {
    // Empty
  }

  return events
}

var postprocess_1 = postprocess$1;

var own$6 = {}.hasOwnProperty;

var unistUtilStringifyPosition = stringify$3;

function stringify$3(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return ''
  }

  // Node.
  if (own$6.call(value, 'position') || own$6.call(value, 'type')) {
    return position(value.position)
  }

  // Position.
  if (own$6.call(value, 'start') || own$6.call(value, 'end')) {
    return position(value)
  }

  // Point.
  if (own$6.call(value, 'line') || own$6.call(value, 'column')) {
    return point(value)
  }

  // ?
  return ''
}

function point(point) {
  if (!point || typeof point !== 'object') {
    point = {};
  }

  return index(point.line) + ':' + index(point.column)
}

function position(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {};
  }

  return point(pos.start) + '-' + point(pos.end)
}

function index(value) {
  return value && typeof value === 'number' ? value : 1
}

var dist = fromMarkdown$1;

// These three are compiled away in the `dist/`

var toString$3 = mdastUtilToString;
var assign = assign_1;
var own$5 = hasOwnProperty$1;
var normalizeIdentifier = normalizeIdentifier_1;
var safeFromInt = safeFromInt_1;
var parser$1 = parse_1;
var preprocessor = preprocess_1;
var postprocess = postprocess_1;
var decode = decodeEntity_1;
var stringifyPosition = unistUtilStringifyPosition;

function fromMarkdown$1(value, encoding, options) {
  if (typeof encoding !== 'string') {
    options = encoding;
    encoding = undefined;
  }

  return compiler(options)(
    postprocess(
      parser$1(options).document().write(preprocessor()(value, encoding, true))
    )
  )
}

// Note this compiler only understand complete buffering, not streaming.
function compiler(options) {
  var settings = options || {};
  var config = configure$1(
    {
      transforms: [],
      canContainEols: [
        'emphasis',
        'fragment',
        'heading',
        'paragraph',
        'strong'
      ],

      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list, onenterlistordered),
        listUnordered: opener(list),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak)
      },

      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    },

    settings.mdastExtensions || []
  );

  var data = {};

  return compile

  function compile(events) {
    var tree = {type: 'root', children: []};
    var stack = [tree];
    var tokenStack = [];
    var listStack = [];
    var index = -1;
    var handler;
    var listStart;

    var context = {
      stack: stack,
      tokenStack: tokenStack,
      config: config,
      enter: enter,
      exit: exit,
      buffer: buffer,
      resume: resume,
      setData: setData,
      getData: getData
    };

    while (++index < events.length) {
      // We preprocess lists to add `listItem` tokens, and to infer whether
      // items the list itself are spread out.
      if (
        events[index][1].type === 'listOrdered' ||
        events[index][1].type === 'listUnordered'
      ) {
        if (events[index][0] === 'enter') {
          listStack.push(index);
        } else {
          listStart = listStack.pop(index);
          index = prepareList(events, listStart, index);
        }
      }
    }

    index = -1;

    while (++index < events.length) {
      handler = config[events[index][0]];

      if (own$5.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          assign({sliceSerialize: events[index][2].sliceSerialize}, context),
          events[index][1]
        );
      }
    }

    if (tokenStack.length) {
      throw new Error(
        'Cannot close document, a token (`' +
          tokenStack[tokenStack.length - 1].type +
          '`, ' +
          stringifyPosition({
            start: tokenStack[tokenStack.length - 1].start,
            end: tokenStack[tokenStack.length - 1].end
          }) +
          ') is still open'
      )
    }

    // Figure out `root` position.
    tree.position = {
      start: point(
        events.length ? events[0][1].start : {line: 1, column: 1, offset: 0}
      ),

      end: point(
        events.length
          ? events[events.length - 2][1].end
          : {line: 1, column: 1, offset: 0}
      )
    };

    index = -1;
    while (++index < config.transforms.length) {
      tree = config.transforms[index](tree) || tree;
    }

    return tree
  }

  function prepareList(events, start, length) {
    var index = start - 1;
    var containerBalance = -1;
    var listSpread = false;
    var listItem;
    var tailIndex;
    var lineIndex;
    var tailEvent;
    var event;
    var firstBlankLineIndex;
    var atMarker;

    while (++index <= length) {
      event = events[index];

      if (
        event[1].type === 'listUnordered' ||
        event[1].type === 'listOrdered' ||
        event[1].type === 'blockQuote'
      ) {
        if (event[0] === 'enter') {
          containerBalance++;
        } else {
          containerBalance--;
        }

        atMarker = undefined;
      } else if (event[1].type === 'lineEndingBlank') {
        if (event[0] === 'enter') {
          if (
            listItem &&
            !atMarker &&
            !containerBalance &&
            !firstBlankLineIndex
          ) {
            firstBlankLineIndex = index;
          }

          atMarker = undefined;
        }
      } else if (
        event[1].type === 'linePrefix' ||
        event[1].type === 'listItemValue' ||
        event[1].type === 'listItemMarker' ||
        event[1].type === 'listItemPrefix' ||
        event[1].type === 'listItemPrefixWhitespace'
      ) ; else {
        atMarker = undefined;
      }

      if (
        (!containerBalance &&
          event[0] === 'enter' &&
          event[1].type === 'listItemPrefix') ||
        (containerBalance === -1 &&
          event[0] === 'exit' &&
          (event[1].type === 'listUnordered' ||
            event[1].type === 'listOrdered'))
      ) {
        if (listItem) {
          tailIndex = index;
          lineIndex = undefined;

          while (tailIndex--) {
            tailEvent = events[tailIndex];

            if (
              tailEvent[1].type === 'lineEnding' ||
              tailEvent[1].type === 'lineEndingBlank'
            ) {
              if (tailEvent[0] === 'exit') continue

              if (lineIndex) {
                events[lineIndex][1].type = 'lineEndingBlank';
                listSpread = true;
              }

              tailEvent[1].type = 'lineEnding';
              lineIndex = tailIndex;
            } else if (
              tailEvent[1].type === 'linePrefix' ||
              tailEvent[1].type === 'blockQuotePrefix' ||
              tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
              tailEvent[1].type === 'blockQuoteMarker' ||
              tailEvent[1].type === 'listItemIndent'
            ) ; else {
              break
            }
          }

          if (
            firstBlankLineIndex &&
            (!lineIndex || firstBlankLineIndex < lineIndex)
          ) {
            listItem._spread = true;
          }

          // Fix position.
          listItem.end = point(
            lineIndex ? events[lineIndex][1].start : event[1].end
          );

          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
          index++;
          length++;
        }

        // Create a new list item.
        if (event[1].type === 'listItemPrefix') {
          listItem = {
            type: 'listItem',
            _spread: false,
            start: point(event[1].start)
          };

          events.splice(index, 0, ['enter', listItem, event[2]]);
          index++;
          length++;
          firstBlankLineIndex = undefined;
          atMarker = true;
        }
      }
    }

    events[start][1]._spread = listSpread;
    return length
  }

  function setData(key, value) {
    data[key] = value;
  }

  function getData(key) {
    return data[key]
  }

  function point(d) {
    return {line: d.line, column: d.column, offset: d.offset}
  }

  function opener(create, and) {
    return open

    function open(token) {
      enter.call(this, create(token), token);
      if (and) and.call(this, token);
    }
  }

  function buffer() {
    this.stack.push({type: 'fragment', children: []});
  }

  function enter(node, token) {
    this.stack[this.stack.length - 1].children.push(node);
    this.stack.push(node);
    this.tokenStack.push(token);
    node.position = {start: point(token.start)};
    return node
  }

  function closer(and) {
    return close

    function close(token) {
      if (and) and.call(this, token);
      exit.call(this, token);
    }
  }

  function exit(token) {
    var node = this.stack.pop();
    var open = this.tokenStack.pop();

    if (!open) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          stringifyPosition({start: token.start, end: token.end}) +
          '): it’s not open'
      )
    } else if (open.type !== token.type) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          stringifyPosition({start: token.start, end: token.end}) +
          '): a different token (`' +
          open.type +
          '`, ' +
          stringifyPosition({start: open.start, end: open.end}) +
          ') is open'
      )
    }

    node.position.end = point(token.end);
    return node
  }

  function resume() {
    return toString$3(this.stack.pop())
  }

  //
  // Handlers.
  //

  function onenterlistordered() {
    setData('expectingFirstListItemValue', true);
  }

  function onenterlistitemvalue(token) {
    if (getData('expectingFirstListItemValue')) {
      this.stack[this.stack.length - 2].start = parseInt(
        this.sliceSerialize(token),
        10
      );

      setData('expectingFirstListItemValue');
    }
  }

  function onexitcodefencedfenceinfo() {
    var data = this.resume();
    this.stack[this.stack.length - 1].lang = data;
  }

  function onexitcodefencedfencemeta() {
    var data = this.resume();
    this.stack[this.stack.length - 1].meta = data;
  }

  function onexitcodefencedfence() {
    // Exit if this is the closing fence.
    if (getData('flowCodeInside')) return
    this.buffer();
    setData('flowCodeInside', true);
  }

  function onexitcodefenced() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data.replace(
      /^(\r?\n|\r)|(\r?\n|\r)$/g,
      ''
    );

    setData('flowCodeInside');
  }

  function onexitcodeindented() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitdefinitionlabelstring(token) {
    // Discard label, use the source content instead.
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }

  function onexitdefinitiontitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitdefinitiondestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitatxheadingsequence(token) {
    if (!this.stack[this.stack.length - 1].depth) {
      this.stack[this.stack.length - 1].depth = this.sliceSerialize(
        token
      ).length;
    }
  }

  function onexitsetextheadingtext() {
    setData('setextHeadingSlurpLineEnding', true);
  }

  function onexitsetextheadinglinesequence(token) {
    this.stack[this.stack.length - 1].depth =
      this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }

  function onexitsetextheading() {
    setData('setextHeadingSlurpLineEnding');
  }

  function onenterdata(token) {
    var siblings = this.stack[this.stack.length - 1].children;
    var tail = siblings[siblings.length - 1];

    if (!tail || tail.type !== 'text') {
      // Add a new text node.
      tail = text();
      tail.position = {start: point(token.start)};
      this.stack[this.stack.length - 1].children.push(tail);
    }

    this.stack.push(tail);
  }

  function onexitdata(token) {
    var tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point(token.end);
  }

  function onexitlineending(token) {
    var context = this.stack[this.stack.length - 1];

    // If we’re at a hard break, include the line ending in there.
    if (getData('atHardBreak')) {
      context.children[context.children.length - 1].position.end = point(
        token.end
      );

      setData('atHardBreak');
      return
    }

    if (
      !getData('setextHeadingSlurpLineEnding') &&
      config.canContainEols.indexOf(context.type) > -1
    ) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }

  function onexithardbreak() {
    setData('atHardBreak', true);
  }

  function onexithtmlflow() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexithtmltext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitcodetext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitlink() {
    var context = this.stack[this.stack.length - 1];

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitimage() {
    var context = this.stack[this.stack.length - 1];

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitlabeltext(token) {
    this.stack[this.stack.length - 2].identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }

  function onexitlabel() {
    var fragment = this.stack[this.stack.length - 1];
    var value = this.resume();

    this.stack[this.stack.length - 1].label = value;

    // Assume a reference.
    setData('inReference', true);

    if (this.stack[this.stack.length - 1].type === 'link') {
      this.stack[this.stack.length - 1].children = fragment.children;
    } else {
      this.stack[this.stack.length - 1].alt = value;
    }
  }

  function onexitresourcedestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitresourcetitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitresource() {
    setData('inReference');
  }

  function onenterreference() {
    setData('referenceType', 'collapsed');
  }

  function onexitreferencestring(token) {
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    setData('referenceType', 'full');
  }

  function onexitcharacterreferencemarker(token) {
    setData('characterReferenceType', token.type);
  }

  function onexitcharacterreferencevalue(token) {
    var data = this.sliceSerialize(token);
    var type = getData('characterReferenceType');
    var value;
    var tail;

    if (type) {
      value = safeFromInt(
        data,
        type === 'characterReferenceMarkerNumeric' ? 10 : 16
      );

      setData('characterReferenceType');
    } else {
      value = decode(data);
    }

    tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point(token.end);
  }

  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
  }

  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url =
      'mailto:' + this.sliceSerialize(token);
  }

  //
  // Creaters.
  //

  function blockQuote() {
    return {type: 'blockquote', children: []}
  }

  function codeFlow() {
    return {type: 'code', lang: null, meta: null, value: ''}
  }

  function codeText() {
    return {type: 'inlineCode', value: ''}
  }

  function definition() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: ''
    }
  }

  function emphasis() {
    return {type: 'emphasis', children: []}
  }

  function heading() {
    return {type: 'heading', depth: undefined, children: []}
  }

  function hardBreak() {
    return {type: 'break'}
  }

  function html() {
    return {type: 'html', value: ''}
  }

  function image() {
    return {type: 'image', title: null, url: '', alt: null}
  }

  function link() {
    return {type: 'link', title: null, url: '', children: []}
  }

  function list(token) {
    return {
      type: 'list',
      ordered: token.type === 'listOrdered',
      start: null,
      spread: token._spread,
      children: []
    }
  }

  function listItem(token) {
    return {
      type: 'listItem',
      spread: token._spread,
      checked: null,
      children: []
    }
  }

  function paragraph() {
    return {type: 'paragraph', children: []}
  }

  function strong() {
    return {type: 'strong', children: []}
  }

  function text() {
    return {type: 'text', value: ''}
  }

  function thematicBreak() {
    return {type: 'thematicBreak'}
  }
}

function configure$1(config, extensions) {
  var index = -1;

  while (++index < extensions.length) {
    extension(config, extensions[index]);
  }

  return config
}

function extension(config, extension) {
  var key;
  var left;

  for (key in extension) {
    left = own$5.call(config, key) ? config[key] : (config[key] = {});

    if (key === 'canContainEols' || key === 'transforms') {
      config[key] = [].concat(left, extension[key]);
    } else {
      Object.assign(left, extension[key]);
    }
  }
}

var mdastUtilFromMarkdown = dist;

var remarkParse = parse$6;

var fromMarkdown = mdastUtilFromMarkdown;

function parse$6(options) {
  var self = this;

  this.Parser = parse;

  function parse(doc) {
    return fromMarkdown(
      doc,
      Object.assign({}, self.data('settings'), options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: self.data('micromarkExtensions') || [],
        mdastExtensions: self.data('fromMarkdownExtensions') || []
      })
    )
  }
}

var bail_1 = bail$1;

function bail$1(err) {
  if (err) {
    throw err
  }
}

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer$1 = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty$1 = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

var extend$1 = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty$1(target, name);
				copy = getProperty$1(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var isPlainObj = value => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};

var slice$2 = [].slice;

var wrap_1 = wrap$1;

// Wrap `fn`.
// Can be sync or async; return a promise, receive a completion handler, return
// new values and errors.
function wrap$1(fn, callback) {
  var invoked;

  return wrapped

  function wrapped() {
    var params = slice$2.call(arguments, 0);
    var callback = fn.length > params.length;
    var result;

    if (callback) {
      params.push(done);
    }

    try {
      result = fn.apply(null, params);
    } catch (error) {
      // Well, this is quite the pickle.
      // `fn` received a callback and invoked it (thus continuing the pipeline),
      // but later also threw an error.
      // We’re not about to restart the pipeline again, so the only thing left
      // to do is to throw the thing instead.
      if (callback && invoked) {
        throw error
      }

      return done(error)
    }

    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }

  // Invoke `next`, only once.
  function done() {
    if (!invoked) {
      invoked = true;

      callback.apply(null, arguments);
    }
  }

  // Invoke `done` with one value.
  // Tracks if an error is passed, too.
  function then(value) {
    done(null, value);
  }
}

var wrap = wrap_1;

var trough_1 = trough$1;

trough$1.wrap = wrap;

var slice$1 = [].slice;

// Create new middleware.
function trough$1() {
  var fns = [];
  var middleware = {};

  middleware.run = run;
  middleware.use = use;

  return middleware

  // Run `fns`.  Last argument must be a completion handler.
  function run() {
    var index = -1;
    var input = slice$1.call(arguments, 0, -1);
    var done = arguments[arguments.length - 1];

    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done)
    }

    next.apply(null, [null].concat(input));

    // Run the next `fn`, if any.
    function next(err) {
      var fn = fns[++index];
      var params = slice$1.call(arguments, 0);
      var values = params.slice(1);
      var length = input.length;
      var pos = -1;

      if (err) {
        done(err);
        return
      }

      // Copy non-nully input into values.
      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos];
        }
      }

      input = values;

      // Next or done.
      if (fn) {
        wrap(fn, next).apply(null, input);
      } else {
        done.apply(null, [null].concat(input));
      }
    }
  }

  // Add `fn` to the list.
  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn)
    }

    fns.push(fn);

    return middleware
  }
}

var stringify$2 = unistUtilStringifyPosition;

var vfileMessage = VMessage$1;

// Inherit from `Error#`.
function VMessagePrototype() {}
VMessagePrototype.prototype = Error.prototype;
VMessage$1.prototype = new VMessagePrototype();

// Message properties.
var proto = VMessage$1.prototype;

proto.file = '';
proto.name = '';
proto.reason = '';
proto.message = '';
proto.stack = '';
proto.fatal = null;
proto.column = null;
proto.line = null;

// Construct a new VMessage.
//
// Note: We cannot invoke `Error` on the created context, as that adds readonly
// `line` and `column` attributes on Safari 9, thus throwing and failing the
// data.
function VMessage$1(reason, position, origin) {
  var parts;
  var range;
  var location;

  if (typeof position === 'string') {
    origin = position;
    position = null;
  }

  parts = parseOrigin(origin);
  range = stringify$2(position) || '1:1';

  location = {
    start: {line: null, column: null},
    end: {line: null, column: null}
  };

  // Node.
  if (position && position.position) {
    position = position.position;
  }

  if (position) {
    // Position.
    if (position.start) {
      location = position;
      position = position.start;
    } else {
      // Point.
      location.start = position;
    }
  }

  if (reason.stack) {
    this.stack = reason.stack;
    reason = reason.message;
  }

  this.message = reason;
  this.name = range;
  this.reason = reason;
  this.line = position ? position.line : null;
  this.column = position ? position.column : null;
  this.location = location;
  this.source = parts[0];
  this.ruleId = parts[1];
}

function parseOrigin(origin) {
  var result = [null, null];
  var index;

  if (typeof origin === 'string') {
    index = origin.indexOf(':');

    if (index === -1) {
      result[1] = origin;
    } else {
      result[0] = origin.slice(0, index);
      result[1] = origin.slice(index + 1);
    }
  }

  return result
}

var minpath = require$$0__default['default'];

var minproc = process;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

var p = minpath;
var proc = minproc;
var buffer$1 = isBuffer;

var core = VFile$1;

var own$4 = {}.hasOwnProperty;

// Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.
var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

VFile$1.prototype.toString = toString$2;

// Access full path (`~/index.min.js`).
Object.defineProperty(VFile$1.prototype, 'path', {get: getPath, set: setPath});

// Access parent path (`~`).
Object.defineProperty(VFile$1.prototype, 'dirname', {
  get: getDirname,
  set: setDirname
});

// Access basename (`index.min.js`).
Object.defineProperty(VFile$1.prototype, 'basename', {
  get: getBasename,
  set: setBasename
});

// Access extname (`.js`).
Object.defineProperty(VFile$1.prototype, 'extname', {
  get: getExtname,
  set: setExtname
});

// Access stem (`index.min`).
Object.defineProperty(VFile$1.prototype, 'stem', {get: getStem, set: setStem});

// Construct a new file.
function VFile$1(options) {
  var prop;
  var index;

  if (!options) {
    options = {};
  } else if (typeof options === 'string' || buffer$1(options)) {
    options = {contents: options};
  } else if ('message' in options && 'messages' in options) {
    return options
  }

  if (!(this instanceof VFile$1)) {
    return new VFile$1(options)
  }

  this.data = {};
  this.messages = [];
  this.history = [];
  this.cwd = proc.cwd();

  // Set path related properties in the correct order.
  index = -1;

  while (++index < order.length) {
    prop = order[index];

    if (own$4.call(options, prop)) {
      this[prop] = options[prop];
    }
  }

  // Set non-path related properties.
  for (prop in options) {
    if (order.indexOf(prop) < 0) {
      this[prop] = options[prop];
    }
  }
}

function getPath() {
  return this.history[this.history.length - 1]
}

function setPath(path) {
  assertNonEmpty(path, 'path');

  if (this.path !== path) {
    this.history.push(path);
  }
}

function getDirname() {
  return typeof this.path === 'string' ? p.dirname(this.path) : undefined
}

function setDirname(dirname) {
  assertPath(this.path, 'dirname');
  this.path = p.join(dirname || '', this.basename);
}

function getBasename() {
  return typeof this.path === 'string' ? p.basename(this.path) : undefined
}

function setBasename(basename) {
  assertNonEmpty(basename, 'basename');
  assertPart(basename, 'basename');
  this.path = p.join(this.dirname || '', basename);
}

function getExtname() {
  return typeof this.path === 'string' ? p.extname(this.path) : undefined
}

function setExtname(extname) {
  assertPart(extname, 'extname');
  assertPath(this.path, 'extname');

  if (extname) {
    if (extname.charCodeAt(0) !== 46 /* `.` */) {
      throw new Error('`extname` must start with `.`')
    }

    if (extname.indexOf('.', 1) > -1) {
      throw new Error('`extname` cannot contain multiple dots')
    }
  }

  this.path = p.join(this.dirname, this.stem + (extname || ''));
}

function getStem() {
  return typeof this.path === 'string'
    ? p.basename(this.path, this.extname)
    : undefined
}

function setStem(stem) {
  assertNonEmpty(stem, 'stem');
  assertPart(stem, 'stem');
  this.path = p.join(this.dirname || '', stem + (this.extname || ''));
}

// Get the value of the file.
function toString$2(encoding) {
  return (this.contents || '').toString(encoding)
}

// Assert that `part` is not a path (i.e., does not contain `p.sep`).
function assertPart(part, name) {
  if (part && part.indexOf(p.sep) > -1) {
    throw new Error(
      '`' + name + '` cannot be a path: did not expect `' + p.sep + '`'
    )
  }
}

// Assert that `part` is not empty.
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty')
  }
}

// Assert `path` exists.
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too')
  }
}

var VMessage = vfileMessage;
var VFile = core;

var lib$2 = VFile;

VFile.prototype.message = message;
VFile.prototype.info = info;
VFile.prototype.fail = fail;

// Create a message with `reason` at `position`.
// When an error is passed in as `reason`, copies the stack.
function message(reason, position, origin) {
  var message = new VMessage(reason, position, origin);

  if (this.path) {
    message.name = this.path + ':' + message.name;
    message.file = this.path;
  }

  message.fatal = false;

  this.messages.push(message);

  return message
}

// Fail: creates a vmessage, associates it with the file, and throws it.
function fail() {
  var message = this.message.apply(this, arguments);

  message.fatal = true;

  throw message
}

// Info: creates a vmessage, associates it with the file, and marks the fatality
// as null.
function info() {
  var message = this.message.apply(this, arguments);

  message.fatal = null;

  return message
}

var vfile$1 = lib$2;

var bail = bail_1;
var buffer = isBuffer$1;
var extend = extend$1;
var plain = isPlainObj;
var trough = trough_1;
var vfile = vfile$1;

// Expose a frozen processor.
var unified_1 = unified().freeze();

var slice = [].slice;
var own$3 = {}.hasOwnProperty;

// Process pipeline.
var pipeline = trough()
  .use(pipelineParse)
  .use(pipelineRun)
  .use(pipelineStringify);

function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file);
}

function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done);

  function done(error, tree, file) {
    if (error) {
      next(error);
    } else {
      ctx.tree = tree;
      ctx.file = file;
      next();
    }
  }
}

function pipelineStringify(p, ctx) {
  var result = p.stringify(ctx.tree, ctx.file);

  if (result === undefined || result === null) ; else if (typeof result === 'string' || buffer(result)) {
    ctx.file.contents = result;
  } else {
    ctx.file.result = result;
  }
}

// Function to create the first processor.
function unified() {
  var attachers = [];
  var transformers = trough();
  var namespace = {};
  var freezeIndex = -1;
  var frozen;

  // Data management.
  processor.data = data;

  // Lock.
  processor.freeze = freeze;

  // Plugins.
  processor.attachers = attachers;
  processor.use = use;

  // API.
  processor.parse = parse;
  processor.stringify = stringify;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;

  // Expose.
  return processor

  // Create a new processor based on the processor in the current scope.
  function processor() {
    var destination = unified();
    var index = -1;

    while (++index < attachers.length) {
      destination.use.apply(null, attachers[index]);
    }

    destination.data(extend(true, {}, namespace));

    return destination
  }

  // Freeze: used to signal a processor that has finished configuration.
  //
  // For example, take unified itself: it’s frozen.
  // Plugins should not be added to it.
  // Rather, it should be extended, by invoking it, before modifying it.
  //
  // In essence, always invoke this when exporting a processor.
  function freeze() {
    var values;
    var transformer;

    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex];

      if (values[1] === false) {
        continue
      }

      if (values[1] === true) {
        values[1] = undefined;
      }

      transformer = values[0].apply(processor, values.slice(1));

      if (typeof transformer === 'function') {
        transformers.use(transformer);
      }
    }

    frozen = true;
    freezeIndex = Infinity;

    return processor
  }

  // Data management.
  // Getter / setter for processor-specific informtion.
  function data(key, value) {
    if (typeof key === 'string') {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen);
        namespace[key] = value;
        return processor
      }

      // Get `key`.
      return (own$3.call(namespace, key) && namespace[key]) || null
    }

    // Set space.
    if (key) {
      assertUnfrozen('data', frozen);
      namespace = key;
      return processor
    }

    // Get space.
    return namespace
  }

  // Plugin management.
  //
  // Pass it:
  // *   an attacher and options,
  // *   a preset,
  // *   a list of presets, attachers, and arguments (list of attachers and
  //     options).
  function use(value) {
    var settings;

    assertUnfrozen('use', frozen);

    if (value === null || value === undefined) ; else if (typeof value === 'function') {
      addPlugin.apply(null, arguments);
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = extend(namespace.settings || {}, settings);
    }

    return processor

    function addPreset(result) {
      addList(result.plugins);

      if (result.settings) {
        settings = extend(settings || {}, result.settings);
      }
    }

    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`')
      }
    }

    function addList(plugins) {
      var index = -1;

      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
        while (++index < plugins.length) {
          add(plugins[index]);
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    function addPlugin(plugin, value) {
      var entry = find(plugin);

      if (entry) {
        if (plain(entry[1]) && plain(value)) {
          value = extend(true, entry[1], value);
        }

        entry[1] = value;
      } else {
        attachers.push(slice.call(arguments));
      }
    }
  }

  function find(plugin) {
    var index = -1;

    while (++index < attachers.length) {
      if (attachers[index][0] === plugin) {
        return attachers[index]
      }
    }
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor.
  function parse(doc) {
    var file = vfile(doc);
    var Parser;

    freeze();
    Parser = processor.Parser;
    assertParser('parse', Parser);

    if (newable(Parser, 'parse')) {
      return new Parser(String(file), file).parse()
    }

    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), async.
  function run(node, file, cb) {
    assertNode(node);
    freeze();

    if (!cb && typeof file === 'function') {
      cb = file;
      file = null;
    }

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb);

    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done);

      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          cb(null, tree, file);
        }
      }
    }
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), sync.
  function runSync(node, file) {
    var result;
    var complete;

    run(node, file, done);

    assertDone('runSync', 'run', complete);

    return result

    function done(error, tree) {
      complete = true;
      result = tree;
      bail(error);
    }
  }

  // Stringify a unist node representation of a file (in string or vfile
  // representation) into a string using the `Compiler` on the processor.
  function stringify(node, doc) {
    var file = vfile(doc);
    var Compiler;

    freeze();
    Compiler = processor.Compiler;
    assertCompiler('stringify', Compiler);
    assertNode(node);

    if (newable(Compiler, 'compile')) {
      return new Compiler(node, file).compile()
    }

    return Compiler(node, file) // eslint-disable-line new-cap
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor, then run transforms on that node, and
  // compile the resulting node using the `Compiler` on the processor, and
  // store that result on the vfile.
  function process(doc, cb) {
    freeze();
    assertParser('process', processor.Parser);
    assertCompiler('process', processor.Compiler);

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb);

    function executor(resolve, reject) {
      var file = vfile(doc);

      pipeline.run(processor, {file: file}, done);

      function done(error) {
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(file);
        } else {
          cb(null, file);
        }
      }
    }
  }

  // Process the given document (in string or vfile representation), sync.
  function processSync(doc) {
    var file;
    var complete;

    freeze();
    assertParser('processSync', processor.Parser);
    assertCompiler('processSync', processor.Compiler);
    file = vfile(doc);

    process(file, done);

    assertDone('processSync', 'process', complete);

    return file

    function done(error) {
      complete = true;
      bail(error);
    }
  }
}

// Check if `value` is a constructor.
function newable(value, name) {
  return (
    typeof value === 'function' &&
    value.prototype &&
    // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    (keys(value.prototype) || name in value.prototype)
  )
}

// Check if `value` is an object with keys.
function keys(value) {
  var key;
  for (key in value) {
    return true
  }

  return false
}

// Assert a parser is available.
function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`')
  }
}

// Assert a compiler is available.
function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`')
  }
}

// Assert the processor is not frozen.
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot invoke `' +
        name +
        '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
    )
  }
}

// Assert `node` is a unist node.
function assertNode(node) {
  if (!node || typeof node.type !== 'string') {
    throw new Error('Expected node, got `' + node + '`')
  }
}

// Assert that `complete` is `true`.
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}

const { parse: parse$5 } = Yaml__namespace;
const smdAnnotations = function () {
    return function transform($root) {
        var _a;
        const root = $root;
        const nodes = root.children;
        const processed = [];
        let inTab = false;
        let tabPlaceholder = {
            type: 'tabs',
            data: {
                hName: 'tabs',
            },
            children: [
                {
                    type: 'tab',
                    data: {
                        hName: 'tab',
                    },
                    children: [],
                },
            ],
        };
        const entries = nodes.entries()[Symbol.iterator]();
        for (const [i, node] of entries) {
            const next = (_a = nodes[i + 1]) !== null && _a !== void 0 ? _a : null;
            const anno = captureAnnotations(node);
            if ('type' in anno) {
                const { type } = anno;
                if (type === 'tab') {
                    const { children } = tabPlaceholder;
                    if (inTab && tabPlaceholder) {
                        children.push({
                            type: 'tab',
                            data: {
                                hName: 'tab',
                            },
                            children: [],
                        });
                    }
                    else {
                        inTab = true;
                    }
                    if (Object.keys(anno).length > 0) {
                        Object.assign(children[children.length - 1].data, {
                            hProperties: anno,
                        });
                    }
                    tabPlaceholder.children = children;
                    continue;
                }
                else if (type === 'tab-end') {
                    processed.push(tabPlaceholder);
                    inTab = false;
                    tabPlaceholder = {
                        type: 'tabs',
                        data: {
                            hName: 'tabs',
                        },
                        children: [
                            {
                                type: 'tab',
                                data: {
                                    hName: 'tab',
                                },
                                children: [],
                            },
                        ],
                    };
                    continue;
                }
            }
            if (inTab) {
                const size = tabPlaceholder.children.length;
                if (tabPlaceholder.children[size - 1]) {
                    tabPlaceholder.children[size - 1].children.push(processNode(node, anno));
                }
            }
            else if (Object.keys(anno).length > 0 && next) {
                processed.push(processNode(next, anno));
                entries.next();
            }
            else {
                processed.push(processNode(node));
            }
        }
        return Object.assign(Object.assign({}, root), { children: processed });
    };
};
function captureAnnotations(node) {
    if (!(node === null || node === void 0 ? void 0 : node.value))
        return {};
    if (node.type === 'mdxFlowExpression' &&
        node.value.startsWith('/*') &&
        node.value.endsWith('*/')) {
        const raw = node.value
            .substr('/*'.length, node.value.length - '*/'.length - '/*'.length)
            .trim();
        try {
            const contents = parse$5(raw);
            if (contents && typeof contents === 'object') {
                for (const key in contents) {
                    if (typeof contents[key] === 'string') {
                        const escapedContent = contents[key].replace('"', '%22');
                        contents[key] = escapedContent;
                    }
                }
                return contents;
            }
        }
        catch (error) {
            console.error(`Markdown.captureAnnotations parse YAML error: ${String(error)}`, error);
        }
    }
    else if (node.type === 'html' &&
        node.value.startsWith('<!--') &&
        node.value.endsWith('-->')) {
        const raw = node.value
            .substr('<!--'.length, node.value.length - '-->'.length - '<!--'.length)
            .trim();
        try {
            const contents = parse$5(raw);
            if (contents && typeof contents === 'object') {
                return contents;
            }
        }
        catch (error) {
        }
    }
    return {};
}
function processNode(node, annotations) {
    if (annotations) {
        return Object.assign(Object.assign({}, node), { annotations, data: Object.assign(Object.assign({}, (node.data || {})), { hProperties: annotations }) });
    }
    return node;
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 *
 * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
 */

var convert$1 =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok$1
      }

      if (typeof test === 'string') {
        return typeFactory$1(test)
      }

      if (typeof test === 'object') {
        // @ts-ignore looks like a list of tests / partial test object.
        return 'length' in test ? anyFactory$1(test) : propsFactory$1(test)
      }

      if (typeof test === 'function') {
        return castFactory$1(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  );
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory$1(tests) {
  /** @type {Array.<AssertAnything>} */
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert$1(tests[index]);
  }

  return castFactory$1(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory$1(check) {
  return castFactory$1(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    var key;

    for (key in check) {
      if (node[key] !== check[key]) return
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory$1(check) {
  return castFactory$1(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory$1(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok$1() {
  return true
}

/**
 * @param {string} d
 * @returns {string}
 */
function color(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 */

/**
 * Continue traversing as normal
 */
const CONTINUE = true;
/**
 * Do not traverse this node’s children
 */
const SKIP = 'skip';
/**
 * Stop traversing immediately
 */
const EXIT = false;

const visitParents =
  /**
   * @type {(
   *   (<T extends Node>(tree: Node, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>, visitor: Visitor<T>, reverse?: boolean) => void) &
   *   ((tree: Node, test: Test, visitor: Visitor<Node>, reverse?: boolean) => void) &
   *   ((tree: Node, visitor: Visitor<Node>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * Visit children of tree which pass a test
     *
     * @param {Node} tree Abstract syntax tree to walk
     * @param {Test} test test Test node
     * @param {Visitor<Node>} visitor Function to run for each node
     * @param {boolean} [reverse] Fisit the tree in reverse, defaults to false
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-ignore no visitor given, so `visitor` is test.
        visitor = test;
        test = null;
      }

      var is = convert$1(test);
      var step = reverse ? -1 : 1;

      factory(tree, null, [])();

      /**
       * @param {Node} node
       * @param {number?} index
       * @param {Array.<Parent>} parents
       */
      function factory(node, index, parents) {
        /** @type {Object.<string, unknown>} */
        var value = typeof node === 'object' && node !== null ? node : {};
        /** @type {string} */
        var name;

        if (typeof value.type === 'string') {
          name =
            typeof value.tagName === 'string'
              ? value.tagName
              : typeof value.name === 'string'
              ? value.name
              : undefined;

          Object.defineProperty(visit, 'name', {
            value:
              'node (' +
              color(value.type + (name ? '<' + name + '>' : '')) +
              ')'
          });
        }

        return visit

        function visit() {
          /** @type {ActionTuple} */
          var result = [];
          /** @type {ActionTuple} */
          var subresult;
          /** @type {number} */
          var offset;
          /** @type {Array.<Parent>} */
          var grandparents;

          if (!test || is(node, index, parents[parents.length - 1] || null)) {
            result = toResult(visitor(node, parents));

            if (result[0] === EXIT) {
              return result
            }
          }

          if (node.children && result[0] !== SKIP) {
            // @ts-ignore looks like a parent.
            offset = (reverse ? node.children.length : -1) + step;
            // @ts-ignore looks like a parent.
            grandparents = parents.concat(node);

            // @ts-ignore looks like a parent.
            while (offset > -1 && offset < node.children.length) {
              subresult = factory(node.children[offset], offset, grandparents)();

              if (subresult[0] === EXIT) {
                return subresult
              }

              offset =
                typeof subresult[1] === 'number' ? subresult[1] : offset + step;
            }
          }

          return result
        }
      }
    }
  );

/**
 * @param {VisitorResult} value
 * @returns {ActionTuple}
 */
function toResult(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE, value]
  }

  return [value]
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult
 */

const visit =
  /**
   * @type {(
   *   (<T extends Node>(tree: Node, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>, visitor: Visitor<T>, reverse?: boolean) => void) &
   *   ((tree: Node, test: Test, visitor: Visitor<Node>, reverse?: boolean) => void) &
   *   ((tree: Node, visitor: Visitor<Node>, reverse?: boolean) => void)
   * )}
   */
  (
    /**
     * Visit children of tree which pass a test
     *
     * @param {Node} tree Abstract syntax tree to walk
     * @param {Test} test test Test node
     * @param {Visitor<Node>} visitor Function to run for each node
     * @param {boolean} [reverse] Fisit the tree in reverse, defaults to false
     */
    function (tree, test, visitor, reverse) {
      if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        visitor = test;
        test = null;
      }

      visitParents(tree, test, overload, reverse);

      /**
       * @param {Node} node
       * @param {Array.<Parent>} parents
       */
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        return visitor(
          node,
          parent ? parent.children.indexOf(node) : null,
          parent
        )
      }
    }
  );

const blockquoteMdast2Hast = function () {
    return function transform(root) {
        visit(root, 'blockquote', node => {
            const data = (node.data || (node.data = {}));
            const annotations = node.annotations || {};
            data.hProperties = annotations;
        });
    };
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const inlineCodeMdast2Hast = function () {
    return function transform(root) {
        visit(root, 'inlineCode', node => {
            const data = node.data || (node.data = {});
            data.hProperties = {
                inline: 'true',
            };
        });
    };
};
const smdCode = function () {
    return function transform(root) {
        let sequentialCodeBlocks = [];
        let lastIndex = -1;
        let lastParent;
        let groupings = [];
        visit(root, 'code', (node, index, parent) => {
            const _a = parseMeta(node.meta), { title: metaTitle } = _a, metaProps = __rest(_a, ["title"]);
            let annotations = Object.assign({}, metaProps, node.annotations);
            const title = annotations.title || metaTitle;
            if (title) {
                annotations = Object.assign({ title }, annotations);
            }
            handleLegacyAnnotations(annotations);
            node.annotations = annotations;
            const data = node.data || (node.data = {});
            data.hProperties = Object.assign(Object.assign({ lang: node.lang, meta: node.meta }, node.annotations), (data.hProperties || {}));
            const lastCodeBlock = sequentialCodeBlocks[sequentialCodeBlocks.length - 1];
            if (!lastCodeBlock || (lastIndex === index - 1 && lastParent === parent)) {
                lastIndex = index;
                lastParent = parent;
                sequentialCodeBlocks.push(node);
            }
            else {
                addCodeGrouping(groupings, lastParent, lastIndex, sequentialCodeBlocks);
                lastIndex = index;
                lastParent = parent;
                sequentialCodeBlocks = [node];
            }
        });
        addCodeGrouping(groupings, lastParent, lastIndex, sequentialCodeBlocks);
        let removed = new Map();
        for (const group of groupings) {
            if (!removed.get(group.parent)) {
                removed.set(group.parent, 0);
            }
            const removeCount = removed.get(group.parent);
            group.parent.children.splice(group.startIndex - removeCount, group.numCodeBlocks, group.codeGroup);
            removed.set(group.parent, removeCount + group.numCodeBlocks - 1);
        }
    };
};
const highlightLinesRangeRegex = /{([\d,-]+)}/;
const metaKeyValPairMatcher = /(\S+)\s*=\s*(\"?)([^"]*)(\2|\s|$)/g;
function parseMeta(metastring) {
    const props = {};
    if (!metastring)
        return props;
    let metaWithoutKeyValPairs = metastring;
    let keyValPair;
    while ((keyValPair = metaKeyValPairMatcher.exec(metastring)) !== null) {
        props[keyValPair[1]] = keyValPair[3];
        metaWithoutKeyValPairs = metaWithoutKeyValPairs.replace(keyValPair[0], '');
    }
    const booleanProps = metaWithoutKeyValPairs.split(' ');
    for (const booleanProp of booleanProps) {
        const highlightLinesMatch = booleanProp.match(highlightLinesRangeRegex);
        if (highlightLinesMatch) {
            props.highlightLines = highlightLinesMatch[1];
        }
        else if (booleanProp) {
            props[booleanProp] = 'true';
        }
    }
    return props;
}
function addCodeGrouping(groupings, parent, lastIndex, children) {
    if (children.length <= 1)
        return;
    const numCodeBlocks = children.length;
    const codeGroup = {
        type: 'codegroup',
        data: {
            hName: 'codegroup',
        },
        children,
    };
    groupings.push({
        codeGroup,
        parent,
        startIndex: lastIndex - (numCodeBlocks - 1),
        numCodeBlocks,
    });
}
function handleLegacyAnnotations(annotations) {
    if (!annotations)
        return;
    if (annotations.hasOwnProperty('type')) {
        const type = annotations.type;
        if (type === 'json_schema') {
            annotations.jsonSchema = 'true';
        }
        else {
            annotations[type] = 'true';
        }
        delete annotations.type;
    }
    if (annotations.hasOwnProperty('json_schema')) {
        annotations.jsonSchema = 'true';
        delete annotations.json_schema;
    }
}

const { parse: parse$4 } = Yaml__namespace;
const resolveCodeBlocks = function (opts) {
    const resolver = opts === null || opts === void 0 ? void 0 : opts.resolver;
    if (!resolver)
        return;
    return async function transformer(tree, _file) {
        var _a, _b;
        const codes = [];
        const promises = [];
        visit(tree, 'code', (node, index, parent) => {
            codes.push({ node, index, parent });
        });
        for (const { node } of codes) {
            if (typeof node.value !== 'string')
                continue;
            if (!((_a = node.annotations) === null || _a === void 0 ? void 0 : _a.jsonSchema) && !((_b = node.annotations) === null || _b === void 0 ? void 0 : _b.http))
                continue;
            try {
                promises.push(resolver(node, parse$4(node.value))
                    .then(resolved => {
                    node.resolved = resolved;
                })
                    .catch(() => {
                    node.resolved = null;
                }));
            }
            catch (_c) {
                node.resolved = null;
            }
        }
        if (promises.length) {
            await Promise.all(promises);
        }
        return tree;
    };
};

var emojiRegex = function() {
	return /[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83C\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uD83C\uDDFE\uD83C[\uDDEA\uDDF9]|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDFC\uD83C[\uDDEB\uDDF8]|\uD83C\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uD83C\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF8\uDDFE\uDDFF]|\uD83C\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uD83C\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uD83C\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uD83C\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uD83C\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uD83C\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uD83C\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uD83C\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uD83C\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uD83C\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uD83C\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uD83C\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uD83C\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uD83C\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uD83C\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uD83C\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|[#\*0-9]\u20E3/g;
};

var emoji = emojiRegex;

var githubSlugger = BananaSlug;

var own$2 = Object.hasOwnProperty;
var whitespace$1 = /\s/g;
var specials = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g;

function BananaSlug () {
  var self = this;

  if (!(self instanceof BananaSlug)) return new BananaSlug()

  self.reset();
}

/**
 * Generate a unique slug.
 * @param  {string} value String of text to slugify
 * @param  {boolean} [false] Keep the current case, otherwise make all lowercase
 * @return {string}       A unique slug string
 */
BananaSlug.prototype.slug = function (value, maintainCase) {
  var self = this;
  var slug = slugger(value, maintainCase === true);
  var originalSlug = slug;

  while (own$2.call(self.occurrences, slug)) {
    self.occurrences[originalSlug]++;
    slug = originalSlug + '-' + self.occurrences[originalSlug];
  }

  self.occurrences[slug] = 0;

  return slug
};

/**
 * Reset - Forget all previous slugs
 * @return void
 */
BananaSlug.prototype.reset = function () {
  this.occurrences = Object.create(null);
};

function slugger (string, maintainCase) {
  if (typeof string !== 'string') return ''
  if (!maintainCase) string = string.toLowerCase();

  return string.trim()
    .replace(specials, '')
    .replace(emoji(), '')
    .replace(whitespace$1, '-')
}

BananaSlug.slug = slugger;

/**
 * @typedef Options
 * @property {boolean} [includeImageAlt=true]
 */

/**
 * Get the text content of a node.
 * Prefer the node’s plain-text fields, otherwise serialize its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} node
 * @param {Options} [options]
 * @returns {string}
 */
function toString$1(node, options) {
  var {includeImageAlt = true} = options || {};
  return one(node, includeImageAlt)
}

/**
 * @param {unknown} node
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function one(node, includeImageAlt) {
  return (
    (node &&
      typeof node === 'object' &&
      // @ts-ignore looks like a literal.
      (node.value ||
        // @ts-ignore looks like an image.
        (includeImageAlt ? node.alt : '') ||
        // @ts-ignore looks like a parent.
        ('children' in node && all(node.children, includeImageAlt)) ||
        (Array.isArray(node) && all(node, includeImageAlt)))) ||
    ''
  )
}

/**
 * @param {Array.<unknown>} values
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function all(values, includeImageAlt) {
  /** @type {Array.<string>} */
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt);
  }

  return result.join('')
}

const slugs = new githubSlugger();
const slug = function () {
    return function transformer(ast) {
        slugs.reset();
        visit(ast, 'heading', node => {
            var _a, _b;
            const data = ((_a = node.data) !== null && _a !== void 0 ? _a : (node.data = {}));
            const props = ((_b = data.hProperties) !== null && _b !== void 0 ? _b : (data.hProperties = {}));
            let id = props.id;
            id = id ? slugs.slug(id, true) : slugs.slug(toString$1(node));
            data.id = id;
            props.id = id;
        });
    };
};

/**
 * @param {unknown} thing
 * @returns {boolean}
 */
function whitespace(thing) {
  /** @type {string} */
  var value =
    // @ts-ignore looks like a node.
    thing && typeof thing === 'object' && thing.type === 'text'
      ? // @ts-ignore looks like a text.
        thing.value || ''
      : thing;

  // HTML whitespace expression.
  // See <https://html.spec.whatwg.org/#space-character>.
  return typeof value === 'string' && value.replace(/[ \t\n\f\r]/g, '') === ''
}

const unwrapImages = function () {
    return function transformer(tree) {
        visit(tree, 'paragraph', (node, index, parent) => {
            if (!index)
                return;
            if (applicable(node)) {
                parent === null || parent === void 0 ? void 0 : parent.children.splice(index, 1, node.children);
                return [SKIP, index];
            }
            return;
        });
    };
};
function applicable(node, inLink) {
    let image = null;
    let children = node.children;
    let length = children.length;
    let index = -1;
    let child;
    let linkResult;
    while (++index < length) {
        child = children[index];
        if (whitespace(child)) ;
        else if (child.type === 'image' || child.type === 'imageReference') {
            image = true;
        }
        else if (!inLink && (child.type === 'link' || child.type === 'linkReference')) {
            linkResult = applicable(child, true);
            if (linkResult === false) {
                return false;
            }
            if (linkResult === true) {
                image = true;
            }
        }
        else {
            return false;
        }
    }
    return image;
}

const blockStart = /\[block:([A-Za-z]+)\][^\S\n]*(?=\n)/g;
const blockEnd = /\[\/block\][^\S\n]*(?=\n)/g;
const replaceThirdPartyBlocks = (input) => {
    return input.toString().replace(blockStart, '```block_$1').replace(blockEnd, '```');
};

const remarkParsePreset = {
    plugins: [
        [remarkFrontmatter, ['yaml']],
        remarkGfm,
        slug,
        unwrapImages,
        smdAnnotations,
        smdCode,
        inlineCodeMdast2Hast,
        blockquoteMdast2Hast,
    ],
    settings: {},
};
const defaultProcessor$1 = unified_1().use(remarkParse).use(remarkParsePreset);
const parse$3 = (input, opts = {}, processor = defaultProcessor$1) => {
    const markdown = replaceThirdPartyBlocks(input);
    const processorInstance = processor()
        .data('settings', Object.assign({}, remarkParsePreset.settings, opts.settings))
        .use(opts.remarkPlugins || []);
    return processorInstance.runSync(processorInstance.parse(markdown));
};
const parseAsync = (input, opts = {}, processor = defaultProcessor$1) => {
    var _a;
    const markdown = replaceThirdPartyBlocks(input);
    const processorInstance = processor()
        .data('settings', Object.assign({}, remarkParsePreset.settings, opts.settings))
        .use(resolveCodeBlocks, { resolver: (_a = opts.settings) === null || _a === void 0 ? void 0 : _a.resolver })
        .use(opts.remarkPlugins || []);
    return processorInstance.run(processorInstance.parse(markdown));
};

const parseWithPointers = (input, opts = {}, processor) => {
    const tree = parse$3(input, opts, processor);
    return {
        data: tree,
        diagnostics: [],
        ast: tree,
        lineMap: undefined,
    };
};

var remarkStringify = stringify$1;

var toMarkdown = require$$0__default$1['default'];

function stringify$1(options) {
  var self = this;

  this.Compiler = compile;

  function compile(tree) {
    return toMarkdown(
      tree,
      Object.assign({}, self.data('settings'), options, {
        // Note: this option is not in the readme.
        // The goal is for it to be set by plugins on `data` instead of being
        // passed by users.
        extensions: self.data('toMarkdownExtensions') || []
      })
    )
  }
}

var blockquote_1 = blockquote;

var flow = containerFlow;
var indentLines$1 = indentLines_1;

function blockquote(node, _, context) {
  var exit = context.enter('blockquote');
  var value = indentLines$1(flow(node, context), map$1);
  exit();
  return value
}

function map$1(line, index, blank) {
  return '>' + (blank ? '' : ' ') + line
}

const { safeStringify: safeStringify$3 } = Yaml__namespace;
const blockquoteHandler = function (node, _, context) {
    var _a;
    const annotations = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.hProperties) || {});
    const value = blockquote_1(node, _, context);
    if (Object.keys(annotations).length) {
        return `<!-- ${safeStringify$3(annotations, { skipInvalid: true }).trim()} -->

${value}`;
    }
    else {
        return value;
    }
};

var longestStreak_1 = longestStreak;

// Get the count of the longest repeating streak of `character` in `value`.
function longestStreak(value, character) {
  var count = 0;
  var maximum = 0;
  var expected;
  var index;

  if (typeof character !== 'string' || character.length !== 1) {
    throw new Error('Expected character')
  }

  value = String(value);
  index = value.indexOf(character);
  expected = index;

  while (index !== -1) {
    count++;

    if (index === expected) {
      if (count > maximum) {
        maximum = count;
      }
    } else {
      count = 1;
    }

    expected = index + 1;
    index = value.indexOf(character, expected);
  }

  return maximum
}

var formatCodeAsIndented_1 = formatCodeAsIndented$1;

function formatCodeAsIndented$1(node, context) {
  return (
    !context.options.fences &&
    node.value &&
    // If there’s no info…
    !node.lang &&
    // And there’s a non-whitespace character…
    /[^ \r\n]/.test(node.value) &&
    // And the value doesn’t start or end in a blank…
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
  )
}

var checkFence_1 = checkFence$1;

function checkFence$1(context) {
  var marker = context.options.fence || '`';

  if (marker !== '`' && marker !== '~') {
    throw new Error(
      'Cannot serialize code with `' +
        marker +
        '` for `options.fence`, expected `` ` `` or `~`'
    )
  }

  return marker
}

var patternInScope_1 = patternInScope$1;

function patternInScope$1(stack, pattern) {
  return (
    listInScope(stack, pattern.inConstruct, true) &&
    !listInScope(stack, pattern.notInConstruct)
  )
}

function listInScope(stack, list, none) {
  var index;

  if (!list) {
    return none
  }

  if (typeof list === 'string') {
    list = [list];
  }

  index = -1;

  while (++index < list.length) {
    if (stack.indexOf(list[index]) !== -1) {
      return true
    }
  }

  return false
}

var safe_1 = safe$1;

var patternCompile = patternCompile_1;
var patternInScope = patternInScope_1;

function safe$1(context, input, config) {
  var value = (config.before || '') + (input || '') + (config.after || '');
  var positions = [];
  var result = [];
  var infos = {};
  var index = -1;
  var before;
  var after;
  var position;
  var pattern;
  var expression;
  var match;
  var start;
  var end;

  while (++index < context.unsafe.length) {
    pattern = context.unsafe[index];

    if (!patternInScope(context.stack, pattern)) {
      continue
    }

    expression = patternCompile(pattern);

    while ((match = expression.exec(value))) {
      before = 'before' in pattern || pattern.atBreak;
      after = 'after' in pattern;

      position = match.index + (before ? match[1].length : 0);

      if (positions.indexOf(position) === -1) {
        positions.push(position);
        infos[position] = {before: before, after: after};
      } else {
        if (infos[position].before && !before) {
          infos[position].before = false;
        }

        if (infos[position].after && !after) {
          infos[position].after = false;
        }
      }
    }
  }

  positions.sort(numerical);

  start = config.before ? config.before.length : 0;
  end = value.length - (config.after ? config.after.length : 0);
  index = -1;

  while (++index < positions.length) {
    position = positions[index];

    if (
      // Character before or after matched:
      position < start ||
      position >= end
    ) {
      continue
    }

    // If this character is supposed to be escaped because it has a condition on
    // the next character, and the next character is definitly being escaped,
    // then skip this escape.
    if (
      position + 1 < end &&
      positions[index + 1] === position + 1 &&
      infos[position].after &&
      !infos[position + 1].before &&
      !infos[position + 1].after
    ) {
      continue
    }

    if (start !== position) {
      // If we have to use a character reference, an ampersand would be more
      // correct, but as backslashes only care about punctuation, either will
      // do the trick
      result.push(escapeBackslashes(value.slice(start, position), '\\'));
    }

    start = position;

    if (
      /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
      (!config.encode || config.encode.indexOf(value.charAt(position)) === -1)
    ) {
      // Character escape.
      result.push('\\');
    } else {
      // Character reference.
      result.push(
        '&#x' + value.charCodeAt(position).toString(16).toUpperCase() + ';'
      );
      start++;
    }
  }

  result.push(escapeBackslashes(value.slice(start, end), config.after));

  return result.join('')
}

function numerical(a, b) {
  return a - b
}

function escapeBackslashes(value, after) {
  var expression = /\\(?=[!-/:-@[-`{-~])/g;
  var positions = [];
  var results = [];
  var index = -1;
  var start = 0;
  var whole = value + after;
  var match;

  while ((match = expression.exec(whole))) {
    positions.push(match.index);
  }

  while (++index < positions.length) {
    if (start !== positions[index]) {
      results.push(value.slice(start, positions[index]));
    }

    results.push('\\');
    start = positions[index];
  }

  results.push(value.slice(start));

  return results.join('')
}

var code_1 = code;

var repeat = repeatString;
var streak = longestStreak_1;
var formatCodeAsIndented = formatCodeAsIndented_1;
var checkFence = checkFence_1;
var indentLines = indentLines_1;
var safe = safe_1;

function code(node, _, context) {
  var marker = checkFence(context);
  var raw = node.value || '';
  var suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
  var value;
  var sequence;
  var exit;
  var subexit;

  if (formatCodeAsIndented(node, context)) {
    exit = context.enter('codeIndented');
    value = indentLines(raw, map);
  } else {
    sequence = repeat(marker, Math.max(streak(raw, marker) + 1, 3));
    exit = context.enter('codeFenced');
    value = sequence;

    if (node.lang) {
      subexit = context.enter('codeFencedLang' + suffix);
      value += safe(context, node.lang, {
        before: '`',
        after: ' ',
        encode: ['`']
      });
      subexit();
    }

    if (node.lang && node.meta) {
      subexit = context.enter('codeFencedMeta' + suffix);
      value +=
        ' ' +
        safe(context, node.meta, {
          before: ' ',
          after: '\n',
          encode: ['`']
        });
      subexit();
    }

    value += '\n';

    if (raw) {
      value += raw + '\n';
    }

    value += sequence;
  }

  exit();
  return value
}

function map(line, _, blank) {
  return (blank ? '' : '    ') + line
}

const { safeStringify: safeStringify$2 } = Yaml__namespace;
const codeHandler = function (node, _, context) {
    var _a;
    const _b = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.hProperties) || {}), annotations = __rest(_b, ["lang", "meta"]);
    if (node.resolved) {
        node.value =
            node.lang === 'json' ? JSON.stringify(node.resolved, null, 2) : safeStringify$2(node.resolved, { indent: 2 });
    }
    const metaProps = computeMetaProps(annotations);
    if (metaProps.length) {
        node.meta = metaProps.join(' ');
    }
    return code_1(node, _, context);
};
function computeMetaProps(annotations) {
    const metaProps = [];
    if (Object.keys(annotations).length) {
        for (const key in annotations) {
            const annotationVal = annotations[key];
            if (typeof annotationVal === 'boolean' || annotationVal === 'true' || annotationVal === 'false') {
                if (annotationVal || annotationVal === 'true') {
                    metaProps.push(key);
                }
                continue;
            }
            else if (key === 'type') {
                if (annotationVal === 'json_schema') {
                    metaProps.push('jsonSchema');
                }
            }
            else if (key === 'highlightLines') {
                if (Array.isArray(annotationVal)) {
                    const rangeVals = [];
                    for (const val of annotationVal) {
                        if (Array.isArray(val)) {
                            rangeVals.push(`${val[0]}-${val[1]}`);
                        }
                        else {
                            rangeVals.push(val);
                        }
                    }
                    if (rangeVals.length) {
                        metaProps.push(`{${rangeVals.join(',')}}`);
                    }
                }
                else {
                    metaProps.push(`{${annotationVal}}`);
                }
            }
            else {
                metaProps.push(`${key}="${annotationVal}"`);
            }
        }
    }
    return [...new Set(metaProps)];
}

const codeGroupHandler = function (node, _, context) {
    const exit = context.enter('codegroup');
    const value = containerFlow(node, context);
    exit();
    return value;
};

const { safeStringify: safeStringify$1 } = Yaml__namespace;
const tabsHandler = function (node, _, context) {
    const exit = context.enter('tabs');
    const value = containerFlow(node, context);
    exit();
    return `${value}

<!-- type: tab-end -->`;
};
const tabHandler = function (node, _, context) {
    var _a;
    const exit = context.enter('tab');
    const _b = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.hProperties) || {}), annotations = __rest(_b, ["type"]);
    const value = containerFlow(node, context);
    exit();
    return `<!--
type: tab
${safeStringify$1(annotations, { skipInvalid: true }).trim()}
-->

${value}`;
};

const remarkStringifyPreset = {
    plugins: [[remarkFrontmatter, ['yaml']], remarkGfm],
    settings: {
        bullet: '-',
        emphasis: '_',
        fences: true,
        incrementListMarker: true,
        listItemIndent: 'one',
        rule: '-',
        handlers: {
            blockquote: blockquoteHandler,
            code: codeHandler,
            tabs: tabsHandler,
            tab: tabHandler,
            codegroup: codeGroupHandler,
        },
    },
};
const defaultProcessor = unified_1().use(remarkStringify).use(remarkStringifyPreset);
const stringify = (tree, opts = {}, processor = defaultProcessor) => {
    const processorInstance = processor()
        .data('settings', Object.assign({}, remarkStringifyPreset.settings, opts.settings))
        .use(opts.remarkPlugins || []);
    return processorInstance.stringify(processorInstance.runSync(tree));
};

const { parseWithPointers: parseYaml, safeStringify } = Yaml__namespace;
const { DiagnosticSeverity } = types__namespace;
const isError = ({ severity }) => severity === DiagnosticSeverity.Error;
const safeParse = (value) => {
    try {
        const { data, diagnostics } = parseYaml(String(value));
        if (data === void 0 || (diagnostics.length > 0 && diagnostics.some(isError))) {
            return {};
        }
        return data;
    }
    catch (_a) {
        return {};
    }
};
class Frontmatter {
    constructor(data, mutate = false) {
        const root = typeof data === 'string' ? parseWithPointers(data).data : mutate ? data : JSON.parse(JSON.stringify(data));
        if (root.type !== 'root') {
            throw new TypeError('Malformed yaml was provided');
        }
        this.document = root;
        if (root.children.length > 0 && root.children[0].type === 'yaml') {
            this.node = root.children[0];
            this.properties = safeParse(this.node.value);
        }
        else {
            this.node = {
                type: 'yaml',
                value: '',
            };
            this.properties = null;
        }
    }
    get isEmpty() {
        for (const _ in this.properties) {
            if (Object.hasOwnProperty.call(this.properties, _)) {
                return false;
            }
        }
        return true;
    }
    getAll() {
        if (this.properties !== null) {
            return this.properties;
        }
    }
    get(prop) {
        if (this.properties !== null) {
            return get_1(this.properties, prop);
        }
    }
    set(prop, value) {
        if (this.properties === null) {
            this.properties = {};
        }
        set_1(this.properties, prop, value);
        this.updateDocument();
    }
    unset(prop) {
        if (this.properties !== null) {
            const path = toPath_1(prop);
            const lastSegment = Number(path[path.length - 1]);
            if (!Number.isNaN(lastSegment)) {
                const baseObj = path.length > 1 ? this.get(path.slice(0, path.length - 1)) : this.getAll();
                if (Array.isArray(baseObj)) {
                    if (baseObj.length < lastSegment)
                        return;
                    pullAt_1(baseObj, lastSegment);
                }
                else {
                    unset_1(this.properties, prop);
                }
            }
            else {
                unset_1(this.properties, prop);
            }
            this.updateDocument();
        }
    }
    stringify() {
        return stringify(this.document);
    }
    static getFrontmatterBlock(value) {
        const match = value.match(/^(\s*\n)?---(?:.|[\n\r\u2028\u2029])*?\n---/);
        return match === null ? void 0 : match[0];
    }
    updateDocument() {
        const children = this.document.children;
        if (!children)
            return;
        const index = children.indexOf(this.node);
        this.node.value = this.isEmpty
            ? ''
            : safeStringify(this.properties, {
                flowLevel: 1,
                indent: 2,
            }).trim();
        if (this.isEmpty) {
            if (index !== -1) {
                children.splice(index, 1);
            }
        }
        else if (index === -1) {
            children.unshift(this.node);
        }
    }
}

const getJsonPathForNode = (root, node) => {
    const path = [];
    findNode(root, node, path);
    return path;
};
function findNode(root, node, path) {
    if (node.position === undefined || root.position === undefined)
        return;
    if (node.position.start.line === root.position.start.line &&
        node.position.end.line === root.position.end.line &&
        node.position.start.column === root.position.start.column &&
        node.position.end.column === root.position.end.column) {
        return node;
    }
    if (node.position.start.line >= root.position.start.line && node.position.end.line <= root.position.end.line) {
        const { children } = root;
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                const item = findNode(children[i], node, path);
                if (item) {
                    path.unshift('children', i);
                    return findNode(item, node, path);
                }
            }
        }
    }
    return;
}

const getJsonPathForPosition = ({ ast }, position) => {
    const path = [];
    findNodeAtPosition(ast, position, path);
    return path;
};
function findNodeAtPosition(node, position, path) {
    if (position.line >= node.position.start.line - 1 && position.line <= node.position.end.line - 1) {
        const { children } = node;
        if (Array.isArray(children)) {
            for (let i = children.length - 1; i >= 0; i--) {
                const item = findNodeAtPosition(children[i], position, path);
                if (item &&
                    (item.position.start.line !== item.position.end.line ||
                        (position.character >= item.position.start.column - 1 &&
                            position.character <= item.position.end.column - 1))) {
                    path.unshift('children', i);
                    return findNodeAtPosition(item, position, path);
                }
            }
        }
        return node;
    }
    return;
}

const getLocationForJsonPath = ({ ast }, path) => {
    const data = path.length === 0 ? ast : get_1(ast, path);
    if (data === void 0)
        return;
    return {
        range: {
            start: {
                character: data.position.start.column - 1,
                line: data.position.start.line - 1,
            },
            end: {
                character: data.position.end.column - 1,
                line: data.position.end.line - 1,
            },
        },
    };
};

var own$1 = {}.hasOwnProperty;

/**
 * @callback Handler
 * @param {...unknown} value
 * @return {unknown}
 *
 * @typedef {Record<string, Handler>} Handlers
 *
 * @typedef {Object} Options
 * @property {Handler} [unknown]
 * @property {Handler} [invalid]
 * @property {Handlers} [handlers]
 */

/**
 * Handle values based on a property.
 *
 * @param {string} key
 * @param {Options} [options]
 */
function zwitch(key, options) {
  var settings = options || {};

  /**
   * Handle one value.
   * Based on the bound `key`, a respective handler will be called.
   * If `value` is not an object, or doesn’t have a `key` property, the special
   * “invalid” handler will be called.
   * If `value` has an unknown `key`, the special “unknown” handler will be
   * called.
   *
   * All arguments, and the context object, are passed through to the handler,
   * and it’s result is returned.
   *
   * @param {...unknown} [value]
   * @this {unknown}
   * @returns {unknown}
   * @property {Handler} invalid
   * @property {Handler} unknown
   * @property {Handlers} handlers
   */
  function one(value) {
    var fn = one.invalid;
    var handlers = one.handlers;

    if (value && own$1.call(value, key)) {
      fn = own$1.call(handlers, value[key]) ? handlers[value[key]] : one.unknown;
    }

    if (fn) {
      return fn.apply(this, arguments)
    }
  }

  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;

  return one
}

/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').Query} Query
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').SelectState} SelectState
 */

/**
 * @param {Node} node
 * @returns {node is Parent}
 */
function root$1(node) {
  return (
    // Root in nlcst.
    node.type === 'RootNode' ||
    // Rest
    node.type === 'root'
  )
}

/**
 * @param {Node} node
 * @returns {node is Parent}
 */
function parent(node) {
  return Array.isArray(node.children)
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Query} Query
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').Handler} Handler
 */

var own = {}.hasOwnProperty;

var handle$2 = zwitch('nestingOperator', {
  unknown: unknownNesting,
  invalid: topScan, // `undefined` is the top query selector.
  handlers: {
    null: descendant, // `null` is the descendant combinator.
    '>': child,
    '+': adjacentSibling,
    '~': generalSibling
  }
});

/** @type {Handler} */
function nest(query, node, index, parent, state) {
  return handle$2(query, node, index, parent, state)
}

// Shouldn’t be invoked, parser gives correct data.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownNesting(query) {
  throw new Error('Unexpected nesting `' + query.nestingOperator + '`')
}

/** @type {Handler} */
function topScan(query, node, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next 3 */
  if (parent) {
    throw new Error('topScan is supposed to be called from the root node')
  }

  state.iterator(query, node, index, parent, state);
  if (!state.shallow) descendant(query, node, index, parent, state);
}

/** @type {Handler} */
function descendant(query, node, index, parent, state) {
  var previous = state.iterator;

  state.iterator = iterator;
  child(query, node, index, parent, state);

  /** @type {SelectIterator} */
  function iterator(query, node, index, parent, state) {
    state.iterator = previous;
    previous(query, node, index, parent, state);
    state.iterator = iterator;

    if (state.one && state.found) return

    child(query, node, index, parent, state);
  }
}

/** @type {Handler} */
function child(query, node, _1, _2, state) {
  if (!parent(node)) return
  if (node.children.length === 0) return

  new WalkIterator(query, node, state).each().done();
}

/** @type {Handler} */
function adjacentSibling(query, _, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next */
  if (!parent) return

  new WalkIterator(query, parent, state)
    .prefillTypeIndex(0, ++index)
    .each(index, ++index)
    .prefillTypeIndex(index)
    .done();
}

/** @type {Handler} */
function generalSibling(query, _, index, parent, state) {
  // Shouldn’t happen.
  /* c8 ignore next */
  if (!parent) return

  new WalkIterator(query, parent, state)
    .prefillTypeIndex(0, ++index)
    .each(index)
    .done();
}

class WalkIterator {
  /**
   * Handles typeIndex and typeCount properties for every walker.
   *
   * @param {Rule} query
   * @param {Parent} parent
   * @param {SelectState} state
   */
  constructor(query, parent, state) {
    /** @type {Rule} */
    this.query = query;
    /** @type {Parent} */
    this.parent = parent;
    /** @type {SelectState} */
    this.state = state;
    /** @type {TypeIndex|undefined} */
    this.typeIndex = state.index ? new TypeIndex() : undefined;
    /** @type {Array.<Function>} */
    this.delayed = [];
  }

  /**
   * @param {number|null|undefined} [x]
   * @param {number|null|undefined} [y]
   * @returns {this}
   */
  prefillTypeIndex(x, y) {
    var [start, end] = this.defaults(x, y);

    if (this.typeIndex) {
      while (start < end) {
        this.typeIndex.index(this.parent.children[start]);
        start++;
      }
    }

    return this
  }

  /**
   * @param {number|null|undefined} [x]
   * @param {number|null|undefined} [y]
   * @returns {this}
   */
  each(x, y) {
    var [start, end] = this.defaults(x, y);
    var child = this.parent.children[start];
    /** @type {number} */
    var index;
    /** @type {number} */
    var nodeIndex;

    if (start >= end) return this

    if (this.typeIndex) {
      nodeIndex = this.typeIndex.nodes;
      index = this.typeIndex.index(child);
      this.delayed.push(delay);
    } else {
      this.state.iterator(this.query, child, start, this.parent, this.state);
    }

    // Stop if we’re looking for one node and it’s already found.
    if (this.state.one && this.state.found) return this

    return this.each(start + 1, end)

    /**
     * @this {WalkIterator}
     */
    function delay() {
      this.state.typeIndex = index;
      this.state.nodeIndex = nodeIndex;
      this.state.typeCount = this.typeIndex.count(child);
      this.state.nodeCount = this.typeIndex.nodes;
      this.state.iterator(this.query, child, start, this.parent, this.state);
    }
  }

  /**
   * Done!
   * @returns {this}
   */
  done() {
    var index = -1;

    while (++index < this.delayed.length) {
      this.delayed[index].call(this);
      if (this.state.one && this.state.found) break
    }

    return this
  }

  /**
   * @param {number|null|undefined} [start]
   * @param {number|null|undefined} [end]
   * @returns {[number, number]}
   */
  defaults(start, end) {
    if (start === null || start === undefined || start < 0) start = 0;
    if (end === null || end === undefined || end > this.parent.children.length)
      end = this.parent.children.length;
    return [start, end]
  }
}

class TypeIndex {
  constructor() {
    /** @type {Object.<string, number>} */
    this.counts = {};
    /** @type {number} */
    this.nodes = 0;
  }

  /**
   * @param {Node} node
   * @returns {number}
   */
  index(node) {
    var type = node.type;

    this.nodes++;

    if (!own.call(this.counts, type)) this.counts[type] = 0;

    // Note: `++` is intended to be postfixed!
    return this.counts[type]++
  }

  /**
   * @param {Node} node
   * @returns {number|undefined}
   */
  count(node) {
    return this.counts[node.type]
  }
}

/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {string} Type
 * @typedef {Object<string, unknown>} Props
 *
 * @typedef {null|undefined|Type|Props|TestFunctionAnything|Array.<Type|Props|TestFunctionAnything>} Test
 */

var convert =
  /**
   * @type {(
   *   (<T extends Node>(test: T['type']|Partial<T>|TestFunctionPredicate<T>) => AssertPredicate<T>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  (
    /**
     * Generate an assertion from a check.
     * @param {Test} [test]
     * When nullish, checks if `node` is a `Node`.
     * When `string`, works like passing `function (node) {return node.type === test}`.
     * When `function` checks if function passed the node is true.
     * When `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
     * When `array`, checks any one of the subtests pass.
     * @returns {AssertAnything}
     */
    function (test) {
      if (test === undefined || test === null) {
        return ok
      }

      if (typeof test === 'string') {
        return typeFactory(test)
      }

      if (typeof test === 'object') {
        // @ts-ignore looks like a list of tests / partial test object.
        return 'length' in test ? anyFactory(test) : propsFactory(test)
      }

      if (typeof test === 'function') {
        return castFactory(test)
      }

      throw new Error('Expected function, string, or object as test')
    }
  );
/**
 * @param {Array.<Type|Props|TestFunctionAnything>} tests
 * @returns {AssertAnything}
 */
function anyFactory(tests) {
  /** @type {Array.<AssertAnything>} */
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }

  return castFactory(any)

  /**
   * @this {unknown}
   * @param {unknown[]} parameters
   * @returns {boolean}
   */
  function any(...parameters) {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].call(this, ...parameters)) return true
    }
  }
}

/**
 * Utility to assert each property in `test` is represented in `node`, and each
 * values are strictly equal.
 *
 * @param {Props} check
 * @returns {AssertAnything}
 */
function propsFactory(check) {
  return castFactory(all)

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function all(node) {
    /** @type {string} */
    var key;

    for (key in check) {
      if (node[key] !== check[key]) return
    }

    return true
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 *
 * @param {Type} check
 * @returns {AssertAnything}
 */
function typeFactory(check) {
  return castFactory(type)

  /**
   * @param {Node} node
   */
  function type(node) {
    return node && node.type === check
  }
}

/**
 * Utility to convert a string into a function which checks a given node’s type
 * for said string.
 * @param {TestFunctionAnything} check
 * @returns {AssertAnything}
 */
function castFactory(check) {
  return assertion

  /**
   * @this {unknown}
   * @param {Array.<unknown>} parameters
   * @returns {boolean}
   */
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters))
  }
}

// Utility to return true.
function ok() {
  return true
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').RulePseudoNth} RulePseudoNth
 * @typedef {import('./types.js').RulePseudoSelector} RulePseudoSelector
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').SelectState} SelectState
 * @typedef {import('./types.js').Node} Node
 */

var is = convert();

var handle$1 = zwitch('name', {
  unknown: unknownPseudo,
  invalid: invalidPseudo,
  handlers: {
    any: matches,
    blank: empty,
    empty,
    'first-child': firstChild,
    'first-of-type': firstOfType,
    has: hasSelector,
    'last-child': lastChild,
    'last-of-type': lastOfType,
    matches,
    not,
    'nth-child': nthChild,
    'nth-last-child': nthLastChild,
    'nth-of-type': nthOfType,
    'nth-last-of-type': nthLastOfType,
    'only-child': onlyChild,
    'only-of-type': onlyOfType,
    root,
    scope
  }
});

pseudo.needsIndex = [
  'first-child',
  'first-of-type',
  'last-child',
  'last-of-type',
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type',
  'only-child',
  'only-of-type'
];

/**
 * @param {Rule} query
 * @param {Node} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function pseudo(query, node, index, parent, state) {
  var pseudos = query.pseudos;
  var offset = -1;

  while (++offset < pseudos.length) {
    if (!handle$1(pseudos[offset], node, index, parent, state)) return false
  }

  return true
}

/**
 * @param {RulePseudoSelector} query
 * @param {Node} node
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function matches(query, node, _1, _2, state) {
  var shallow = state.shallow;
  var one = state.one;
  /** @type {boolean} */
  var result;

  state.one = true;
  state.shallow = true;

  result = state.any(query.value, node, state)[0] === node;

  state.shallow = shallow;
  state.one = one;

  return result
}

/**
 * @param {RulePseudoSelector} query
 * @param {Node} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function not(query, node, index, parent, state) {
  return !matches(query, node, index, parent, state)
}

/**
 * @param {RulePseudo} _1
 * @param {Node} node
 * @param {number|null} _2
 * @param {Parent|null} parent
 * @returns {boolean}
 */
function root(_1, node, _2, parent) {
  return is(node) && !parent
}

/**
 * @param {RulePseudo} _1
 * @param {Node} node
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function scope(_1, node, _2, _3, state) {
  return is(node) && state.scopeNodes.includes(node)
}

/**
 * @param {RulePseudo} _1
 * @param {Node} node
 * @returns {boolean}
 */
function empty(_1, node) {
  return parent(node) ? node.children.length === 0 : !('value' in node)
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeIndex === 0 // Specifically `0`, not falsey.
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeIndex === state.nodeCount - 1
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.nodeCount === 1
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.nodeIndex)
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthLastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.nodeCount - state.nodeIndex - 1)
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.typeIndex)
}

/**
 * @param {RulePseudoNth} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function nthLastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return query.value(state.typeCount - 1 - state.typeIndex)
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === 0
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === state.typeCount - 1
}

/**
 * @param {RulePseudo} query
 * @param {Node} _1
 * @param {number|null} _2
 * @param {Parent|null} _3
 * @param {SelectState} state
 * @returns {boolean}
 */
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeCount === 1
}

// Shouldn’t be invoked, parser gives correct data.
/* c8 ignore next 3 */
function invalidPseudo() {
  throw new Error('Invalid pseudo-selector')
}

/**
 * @param {RulePseudo} query
 * @returns {boolean}
 */
function unknownPseudo(query) {
  if (query.name) {
    throw new Error('Unknown pseudo-selector `' + query.name + '`')
  }

  throw new Error('Unexpected pseudo-element or empty pseudo-class')
}

/**
 * @param {SelectState} state
 * @param {RulePseudo|RulePseudoNth} query
 */
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error('Cannot use `:' + query.name + '` without parent')
  }
}

/**
 * @param {RulePseudoSelector} query
 * @param {Node} node
 * @param {number|null} _1
 * @param {Parent|null} _2
 * @param {SelectState} state
 * @returns {boolean}
 */
function hasSelector(query, node, _1, _2, state) {
  var shallow = state.shallow;
  var one = state.one;
  var scopeNodes = state.scopeNodes;
  var value = appendScope(query.value);
  var anything = state.any;
  /** @type {boolean} */
  var result;

  state.shallow = false;
  state.one = true;
  state.scopeNodes = [node];

  result = Boolean(anything(value, node, state)[0]);

  state.shallow = shallow;
  state.one = one;
  state.scopeNodes = scopeNodes;

  return result
}

/**
 * @param {Selector} value
 */
function appendScope(value) {
  /** @type {Selectors} */
  var selector =
    value.type === 'ruleSet' ? {type: 'selectors', selectors: [value]} : value;
  var index = -1;
  /** @type {Rule} */
  var rule;

  while (++index < selector.selectors.length) {
    rule = selector.selectors[index].rule;
    rule.nestingOperator = null;

    // Needed if new pseudo’s are added that accepts commas (such as
    // `:lang(en, nl)`)
    /* c8 ignore else */
    if (
      !rule.pseudos ||
      rule.pseudos.length !== 1 ||
      rule.pseudos[0].name !== 'scope'
    ) {
      selector.selectors[index] = {
        type: 'ruleSet',
        rule: {
          type: 'rule',
          rule,
          // @ts-ignore pseudos are fine w/ just a name!
          pseudos: [{name: 'scope'}]
        }
      };
    }
  }

  return selector
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RuleAttr} RuleAttr
 * @typedef {import('./types.js').Node} Node
 */

var handle = zwitch('operator', {
  unknown: unknownOperator,
  invalid: exists,
  handlers: {
    '=': exact,
    '^=': begins,
    '$=': ends,
    '*=': containsString,
    '~=': containsArray
  }
});

/**
 * @param {Rule} query
 * @param {Node} node
 */
function attribute(query, node) {
  var index = -1;

  while (++index < query.attrs.length) {
    if (!handle(query.attrs[index], node)) return false
  }

  return true
}

/**
 * `[attr]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function exists(query, node) {
  return node[query.name] !== null && node[query.name] !== undefined
}

/**
 * `[attr=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function exact(query, node) {
  return exists(query, node) && String(node[query.name]) === query.value
}

/**
 * `[attr~=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function containsArray(query, node) {
  var value = node[query.name];

  if (value === null || value === undefined) return false

  // If this is an array, and the query is contained in it, return true.
  // Coverage comment in place because TS turns `Array.isArray(unknown)`
  // into `Array.<any>` instead of `Array.<unknown>`.
  // type-coverage:ignore-next-line
  if (Array.isArray(value) && value.includes(query.value)) {
    return true
  }

  // For all other values, return whether this is an exact match.
  return String(value) === query.value
}

/**
 * `[attr^=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function begins(query, node) {
  var value = node[query.name];

  return (
    typeof value === 'string' &&
    value.slice(0, query.value.length) === query.value
  )
}

/**
 * `[attr$=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function ends(query, node) {
  var value = node[query.name];

  return (
    typeof value === 'string' &&
    value.slice(-query.value.length) === query.value
  )
}

/**
 * `[attr*=value]`
 *
 * @param {RuleAttr} query
 * @param {Node} node
 */
function containsString(query, node) {
  var value = node[query.name];
  return typeof value === 'string' && value.includes(query.value)
}

// Shouldn’t be invoked, Parser throws an error instead.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownOperator(query) {
  throw new Error('Unknown operator `' + query.operator + '`')
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Node} Node
 */

/**
 * @param {Rule} query
 * @param {Node} node
 */
function name(query, node) {
  return query.tagName === '*' || query.tagName === node.type
}

/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectState} SelectState
 */

/**
 * @param {Rule} query
 * @param {Node} node
 * @param {number|null} index
 * @param {Parent|null} parent
 * @param {SelectState} state
 * @returns {boolean}
 */
function test(query, node, index, parent, state) {
  if (query.id) throw new Error('Invalid selector: id')
  if (query.classNames) throw new Error('Invalid selector: class')

  return Boolean(
    node &&
      (!query.tagName || name(query, node)) &&
      (!query.attrs || attribute(query, node)) &&
      (!query.pseudos || pseudo(query, node, index, parent, state))
  )
}

/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').Query} Query
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').SelectIterator} SelectIterator
 * @typedef {import('./types.js').SelectState} SelectState
 */

var type = zwitch('type', {
  unknown: unknownType,
  invalid: invalidType,
  handlers: {selectors: selectors$1, ruleSet: ruleSet$1, rule: rule$1}
});

/**
 * @param {Selectors|RuleSet|Rule} query
 * @param {Node} node
 * @param {SelectState} state
 */
function any(query, node, state) {
  // @ts-ignore zwitch types are off.
  return query && node ? type(query, node, state) : []
}

/**
 * @param {Selectors} query
 * @param {Node} node
 * @param {SelectState} state
 */
function selectors$1(query, node, state) {
  var collect = collector(state.one);
  var index = -1;

  while (++index < query.selectors.length) {
    collect(ruleSet$1(query.selectors[index], node, state));
  }

  return collect.result
}

/**
 * @param {RuleSet} query
 * @param {Node} node
 * @param {SelectState} state
 */
function ruleSet$1(query, node, state) {
  return rule$1(query.rule, node, state)
}

/**
 * @param {Rule} query
 * @param {Node} tree
 * @param {SelectState} state
 */
function rule$1(query, tree, state) {
  var collect = collector(state.one);

  if (state.shallow && query.rule) {
    throw new Error('Expected selector without nesting')
  }

  nest(
    query,
    tree,
    0,
    null,
    configure(query, {
      scopeNodes: root$1(tree) ? tree.children : [tree],
      index: false,
      iterator,
      one: state.one,
      shallow: state.shallow,
      any: state.any
    })
  );

  return collect.result

  /** @type {SelectIterator} */
  function iterator(query, node, index, parent, state) {
    if (test(query, node, index, parent, state)) {
      if ('rule' in query) {
        nest(query.rule, node, index, parent, configure(query.rule, state));
      } else {
        collect(node);
        state.found = true;
      }
    }
  }
}

/**
 * @template {SelectState} S
 * @param {Rule} query
 * @param {S} state
 * @returns {S}
 */
function configure(query, state) {
  var pseudos = query.pseudos || [];
  var index = -1;

  while (++index < pseudos.length) {
    if (pseudo.needsIndex.includes(pseudos[index].name)) {
      state.index = true;
      break
    }
  }

  return state
}

// Shouldn’t be invoked, all data is handled.
/* c8 ignore next 6 */
/**
 * @param {{[x: string]: unknown, type: string}} query
 */
function unknownType(query) {
  throw new Error('Unknown type `' + query.type + '`')
}

// Shouldn’t be invoked, parser gives correct data.
/* c8 ignore next 3 */
function invalidType() {
  throw new Error('Invalid type')
}

/**
 * @param {boolean} one
 */
function collector(one) {
  /** @type {Array.<Node>} */
  var result = [];
  /** @type {boolean} */
  var found;

  collect.result = result;

  return collect

  /**
   * Append nodes to array, filtering out duplicates.
   *
   * @param {Node|Array.<Node>} node
   */
  function collect(node) {
    var index = -1;

    if ('length' in node) {
      while (++index < node.length) {
        collectOne(node[index]);
      }
    } else {
      collectOne(node);
    }
  }

  /**
   * @param {Node} node
   */
  function collectOne(node) {
    if (one) {
      /* Shouldn’t happen, safeguards performance problems. */
      /* c8 ignore next */
      if (found) throw new Error('Cannot collect multiple nodes')

      found = true;
    }

    if (!result.includes(node)) result.push(node);
  }
}

var lib$1 = {};

var parserContext = {};

var utils = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function isIdentStart(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c === '-') || (c === '_');
}
exports.isIdentStart = isIdentStart;
function isIdent(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '-' || c === '_';
}
exports.isIdent = isIdent;
function isHex(c) {
    return (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || (c >= '0' && c <= '9');
}
exports.isHex = isHex;
function escapeIdentifier(s) {
    var len = s.length;
    var result = '';
    var i = 0;
    while (i < len) {
        var chr = s.charAt(i);
        if (exports.identSpecialChars[chr]) {
            result += '\\' + chr;
        }
        else {
            if (!(chr === '_' || chr === '-' ||
                (chr >= 'A' && chr <= 'Z') ||
                (chr >= 'a' && chr <= 'z') ||
                (i !== 0 && chr >= '0' && chr <= '9'))) {
                var charCode = chr.charCodeAt(0);
                if ((charCode & 0xF800) === 0xD800) {
                    var extraCharCode = s.charCodeAt(i++);
                    if ((charCode & 0xFC00) !== 0xD800 || (extraCharCode & 0xFC00) !== 0xDC00) {
                        throw Error('UCS-2(decode): illegal sequence');
                    }
                    charCode = ((charCode & 0x3FF) << 10) + (extraCharCode & 0x3FF) + 0x10000;
                }
                result += '\\' + charCode.toString(16) + ' ';
            }
            else {
                result += chr;
            }
        }
        i++;
    }
    return result;
}
exports.escapeIdentifier = escapeIdentifier;
function escapeStr(s) {
    var len = s.length;
    var result = '';
    var i = 0;
    var replacement;
    while (i < len) {
        var chr = s.charAt(i);
        if (chr === '"') {
            chr = '\\"';
        }
        else if (chr === '\\') {
            chr = '\\\\';
        }
        else if ((replacement = exports.strReplacementsRev[chr]) !== undefined) {
            chr = replacement;
        }
        result += chr;
        i++;
    }
    return "\"" + result + "\"";
}
exports.escapeStr = escapeStr;
exports.identSpecialChars = {
    '!': true,
    '"': true,
    '#': true,
    '$': true,
    '%': true,
    '&': true,
    '\'': true,
    '(': true,
    ')': true,
    '*': true,
    '+': true,
    ',': true,
    '.': true,
    '/': true,
    ';': true,
    '<': true,
    '=': true,
    '>': true,
    '?': true,
    '@': true,
    '[': true,
    '\\': true,
    ']': true,
    '^': true,
    '`': true,
    '{': true,
    '|': true,
    '}': true,
    '~': true
};
exports.strReplacementsRev = {
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\f': '\\f',
    '\v': '\\v'
};
exports.singleQuoteEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\',
    '\'': '\''
};
exports.doubleQuotesEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\',
    '"': '"'
};
}(utils));

Object.defineProperty(parserContext, "__esModule", { value: true });
var utils_1$1 = utils;
function parseCssSelector(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
    var l = str.length;
    var chr = '';
    function getStr(quote, escapeTable) {
        var result = '';
        pos++;
        chr = str.charAt(pos);
        while (pos < l) {
            if (chr === quote) {
                pos++;
                return result;
            }
            else if (chr === '\\') {
                pos++;
                chr = str.charAt(pos);
                var esc = void 0;
                if (chr === quote) {
                    result += quote;
                }
                else if ((esc = escapeTable[chr]) !== undefined) {
                    result += esc;
                }
                else if (utils_1$1.isHex(chr)) {
                    var hex = chr;
                    pos++;
                    chr = str.charAt(pos);
                    while (utils_1$1.isHex(chr)) {
                        hex += chr;
                        pos++;
                        chr = str.charAt(pos);
                    }
                    if (chr === ' ') {
                        pos++;
                        chr = str.charAt(pos);
                    }
                    result += String.fromCharCode(parseInt(hex, 16));
                    continue;
                }
                else {
                    result += chr;
                }
            }
            else {
                result += chr;
            }
            pos++;
            chr = str.charAt(pos);
        }
        return result;
    }
    function getIdent() {
        var result = '';
        chr = str.charAt(pos);
        while (pos < l) {
            if (utils_1$1.isIdent(chr)) {
                result += chr;
            }
            else if (chr === '\\') {
                pos++;
                if (pos >= l) {
                    throw Error('Expected symbol but end of file reached.');
                }
                chr = str.charAt(pos);
                if (utils_1$1.identSpecialChars[chr]) {
                    result += chr;
                }
                else if (utils_1$1.isHex(chr)) {
                    var hex = chr;
                    pos++;
                    chr = str.charAt(pos);
                    while (utils_1$1.isHex(chr)) {
                        hex += chr;
                        pos++;
                        chr = str.charAt(pos);
                    }
                    if (chr === ' ') {
                        pos++;
                        chr = str.charAt(pos);
                    }
                    result += String.fromCharCode(parseInt(hex, 16));
                    continue;
                }
                else {
                    result += chr;
                }
            }
            else {
                return result;
            }
            pos++;
            chr = str.charAt(pos);
        }
        return result;
    }
    function skipWhitespace() {
        chr = str.charAt(pos);
        var result = false;
        while (chr === ' ' || chr === "\t" || chr === "\n" || chr === "\r" || chr === "\f") {
            result = true;
            pos++;
            chr = str.charAt(pos);
        }
        return result;
    }
    function parse() {
        var res = parseSelector();
        if (pos < l) {
            throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
        }
        return res;
    }
    function parseSelector() {
        var selector = parseSingleSelector();
        if (!selector) {
            return null;
        }
        var res = selector;
        chr = str.charAt(pos);
        while (chr === ',') {
            pos++;
            skipWhitespace();
            if (res.type !== 'selectors') {
                res = {
                    type: 'selectors',
                    selectors: [selector]
                };
            }
            selector = parseSingleSelector();
            if (!selector) {
                throw Error('Rule expected after ",".');
            }
            res.selectors.push(selector);
        }
        return res;
    }
    function parseSingleSelector() {
        skipWhitespace();
        var selector = {
            type: 'ruleSet'
        };
        var rule = parseRule();
        if (!rule) {
            return null;
        }
        var currentRule = selector;
        while (rule) {
            rule.type = 'rule';
            currentRule.rule = rule;
            currentRule = rule;
            skipWhitespace();
            chr = str.charAt(pos);
            if (pos >= l || chr === ',' || chr === ')') {
                break;
            }
            if (ruleNestingOperators[chr]) {
                var op = chr;
                pos++;
                skipWhitespace();
                rule = parseRule();
                if (!rule) {
                    throw Error('Rule expected after "' + op + '".');
                }
                rule.nestingOperator = op;
            }
            else {
                rule = parseRule();
                if (rule) {
                    rule.nestingOperator = null;
                }
            }
        }
        return selector;
    }
    // @ts-ignore no-overlap
    function parseRule() {
        var rule = null;
        while (pos < l) {
            chr = str.charAt(pos);
            if (chr === '*') {
                pos++;
                (rule = rule || {}).tagName = '*';
            }
            else if (utils_1$1.isIdentStart(chr) || chr === '\\') {
                (rule = rule || {}).tagName = getIdent();
            }
            else if (chr === '.') {
                pos++;
                rule = rule || {};
                (rule.classNames = rule.classNames || []).push(getIdent());
            }
            else if (chr === '#') {
                pos++;
                (rule = rule || {}).id = getIdent();
            }
            else if (chr === '[') {
                pos++;
                skipWhitespace();
                var attr = {
                    name: getIdent()
                };
                skipWhitespace();
                // @ts-ignore
                if (chr === ']') {
                    pos++;
                }
                else {
                    var operator = '';
                    if (attrEqualityMods[chr]) {
                        operator = chr;
                        pos++;
                        chr = str.charAt(pos);
                    }
                    if (pos >= l) {
                        throw Error('Expected "=" but end of file reached.');
                    }
                    if (chr !== '=') {
                        throw Error('Expected "=" but "' + chr + '" found.');
                    }
                    attr.operator = operator + '=';
                    pos++;
                    skipWhitespace();
                    var attrValue = '';
                    attr.valueType = 'string';
                    // @ts-ignore
                    if (chr === '"') {
                        attrValue = getStr('"', utils_1$1.doubleQuotesEscapeChars);
                        // @ts-ignore
                    }
                    else if (chr === '\'') {
                        attrValue = getStr('\'', utils_1$1.singleQuoteEscapeChars);
                        // @ts-ignore
                    }
                    else if (substitutesEnabled && chr === '$') {
                        pos++;
                        attrValue = getIdent();
                        attr.valueType = 'substitute';
                    }
                    else {
                        while (pos < l) {
                            if (chr === ']') {
                                break;
                            }
                            attrValue += chr;
                            pos++;
                            chr = str.charAt(pos);
                        }
                        attrValue = attrValue.trim();
                    }
                    skipWhitespace();
                    if (pos >= l) {
                        throw Error('Expected "]" but end of file reached.');
                    }
                    if (chr !== ']') {
                        throw Error('Expected "]" but "' + chr + '" found.');
                    }
                    pos++;
                    attr.value = attrValue;
                }
                rule = rule || {};
                (rule.attrs = rule.attrs || []).push(attr);
            }
            else if (chr === ':') {
                pos++;
                var pseudoName = getIdent();
                var pseudo = {
                    name: pseudoName
                };
                // @ts-ignore
                if (chr === '(') {
                    pos++;
                    var value = '';
                    skipWhitespace();
                    if (pseudos[pseudoName] === 'selector') {
                        pseudo.valueType = 'selector';
                        value = parseSelector();
                    }
                    else {
                        pseudo.valueType = pseudos[pseudoName] || 'string';
                        // @ts-ignore
                        if (chr === '"') {
                            value = getStr('"', utils_1$1.doubleQuotesEscapeChars);
                            // @ts-ignore
                        }
                        else if (chr === '\'') {
                            value = getStr('\'', utils_1$1.singleQuoteEscapeChars);
                            // @ts-ignore
                        }
                        else if (substitutesEnabled && chr === '$') {
                            pos++;
                            value = getIdent();
                            pseudo.valueType = 'substitute';
                        }
                        else {
                            while (pos < l) {
                                if (chr === ')') {
                                    break;
                                }
                                value += chr;
                                pos++;
                                chr = str.charAt(pos);
                            }
                            value = value.trim();
                        }
                        skipWhitespace();
                    }
                    if (pos >= l) {
                        throw Error('Expected ")" but end of file reached.');
                    }
                    if (chr !== ')') {
                        throw Error('Expected ")" but "' + chr + '" found.');
                    }
                    pos++;
                    pseudo.value = value;
                }
                rule = rule || {};
                (rule.pseudos = rule.pseudos || []).push(pseudo);
            }
            else {
                break;
            }
        }
        return rule;
    }
    return parse();
}
parserContext.parseCssSelector = parseCssSelector;

var render = {};

Object.defineProperty(render, "__esModule", { value: true });
var utils_1 = utils;
function renderEntity(entity) {
    var res = '';
    switch (entity.type) {
        case 'ruleSet':
            var currentEntity = entity.rule;
            var parts = [];
            while (currentEntity) {
                if (currentEntity.nestingOperator) {
                    parts.push(currentEntity.nestingOperator);
                }
                parts.push(renderEntity(currentEntity));
                currentEntity = currentEntity.rule;
            }
            res = parts.join(' ');
            break;
        case 'selectors':
            res = entity.selectors.map(renderEntity).join(', ');
            break;
        case 'rule':
            if (entity.tagName) {
                if (entity.tagName === '*') {
                    res = '*';
                }
                else {
                    res = utils_1.escapeIdentifier(entity.tagName);
                }
            }
            if (entity.id) {
                res += "#" + utils_1.escapeIdentifier(entity.id);
            }
            if (entity.classNames) {
                res += entity.classNames.map(function (cn) {
                    return "." + (utils_1.escapeIdentifier(cn));
                }).join('');
            }
            if (entity.attrs) {
                res += entity.attrs.map(function (attr) {
                    if ('operator' in attr) {
                        if (attr.valueType === 'substitute') {
                            return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
                        }
                        else {
                            return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + utils_1.escapeStr(attr.value) + "]";
                        }
                    }
                    else {
                        return "[" + utils_1.escapeIdentifier(attr.name) + "]";
                    }
                }).join('');
            }
            if (entity.pseudos) {
                res += entity.pseudos.map(function (pseudo) {
                    if (pseudo.valueType) {
                        if (pseudo.valueType === 'selector') {
                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "(" + renderEntity(pseudo.value) + ")";
                        }
                        else if (pseudo.valueType === 'substitute') {
                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "($" + pseudo.value + ")";
                        }
                        else if (pseudo.valueType === 'numeric') {
                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "(" + pseudo.value + ")";
                        }
                        else {
                            return (":" + utils_1.escapeIdentifier(pseudo.name) +
                                "(" + utils_1.escapeIdentifier(pseudo.value) + ")");
                        }
                    }
                    else {
                        return ":" + utils_1.escapeIdentifier(pseudo.name);
                    }
                }).join('');
            }
            break;
        default:
            throw Error('Unknown entity type: "' + entity.type + '".');
    }
    return res;
}
render.renderEntity = renderEntity;

Object.defineProperty(lib$1, "__esModule", { value: true });
var parser_context_1 = parserContext;
var render_1 = render;
var CssSelectorParser = /** @class */ (function () {
    function CssSelectorParser() {
        this.pseudos = {};
        this.attrEqualityMods = {};
        this.ruleNestingOperators = {};
        this.substitutesEnabled = false;
    }
    CssSelectorParser.prototype.registerSelectorPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_1 = pseudos; _a < pseudos_1.length; _a++) {
            var pseudo = pseudos_1[_a];
            this.pseudos[pseudo] = 'selector';
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterSelectorPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_2 = pseudos; _a < pseudos_2.length; _a++) {
            var pseudo = pseudos_2[_a];
            delete this.pseudos[pseudo];
        }
        return this;
    };
    CssSelectorParser.prototype.registerNumericPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_3 = pseudos; _a < pseudos_3.length; _a++) {
            var pseudo = pseudos_3[_a];
            this.pseudos[pseudo] = 'numeric';
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterNumericPseudos = function () {
        var pseudos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
        }
        for (var _a = 0, pseudos_4 = pseudos; _a < pseudos_4.length; _a++) {
            var pseudo = pseudos_4[_a];
            delete this.pseudos[pseudo];
        }
        return this;
    };
    CssSelectorParser.prototype.registerNestingOperators = function () {
        var operators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
        }
        for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
            var operator = operators_1[_a];
            this.ruleNestingOperators[operator] = true;
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterNestingOperators = function () {
        var operators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
        }
        for (var _a = 0, operators_2 = operators; _a < operators_2.length; _a++) {
            var operator = operators_2[_a];
            delete this.ruleNestingOperators[operator];
        }
        return this;
    };
    CssSelectorParser.prototype.registerAttrEqualityMods = function () {
        var mods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
        }
        for (var _a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
            var mod = mods_1[_a];
            this.attrEqualityMods[mod] = true;
        }
        return this;
    };
    CssSelectorParser.prototype.unregisterAttrEqualityMods = function () {
        var mods = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
        }
        for (var _a = 0, mods_2 = mods; _a < mods_2.length; _a++) {
            var mod = mods_2[_a];
            delete this.attrEqualityMods[mod];
        }
        return this;
    };
    CssSelectorParser.prototype.enableSubstitutes = function () {
        this.substitutesEnabled = true;
        return this;
    };
    CssSelectorParser.prototype.disableSubstitutes = function () {
        this.substitutesEnabled = false;
        return this;
    };
    CssSelectorParser.prototype.parse = function (str) {
        return parser_context_1.parseCssSelector(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
    };
    CssSelectorParser.prototype.render = function (path) {
        return render_1.renderEntity(path).trim();
    };
    return CssSelectorParser;
}());
var CssSelectorParser_1 = lib$1.CssSelectorParser = CssSelectorParser;

var lib = {};

var parse$2 = {};

// Following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
Object.defineProperty(parse$2, "__esModule", { value: true });
parse$2.parse = void 0;
// [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
var RE_NTH_ELEMENT = /^([+-]?\d*n)?\s*(?:([+-]?)\s*(\d+))?$/;
/**
 * Parses an expression.
 *
 * @throws An `Error` if parsing fails.
 * @returns An array containing the integer step size and the integer offset of the nth rule.
 * @example nthCheck.parse("2n+3"); // returns [2, 3]
 */
function parse$1(formula) {
    formula = formula.trim().toLowerCase();
    if (formula === "even") {
        return [2, 0];
    }
    else if (formula === "odd") {
        return [2, 1];
    }
    var parsed = formula.match(RE_NTH_ELEMENT);
    if (!parsed) {
        throw new Error("n-th rule couldn't be parsed ('" + formula + "')");
    }
    var a;
    if (parsed[1]) {
        a = parseInt(parsed[1], 10);
        if (isNaN(a)) {
            a = parsed[1].startsWith("-") ? -1 : 1;
        }
    }
    else
        a = 0;
    var b = (parsed[2] === "-" ? -1 : 1) *
        (parsed[3] ? parseInt(parsed[3], 10) : 0);
    return [a, b];
}
parse$2.parse = parse$1;

var compile$2 = {};

var boolbase = {
	trueFunc: function trueFunc(){
		return true;
	},
	falseFunc: function falseFunc(){
		return false;
	}
};

Object.defineProperty(compile$2, "__esModule", { value: true });
compile$2.compile = void 0;
var boolbase_1 = boolbase;
/**
 * Returns a function that checks if an elements index matches the given rule
 * highly optimized to return the fastest solution.
 *
 * @param parsed A tuple [a, b], as returned by `parse`.
 * @returns A highly optimized function that returns whether an index matches the nth-check.
 * @example
 * const check = nthCheck.compile([2, 3]);
 *
 * check(0); // `false`
 * check(1); // `false`
 * check(2); // `true`
 * check(3); // `false`
 * check(4); // `true`
 * check(5); // `false`
 * check(6); // `true`
 */
function compile$1(parsed) {
    var a = parsed[0];
    // Subtract 1 from `b`, to convert from one- to zero-indexed.
    var b = parsed[1] - 1;
    /*
     * When `b <= 0`, `a * n` won't be lead to any matches for `a < 0`.
     * Besides, the specification states that no elements are
     * matched when `a` and `b` are 0.
     *
     * `b < 0` here as we subtracted 1 from `b` above.
     */
    if (b < 0 && a <= 0)
        return boolbase_1.falseFunc;
    // When `a` is in the range -1..1, it matches any element (so only `b` is checked).
    if (a === -1)
        return function (index) { return index <= b; };
    if (a === 0)
        return function (index) { return index === b; };
    // When `b <= 0` and `a === 1`, they match any element.
    if (a === 1)
        return b < 0 ? boolbase_1.trueFunc : function (index) { return index >= b; };
    /*
     * Otherwise, modulo can be used to check if there is a match.
     *
     * Modulo doesn't care about the sign, so let's use `a`s absolute value.
     */
    var absA = Math.abs(a);
    // Get `b mod a`, + a if this is negative.
    var bMod = ((b % absA) + absA) % absA;
    return a > 1
        ? function (index) { return index >= b && index % absA === bMod; }
        : function (index) { return index <= b && index % absA === bMod; };
}
compile$2.compile = compile$1;

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.parse = void 0;
var parse_1 = parse$2;
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_1.parse; } });
var compile_1 = compile$2;
Object.defineProperty(exports, "compile", { enumerable: true, get: function () { return compile_1.compile; } });
/**
 * Parses and compiles a formula to a highly optimized function.
 * Combination of `parse` and `compile`.
 *
 * If the formula doesn't match any elements,
 * it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
 * Otherwise, a function accepting an _index_ is returned, which returns
 * whether or not the passed _index_ matches the formula.
 *
 * Note: The nth-rule starts counting at `1`, the returned function at `0`.
 *
 * @param formula The formula to compile.
 * @example
 * const check = nthCheck("2n+3");
 *
 * check(0); // `false`
 * check(1); // `false`
 * check(2); // `true`
 * check(3); // `false`
 * check(4); // `true`
 * check(5); // `false`
 * check(6); // `true`
 */
function nthCheck(formula) {
    return compile_1.compile(parse_1.parse(formula));
}
exports.default = nthCheck;
}(lib));

var fauxEsmNthCheck = /*@__PURE__*/getDefaultExportFromCjs(lib);

/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').RulePseudoNth} RulePseudoNth
 */

/** @type {import('nth-check').default} */
// @ts-ignore
var nthCheck = fauxEsmNthCheck.default;

var nth = new Set([
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type'
]);

var parser = new CssSelectorParser_1();

parser.registerAttrEqualityMods('~', '^', '$', '*');
parser.registerSelectorPseudos('any', 'matches', 'not', 'has');
parser.registerNestingOperators('>', '+', '~');

var compile = zwitch('type', {handlers: {selectors, ruleSet, rule}});

/**
 * @param {string} selector
 * @returns {Selector}
 */
function parse(selector) {
  if (typeof selector !== 'string') {
    throw new TypeError('Expected `string` as selector, not `' + selector + '`')
  }

  // @ts-ignore types are wrong.
  return compile(parser.parse(selector))
}

/**
 * @param {Selectors} query
 */
function selectors(query) {
  var selectors = query.selectors;
  var index = -1;

  while (++index < selectors.length) {
    compile(selectors[index]);
  }

  return query
}

/**
 * @param {RuleSet} query
 */
function ruleSet(query) {
  return rule(query.rule)
}

/**
 * @param {Rule} query
 */
function rule(query) {
  var pseudos = query.pseudos || [];
  var index = -1;
  /** @type {RulePseudo|RulePseudoNth} */
  var pseudo;

  while (++index < pseudos.length) {
    pseudo = pseudos[index];

    if (nth.has(pseudo.name)) {
      // @ts-ignore Patch a non-primitive type.
      pseudo.value = nthCheck(pseudo.value);
      // @ts-ignore Patch a non-primitive type.
      pseudo.valueType = 'function';
    }
  }

  compile(query.rule);

  return query
}

/**
 * @typedef {import('unist').Node} Node
 */

/**
 * @param {string} selector
 * @param {Node} [node]
 * @returns {Node|null}
 */
function select(selector, node) {
  return any(parse(selector), node, {one: true, any})[0] || null
}

const getProperty = (propName, element, data) => {
    let target;
    if (data) {
        try {
            const frontmatter = new Frontmatter(data, true);
            target = frontmatter.get(propName);
            if (element && !target) {
                const elem = select(element, data);
                if (elem) {
                    target = toString$1(elem);
                }
            }
        }
        catch (e) {
            console.warn(`Error getting ${propName} from markdown document`, e);
        }
    }
    return target;
};

var baseSlice = _baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

var _castSlice = castSlice$1;

/** Used to compose unicode character classes. */

var rsAstralRange$2 = '\\ud800-\\udfff',
    rsComboMarksRange$2 = '\\u0300-\\u036f',
    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
    rsVarRange$2 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$2 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$2 + rsAstralRange$2  + rsComboRange$2 + rsVarRange$2 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$3(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode$3;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var regexpTag = '[object RegExp]';

/**
 * The base implementation of `_.isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp$1(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag;
}

var _baseIsRegExp = baseIsRegExp$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$1;

var _nodeUtil = {exports: {}};

(function (module, exports) {
var freeGlobal = _freeGlobal;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
}(_nodeUtil, _nodeUtil.exports));

var baseIsRegExp = _baseIsRegExp,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
var isRegExp$1 = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

var isRegExp_1 = isRegExp$1;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function baseProperty$1(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty$1;

var baseProperty = _baseProperty;

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize$1 = baseProperty('length');

var _asciiSize = asciiSize$1;

/** Used to compose unicode character classes. */

var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral$1 = '[' + rsAstralRange$1 + ']',
    rsCombo$1 = '[' + rsComboRange$1 + ']',
    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
    rsModifier$1 = '(?:' + rsCombo$1 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$1 + ']',
    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$1 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsSymbol$1 = '(?:' + [rsNonAstral$1 + rsCombo$1 + '?', rsCombo$1, rsRegional$1, rsSurrPair$1, rsAstral$1].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode$1 = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol$1 + rsSeq$1, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize$1(string) {
  var result = reUnicode$1.lastIndex = 0;
  while (reUnicode$1.test(string)) {
    ++result;
  }
  return result;
}

var _unicodeSize = unicodeSize$1;

var asciiSize = _asciiSize,
    hasUnicode$2 = _hasUnicode,
    unicodeSize = _unicodeSize;

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize$1(string) {
  return hasUnicode$2(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

var _stringSize = stringSize$1;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray$1(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */

var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray$1;

var asciiToArray = _asciiToArray,
    hasUnicode$1 = _hasUnicode,
    unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
  return hasUnicode$1(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

var _stringToArray = stringToArray$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var baseTrim = _baseTrim,
    isObject$1 = isObject_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var toNumber = toNumber_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite$1(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite$1;

var toFinite = toFinite_1;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger$1(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

var toInteger_1 = toInteger$1;

var baseToString = _baseToString,
    castSlice = _castSlice,
    hasUnicode = _hasUnicode,
    isObject = isObject_1,
    isRegExp = isRegExp_1,
    stringSize = _stringSize,
    stringToArray = _stringToArray,
    toInteger = toInteger_1,
    toString = toString_1;

/** Used as default options for `_.truncate`. */
var DEFAULT_TRUNC_LENGTH = 30,
    DEFAULT_TRUNC_OMISSION = '...';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to truncate.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.length=30] The maximum string length.
 * @param {string} [options.omission='...'] The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
 * @returns {string} Returns the truncated string.
 * @example
 *
 * _.truncate('hi-diddly-ho there, neighborino');
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': ' '
 * });
 * // => 'hi-diddly-ho there,...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': /,? +/
 * });
 * // => 'hi-diddly-ho there...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'omission': ' [...]'
 * });
 * // => 'hi-diddly-ho there, neig [...]'
 */
function truncate(string, options) {
  var length = DEFAULT_TRUNC_LENGTH,
      omission = DEFAULT_TRUNC_OMISSION;

  if (isObject(options)) {
    var separator = 'separator' in options ? options.separator : separator;
    length = 'length' in options ? toInteger(options.length) : length;
    omission = 'omission' in options ? baseToString(options.omission) : omission;
  }
  string = toString(string);

  var strLength = string.length;
  if (hasUnicode(string)) {
    var strSymbols = stringToArray(string);
    strLength = strSymbols.length;
  }
  if (length >= strLength) {
    return string;
  }
  var end = length - stringSize(omission);
  if (end < 1) {
    return omission;
  }
  var result = strSymbols
    ? castSlice(strSymbols, 0, end).join('')
    : string.slice(0, end);

  if (separator === undefined) {
    return result + omission;
  }
  if (strSymbols) {
    end += (result.length - end);
  }
  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      var match,
          substring = result;

      if (!separator.global) {
        separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
      }
      separator.lastIndex = 0;
      while ((match = separator.exec(substring))) {
        var newEnd = match.index;
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd);
    }
  } else if (string.indexOf(baseToString(separator), end) != end) {
    var index = result.lastIndexOf(separator);
    if (index > -1) {
      result = result.slice(0, index);
    }
  }
  return result + omission;
}

var truncate_1 = truncate;

const getSummary = (data, opts = {}) => {
    let summary = getProperty('summary', 'paragraph', data);
    if (summary && opts.truncate) {
        summary = truncate_1(summary, { length: opts.truncate + 3 });
    }
    return summary;
};

const getTags = (data) => {
    const tags = [];
    if (data) {
        try {
            const frontmatter = new Frontmatter(data, true);
            const dataTags = frontmatter.get('tags');
            if (dataTags && Array.isArray(dataTags)) {
                return dataTags.reduce((filteredTags, tag) => {
                    if (tag && typeof tag === 'string' && tag !== 'undefined' && tag !== 'null') {
                        filteredTags.push(String(tag));
                    }
                    return filteredTags;
                }, []);
            }
        }
        catch (e) {
            console.warn('Error getting tags from markdown document', e);
        }
    }
    return tags;
};

const getTitle = (data) => {
    return getProperty('title', 'heading', data);
};

class Reader {
    fromLang(raw) {
        return parse$3(raw);
    }
    toLang(data) {
        return stringify(data);
    }
}

exports.Frontmatter = Frontmatter;
exports.HAST = hast;
exports.MDAST = mdast;
exports.Reader = Reader;
exports.getJsonPathForNode = getJsonPathForNode;
exports.getJsonPathForPosition = getJsonPathForPosition;
exports.getLocationForJsonPath = getLocationForJsonPath;
exports.getProperty = getProperty;
exports.getSummary = getSummary;
exports.getTags = getTags;
exports.getTitle = getTitle;
exports.parse = parse$3;
exports.parseAsync = parseAsync;
exports.parseWithPointers = parseWithPointers;
exports.remarkParsePreset = remarkParsePreset;
exports.stringify = stringify;
