(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('clsx'), require('react'), require('@fortawesome/fontawesome-svg-core'), require('@fortawesome/free-solid-svg-icons'), require('@fortawesome/react-fontawesome'), require('zustand'), require('polished'), require('deepmerge'), require('@react-spectrum/utils'), require('@react-aria/button'), require('@react-aria/focus'), require('@react-aria/interactions'), require('@react-aria/utils'), require('copy-to-clipboard'), require('@react-aria/ssr'), require('lodash.get'), require('zustand/middleware'), require('zustand/shallow'), require('reakit/Menu'), require('@react-aria/dialog'), require('@react-aria/overlays'), require('@react-hook/size'), require('@react-hook/window-size'), require('react-dom'), require('reakit'), require('@react-aria/listbox'), require('@react-stately/collections'), require('@react-stately/list'), require('ts-keycode-enum'), require('@react-aria/select'), require('@react-aria/separator'), require('@react-stately/select'), require('@react-aria/switch'), require('@react-aria/tooltip'), require('@react-stately/tooltip')) :
  typeof define === 'function' && define.amd ? define(['exports', 'tslib', 'clsx', 'react', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/react-fontawesome', 'zustand', 'polished', 'deepmerge', '@react-spectrum/utils', '@react-aria/button', '@react-aria/focus', '@react-aria/interactions', '@react-aria/utils', 'copy-to-clipboard', '@react-aria/ssr', 'lodash.get', 'zustand/middleware', 'zustand/shallow', 'reakit/Menu', '@react-aria/dialog', '@react-aria/overlays', '@react-hook/size', '@react-hook/window-size', 'react-dom', 'reakit', '@react-aria/listbox', '@react-stately/collections', '@react-stately/list', 'ts-keycode-enum', '@react-aria/select', '@react-aria/separator', '@react-stately/select', '@react-aria/switch', '@react-aria/tooltip', '@react-stately/tooltip'], factory) :
  (global = global || self, factory(global.Core = {}, global.tslib, global.cn, global.React, global.fontawesomeSvgCore, global.freeSolidSvgIcons, global.reactFontawesome, global.create, global.polished, global.deepmerge, global.utils, global.button, global.focus, global.interactions, global.utils$1, global.copy, global.ssr, global._get, global.middleware, global.shallow, global.Menu$1, global.dialog, global.overlays, global.useSize, global.windowSize, global.ReactDOM, global.reakit, global.listbox, global.collections, global.list, global.tsKeycodeEnum, global.select, global.separator, global.select$1, global._switch, global.tooltip, global.tooltip$1));
}(this, (function (exports, tslib, cn, React, fontawesomeSvgCore, freeSolidSvgIcons, reactFontawesome, create, polished, deepmerge, utils, button, focus, interactions, utils$1, copy, ssr, _get, middleware, shallow, Menu$1, dialog, overlays, useSize, windowSize, ReactDOM, reakit, listbox, collections, list, tsKeycodeEnum, select, separator, select$1, _switch, tooltip, tooltip$1) { 'use strict';

  cn = cn && cn.hasOwnProperty('default') ? cn['default'] : cn;
  var React__default = 'default' in React ? React['default'] : React;
  create = create && create.hasOwnProperty('default') ? create['default'] : create;
  deepmerge = deepmerge && deepmerge.hasOwnProperty('default') ? deepmerge['default'] : deepmerge;
  copy = copy && copy.hasOwnProperty('default') ? copy['default'] : copy;
  _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
  shallow = shallow && shallow.hasOwnProperty('default') ? shallow['default'] : shallow;
  useSize = useSize && useSize.hasOwnProperty('default') ? useSize['default'] : useSize;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  const isPseudoObject = obj => obj && typeof obj === 'object';

  const isNegative = v => {
    return v < 0 || v === '-px';
  };
  const buildClassname = (p, v) => {
    if (v === true) return `sl-${p}`;
    const isNeg = isNegative(v);
    return `sl-${isNeg ? '-' : ''}${p}${isNeg ? '' : '-'}${v}`;
  };
  const computePseudoClasses = (prop, val) => {
    let classes = {}; // if val is literal true value, then we're trying to use default and do not need to append a value
    // val can be 0, account for this

    if (isPseudoObject(val)) {
      classes = {
        [buildClassname(prop, val.default)]: val.default || val.default === 0,
        [`sm:${buildClassname(prop, val.sm)}`]: val.sm || val.sm === 0,
        [`md:${buildClassname(prop, val.md)}`]: val.md || val.md === 0,
        [`first:${buildClassname(prop, val.first)}`]: val.first || val.first === 0,
        [`last:${buildClassname(prop, val.last)}`]: val.last || val.last === 0,
        [`odd:${buildClassname(prop, val.odd)}`]: val.odd || val.odd === 0,
        [`even:${buildClassname(prop, val.even)}`]: val.even || val.even === 0,
        [`hover:${buildClassname(prop, val.hover)}`]: val.hover || val.hover === 0,
        [`focus:${buildClassname(prop, val.focus)}`]: val.focus || val.focus === 0,
        [`active:${buildClassname(prop, val.active)}`]: val.active || val.active === 0,
        [`visited:${buildClassname(prop, val.visited)}`]: val.visited || val.visited === 0,
        [`group-hover:${buildClassname(prop, val.groupHover)}`]: val.groupHover || val.groupHover === 0,
        [`group-focus:${buildClassname(prop, val.groupFocus)}`]: val.groupFocus || val.groupFocus === 0,
        [`disabled:${buildClassname(prop, val.disabled)}`]: val.disabled || val.disabled === 0
      };
    } else {
      classes[`sl${prop ? `-${prop}` : ''}${val === true ? '' : '-' + val}`] = val || val === 0;
    }

    return cn(classes);
  };

  const borderPropNames = ['borderColor', 'border', 'borderT', 'borderR', 'borderL', 'borderB', 'rounded'];
  const borderProps = props => {
    const {
      outline,
      rounded,
      borderColor,
      border,
      borderT,
      borderR,
      borderL,
      borderB
    } = props,
          rest = tslib.__rest(props, ["outline", "rounded", "borderColor", "border", "borderT", "borderR", "borderL", "borderB"]);

    const className = cn({
      [`sl-outline-${outline}`]: outline !== void 0,
      [`sl-rounded${rounded === true ? '' : '-' + rounded}`]: rounded
    }, computePseudoClasses('border', borderColor), computePseudoClasses('border', border), computePseudoClasses('border-t', borderT), computePseudoClasses('border-r', borderR), computePseudoClasses('border-l', borderL), computePseudoClasses('border-b', borderB));
    return {
      props: rest,
      className
    };
  };
  const ringPropNames = ['ring', 'ringColor'];
  const ringProps = props => {
    const {
      ring,
      ringColor,
      ringOpacity
    } = props,
          rest = tslib.__rest(props, ["ring", "ringColor", "ringOpacity"]);

    return {
      props: rest,
      className: cn(computePseudoClasses('ring', ring), computePseudoClasses('ring', ringColor), computePseudoClasses('ring-opacity', ringOpacity))
    };
  };

  const colorPropNames = ['bg', 'color' // 'placeholderColor' // not a standard box prop, this always goes on the input
  ];
  const colorProps = props => {
    const {
      color,
      bg,
      placeholderColor
    } = props,
          rest = tslib.__rest(props, ["color", "bg", "placeholderColor"]);

    return {
      props: rest,
      className: cn(computePseudoClasses('bg', bg), computePseudoClasses('text', color), computePseudoClasses('placeholder', placeholderColor))
    };
  };

  const flexPropNames = ['flex', 'flexDirection', 'flexWrap', 'flexGrow', 'flexShrink', 'justifyContent', 'justifyItems', 'justifySelf', 'alignContent', 'alignItems', 'alignSelf'];
  const flexProps = props => {
    const {
      flex,
      flexDirection,
      flexWrap,
      flexGrow,
      flexShrink,
      justifyContent,
      justifyItems,
      justifySelf,
      alignContent,
      alignItems,
      alignSelf
    } = props,
          rest = tslib.__rest(props, ["flex", "flexDirection", "flexWrap", "flexGrow", "flexShrink", "justifyContent", "justifyItems", "justifySelf", "alignContent", "alignItems", "alignSelf"]);

    const className = cn({
      [`sl-flex-${flex}`]: flex !== void 0,
      [`sl-flex-${flexDirection}`]: flexDirection !== void 0,
      [`sl-flex-${flexWrap === true ? 'wrap' : flexWrap}`]: flexWrap !== void 0,
      [`sl-flex-grow${flexGrow === true ? '' : '-0'}`]: flexGrow !== void 0,
      [`sl-flex-shrink${flexShrink === true ? '' : '-0'}`]: flexShrink !== void 0,
      [`sl-justify-${justifyContent}`]: justifyContent !== void 0,
      [`sl-justify-items-${justifyItems}`]: justifyItems !== void 0,
      [`sl-justify-self-${justifySelf}`]: justifySelf !== void 0,
      [`sl-content-${alignContent}`]: alignContent !== void 0,
      [`sl-items-${alignItems}`]: alignItems !== void 0,
      [`sl-self-${alignSelf}`]: alignSelf !== void 0
    });
    return {
      props: rest,
      className
    };
  };

  const interactivityPropNames = ['cursor', 'opacity', 'pointerEvents', 'resize', 'userSelect', 'visibility'];
  const interactivityProps = props => {
    const {
      cursor,
      userSelect,
      pointerEvents,
      opacity,
      resize,
      visibility
    } = props,
          rest = tslib.__rest(props, ["cursor", "userSelect", "pointerEvents", "opacity", "resize", "visibility"]);

    const newClassName = cn({
      [`sl-cursor-${cursor}`]: cursor,
      [`sl-select-${userSelect}`]: userSelect,
      [`sl-pointer-events-${pointerEvents}`]: pointerEvents,
      [`sl-resize${resize === true ? '' : '-' + resize}`]: resize
    }, // the visibility value itself is the class, no need to pass name
    computePseudoClasses('', visibility), computePseudoClasses('opacity', opacity));
    return {
      props: rest,
      className: newClassName
    };
  };

  const layoutPropNames = ['display', 'overflowX', 'overflowY', 'objectFit', 'objectPosition'];
  const layoutProps = props => {
    const {
      display,
      overflowX,
      overflowY,
      objectFit,
      objectPosition
    } = props,
          rest = tslib.__rest(props, ["display", "overflowX", "overflowY", "objectFit", "objectPosition"]);

    const className = cn({
      [`sl-${display}`]: display !== void 0,
      [`sl-overflow-x-${overflowX}`]: overflowX,
      [`sl-overflow-y-${overflowY}`]: overflowY,
      [`sl-object-${overflowY}`]: objectFit,
      [`sl-object-${objectPosition}`]: objectPosition
    });
    return {
      props: rest,
      className
    };
  };

  const positionPropNames = ['bottom', 'pin', 'pinX', 'pinY', 'left', 'pos', 'right', 'top', 'zIndex'];
  const positionProps = props => {
    const {
      pos: position,
      pin,
      pinY,
      pinX,
      top,
      left,
      right,
      bottom,
      zIndex
    } = props,
          rest = tslib.__rest(props, ["pos", "pin", "pinY", "pinX", "top", "left", "right", "bottom", "zIndex"]);

    const className = cn({
      [`sl-${position}`]: position,
      [buildClassname('inset', pin === true ? '0' : pin)]: pin !== void 0,
      [buildClassname('inset-y', pinY === true ? '0' : pinY)]: pinY !== void 0,
      [buildClassname('inset-x', pinX === true ? '0' : pinX)]: pinX !== void 0,
      [buildClassname('top', top)]: top !== void 0,
      [buildClassname('left', left)]: left !== void 0,
      [buildClassname('right', right)]: right !== void 0,
      [buildClassname('bottom', bottom)]: bottom !== void 0
    }, computePseudoClasses('z', zIndex));
    return {
      props: rest,
      className
    };
  };

  const shadowPropNames = ['boxShadow'];
  const shadowProps = props => {
    const {
      boxShadow
    } = props,
          rest = tslib.__rest(props, ["boxShadow"]);

    return {
      props: rest,
      className: cn(computePseudoClasses('shadow', boxShadow))
    };
  };

  const sizePropNames = ['h', 'maxH', 'minH', 'maxW', 'minW', 'w'];
  const sizeProps = props => {
    const {
      h,
      maxH,
      minH,
      w,
      maxW,
      minW
    } = props,
          rest = tslib.__rest(props, ["h", "maxH", "minH", "w", "maxW", "minW"]);

    const className = cn({
      [`sl-w-${w}`]: w,
      [`sl-max-w-${maxW}`]: maxW,
      [`sl-min-w-${minW}`]: minW,
      [`sl-h-${h}`]: h,
      [`sl-max-h-${maxH}`]: maxH,
      [`sl-min-h-${minH}`]: minH
    });
    return {
      props: rest,
      className
    };
  };

  const spacingPropNames = ['m', 'mb', 'ml', 'mr', 'mt', 'mx', 'my', 'p', 'pb', 'pl', 'pr', 'pt', 'px', 'py'];
  const marginProps = props => {
    const {
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml
    } = props,
          rest = tslib.__rest(props, ["m", "mx", "my", "mt", "mr", "mb", "ml"]);

    const className = cn({
      [buildClassname('m', m)]: m,
      [buildClassname('mx', mx)]: mx,
      [buildClassname('my', my)]: my,
      [buildClassname('mt', mt)]: mt,
      [buildClassname('mr', mr)]: mr,
      [buildClassname('mb', mb)]: mb,
      [buildClassname('ml', ml)]: ml
    });
    return {
      props: rest,
      className
    };
  };
  const paddingProps = props => {
    const {
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl
    } = props,
          rest = tslib.__rest(props, ["p", "px", "py", "pt", "pr", "pb", "pl"]);

    const className = cn({
      [buildClassname('p', p)]: p,
      [buildClassname('px', px)]: px,
      [buildClassname('py', py)]: py,
      [buildClassname('pt', pt)]: pt,
      [buildClassname('pr', pr)]: pr,
      [buildClassname('pb', pb)]: pb,
      [buildClassname('pl', pl)]: pl
    });
    return {
      props: rest,
      className
    };
  };

  const transformPropNames = ['transform', 'transition', 'transitionDelay', 'transitionDuration', 'translateX', 'translateY'];
  const transformProps = props => {
    const {
      transform,
      transition,
      transitionDelay,
      transitionDuration,
      translateX,
      translateY
    } = props,
          rest = tslib.__rest(props, ["transform", "transition", "transitionDelay", "transitionDuration", "translateX", "translateY"]);

    const className = cn({
      [`sl-transform`]: transform,
      [`sl-transition`]: transition,
      [`sl-delay-${transitionDelay}`]: transitionDelay,
      [`sl-duration-${transitionDuration}`]: transitionDuration
    }, computePseudoClasses('translate-x', translateX), computePseudoClasses('translate-y', translateY));
    return {
      props: rest,
      className
    };
  };

  const typographyPropNames = ['fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'textAlign', 'textDecoration', 'textOverflow', 'textTransform', 'verticalAlign', 'whitespace', 'wordBreak'];
  const typographyProps = props => {
    const {
      fontSize,
      lineHeight,
      letterSpacing,
      fontFamily,
      fontWeight,
      fontStyle,
      textAlign,
      textDecoration,
      textTransform,
      textOverflow,
      verticalAlign,
      whitespace,
      wordBreak
    } = props,
          rest = tslib.__rest(props, ["fontSize", "lineHeight", "letterSpacing", "fontFamily", "fontWeight", "fontStyle", "textAlign", "textDecoration", "textTransform", "textOverflow", "verticalAlign", "whitespace", "wordBreak"]);

    const className = cn({
      [`sl-text-${fontSize}`]: fontSize,
      [`sl-leading-${lineHeight}`]: lineHeight,
      [`sl-tracking-${letterSpacing}`]: letterSpacing,
      [`sl-font-${fontFamily}`]: fontFamily,
      [`sl-font-${fontWeight}`]: fontWeight,
      [`sl-${fontStyle}`]: fontStyle,
      [`sl-text-${textAlign}`]: textAlign,
      [`sl-${textDecoration}`]: textDecoration,
      [`sl-${textTransform}`]: textTransform,
      [`sl-${textOverflow}`]: textOverflow,
      [`sl-align-${verticalAlign}`]: verticalAlign,
      [`sl-whitespace-${whitespace}`]: whitespace,
      [`sl-break-${wordBreak}`]: wordBreak
    });
    return {
      props: rest,
      className
    };
  };

  const defaultElement = 'div';
  const Box = React.forwardRef(function Box(_a, ref) {
    var {
      as,
      className,
      role,
      noFocusRing
    } = _a,
        props = tslib.__rest(_a, ["as", "className", "role", "noFocusRing"]);

    const classNames = []; // custom pipe to just make accumulating the generated classNames, and pulling out props, easier

    const pipe = (...fns) => x => fns.reduce((v, f) => {
      const {
        props,
        className
      } = f(v);
      classNames.push(className);
      return props;
    }, x); // run the props through all the enhancers - what we're left with is the extra props that we're not specifically handling
    // these get passed on to the underlying Element as is


    const restProps = pipe(layoutProps, flexProps, positionProps, sizeProps, typographyProps, marginProps, paddingProps, colorProps, borderProps, ringProps, shadowProps, interactivityProps, transformProps)(props);

    const _className = cn(className, classNames, {
      'sl-group': role === 'group',
      'sl-no-focus-ring': noFocusRing
    });

    const Element = as || defaultElement;
    return React__default.createElement(Element, Object.assign({
      ref: ref
    }, restProps, {
      className: _className || undefined,
      role: role
    }));
  }); // @ts-ignore

  Box.displayName = 'Box'; // @ts-ignore

  Box.defaultProps = {
    as: defaultElement
  };

  const containerSizes = {
    xs: {
      maxWidth: 300,
      p: 3
    },
    sm: {
      maxWidth: 640,
      p: 3
    },
    md: {
      maxWidth: 950,
      p: 3
    },
    lg: {
      maxWidth: 1280,
      p: 5
    },
    xl: {
      maxWidth: 1450,
      p: 5
    },
    full: {
      p: 5
    }
  };
  const Container = React.memo(React.forwardRef(function Container(_a, ref) {
    var {
      size = 'full',
      className,
      style = {}
    } = _a,
        props = tslib.__rest(_a, ["size", "className", "style"]);

    return React__default.createElement(Box, Object.assign({
      ref: ref,
      px: containerSizes[size].p,
      mx: "auto",
      w: "full",
      style: Object.assign({
        maxWidth: containerSizes[size].maxWidth
      }, style),
      className: cn('Container', className)
    }, props));
  }));

  const Article = React.memo(function Article(_a) {
    var {
      className,
      children
    } = _a,
        props = tslib.__rest(_a, ["className", "children"]);

    return React__default.createElement(Container, Object.assign({
      as: "article",
      className: cn('sl-article', className),
      size: "md",
      py: 20
    }, props), children);
  });

  function AspectRatio(_a) {
    var {
      ratio = 4 / 3,
      className,
      children,
      style = {}
    } = _a,
        props = tslib.__rest(_a, ["ratio", "className", "children", "style"]); // enforce single child


    const child = React__default.Children.only(children);
    return React__default.createElement(Box, Object.assign({}, props, {
      pos: "relative",
      className: cn('sl-aspect-ratio', className),
      style: Object.assign(Object.assign({}, style), {
        // @ts-expect-error react css typings intentionally don't include index type, this is expected
        '--ratio': ratio
      })
    }), child);
  }

  const defaultElement$1 = 'div';
  const Flex = React.memo(React.forwardRef((_a, ref) => {
    var {
      align,
      justify,
      wrap,
      direction,
      grow,
      shrink,
      inline
    } = _a,
        restProps = tslib.__rest(_a, ["align", "justify", "wrap", "direction", "grow", "shrink", "inline"]);

    const remapped = {
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexDirection: direction,
      flexGrow: grow,
      flexShrink: shrink
    };
    return React__default.createElement(Box, Object.assign({
      as: defaultElement$1
    }, remapped, restProps, {
      ref: ref,
      display: inline ? 'inline-flex' : 'flex'
    }));
  }));

  const useIconStore = create(set => ({
    defaultStyle: 'fas',
    setDefaultStyle: style => set(state => Object.assign(Object.assign({}, state), {
      defaultStyle: style
    }))
  }));
  const _className = 'sl-icon';
  let addedToLibrary = false;

  const initLibrary = () => {
    fontawesomeSvgCore.library.add(freeSolidSvgIcons.faCaretDown, freeSolidSvgIcons.faCaretLeft, freeSolidSvgIcons.faCaretRight, freeSolidSvgIcons.faCaretUp, freeSolidSvgIcons.faCheck, freeSolidSvgIcons.faChevronDown, freeSolidSvgIcons.faChevronLeft, freeSolidSvgIcons.faChevronRight, freeSolidSvgIcons.faChevronUp, freeSolidSvgIcons.faCopy, freeSolidSvgIcons.faExclamationCircle, freeSolidSvgIcons.faExclamationTriangle, freeSolidSvgIcons.faExpandArrowsAlt, freeSolidSvgIcons.faExternalLinkAlt, freeSolidSvgIcons.faInfoCircle, freeSolidSvgIcons.faLink, freeSolidSvgIcons.faSort);
    addedToLibrary = true;
  };

  const Icon = React.memo(function Icon(_a) {
    var {
      className,
      icon
    } = _a,
        props = tslib.__rest(_a, ["className", "icon"]);

    const style = useIconStore(state => state.defaultStyle);
    const iconProp = normalizeIconArgs(icon, style);
    /**
     * So that if Icon is imported, the library stuff is not tree-shaken out. If `library.add` was hoisted out of this
     * function then it would be shaken out at consumer build time.
     */

    if (!addedToLibrary) initLibrary();

    if (isIconDefinition(iconProp) || fontawesomeSvgCore.findIconDefinition(iconProp)) {
      return React__default.createElement(reactFontawesome.FontAwesomeIcon, Object.assign({
        className: cn(_className, className),
        icon: iconProp
      }, props));
    } // if the icon is not bundled with the mosaic core (via library in Icon/index.ts), then render fallback <i> in
    // case font awesome kit or css is loaded on page


    return React__default.createElement("i", {
      role: "img",
      "aria-hidden": "true",
      className: cn(_className, className, iconProp.prefix, `fa-${iconProp.iconName}`, {
        'fa-spin': props.spin,
        'fa-pulse': props.pulse,
        'fa-fw': props.fixedWidth,
        [`fa-${props.size}`]: props.size
      }),
      style: props.style
    });
  });
  function isIconDefinition(prop) {
    if (prop && typeof prop === 'object' && prop.hasOwnProperty('icon')) return true;
    return false;
  }
  function isIconProp(prop) {
    if (prop && typeof prop === 'string' || Array.isArray(prop)) return true;
    if (prop && typeof prop === 'object' && prop.hasOwnProperty('iconName')) return true;
    return false;
  } // Adapted from https://github.com/FortAwesome/react-fontawesome/blob/master/src/utils/normalize-icon-args.js
  // Adds defaultPrefix and adjusts to fix some typings issues

  function normalizeIconArgs(icon, defaultPrefix = 'fas') {
    // if the icon is null, there's nothing to do
    if (icon === null) {
      return null;
    }

    if (Array.isArray(icon)) {
      // use the first item as prefix, second as icon name
      return {
        prefix: icon[0],
        iconName: icon[1]
      };
    } // if the icon is an object and has a prefix and an icon name, return it


    if (typeof icon === 'object' && icon.iconName) {
      return icon;
    } // if it's a string, use it as the icon name


    if (typeof icon === 'string') {
      return {
        prefix: defaultPrefix,
        iconName: icon
      };
    }
  }

  const defaultElement$2 = 'span';
  const Text = React.memo(React.forwardRef((_a, ref) => {
    var {
      size
    } = _a,
        restProps = tslib.__rest(_a, ["size"]);

    return React__default.createElement(Box, Object.assign({
      as: defaultElement$2,
      ref: ref,
      fontSize: size
    }, restProps));
  }));

  const sizes = {
    lg: ['md', 8],
    md: ['sm', 6],
    sm: ['xs', 5]
  };
  const Avatar = React.memo(React.forwardRef(function Avatar(props, ref) {
    // TODO: the union types make spreading out rest and passing through to box difficult, since we can't
    // easily pull out letter, blank, etc. they're getting sent to box right now...
    // @ts-expect-error
    let {
      className,
      size = 'md',
      bg,
      icon,
      letter,
      blank
    } = props,
        rest = tslib.__rest(props, ["className", "size", "bg", "icon", "letter", "blank"]);

    let extraProps = {};

    if (bg) {
      extraProps.style = {
        color: 'white',
        backgroundColor: bg
      };
    }

    let innerElem;

    if (icon) {
      innerElem = React__default.createElement(Icon, {
        icon: icon
      });
    } else if (letter) {
      innerElem = React__default.createElement(Text, null, letter);
    }

    return React__default.createElement(Flex, Object.assign({
      ref: ref,
      className: cn('sl-avatar', className),
      align: "center",
      justify: "center",
      h: sizes[size][0],
      w: sizes[size][1],
      rounded: "full"
    }, rest, extraProps), innerElem);
  }));

  // Number assertions
  function isNumber(value) {
    return typeof value === 'number';
  }
  const isNotNumber = value => typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value);
  function isNumeric(value) {
    return value != null && value - parseFloat(value) + 1 >= 0;
  } // Array assertions

  function isArray(value) {
    return Array.isArray(value);
  }
  const isEmptyArray = value => isArray(value) && value.length === 0; // Function assertions

  function isFunction(value) {
    return typeof value === 'function';
  } // Generic assertions

  const isDefined = value => typeof value !== 'undefined' && value !== undefined;
  const isUndefined = value => typeof value === 'undefined' || value === undefined; // Object assertions

  const isObject = value => {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function') && !isArray(value);
  };
  const isEmptyObject = value => isObject(value) && Object.keys(value).length === 0;
  function isNotEmptyObject(value) {
    return value && !isEmptyObject(value);
  }
  const isNull = value => value == null; // String assertions

  function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  } // Event assertions

  function isInputEvent(value) {
    return value && isObject(value) && isObject(value.target);
  } // Empty assertions

  const isEmpty = value => {
    if (isArray(value)) return isEmptyArray(value);
    if (isObject(value)) return isEmptyObject(value);
    if (value == null || value === '') return true;
    return false;
  }; // eslint-disable-next-line @typescript-eslint/naming-convention

  const __DEV__ = process.env.NODE_ENV !== 'production';

  const accumulateCollectionKeysByProp = (targetProp, targetValue) => {
    let keysHash = '[]';
    let keys = [];

    const accumulate = (nodes, newKeys) => {
      for (const node of nodes) {
        if (node.props && node.props[targetProp] === targetValue) {
          newKeys.push(node.key);
        }

        if (node.hasChildNodes) {
          accumulate(node.childNodes, newKeys);
        }
      }
    };

    const accumulator = nodes => {
      let newKeys = [];
      accumulate(nodes, newKeys);
      let newKeysHash = JSON.stringify(newKeys);

      if (keysHash !== newKeysHash) {
        keysHash = newKeysHash;
        keys = newKeys;
      }

      return keys;
    };

    return accumulator;
  };

  const getContrastColor = (bgLuminance, fgLuminance, targetContrast, hue, saturation = 1, lightness = 50) => {
    let targetLuminance;

    if (fgLuminance < bgLuminance) {
      targetLuminance = (bgLuminance + 0.05) / targetContrast - 0.05;
    } else {
      targetLuminance = targetContrast * (bgLuminance + 0.05) - 0.05;
    }

    return setLuminance(targetLuminance, stringifyHsl({
      h: hue,
      s: saturation,
      l: lightness
    }));
  };
  const parseHsl = hsl => {
    const hslRegexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
    const hslaRegexp = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g;
    let parts = hslRegexp.exec(hsl);

    if (!parts) {
      parts = hslaRegexp.exec(hsl);
    }

    if (!parts) {
      try {
        const hslParts = polished.parseToHsl(hsl);
        return {
          h: Math.round(hslParts.hue),
          s: parseFloat((hslParts.saturation * 100).toFixed(0)),
          l: Math.max(1, Math.min(99, Math.round(hslParts.lightness * 100))),
          // @ts-expect-error
          a: hslParts.alpha !== void 0 ? hslParts.alpha : 1
        };
      } catch (e) {
        console.warn(e);
        return {
          h: 0,
          s: 0,
          l: 100,
          a: 1
        };
      }
    }

    return {
      h: parseInt(parts[1]),
      s: parseFloat(parts[2]),
      l: parseFloat(parts[3])
    };
  };
  const stringifyHsl = hsl => {
    if (hsl.a !== void 0) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
    } else {
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
  };
  const EPS = 1e-7;

  const setLuminance = (amount, color) => {
    // @ts-expect-error
    const {
      alpha = 1
    } = polished.parseToRgb(color);
    let rgb;

    if (amount === 0) {
      rgb = polished.rgba(0, 0, 0, alpha);
    } else if (amount === 1) {
      rgb = polished.rgba(255, 255, 255, alpha);
    } else {
      let maxIteration = 20;

      const test = (color1, color2) => {
        const mixed = polished.mix(0.5, color1, color2);
        const mixedLuminance = polished.getLuminance(mixed);

        if (Math.abs(amount - mixedLuminance) < EPS || !maxIteration--) {
          return mixed;
        }

        if (mixedLuminance > amount) {
          return test(color1, mixed);
        }

        return test(mixed, color2);
      };

      rgb = polished.getLuminance(color) > amount ? test('#000', color) : test(color, '#fff');
    }

    return rgb;
  };

  const isServer = typeof document === 'undefined';
  const findCss = id => {
    if (isServer) return;
    return document.head.querySelector('#' + id);
  };
  const appendCss = (id, css) => {
    if (isServer) return; // only inject once

    if (!findCss(id)) {
      const node = document.createElement('style');
      node.textContent = css;
      node.type = 'text/css';
      node.id = id;
      document.head.appendChild(node);
    }
  };
  const replaceCss = (id, css) => {
    if (isServer) return;
    let node = findCss(id);

    if (!node) {
      node = document.createElement('style');
      node.type = 'text/css';
      node.id = id;
      node.textContent = css;
      document.head.appendChild(node);
    } else {
      node.textContent = css;
    }
  };

  function runIfFn(valueOrFn, ...args) {
    return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
  }
  function once(fn) {
    let result;
    return function func(...args) {
      if (fn) {
        result = fn.apply(this, args); // eslint-disable-next-line no-param-reassign

        fn = null;
      }

      return result;
    };
  }
  const noop = () => {};
  const warn = once(options => {
    const {
      condition,
      message
    } = options;

    if (condition && __DEV__) {
      console.warn(message);
    }
  });
  const error = once(options => {
    const {
      condition,
      message
    } = options;

    if (condition && __DEV__) {
      console.error(message);
    }
  });

  const propNames = ['as', ...borderPropNames, ...colorPropNames, ...flexPropNames, ...interactivityPropNames, ...layoutPropNames, ...positionPropNames, ...shadowPropNames, ...sizePropNames, ...spacingPropNames, ...typographyPropNames, ...transformPropNames];
  /**
   * Convenience method to split the Box props.
   *
   * Useful for when you want to pass all of the Box props to the root Box and
   * pass the remaining props to a child element (e.g: disabled, readOnly, required, etc).
   */

  function splitBoxProps(props) {
    return splitProps(props, propNames);
  }
  /**
   * Utility to split props based on an array of keys
   */

  function splitProps(props, keys) {
    const matchedProps = {};
    const remainingProps = {};
    const propKeys = Object.keys(props);

    for (let i = 0; i < propKeys.length; i++) {
      const propKey = propKeys[i];
      const propValue = props[propKey];

      if (keys.includes(propKey)) {
        matchedProps[propKey] = propValue;
      } else {
        remainingProps[propKey] = propValue;
      }
    }

    return {
      matchedProps,
      remainingProps
    };
  }

  const defaultTheme = {
    colors: {
      background: 'hsl(218, 40%, 100%)',
      // text: 'hsl(214, 15%, 9%)', // defaults to compute based on background
      primary: 'hsl(211, 100%, 61%)',
      success: 'hsl(160, 84%, 34%)',
      warning: 'hsl(20, 90%, 56%)',
      danger: 'hsl(0, 84%, 63%)'
    }
  };
  const getCssVariable = (name, element) => {
    if (typeof document === void 0) return null;
    return getComputedStyle(element || document.body).getPropertyValue(name);
  }; // so that lines don't wrap so much, hard to read

  const r = Math.round;
  const prefersDarkMode = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  /**
   * Handles figuring out what 'system' mode resolves to if user has that picked. Always returns light | dark.
   */

  const getResolvedThemeMode = userMode => {
    if (userMode === 'system') {
      return prefersDarkMode() ? 'dark' : 'light';
    }

    return userMode;
  };
  const computeTheme = (customTheme, $mode = 'system') => {
    const mode = getResolvedThemeMode($mode);
    const theme = deepmerge(defaultTheme, customTheme); // when the user has a preference for dark screen, reduce the saturation and lightness

    const mult = {
      s: mode === 'dark' ? 0.8 : 1,
      l: mode === 'dark' ? 0.65 : 1
    };
    const backgroundHsl = parseHsl(theme.colors.background);

    if (mode === 'dark' && backgroundHsl.l > 20) {
      backgroundHsl.s = r(Math.min(60, backgroundHsl.s * 0.85));
      backgroundHsl.l = 10;
    } // main colors


    const cv = {
      light: backgroundHsl.l >= 50,
      background: backgroundHsl,
      text: theme.colors.text ? parseHsl(theme.colors.text) : parseHsl(polished.readableColor(stringifyHsl(backgroundHsl), stringifyHsl({
        h: backgroundHsl.h,
        s: backgroundHsl.s,
        l: Math.max(95, backgroundHsl.l)
      }), stringifyHsl({
        h: backgroundHsl.h,
        s: backgroundHsl.s,
        l: Math.min(5, backgroundHsl.l)
      }), true)),
      primary: parseHsl(theme.colors.primary),
      success: parseHsl(theme.colors.success),
      warning: parseHsl(theme.colors.warning),
      danger: parseHsl(theme.colors.danger)
    };
    /**
     * Inverted colors
     */

    const invertedBackgroundHsl = invertColorValue(cv.background, cv.light);
    /**
     * If user is asking for dark mode, then regular background will always be dark, and we make inverted background
     * just a little lighter than regular background, to raise it (opposite of how "raise" works on light backgrounds, where you darken to give a raise effect)
     */

    if (mode === 'dark') {
      invertedBackgroundHsl.l = cv.background.l + 5;
    }
    /** Is the inverted bg a light color? */


    const icvLight = invertedBackgroundHsl.l >= 50;
    const icv = {
      light: icvLight,
      background: invertedBackgroundHsl,
      text: {
        h: cv.text.h,
        s: r(cv.text.s / 2),
        l: icvLight ? 5 : Math.max(98, cv.text.l)
      },
      primary: invertColorValue(cv.primary, icvLight),
      success: invertColorValue(cv.success, icvLight),
      warning: invertColorValue(cv.warning, icvLight),
      danger: invertColorValue(cv.danger, icvLight)
    };

    if (cv.background.s > 50) {
      // help w contrast by lowering the saturation and lightness if the background is highly saturated
      mult.s = mult.s * 0.8;
      mult.l = mult.l * 0.7;
    }

    return {
      mult,
      colorValues: cv,
      invertedColorValues: icv,
      css: `${mode === 'light' ? ':root,' : ''}
  [data-theme="${mode}"],
  [data-theme="${mode}"] .sl-inverted .sl-inverted,
  [data-theme="${mode}"] .sl-inverted .sl-inverted .sl-inverted .sl-inverted {
    color: var(--color-text);

    ${cssVariablesToStyles(computeCssVariables(cv, {
      s: 1,
      l: 1
    }))}
}

  ${mode === 'light' ? ':root .sl-inverted,' : ''}
  [data-theme="${mode}"] .sl-inverted,
  [data-theme="${mode}"] .sl-inverted .sl-inverted .sl-inverted {
    color: var(--color-text);

    ${cssVariablesToStyles(computeCssVariables(icv, Object.assign(Object.assign({}, mult), {
      // lower saturation a bit more in inverted
      s: Math.min(mult.s, 0.9)
    })))}
}`
    };
  };

  const invertColorValue = (cv, isBgLight) => {
    return {
      h: cv.h,
      s: isBgLight ? r(cv.s * 0.7) : cv.s,
      // inverted bg is lighter based on how light regular bg is, w lightness of at least 10
      // l: isBgLight ? r(Math.max(10, 10 * ((cv.l * mult.l) / 100))) : r(100 - cv.l * 0.75),
      // inverted bg is darker if regular db is light, or darker otherwise
      l: isBgLight ? r(Math.max(15, Math.min(30, 100 - cv.l))) : r(100 - cv.l * 0.75)
    };
  };

  const cssVariablesToStyles = vars => {
    let styles = '';

    for (const k in vars) {
      styles += `    --${k}: ${vars[k]};\n`;
    }

    return styles;
  };

  const computeCssVariables = (cv, mult) => {
    const bgLuminance = polished.getLuminance(stringifyHsl(cv.background));
    const textLuminance = polished.getLuminance(stringifyHsl(cv.text));
    const textColor = getContrastColor(bgLuminance, textLuminance, 15, cv.text.h, cv.text.s, cv.text.l);
    cv.text = parseHsl(textColor); // if we're rendering light text, then we should also use brightened canvas + borders rather than darkened

    const brightenCanvas = cv.text.l > 50;
    const brightenBorder = brightenCanvas;
    const canvasHsl = {
      // pure is the darkest or lightest possible canvas color
      pure: {
        h: cv.background.h,
        s: cv.background.s,
        l: brightenCanvas ? Math.max(cv.background.l - 3, 3) : Math.min(cv.background.l + 10, 100)
      },
      50: {
        h: cv.background.h,
        s: cv.background.s,
        l: r(cv.background.l * 0.99)
      },
      100: {
        h: cv.background.h,
        s: r(cv.background.s * 0.75),
        l: r(cv.background.l * 0.96)
      },
      200: {
        h: cv.background.h,
        s: r(cv.background.s * 0.9),
        l: r(cv.background.l * 0.92)
      },
      300: {
        h: cv.background.h,
        s: r(cv.background.s * 0.94),
        l: r(cv.background.l * 0.89)
      },
      400: {
        h: cv.background.h,
        s: r(cv.background.s * 0.96),
        l: r(cv.background.l * 0.86)
      },
      500: {
        h: cv.background.h,
        s: r(cv.background.s),
        l: r(cv.background.l * 0.82)
      },
      dialog: {
        h: cv.background.h,
        s: cv.background.s,
        l: brightenCanvas ? Math.max(cv.background.l - 3, 3) : Math.min(cv.background.l + 10, 100)
      }
    };

    if (brightenCanvas) {
      // the darker the canvas is, the less we need to brighten things
      const brightenMult = 5 / (10 - Math.ceil(bgLuminance * 10));
      canvasHsl[50].l = r(cv.background.l + 40 * brightenMult);
      canvasHsl[100].l = r(cv.background.l + 25 * brightenMult);
      canvasHsl[200].l = r(cv.background.l + 15 * brightenMult);
      canvasHsl[300].l = r(cv.background.l + 8 * brightenMult);
      canvasHsl[400].l = r(cv.background.l + 6 * brightenMult);
      canvasHsl[500].l = r(cv.background.l + 4 * brightenMult); // on dark canvas, brighten dialog

      canvasHsl.dialog = canvasHsl[100];
    }

    let shadows = {
      sm: '0px 0px 1px rgba(67, 90, 111, 0.3)',
      md: '0px 2px 4px -2px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(67, 90, 111, 0.3)',
      lg: '0 5px 14px -3px rgba(67, 90, 111, .3), 0 0 0 0.5px rgba(0,0,0,.2)',
      xl: '0px 0px 1px rgba(67, 90, 111, 0.3), 0px 8px 10px -4px rgba(67, 90, 111, 0.45)',
      '2xl': '0px 0px 1px rgba(67, 90, 111, 0.3), 0px 16px 24px -8px rgba(67, 90, 111, 0.45)'
    };

    if (brightenCanvas) {
      // darker shadows on dark canvas
      shadows = {
        sm: '0px 0px 1px rgba(11, 13, 19, 0.5)',
        md: '0px 2px 4px -2px rgba(0, 0, 0, 0.35), 0px 0px 1px rgba(11, 13, 19, 0.4)',
        lg: '0 2px 14px rgba(0,0,0,.55), 0 0 0 0.5px rgba(255,255,255,.3)',
        xl: '0px 0px 1px rgba(11, 13, 19, 0.4), 0px 8px 10px -4px rgba(11, 13, 19, 0.55)',
        '2xl': '0px 0px 1px rgba(11, 13, 19, 0.4), 0px 16px 24px -8px rgba(11, 13, 19, 0.55)'
      };
    }

    return {
      'text-h': cv.text.h,
      'text-s': `${cv.text.s}%`,
      'text-l': `${cv.text.l}%`,
      'shadow-sm': shadows.sm,
      'shadow-md': shadows.md,
      'shadow-lg': shadows.lg,
      'shadow-xl': shadows.xl,
      'shadow-2xl': shadows['2xl'],
      'color-text-heading': `hsla(var(--text-h), var(--text-s), max(3, calc(var(--text-l) - 10)), 1)`,
      'color-text': `hsla(var(--text-h), var(--text-s), var(--text-l), 1)`,
      'color-text-paragraph': `hsla(var(--text-h), var(--text-s), var(--text-l), 0.9)`,
      'color-text-muted': `hsla(var(--text-h), var(--text-s), var(--text-l), 0.7)`,
      'color-text-light': `hsla(var(--text-h), var(--text-s), var(--text-l), 0.55)`,
      'canvas-h': `${cv.background.h}`,
      'canvas-s': `${cv.background.s}%`,
      'canvas-l': `${cv.background.l}%`,
      'color-canvas': `hsla(var(--canvas-h), var(--canvas-s), var(--canvas-l), 1)`,
      'color-canvas-pure': `hsla(${canvasHsl['pure'].h}, ${canvasHsl['pure'].s}%, ${r(canvasHsl['pure'].l)}%, 1)`,
      'color-canvas-tint': `hsla(${canvasHsl[50].h}, ${canvasHsl[50].s}%, ${r(canvasHsl[50].l * mult.l)}%, 0.15)`,
      'color-canvas-50': `hsla(${canvasHsl[50].h}, ${canvasHsl[50].s}%, ${r(canvasHsl[50].l * mult.l)}%, 1)`,
      'color-canvas-100': `hsla(${canvasHsl[100].h}, ${canvasHsl[100].s}%, ${r(canvasHsl[100].l * mult.l)}%, 1)`,
      'color-canvas-200': `hsla(${canvasHsl[200].h}, ${canvasHsl[200].s}%, ${r(canvasHsl[200].l * mult.l)}%, 1)`,
      'color-canvas-300': `hsla(${canvasHsl[300].h}, ${canvasHsl[300].s}%, ${r(canvasHsl[300].l * mult.l)}%, 1)`,
      'color-canvas-400': `hsla(${canvasHsl[400].h}, ${canvasHsl[400].s}%, ${r(canvasHsl[400].l * mult.l)}%, 1)`,
      'color-canvas-500': `hsla(${canvasHsl[500].h}, ${canvasHsl[500].s}%, ${r(canvasHsl[500].l * mult.l)}%, 1)`,
      'color-canvas-dialog': `hsla(${canvasHsl.dialog.h}, ${canvasHsl.dialog.s}%, ${r(canvasHsl.dialog.l * mult.l)}%, 1)`,
      'color-border-dark': `hsla(var(--canvas-h), ${r(cv.background.s * 0.75)}%, ${cv.background.l + (brightenBorder ? 13 : -28)}%, 0.5)`,
      'color-border': `hsla(var(--canvas-h), ${r(cv.background.s * 0.8)}%, ${cv.background.l + (brightenBorder ? 18 : -22)}%, 0.5)`,
      'color-border-light': `hsla(var(--canvas-h), ${r(cv.background.s * 0.6)}%, ${cv.background.l + (brightenBorder ? 24 : -16)}%, 0.5)`,
      'color-border-input': `hsla(var(--canvas-h), ${r(cv.background.s * 0.6)}%, ${cv.background.l + (brightenBorder ? 20 : -28)}%, 0.8)`,
      'color-border-button': `hsla(var(--canvas-h), ${r(cv.background.s * 0.6)}%, ${brightenBorder ? 85 : 20}%, 0.8)`,
      'primary-h': `${cv.primary.h}`,
      'primary-s': `${cv.primary.s}%`,
      'primary-l': `${cv.primary.l}%`,
      'color-text-primary': `hsla(${cv.primary.h}, ${r(cv.primary.s * mult.s)}%, ${brightenBorder ? 60 : 40}%, 1)`,
      'color-primary-dark': `hsla(${cv.primary.h}, ${r(cv.primary.s * 0.8 * mult.s)}%, ${r(cv.primary.l * 0.85 * mult.l)}%, 1)`,
      'color-primary-darker': `hsla(${cv.primary.h}, ${r(cv.primary.s * 0.8 * mult.s)}%, ${r(cv.primary.l * 0.65 * mult.l)}%, 1)`,
      'color-primary': `hsla(${cv.primary.h}, ${r(cv.primary.s * mult.s)}%, ${r(cv.primary.l * mult.l)}%, 1)`,
      'color-primary-light': `hsla(${cv.primary.h}, ${r(cv.primary.s * mult.s)}%, ${r(cv.primary.l * 1.2 * mult.l)}%, 1)`,
      'color-primary-tint': `hsla(${cv.primary.h}, ${r(cv.primary.s * mult.s)}%, ${r(65 * mult.l)}%, 0.25)`,
      'color-on-primary': `hsla(${cv.primary.h}, ${cv.primary.s}%, 100%, 1)`,
      'success-h': `${cv.success.h}`,
      'success-s': `${cv.success.s}%`,
      'success-l': `${cv.success.l}%`,
      'color-text-success': `hsla(${cv.success.h}, ${r(cv.success.s * mult.s)}%, ${brightenBorder ? 60 : 40}%, 1)`,
      'color-success-dark': `hsla(${cv.success.h}, ${r(cv.success.s * 0.8 * mult.s)}%, ${r(cv.success.l * 0.85 * mult.l)}%, 1)`,
      'color-success-darker': `hsla(${cv.success.h}, ${r(cv.success.s * 0.8 * mult.s)}%, ${r(cv.success.l * 0.65 * mult.l)}%, 1)`,
      'color-success': `hsla(${cv.success.h}, ${r(cv.success.s * mult.s)}%, ${r(cv.success.l * mult.l)}%, 1)`,
      'color-success-light': `hsla(${cv.success.h}, ${r(cv.success.s * mult.s)}%, ${r(cv.success.l * 1.2 * mult.l)}%, 1)`,
      'color-success-tint': `hsla(${cv.success.h}, ${r(cv.success.s * mult.s)}%, ${r(65 * mult.l)}%, 0.25)`,
      'color-on-success': `hsla(${cv.success.h}, ${cv.success.s}%, 100%, 1)`,
      'warning-h': `${cv.warning.h}`,
      'warning-s': `${cv.warning.s}%`,
      'warning-l': `${cv.warning.l}%`,
      'color-text-warning': `hsla(${cv.warning.h}, ${r(cv.warning.s * mult.s)}%, ${brightenBorder ? 60 : 40}%, 1)`,
      'color-warning-dark': `hsla(${cv.warning.h}, ${r(cv.warning.s * 0.8 * mult.s)}%, ${r(cv.warning.l * 0.85 * mult.l)}%, 1)`,
      'color-warning-darker': `hsla(${cv.warning.h}, ${r(cv.warning.s * 0.8 * mult.s)}%, ${r(cv.warning.l * 0.65 * mult.l)}%, 1)`,
      'color-warning': `hsla(${cv.warning.h}, ${r(cv.warning.s * mult.s)}%, ${r(cv.warning.l * mult.l)}%, 1)`,
      'color-warning-light': `hsla(${cv.warning.h}, ${r(cv.warning.s * mult.s)}%, ${r(cv.warning.l * 1.2 * mult.l)}%, 1)`,
      'color-warning-tint': `hsla(${cv.warning.h}, ${r(cv.warning.s * mult.s)}%, ${r(65 * mult.l)}%, 0.25)`,
      'color-on-warning': `hsla(${cv.warning.h}, ${cv.warning.s}%, 100%, 1)`,
      'danger-h': `${cv.danger.h}`,
      'danger-s': `${cv.danger.s}%`,
      'danger-l': `${cv.danger.l}%`,
      'color-text-danger': `hsla(${cv.danger.h}, ${r(cv.danger.s * mult.s)}%, ${brightenBorder ? 60 : 40}%, 1)`,
      'color-danger-dark': `hsla(${cv.danger.h}, ${r(cv.danger.s * 0.8 * mult.s)}%, ${r(cv.danger.l * 0.85 * mult.l)}%, 1)`,
      'color-danger-darker': `hsla(${cv.danger.h}, ${r(cv.danger.s * 0.8 * mult.s)}%, ${r(cv.danger.l * 0.65 * mult.l)}%, 1)`,
      'color-danger': `hsla(${cv.danger.h}, ${r(cv.danger.s * mult.s)}%, ${r(cv.danger.l * mult.l)}%, 1)`,
      'color-danger-light': `hsla(${cv.danger.h}, ${r(cv.danger.s * mult.s)}%, ${r(cv.danger.l * 1.2 * mult.l)}%, 1)`,
      'color-danger-tint': `hsla(${cv.danger.h}, ${r(cv.danger.s * mult.s)}%, ${r(65 * mult.l)}%, 0.25)`,
      'color-on-danger': `hsla(${cv.danger.h}, ${cv.danger.s}%, 100%, 1)`
    };
  };

  function useDOMRef(ref, skip) {
    let domRef = React.useRef(null);
    React.useImperativeHandle(ref, () => utils.createDOMRef(domRef));
    return domRef;
  }
  const WithDomRef = React.forwardRef(function WithDomRef({
    children
  }, ref) {
    return React__default.cloneElement(children, {
      ref: useDOMRef(ref)
    });
  });
  function useUnwrapDOMRef(ref) {
    return React.useMemo(() => utils.unwrapDOMRef(ref), [ref]);
  }

  const sizes$1 = {
    lg: {
      px: 3,
      py: 2,
      fontSize: 'lg',
      rounded: 'full',
      leftIconMx: -2,
      leftIconMr: 2,
      rightIconMl: 3,
      rightIconMr: -0.5,
      h: 'sm'
    },
    md: {
      px: 2.5,
      py: 1,
      fontSize: 'base',
      rounded: 'full',
      leftIconMx: -1,
      leftIconMr: 1.5,
      rightIconMl: 1.5,
      rightIconMr: -0.5,
      h: 'sm'
    },
    sm: {
      px: 2,
      py: 1,
      h: 'sm',
      fontSize: 'sm',
      rounded: 'full',
      leftIconMx: -1,
      leftIconMr: 1,
      rightIconMl: 0.5,
      rightIconMr: -0.5
    }
  };
  const variants = {
    solid: {
      default: {
        border: 0,
        color: 'on-primary',
        bg: {
          default: 'primary'
        }
      },
      success: {
        borderColor: 'success',
        bg: {
          default: 'success'
        }
      },
      warning: {
        borderColor: 'warning',
        bg: {
          default: 'warning'
        }
      },
      danger: {
        borderColor: 'danger',
        bg: {
          default: 'danger'
        }
      }
    },
    minimal: {
      default: {
        color: {
          default: 'primary'
        },
        bg: {
          default: 'transparent'
        },
        borderColor: 'transparent'
      },
      success: {
        color: 'success'
      },
      warning: {
        color: 'warning'
      },
      danger: {
        color: 'danger'
      }
    },
    outline: {
      default: {
        color: {
          default: 'primary'
        },
        ring: false,
        bg: 'transparent',
        borderColor: {
          default: 'primary'
        }
      },
      success: {
        borderColor: 'success',
        color: 'success'
      },
      warning: {
        borderColor: 'warning',
        color: 'warning'
      },
      danger: {
        borderColor: 'danger',
        color: 'danger'
      }
    }
  };

  const defaultElement$3 = 'span';
  const Badge = React__default.memo(React.forwardRef(function Input(_a, ref) {
    var {
      appearance = 'solid',
      size = 'sm',
      as = defaultElement$3,
      className,
      intent,
      icon,
      iconRight,
      children
    } = _a,
        props = tslib.__rest(_a, ["appearance", "size", "as", "className", "intent", "icon", "iconRight", "children"]);

    const {
      remainingProps
    } = splitBoxProps(props);
    const stateProps = Object.assign(Object.assign({}, variants[appearance].default), variants[appearance][intent]);
    return React__default.createElement(Box, Object.assign({
      ref: ref,
      as: as,
      px: sizes$1[size].px,
      py: sizes$1[size].py,
      fontSize: sizes$1[size].fontSize,
      fontWeight: "bold",
      rounded: sizes$1[size].rounded,
      h: sizes$1[size].h,
      borderColor: "on-primary",
      className: cn('sl-badge', className)
    }, stateProps, remainingProps), icon ? React__default.createElement(ButtonIcon, {
      icon: icon,
      size: size,
      hasContent: !!children
    }) : null, React__default.createElement(Flex, {
      flex: 1,
      justifyItems: "start",
      alignItems: "center"
    }, children), iconRight ? React__default.createElement(ButtonRightIcon, {
      icon: iconRight,
      size: size
    }) : null);
  }));

  const ButtonIcon = ({
    icon,
    size,
    hasContent,
    pulse
  }) => {
    let elem = icon;

    if (isIconProp(icon)) {
      elem = React__default.createElement(Icon, {
        icon: icon,
        size: size === 'sm' ? 'sm' : undefined,
        pulse: pulse,
        fixedWidth: true
      });
    }

    return React__default.createElement(Box, {
      "data-testid": "icon",
      mr: hasContent ? sizes$1[size].leftIconMr : undefined,
      mx: hasContent ? undefined : sizes$1[size].leftIconMx
    }, elem);
  };

  const ButtonRightIcon = ({
    icon,
    size
  }) => {
    let elem = icon;

    if (isIconProp(icon)) {
      elem = React__default.createElement(Icon, {
        icon: icon,
        size: "sm",
        fixedWidth: true
      });
    }

    return React__default.createElement(Box, {
      "data-testid": "iconright",
      ml: sizes$1[size].rightIconMl,
      mr: sizes$1[size].rightIconMr
    }, elem);
  };

  const sizes$2 = {
    md: {
      px: 2.5,
      fontSize: 'base',
      rounded: true,
      leftIconMx: -1,
      leftIconMr: 1.5,
      rightIconMl: 1.5,
      rightIconMr: -0.5
    },
    sm: {
      px: 1.5,
      fontSize: 'base',
      rounded: true,
      leftIconMx: 0,
      leftIconMr: 1,
      rightIconMl: 0.5,
      rightIconMr: -0.5
    }
  };
  const variants$1 = {
    default: {
      default: {
        borderColor: 'button',
        bg: {
          default: 'canvas',
          hover: 'canvas-100',
          active: 'canvas-200'
        },
        opacity: {
          disabled: 50
        }
      },
      success: {
        borderColor: 'success',
        ringColor: 'success'
      },
      warning: {
        borderColor: 'warning',
        ringColor: 'warning'
      },
      danger: {
        borderColor: 'danger',
        ringColor: 'danger'
      }
    },
    minimal: {
      default: {
        color: {
          default: 'muted',
          hover: 'body',
          focus: 'body'
        },
        bg: {
          hover: 'canvas-100',
          active: 'canvas-200'
        },
        borderColor: 'transparent'
      },
      success: {
        color: 'success'
      },
      warning: {
        color: 'warning'
      },
      danger: {
        color: 'danger'
      }
    },
    select: {
      default: {
        fontWeight: 'normal',
        color: {
          default: 'body'
        },
        ring: false,
        bg: 'transparent',
        borderColor: {
          default: 'transparent',
          hover: 'input',
          focus: 'primary'
        }
      },
      success: {
        color: 'success',
        borderColor: {
          default: 'transparent',
          hover: 'success',
          focus: 'success'
        }
      },
      warning: {
        color: 'warning',
        borderColor: {
          default: 'transparent',
          hover: 'warning',
          focus: 'warning'
        }
      },
      danger: {
        color: 'danger',
        borderColor: {
          default: 'transparent',
          hover: 'danger',
          focus: 'danger'
        }
      }
    },
    primary: {
      default: {
        color: 'on-primary',
        bg: {
          default: 'primary',
          hover: 'primary-dark',
          active: 'primary-darker'
        },
        borderColor: 'transparent'
      },
      success: {
        color: 'on-success',
        bg: {
          default: 'success',
          hover: 'success-dark',
          active: 'success-darker'
        }
      },
      warning: {
        color: 'on-warning',
        bg: {
          default: 'warning',
          hover: 'warning-dark',
          active: 'warning-darker'
        }
      },
      danger: {
        color: 'on-danger',
        bg: {
          default: 'danger',
          hover: 'danger-dark',
          active: 'danger-darker'
        }
      }
    }
  };

  const defaultElement$4 = 'button';
  const Button = React.memo(React.forwardRef((_a, ref) => {
    var {
      appearance = 'default',
      intent = 'default',
      size = 'md',
      disabled,
      loading,
      className,
      icon,
      iconRight,
      label,
      children,
      active,
      autoFocus,
      onPress,
      onPressChange,
      onPressEnd,
      onPressStart,
      onPressUp
    } = _a,
        props = tslib.__rest(_a, ["appearance", "intent", "size", "disabled", "loading", "className", "icon", "iconRight", "label", "children", "active", "autoFocus", "onPress", "onPressChange", "onPressEnd", "onPressStart", "onPressUp"]);

    const {
      buttonProps
    } = button.useButton(Object.assign({
      isDisabled: disabled,
      onPress,
      onPressChange,
      onPressEnd,
      onPressStart,
      onPressUp
    }, props), ref);
    const {
      hoverProps
    } = interactions.useHover(Object.assign({
      isDisabled: disabled
    }, props));
    const {
      matchedProps,
      remainingProps
    } = splitBoxProps(props);
    const stateProps = Object.assign(Object.assign(Object.assign(Object.assign({}, variants$1.default.default), variants$1.default[intent]), variants$1[appearance].default), variants$1[appearance][intent]);
    /**
     * If active, remove other state effects
     */

    if (active) {
      for (const i in stateProps) {
        const prop = stateProps[i];

        if (prop && typeof prop === 'object') {
          if (prop.hasOwnProperty('active')) {
            stateProps[i] = prop.active;
          } else if (prop.hasOwnProperty('hover')) {
            delete stateProps[i]['hover'];
          }
        }
      }
    }
    /**
     * If in loading or disabled states, remove other ui effects like hover
     */


    if (loading || disabled) {
      for (const i in stateProps) {
        const prop = stateProps[i];

        if (prop && typeof prop === 'object') {
          // remove props immutably
          const _b = stateProps[i],
                newProps = tslib.__rest(_b, ["active", "hover"]);

          stateProps[i] = newProps;
        }
      }
    }

    const _c = utils$1.mergeProps(matchedProps, buttonProps, hoverProps),
          propsWithoutColor = tslib.__rest(_c, ["color"]);

    return React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring",
      autoFocus: autoFocus
    }, React__default.createElement(Box, Object.assign({
      as: defaultElement$4,
      px: sizes$2[size].px,
      fontSize: sizes$2[size].fontSize,
      fontWeight: "medium",
      rounded: sizes$2[size].rounded,
      h: size,
      borderColor: "button",
      className: cn('sl-button', className),
      disabled: loading || disabled,
      cursor: loading ? 'wait' : disabled ? 'not-allowed' : undefined
    }, remainingProps, stateProps, propsWithoutColor, {
      ref: ref
    }), loading ? React__default.createElement(ButtonIcon$1, {
      icon: "spinner",
      pulse: true,
      size: size,
      hasContent: !!children
    }) : null, icon && !loading ? React__default.createElement(ButtonIcon$1, {
      icon: icon,
      size: size,
      hasContent: !!children
    }) : null, React__default.createElement(Flex, {
      flex: 1,
      justifyItems: "start",
      alignItems: "center"
    }, children), iconRight ? React__default.createElement(ButtonRightIcon$1, {
      icon: iconRight,
      size: size
    }) : null));
  }));

  const ButtonIcon$1 = ({
    icon,
    size,
    hasContent,
    pulse
  }) => {
    let elem = icon;

    if (isIconProp(icon)) {
      elem = React__default.createElement(Icon, {
        icon: icon,
        size: size === 'sm' ? 'sm' : undefined,
        pulse: pulse,
        fixedWidth: true
      });
    }

    return React__default.createElement(Box, {
      mr: hasContent ? sizes$2[size].leftIconMr : undefined,
      mx: hasContent ? undefined : sizes$2[size].leftIconMx
    }, elem);
  };

  const ButtonRightIcon$1 = ({
    icon,
    size
  }) => {
    let elem = icon;

    if (isIconProp(icon)) {
      elem = React__default.createElement(Icon, {
        icon: icon,
        size: "sm",
        fixedWidth: true
      });
    }

    return React__default.createElement(Box, {
      ml: sizes$2[size].rightIconMl,
      mr: sizes$2[size].rightIconMr
    }, elem);
  };

  function useClipboard(text, timeout = 1500) {
    const [hasCopied, setHasCopied] = React.useState(false);
    const onCopy = React.useCallback(() => {
      const didCopy = copy(text);
      setHasCopied(didCopy);
    }, [text]);
    React.useEffect(() => {
      if (hasCopied) {
        const id = setTimeout(() => {
          setHasCopied(false);
        }, timeout);
        return () => clearTimeout(id);
      }
    }, [timeout, hasCopied]);
    return {
      value: text,
      onCopy,
      hasCopied
    };
  }

  function useCollectionKeyAccumulator(nodes, targetProp, targetValue) {
    const accumulator = React.useRef(accumulateCollectionKeysByProp(targetProp, targetValue));
    return accumulator.current(nodes);
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  function useControllableProp(prop, state) {
    const {
      current: isControlled
    } = React.useRef(prop !== undefined);
    const value = isControlled && typeof prop !== 'undefined' ? prop : state;
    return [isControlled, value];
  }
  const defaultPropsMap = {
    value: 'value',
    defaultValue: 'defaultValue',
    onChange: 'onChange'
  };
  /**
   * React hook for using controlling component state.
   * @param props
   */

  function useControllableState(props) {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      name = 'Component',
      propsMap = defaultPropsMap
    } = props;
    const [valueState, setValue] = React.useState(defaultValue);
    const {
      current: isControlled
    } = React.useRef(valueProp !== undefined); // don't switch from controlled to uncontrolled

    React.useEffect(() => {
      const nextIsControlled = valueProp !== undefined;
      const nextMode = nextIsControlled ? 'a controlled' : 'an uncontrolled';
      const mode = isControlled ? 'a controlled' : 'an uncontrolled';
      warn({
        condition: isControlled !== nextIsControlled,
        message: `Warning: ${name} is changing from ${mode} to ${nextMode} component. ` + `Components should not switch from controlled to uncontrolled (or vice versa). ` + `Use the '${propsMap.value}' with an '${propsMap.onChange}' handler. ` + `If you want an uncontrolled component, remove the ${propsMap.value} prop and use '${propsMap.defaultValue}' instead. "` + `More info: https://fb.me/react-controlled-components`
      });
    }, [valueProp, isControlled, name]);
    const {
      current: initialDefaultValue
    } = React.useRef(defaultValue);
    React.useEffect(() => {
      warn({
        condition: initialDefaultValue !== defaultValue,
        message: `Warning: A component is changing the default value of an uncontrolled ${name} after being initialized. ` + `To suppress this warning opt to use a controlled ${name}.`
      });
    }, [JSON.stringify(defaultValue)]);
    const value = isControlled ? valueProp : valueState;
    const updateValue = React.useCallback(next => {
      const nextValue = runIfFn(next, value);
      if (!isControlled) setValue(nextValue);
      onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
    }, [onChange]);
    return [value, updateValue];
  }

  const THEME_STORAGE_KEY = 'mosaic-theme';
  const DEFAULT_THEME_MODE = 'light';
  /**
   * For SSR
   */

  const memoryDb = {};
  const memoryStorage = {
    getItem: name => memoryDb[name],
    setItem: (name, value) => {
      memoryDb[name] = value;
    }
  };

  const defaultMode = () => {
    if (typeof localStorage === 'undefined') return DEFAULT_THEME_MODE;

    try {
      return JSON.parse(localStorage.getItem(THEME_STORAGE_KEY)).mode;
    } catch (_a) {}

    const dataTheme = document.documentElement.getAttribute('data-theme');
    if (dataTheme) return dataTheme;
    return DEFAULT_THEME_MODE;
  };

  const useThemeStore = create(middleware.persist(set => ({
    mode: defaultMode(),
    theme: {
      colors: {}
    },
    // default is light theme
    colorValues: {
      light: true
    },
    invertedColorValues: {
      light: false
    },
    setMode: mode => {
      const preferDark = prefersDarkMode();

      if (typeof document !== 'undefined') {
        let _mode = mode;

        if (mode === 'system') {
          _mode = preferDark ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-theme', _mode);
      }

      set(state => Object.assign(Object.assign({}, state), {
        mode
      }));
    },
    setColor: (name, val) => set(state => {
      // if would result in no change, return
      if (defaultTheme.colors[name] === val || state.theme.colors[name] === val) return; // allow setting by hex or rgb val

      let hslObj;

      if (typeof val === 'string') {
        const x = polished.parseToHsl(val);
        hslObj = {
          h: Math.round(x.hue),
          s: Math.round(x.saturation * 100),
          l: Math.round(x.lightness * 100)
        };
      } else {
        hslObj = val;
      }

      const hslString = stringifyHsl(hslObj); // if new val equals the default val, delete it so that it's removed from localStorage
      // this way if we update default theme in the future, the user will get the new values

      if (defaultTheme.colors[name] === hslString) {
        delete state.theme.colors[name];
        return;
      }

      return {
        theme: Object.assign(Object.assign({}, state.theme), {
          colors: Object.assign(Object.assign({}, state.theme.colors), {
            [name]: hslString
          })
        })
      };
    }),
    reset: () => set({
      theme: {
        colors: {}
      }
    }),
    setColorValues: cv => set({
      colorValues: cv
    }),
    setInvertedColorValues: cv => set({
      invertedColorValues: cv
    })
  }), {
    name: THEME_STORAGE_KEY,
    getStorage: () => typeof localStorage === 'undefined' ? memoryStorage : localStorage,
    // only remember the desired mode
    serialize: ({
      state
    }) => JSON.stringify({
      mode: state.mode
    })
  }));

  /**
   * Pass a lodash style property path to pluck a specific theme property out. This helps with performance
   * if theme is being updated, since calling component will only re-render when the particular theme value
   * that is subscribed to changes.
   */

  const useTheme = property => {
    const themeValue = useThemeStore(state => _get(deepmerge(defaultTheme, state.theme), property));
    const setColor = useThemeStore(state => state.setColor);
    const reset = useThemeStore(state => state.reset);
    return {
      themeValue,
      setColor,
      reset
    };
  };

  const InvertThemeContext = React__default.createContext({});
  const InvertTheme = ({
    children,
    inverted
  }) => {
    const {
      inverted: parentInverted
    } = React.useContext(InvertThemeContext);
    let _inverted = undefined;

    if (inverted !== false) {
      _inverted = parentInverted !== void 0 ? !parentInverted : true;
    }

    const _className = cn(children.props.className, {
      'sl-inverted': inverted === false ? undefined : true
    });

    return React__default.createElement(InvertThemeContext.Provider, {
      value: {
        inverted: _inverted
      }
    }, React__default.cloneElement(children, {
      className: _className || undefined
    }));
  };

  const useThemeIsDark = () => {
    const {
      inverted
    } = React.useContext(InvertThemeContext);
    const [isLightBg, isLightInvertedBg] = useThemeStore(s => [s.colorValues.light, s.invertedColorValues.light], shallow);

    if (inverted) {
      return !isLightInvertedBg;
    }

    return !isLightBg;
  };

  const useThemeMode = () => {
    const mode = useThemeStore(state => state.mode);
    const setMode = useThemeStore(state => state.setMode);
    return {
      mode,
      setMode
    };
  };

  const CopyButton = React.forwardRef((_a, ref) => {
    var {
      copyValue
    } = _a,
        props = tslib.__rest(_a, ["copyValue"]);

    const {
      hasCopied,
      onCopy
    } = useClipboard(copyValue);
    return React__default.createElement(Button, Object.assign({
      appearance: "minimal",
      size: "sm",
      onPress: onCopy,
      icon: hasCopied ? undefined : 'copy',
      label: "Copy"
    }, props, {
      ref: ref
    }), hasCopied ? 'Copied' : null);
  });

  const FieldButton = React.forwardRef((_a, ref) => {
    var {
      children,
      placeholder,
      onClear
    } = _a,
        props = tslib.__rest(_a, ["children", "placeholder", "onClear"]);

    const showClearButton = !!(onClear && children);
    return React__default.createElement(Box, {
      pos: "relative"
    }, React__default.createElement(Button, Object.assign({
      w: "full",
      iconRight: React__default.createElement(Icon, {
        icon: "chevron-down",
        size: "xs"
      })
    }, props, {
      appearance: "select",
      ref: ref
    }), React__default.createElement(Box, {
      pr: 1,
      color: !children ? 'light' : undefined
    }, children || placeholder || ''), showClearButton && React__default.createElement("div", {
      style: {
        width: props.size === 'sm' ? 22 : 26
      }
    })), showClearButton && React__default.createElement(FieldButtonClear, {
      triggerRef: ref,
      onClear: onClear,
      size: props.size
    }));
  });

  const FieldButtonClear = ({
    triggerRef,
    size,
    onClear
  }) => {
    const {
      pressProps
    } = interactions.usePress({
      onPress: () => {
        var _a;

        onClear(); // move focus back to the field button

        (_a = triggerRef === null || triggerRef === void 0 ? void 0 : triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      }
    });
    return React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring"
    }, React__default.createElement(Flex, Object.assign({
      as: "button"
    }, pressProps, {
      borderR: true,
      borderColor: "input",
      fontSize: "base",
      px: size === 'sm' ? 1.5 : 2,
      alignItems: "center",
      color: {
        hover: 'danger',
        focus: 'danger'
      },
      pos: "absolute",
      cursor: "pointer",
      style: {
        top: '50%',
        right: size === 'sm' ? 18 : 22,
        height: 12,
        marginTop: -6,
        lineHeight: 0
      },
      "aria-label": "Clear selected value"
    }), React__default.createElement(Icon, {
      icon: "times",
      size: "xs"
    })));
  };

  /**
   * Adapted from Material UI - https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/NoSsr/NoSsr.js
   */
  const useEnhancedEffect = typeof window !== 'undefined' && !process.env.TEST_SSR ? React__default.useLayoutEffect : React__default.useEffect;
  /**
   * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
   *
   * This component can be useful in a variety of situations:
   * - Escape hatch for broken dependencies not supporting SSR.
   * - Improve the time-to-first paint on the client by only rendering above the fold.
   * - Reduce the rendering time on the server.
   * - Under too heavy server load, you can turn on service degradation.
   */

  const NoSsr = props => {
    const {
      children,
      defer = false,
      fallback = null
    } = props;
    const [mountedState, setMountedState] = React__default.useState(false);
    useEnhancedEffect(() => {
      if (!defer && !process.env.TEST_SSR) {
        setMountedState(true);
      }
    }, [defer]);
    React__default.useEffect(() => {
      if (defer && !process.env.TEST_SSR) {
        setMountedState(true);
      }
    }, [defer]);
    return React__default.createElement(React__default.Fragment, null, mountedState ? children : fallback);
  };

  const defaultElement$5 = 'a';
  const Link = React.memo(React.forwardRef((_a, ref) => {
    var {
      className
    } = _a,
        restProps = tslib.__rest(_a, ["className"]);

    return React__default.createElement(Box, Object.assign({
      as: defaultElement$5,
      ref: ref,
      className: cn('sl-link', className),
      color: {
        default: 'link',
        hover: 'link-dark'
      }
    }, restProps));
  }));

  const MENU_ITEM_IDENT_WIDTH = '20px';
  const MenuItem = React.forwardRef(function MenuItem(_a, ref) {
    var {
      text,
      indent,
      meta,
      checked,
      onClick,
      children,
      href,
      disabled,
      __active,
      __hasSubmenu,
      icon,
      iconColor
    } = _a,
        props = tslib.__rest(_a, ["text", "indent", "meta", "checked", "onClick", "children", "href", "disabled", "__active", "__hasSubmenu", "icon", "iconColor"]);

    const bg = __active ? 'primary' : undefined;
    const color = __active ? 'on-primary' : 'body';
    const isIdented = indent || typeof checked !== 'undefined' || typeof icon !== 'undefined';
    const elem = React__default.createElement(Flex, Object.assign({
      ref: ref
    }, props, {
      bg: bg,
      color: color,
      px: 3,
      h: "sm",
      alignItems: "center",
      cursor: disabled ? 'default' : 'pointer',
      whitespace: "nowrap",
      fontSize: "base",
      onClick: onClick,
      opacity: disabled ? 50 : undefined
    }), isIdented && React__default.createElement(Box, {
      style: {
        width: MENU_ITEM_IDENT_WIDTH
      },
      flexShrink: 0,
      ml: -1,
      "data-testid": "icon"
    }, (checked || icon) && React__default.createElement(Icon, {
      icon: checked ? 'check' : icon,
      fixedWidth: true,
      size: "sm",
      style: {
        color: __active ? null : iconColor
      }
    })), React__default.createElement(Box, {
      flex: 1,
      pr: 10
    }, text), href ? React__default.createElement(Box, {
      opacity: __active ? undefined : 60
    }, React__default.createElement(Icon, {
      icon: "external-link-alt",
      size: "sm"
    })) : null, (meta || meta === 0) && React__default.createElement(Box, {
      opacity: __active ? undefined : 60
    }, meta), __hasSubmenu && React__default.createElement(Box, null, React__default.createElement(Icon, {
      icon: "caret-right"
    })));

    if (href) {
      return React__default.createElement(Link, {
        href: href,
        target: "_blank"
      }, elem);
    }

    return elem;
  });

  const MenuRadioGroup = React.forwardRef(function MenuRadioGroup(_a, ref) {
    var {
      __menu,
      children,
      value,
      onChange
    } = _a,
        props = tslib.__rest(_a, ["__menu", "children", "value", "onChange"]);

    const items = React__default.Children.toArray(children);
    return React__default.createElement(Box, Object.assign({
      ref: ref
    }, props), items.map((item, i) => {
      if (!React__default.isValidElement(item)) {
        error({
          condition: true,
          message: 'Invalid element provided to MenuRadioGroup children.'
        });
        return null;
      }

      return React__default.createElement(Menu$1.MenuItem, Object.assign({}, __menu, item.props, {
        key: i,
        style: {
          outline: 0
        },
        onClick: () => onChange(item.props.value)
      }), itemProps => {
        return React__default.cloneElement(item, Object.assign(Object.assign({}, itemProps), {
          checked: item.props.value === value,
          __active: itemProps.id === __menu.currentId
        }));
      });
    }));
  });

  const defaultMenuStateProps = {
    modal: true,
    loop: true,
    unstable_offset: [0, 6]
  };
  const Menu = props => {
    return React__default.createElement(NoSsr, null, React__default.createElement($Menu, Object.assign({
      menuStateOpts: defaultMenuStateProps,
      label: "No Label"
    }, props)));
  };
  const $Menu = React.memo(React.forwardRef(function Menu(_a, ref) {
    var {
      trigger,
      children,
      isSubmenu,
      label = 'No label',
      onItemClick,
      menuStateOpts
    } = _a,
        props = tslib.__rest(_a, ["trigger", "children", "isSubmenu", "label", "onItemClick", "menuStateOpts"]);

    const menu = Menu$1.useMenuState(menuStateOpts);
    return React__default.createElement(React__default.Fragment, null, React__default.createElement(Menu$1.MenuButton, Object.assign({
      ref: ref
    }, menu, props), disclosureProps => {
      const {
        onClick: onPress
      } = disclosureProps,
            restDisclosureProps = tslib.__rest(disclosureProps, ["onClick"]);

      const handlerProp = isSubmenu ? {
        onClick: onPress
      } : {
        onPress
      };
      return React__default.cloneElement(trigger, Object.assign(Object.assign(Object.assign({}, restDisclosureProps), handlerProp), {
        __active: isSubmenu ? disclosureProps['aria-disabled'] !== true && (disclosureProps.id === menu.currentId || disclosureProps.tabIndex === 0 || disclosureProps['aria-expanded'] === true) : undefined
      }));
    }), React__default.createElement(MenuContent, {
      menu: menu,
      label: label,
      onItemClick: onItemClick
    }, children));
  }));

  const MenuContent = ({
    menu,
    label,
    children,
    onItemClick
  }) => {
    const isDark = useThemeIsDark();
    let [shouldRender, setShouldRender] = React__default.useState(menu.visible);
    React__default.useEffect(() => {
      setShouldRender(menu.visible);
    }, [menu.visible]);
    /**
     * Performance improvement by not rendering menus until they're opened.
     * Need the extra shoudlRender/useEffect tick for reakit to properly switch focus etc
     *
     * When https://github.com/reakit/reakit/pull/820 is merged we can stop using our @stoplight/reakit fork
     */

    if (!menu.visible && !shouldRender) return null;
    const items = React__default.Children.toArray(children);
    return React__default.createElement(Menu$1.Menu, Object.assign({}, menu, {
      style: {
        outline: 0,
        zIndex: 10
      },
      "aria-label": label,
      preventBodyScroll: false
    }), React__default.createElement(Box, {
      bg: isDark ? 'canvas-dialog' : 'canvas-pure',
      style: {
        minWidth: 200
      },
      py: 2,
      rounded: true,
      boxShadow: "lg"
    }, items.map((item, i) => {
      if (!React__default.isValidElement(item)) {
        error({
          condition: true,
          message: 'Invalid element provided to Menu children.'
        });
        return null;
      }

      if (item.type === MenuItem) {
        const _a = item.props,
              {
          children,
          disabled,
          onClick,
          label
        } = _a,
              restItemProps = tslib.__rest(_a, ["children", "disabled", "onClick", "label"]);

        if (children) {
          const wrappedOnItemClick = () => {
            menu.hide();
            if (onItemClick) onItemClick();
          };

          return React__default.createElement(Menu$1.MenuItem, Object.assign({}, menu, {
            key: i,
            as: $Menu,
            menuStateOpts: {
              loop: true,
              unstable_offset: [-8, 0]
            },
            onClick: onClick,
            trigger: React__default.createElement(MenuItem, Object.assign({}, restItemProps, {
              disabled: disabled,
              __hasSubmenu: true
            })),
            disabled: disabled,
            onItemClick: wrappedOnItemClick,
            isSubmenu: true,
            label: label
          }), children);
        }

        const wrappedOnClick = () => {
          if (typeof restItemProps.checked === 'undefined' && !restItemProps.href) {
            menu.hide();
            if (onItemClick) onItemClick();
          }

          if (onClick) onClick();
        };

        return React__default.createElement(Menu$1.MenuItem, Object.assign({}, menu, restItemProps, {
          key: i,
          style: {
            outline: 0
          },
          disabled: disabled,
          onClick: wrappedOnClick
        }), itemProps => React__default.cloneElement(item, Object.assign(Object.assign({}, itemProps), {
          __active: itemProps.id === menu.currentId
        })));
      }

      if (item.type === MenuRadioGroup) {
        return React__default.createElement(Menu$1.MenuGroup, Object.assign({}, menu, item.props, {
          key: i
        }), itemProps => React__default.cloneElement(item, Object.assign(Object.assign({}, itemProps), {
          __menu: menu
        })));
      }

      return item;
    })));
  };

  const MenuDivider = React.forwardRef((_props, ref) => {
    return React__default.createElement(Box, {
      ref: ref,
      tabIndex: -1,
      role: "separator",
      "aria-orientation": "horizontal",
      my: 2,
      h: "px",
      bg: "canvas-200"
    });
  });

  const MenuOption = React.forwardRef(function MenuOption(props, ref) {
    return React__default.createElement(MenuItem, Object.assign({
      ref: ref,
      indent: true
    }, props));
  });

  const defaultElement$6 = 'div';
  const ButtonGroup = React.memo(React.forwardRef((_a, ref) => {
    var {
      children,
      className
    } = _a,
        rest = tslib.__rest(_a, ["children", "className"]);

    const items = React__default.Children.toArray(children);
    return React__default.createElement(Flex, Object.assign({
      as: defaultElement$6
    }, rest, {
      justifyItems: "start",
      alignItems: "center",
      className: cn('sl-button-group', className),
      ref: ref
    }), items.map(item => {
      if (!React__default.isValidElement(item) || ![Button, Menu].includes(item.type)) {
        error({
          condition: true,
          message: 'Invalid element provided to ButtonGroup children.'
        });
        return null;
      }

      return item;
    }));
  }));

  const sizes$3 = {
    1: {
      as: 'h1',
      fontSize: '5xl',
      fontWeight: 'bold',
      lineHeight: 'tight'
    },
    2: {
      as: 'h2',
      fontSize: '4xl',
      fontWeight: 'bold',
      lineHeight: 'tight'
    },
    3: {
      as: 'h3',
      fontSize: '2xl',
      fontWeight: 'bold',
      lineHeight: 'snug'
    },
    4: {
      as: 'h4',
      fontSize: 'paragraph',
      fontWeight: 'bold',
      lineHeight: 'snug'
    }
  };
  const Heading = React.memo(function Heading(_a) {
    var {
      size
    } = _a,
        props = tslib.__rest(_a, ["size"]);

    return React__default.createElement(Box, Object.assign({
      fontFamily: "prose",
      fontWeight: "bold",
      color: "heading"
    }, sizes$3[size], props));
  });

  const iconVariants = {
    intent: {
      default: 'info-circle',
      success: 'check-circle',
      warning: 'exclamation-circle',
      danger: 'exclamation-circle'
    }
  };
  const variants$2 = {
    default: {
      default: {
        border: 2,
        borderColor: 'transparent',
        rounded: 'lg',
        bg: {
          default: 'primary-tint'
        }
      },
      success: {
        bg: {
          default: 'success-tint'
        }
      },
      warning: {
        bg: {
          default: 'warning-tint'
        }
      },
      danger: {
        bg: {
          default: 'danger-tint'
        }
      }
    },
    outline: {
      default: {
        border: 2,
        rounded: 'xl',
        borderColor: 'primary'
      },
      success: {
        borderColor: 'success'
      },
      warning: {
        borderColor: 'warning'
      },
      danger: {
        borderColor: 'danger'
      }
    }
  };

  const defaultElement$7 = 'div';
  const directionToFlex = {
    vertical: 'col',
    horizontal: 'row'
  };
  const Stack = React.memo(React.forwardRef((_a, ref) => {
    var {
      className,
      spacing,
      direction = 'vertical',
      divider,
      children
    } = _a,
        restProps = tslib.__rest(_a, ["className", "spacing", "direction", "divider", "children"]);

    const hasDivider = !!divider;

    const _className = cn('sl-stack', {
      [`sl-stack--${direction}`]: spacing !== void 0,
      [`sl-stack--${spacing}`]: spacing !== void 0
    }, className);

    let clones = children;

    if (children && hasDivider) {
      const childCount = React__default.Children.count(children);
      clones = React__default.Children.map(children, (child, index) => {
        const isLast = index + 1 === childCount;
        const clonedDivider = typeof divider === 'boolean' ? React__default.createElement(Box, {
          key: "d",
          borderT: direction === 'vertical' ? true : undefined,
          borderL: direction === 'horizontal' ? true : undefined,
          alignSelf: "stretch"
        }) : React__default.cloneElement(divider, {
          key: 'd'
        });

        const _divider = isLast ? null : clonedDivider;

        return React__default.createElement(React__default.Fragment, {
          key: index
        }, [child, _divider]);
      });
    }

    return React__default.createElement(Flex, Object.assign({
      as: defaultElement$7,
      ref: ref,
      className: _className,
      direction: directionToFlex[direction]
    }, restProps), clones);
  }));
  const HStack = React.forwardRef((props, ref) => {
    return React__default.createElement(Stack, Object.assign({
      align: "center"
    }, props, {
      ref: ref,
      direction: "horizontal"
    }));
  });
  const VStack = React.forwardRef((props, ref) => {
    return React__default.createElement(Stack, Object.assign({
      align: "stretch"
    }, props, {
      ref: ref,
      direction: "vertical"
    }));
  });

  const Callout = React.memo(function Callout(_a) {
    var {
      intent = 'default',
      appearance = 'default',
      heading,
      className,
      icon,
      children
    } = _a,
        props = tslib.__rest(_a, ["intent", "appearance", "heading", "className", "icon", "children"]);

    const color = intent === 'default' ? 'primary' : intent;
    const {
      themeValue: value
    } = useTheme(`colors.${color}`);
    const stateProps = Object.assign(Object.assign({}, variants$2[appearance].default), variants$2[appearance][intent]);
    return React__default.createElement(Box, Object.assign({
      className: cn('sl-callout', className),
      rounded: "xl",
      w: "full",
      pb: appearance === 'default' ? undefined : 1,
      bg: appearance === 'default' ? undefined : stateProps.borderColor,
      role: "alert"
    }, props), React__default.createElement(HStack, Object.assign({
      spacing: 3,
      pl: 4,
      pr: 10,
      py: 4,
      alignItems: "start",
      rounded: "xl",
      bg: appearance === 'default' ? undefined : 'canvas-pure'
    }, stateProps), icon !== null ? React__default.createElement(Box, {
      mt: "px"
    }, React__default.createElement(HeadingIcon, {
      icon: icon,
      intent: intent,
      intentColorValue: value
    })) : null, React__default.createElement(VStack, null, heading ? React__default.createElement(Heading, {
      size: 4,
      mb: 1.5
    }, heading) : null, children)));
  });

  const HeadingIcon = ({
    icon,
    intent,
    intentColorValue
  }) => {
    let elem = null;

    if (intent && !icon) {
      const intentIcon = iconVariants.intent[intent];

      if (intentIcon) {
        elem = React__default.createElement(Icon, {
          icon: intentIcon,
          style: {
            color: intentColorValue
          },
          size: "lg"
        });
      }
    } else if (icon && isIconProp(icon)) {
      elem = React__default.createElement(Icon, {
        icon: icon,
        style: {
          color: intentColorValue
        },
        size: "lg"
      });
    }

    return elem ? React__default.createElement(Box, {
      "data-testid": "icon"
    }, elem) : null;
  };

  const Card = props => {
    return React.createElement("div", Object.assign({}, props));
  };

  function Code(_a) {
    var {
      className
    } = _a,
        props = tslib.__rest(_a, ["className"]);

    return React__default.createElement(Box, Object.assign({
      as: "code",
      className: cn(className),
      fontWeight: "medium",
      fontFamily: "mono",
      bg: "code",
      color: "on-code",
      border: true,
      py: 0.5,
      px: 1,
      rounded: true,
      style: {
        fontSize: 'max(12px, 85%)'
      }
    }, props));
  }

  const Divider = props => {
    return React.createElement("div", Object.assign({}, props));
  };

  const sizes$4 = {
    lg: {
      avatarSize: 'md',
      fontSize: 'lg'
    },
    md: {
      avatarSize: 'sm'
    }
  };
  const EntityName = React.memo(React.forwardRef(function EntityName(props, ref) {
    const {
      className,
      name,
      isHeading,
      size = 'md',
      avatar
    } = props,
          rest = tslib.__rest(props, ["className", "name", "isHeading", "size", "avatar"]);

    let leftElem;

    if (isIconEntityName(props)) {
      leftElem = React__default.createElement(Box, {
        mx: "auto"
      }, React__default.createElement(Icon, {
        icon: props.icon
      }));
    } else if (isAvatarEntityName(props)) {
      leftElem = React__default.createElement(Avatar, Object.assign({
        size: sizes$4[size].avatarSize,
        mx: "auto"
      }, avatar));
    }

    return React__default.createElement(Flex, Object.assign({}, rest, {
      ref: ref,
      align: "center",
      className: cn('sl-entity-name', className)
    }), leftElem ? React__default.createElement(Box, {
      w: 12,
      ml: -3
    }, leftElem) : null, React__default.createElement(Text, {
      fontWeight: isHeading ? 'semibold' : 'normal',
      size: sizes$4[size].fontSize
    }, name));
  }));

  function isIconEntityName(props) {
    return props.icon !== undefined;
  }

  function isAvatarEntityName(props) {
    return props.avatar !== undefined;
  }

  const Grid = props => {
    return React.createElement("div", Object.assign({}, props));
  };

  const defaultElement$8 = 'img';
  function Image(_a) {
    var {
      className
    } = _a,
        props = tslib.__rest(_a, ["className"]);

    return React__default.createElement(Box, Object.assign({
      as: defaultElement$8,
      loading: "lazy",
      className: cn('sl-image', className)
    }, props));
  }

  function useControlledState(value, defaultValue, onChange) {
    let [stateValue, setStateValue] = React.useState(value || defaultValue);
    let ref = React.useRef(value !== undefined);
    let wasControlled = ref.current;
    let isControlled = value !== undefined; // Internal state reference for useCallback

    let stateRef = React.useRef(stateValue);

    if (wasControlled !== isControlled) {
      console.warn("WARN: A component changed from " + (wasControlled ? 'controlled' : 'uncontrolled') + " to " + (isControlled ? 'controlled' : 'uncontrolled') + ".");
    }

    ref.current = isControlled;
    let setValue = React.useCallback(function (value) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      let onChangeCaller = function onChangeCaller(value) {
        if (onChange) {
          if (!Object.is(stateRef.current, value)) {
            for (var _len2 = arguments.length, onChangeArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              onChangeArgs[_key2 - 1] = arguments[_key2];
            }

            onChange(value, ...onChangeArgs);
          }
        }

        if (!isControlled) {
          stateRef.current = value;
        }
      };

      if (typeof value === 'function') {
        // this supports functional updates https://reactjs.org/docs/hooks-reference.html#functional-updates
        // when someone using useControlledState calls setControlledState(myFunc)
        // this will call our useState setState with a function as well which invokes myFunc and calls onChange with the value from myFunc
        // if we're in an uncontrolled state, then we also return the value of myFunc which to setState looks as though it was just called with myFunc from the beginning
        // otherwise we just return the controlled value, which won't cause a rerender because React knows to bail out when the value is the same
        let updateFunction = function updateFunction(oldValue) {
          for (var _len3 = arguments.length, functionArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            functionArgs[_key3 - 1] = arguments[_key3];
          }

          let interceptedValue = value(isControlled ? stateRef.current : oldValue, ...functionArgs);
          onChangeCaller(interceptedValue, ...args);

          if (!isControlled) {
            return interceptedValue;
          }

          return oldValue;
        };

        setStateValue(updateFunction);
      } else {
        if (!isControlled) {
          setStateValue(value);
        }

        onChangeCaller(value, ...args);
      }
    }, [isControlled, onChange]); // If a controlled component's value prop changes, we need to update stateRef

    if (isControlled) {
      stateRef.current = value;
    } else {
      value = stateValue;
    }

    return [value, setValue];
  }

  /**
   * Manages state for an overlay trigger. Tracks whether the overlay is open, and provides
   * methods to toggle this state.
   */
  function useOverlayTriggerState(props) {
    let [isOpen, setOpen] = useControlledState(props.isOpen, props.defaultOpen || false, props.onOpenChange);
    return {
      isOpen,

      open() {
        setOpen(true);
      },

      close() {
        setOpen(false);
      },

      toggle() {
        setOpen(!isOpen);
      }

    };
  }

  function Overlay(props, ref) {
    let {
      children,
      isOpen,
      container
    } = props;
    let mountOverlay = isOpen;

    if (!mountOverlay || typeof window === 'undefined') {
      // Don't bother showing anything if we don't have to.
      return null;
    }

    let contents = React__default.createElement(WithDomRef, {
      ref: ref
    }, React__default.createElement(Box, {
      style: {
        background: 'transparent'
      }
    }, children));
    return ReactDOM.createPortal(contents, container || document.body);
  }

  let _Overlay = React__default.forwardRef(Overlay);

  const modalSizeVariants = {
    sm: {
      width: '100%',
      maxWidth: 400
    },
    md: {
      width: '100%',
      maxWidth: 600
    },
    lg: {
      width: '100%',
      maxWidth: 900
    },
    full: {
      width: '100%',
      maxWidth: '90%'
    },
    grow: {
      maxWidth: '90%'
    }
  };
  const useModalState = () => {
    const state = useOverlayTriggerState({});
    return {
      isOpen: state.isOpen,
      open: state.open,
      close: state.close
    };
  };
  const Modal = props => {
    const {
      children,
      footer,
      isOpen,
      onClose,
      isDraggable,
      isNotDismissable
    } = props,
          rest = tslib.__rest(props, ["children", "footer", "isOpen", "onClose", "isDraggable", "isNotDismissable"]);

    return React__default.createElement(_Overlay, {
      isOpen: isOpen
    }, React__default.createElement(ModalWrapper, Object.assign({}, rest, {
      footer: footer,
      isOpen: isOpen,
      onClose: onClose,
      isDraggable: isDraggable,
      isNotDismissable: isNotDismissable
    }), children));
  };

  const ModalWrapper = _a => {
    var {
      children,
      footer,
      isOpen,
      onClose,
      isDraggable,
      isNotDismissable
    } = _a,
        props = tslib.__rest(_a, ["children", "footer", "isOpen", "onClose", "isDraggable", "isNotDismissable"]);

    const ref = React.useRef(); // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.

    const {
      overlayProps
    } = overlays.useOverlay({
      onClose,
      isOpen,
      isDismissable: !isDraggable && !isNotDismissable
    }, ref); // Hide content outside the modal from screen readers.

    const {
      modalProps
    } = overlays.useModal(); // Get props for the dialog

    const {
      dialogProps,
      titleProps
    } = dialog.useDialog({}, ref); // TODO: having to pull out color for the typings is so annoying...

    const _b = utils$1.mergeProps(overlayProps, modalProps),
          containerProps = tslib.__rest(_b, ["color"]);

    const dialogPropsWithoutColor = tslib.__rest(dialogProps, ["color"]);

    const dialogTitlePropsWithoutColor = tslib.__rest(titleProps, ["color"]);

    if (isDraggable) {
      return React__default.createElement(DraggableModalBox, Object.assign({}, props, {
        ref: ref,
        onClose: onClose,
        containerProps: containerProps,
        dialogProps: dialogPropsWithoutColor,
        titleProps: dialogTitlePropsWithoutColor,
        footer: footer,
        isNotDismissable: isNotDismissable
      }), children);
    }

    return React__default.createElement(StaticModalBox, Object.assign({}, props, {
      ref: ref,
      onClose: onClose,
      containerProps: containerProps,
      dialogProps: dialogPropsWithoutColor,
      titleProps: dialogTitlePropsWithoutColor,
      footer: footer,
      isNotDismissable: isNotDismissable
    }), children);
  };

  const ModalBox = React.forwardRef((_a, ref) => {
    var {
      isDraggable,
      moveProps = {},
      containerProps,
      dialogProps,
      titleProps,
      onClose,
      children,
      footer,
      position,
      isHidden,
      isNotDismissable,
      size = 'md'
    } = _a,
        props = tslib.__rest(_a, ["isDraggable", "moveProps", "containerProps", "dialogProps", "titleProps", "onClose", "children", "footer", "position", "isHidden", "isNotDismissable", "size"]);

    const isDark = useThemeIsDark();
    const style = modalSizeVariants[size] || {};

    if (position) {
      style.position = 'fixed';
      style.top = position.y;
      style.left = position.x;
    }

    let headerElem;

    if ('renderHeader' in props) {
      headerElem = props.renderHeader({
        containerProps: moveProps,
        titleProps,
        onClose
      });
    } else if (props.title) {
      headerElem = React__default.createElement(Flex, Object.assign({}, moveProps, {
        borderB: true,
        borderColor: isDark ? 'input' : undefined,
        alignItems: "center",
        pl: 5,
        pr: 3,
        py: 3,
        cursor: !!position ? 'move' : undefined
      }), typeof props.title === 'string' ? React__default.createElement(Heading, Object.assign({
        size: 3,
        fontSize: "xl",
        flex: 1
      }, titleProps), props.title) : React__default.createElement(Box, Object.assign({}, titleProps, {
        as: "header"
      }), props.title), !isNotDismissable && React__default.createElement(Button, {
        appearance: "minimal",
        icon: React__default.createElement(Icon, {
          icon: "times",
          size: "2x"
        }),
        onPress: onClose,
        "aria-label": "dismiss"
      }));
    }

    let footerElem;

    if (footer) {
      footerElem = React__default.createElement(Box, {
        borderT: true,
        borderColor: isDark ? 'input' : undefined,
        alignItems: "center",
        pl: 5,
        pr: 3,
        py: 3
      }, footer);
    }

    return React__default.createElement(Box, Object.assign({}, containerProps, {
      bg: "canvas-dialog",
      boxShadow: "lg",
      rounded: "lg",
      pos: "relative",
      zIndex: 20,
      style: style,
      visibility: isHidden ? 'invisible' : undefined
    }), React__default.createElement(focus.FocusScope, {
      restoreFocus: !isDraggable,
      contain: !isDraggable
    }, React__default.createElement(Box, Object.assign({}, dialogProps, {
      ref: ref,
      "aria-describedby": `${dialogProps['aria-labelledby']}-body`,
      "aria-modal": "true",
      "data-testid": "modal"
    }), headerElem, React__default.createElement(ModalContent, {
      id: `${dialogProps['aria-labelledby']}-body`,
      p: headerElem || footerElem ? 5 : undefined
    }, children), footerElem)));
  });
  /**
   * Memo modal content so that it does not re-render constantly in draggable modals
   */

  const ModalContent = React.memo(({
    children,
    id,
    p
  }) => {
    return React__default.createElement(Box, {
      p: p,
      id: id
    }, children);
  });
  const StaticModalBox = React.forwardRef((props, ref) => {
    // Prevent scrolling while the modal is open
    overlays.usePreventScroll();
    return React__default.createElement(Flex, {
      pos: "fixed",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 40,
      pin: true,
      overflowY: "auto"
    }, React__default.createElement(Underlay, null), React__default.createElement(ModalBox, Object.assign({}, props, {
      ref: ref
    })));
  });
  const DraggableModalBox = React.forwardRef((props, ref) => {
    const [position, setPosition] = React__default.useState({
      x: 0,
      y: 0
    }); // get the width of the button trigger so that we can set the menu min width

    const [modalWidth, modalHeight] = useSize(ref);
    const [windowWidth, windowHeight] = windowSize.useWindowSize();
    React__default.useEffect(() => {
      if (modalWidth && windowWidth) {
        const y = windowHeight / 2 - modalHeight / 2;
        setPosition({
          x: windowWidth / 2 - modalWidth / 2,
          y: y - y * 0.7
        });
      }
    }, [modalWidth, windowWidth, setPosition, windowHeight, modalHeight]);

    const clamp = (pos, containerSize, componentSize) => Math.min(Math.max(pos, 0), containerSize - componentSize);

    const {
      moveProps
    } = interactions.useMove({
      onMove(e) {
        setPosition(({
          x,
          y
        }) => {
          // Normally, we want to allow the user to continue
          // dragging outside the box such that they need to
          // drag back over the ball again before it moves.
          // This is handled below by clamping during render.
          // If using the keyboard, however, we need to clamp
          // here so that dragging outside the container and
          // then using the arrow keys works as expected.
          if (e.pointerType === 'keyboard') {
            // eslint-disable-next-line no-param-reassign
            x = clamp(x, windowWidth, modalWidth); // eslint-disable-next-line no-param-reassign

            y = clamp(y, windowHeight, modalHeight);
          } // eslint-disable-next-line no-param-reassign


          x += e.deltaX; // eslint-disable-next-line no-param-reassign

          y += e.deltaY;
          return {
            x: clamp(x, windowWidth + modalWidth * 0.5, modalWidth),
            y: clamp(y, windowHeight + 50, modalHeight)
          };
        });
      }

    });
    return React__default.createElement(ModalBox, Object.assign({}, props, {
      moveProps: moveProps,
      position: position,
      ref: ref,
      isHidden: !modalWidth
    }));
  });

  const Underlay = () => {
    return React__default.createElement(Box, {
      pos: "fixed",
      zIndex: 10,
      pin: true,
      style: {
        backgroundColor: 'rgba(0, 0 , 0, .3)'
      }
    });
  };

  function ProductImage(_a) {
    var _b, _c, _d, _e;

    var {
      className,
      children,
      focus,
      caption,
      bg = 'success'
    } = _a,
        props = tslib.__rest(_a, ["className", "children", "focus", "caption", "bg"]);

    const {
      isOpen,
      open,
      close
    } = useModalState(); // enforce single child

    const child = React__default.Children.only(children);
    const focusContainerProps = ((_b = FocusVariants[focus]) === null || _b === void 0 ? void 0 : _b.container) || {};
    const focusAspectProps = ((_c = FocusVariants[focus]) === null || _c === void 0 ? void 0 : _c.aspect) || {};
    const focusImageProps = ((_d = FocusVariants[focus]) === null || _d === void 0 ? void 0 : _d.image) || {};
    const focusCaptionProps = ((_e = FocusVariants[focus]) === null || _e === void 0 ? void 0 : _e.caption) || {};
    const imageElem = React__default.cloneElement(child, Object.assign(Object.assign({
      bg: 'canvas-pure',
      borderColor: 'body',
      overflowX: 'hidden',
      overflowY: 'hidden',
      mx: 'auto'
    }, focusImageProps), {
      style: Object.assign(focusImageProps.style || {}, child.props.style || {})
    }));
    let elem = imageElem;

    if (focusAspectProps.ratio) {
      elem = React__default.createElement(AspectRatio, Object.assign({
        mx: "auto",
        ratio: 1
      }, focusAspectProps), imageElem);
    }

    const resolvedCaption = caption || child.props.title;
    let captionElem = resolvedCaption ? React__default.createElement(Box, Object.assign({
      as: "caption",
      display: "block",
      style: {
        color: 'white'
      },
      pb: 8,
      mt: -8,
      mx: "auto",
      px: 20,
      fontWeight: "semibold",
      fontSize: "paragraph"
    }, focusCaptionProps), resolvedCaption) : null;
    return React__default.createElement(React__default.Fragment, null, React__default.createElement(interactions.Pressable, {
      onPress: open
    }, React__default.createElement(Box, Object.assign({
      className: cn('sl-product-image', className),
      border: 2,
      borderColor: "body",
      rounded: "xl",
      bg: focus ? bg : undefined,
      overflowX: "hidden",
      overflowY: "hidden",
      transform: true,
      cursor: "zoom-in",
      transitionDuration: 300,
      translateX: {
        hover: 2
      },
      translateY: {
        hover: -2
      },
      style: {
        '--shadow-md': '-8px 8px 0 0 var(--color-text)'
      },
      boxShadow: {
        hover: true
      }
    }, props, focusContainerProps), focus !== 'bottom' ? captionElem : null, elem, focus === 'bottom' ? captionElem : null)), React__default.createElement(Modal, {
      isOpen: isOpen,
      onClose: close,
      size: "grow"
    }, React__default.createElement(Box, {
      as: interactions.Pressable,
      onPress: close,
      cursor: "zoom-out",
      overflowX: "hidden",
      overflowY: "hidden",
      rounded: "lg"
    }, React__default.cloneElement(child, {
      style: Object.assign({
        maxHeight: 800
      }, child.props.style || {})
    }))));
  }
  const FocusVariants = {
    center: {
      container: {
        p: 16
      },
      image: {
        border: 2,
        rounded: 'xl',
        boxShadow: 'lg',
        style: {
          maxHeight: 500
        }
      }
    },
    bottom: {
      container: {
        pb: 16
      },
      aspect: {
        ratio: 16 / 9,
        mx: 16
      },
      image: {
        borderB: 2,
        borderL: 2,
        borderR: 2,
        rounded: 'b-lg',
        objectFit: 'scale-down',
        objectPosition: 'bottom'
      },
      caption: {
        pb: 0,
        mt: 0,
        pt: 8,
        mb: -8
      }
    },
    top: {
      container: {
        pt: 16
      },
      aspect: {
        ratio: 16 / 9,
        mx: 16
      },
      image: {
        borderT: 2,
        borderL: 2,
        borderR: 2,
        rounded: 't-lg',
        objectFit: 'scale-down',
        objectPosition: 'top'
      }
    },
    'top-right': {
      container: {
        pt: 16
      },
      aspect: {
        ratio: 16 / 9,
        mr: 16
      },
      image: {
        borderT: 2,
        borderR: 2,
        rounded: 'tr-lg',
        objectFit: 'scale-down',
        objectPosition: 'left-top'
      }
    },
    'top-left': {
      container: {
        pt: 16
      },
      aspect: {
        ratio: 16 / 9,
        ml: 16
      },
      image: {
        borderT: 2,
        borderL: 2,
        rounded: 'tl-lg',
        objectFit: 'scale-down',
        objectPosition: 'right-top'
      }
    }
  };

  const variants$3 = {
    default: {
      default: {
        borderColor: {
          default: 'input',
          // TODO: when have more sophisticated theme val system, slightly darker color on hover as in ui designs
          // hover: 'input',
          focus: 'primary'
        }
      },
      success: {
        borderColor: {
          default: 'success',
          focus: 'success-dark'
        }
      },
      warning: {
        borderColor: {
          default: 'warning',
          focus: 'warning-dark'
        }
      },
      danger: {
        borderColor: {
          default: 'danger',
          focus: 'danger-dark'
        }
      }
    },
    minimal: {
      default: {
        borderColor: {
          default: 'transparent',
          hover: 'input',
          focus: 'primary'
        }
      },
      success: {
        borderColor: {
          default: 'transparent',
          hover: 'success',
          focus: 'success-dark'
        }
      },
      warning: {
        borderColor: {
          default: 'transparent',
          hover: 'warning',
          focus: 'warning-dark'
        }
      },
      danger: {
        borderColor: {
          default: 'transparent',
          hover: 'danger',
          focus: 'danger-dark'
        }
      }
    }
  };

  const sizes$5 = {
    lg: {
      padding: 4
    },
    md: {
      padding: 2.5
    },
    sm: {
      padding: 1.5
    }
  };
  const fontSizes = {
    lg: 'lg',
    md: 'base',
    sm: 'base'
  };
  const Input = React.memo(React.forwardRef(function Input(_a, ref) {
    var {
      appearance = 'default',
      intent = 'default',
      size = 'md',
      readOnly,
      disabled,
      className,
      icon,
      required
    } = _a,
        props = tslib.__rest(_a, ["appearance", "intent", "size", "readOnly", "disabled", "className", "icon", "required"]);

    const {
      matchedProps,
      remainingProps
    } = splitBoxProps(props);
    const stateProps = Object.assign(Object.assign(Object.assign(Object.assign({}, variants$3.default.default), variants$3.default[intent]), variants$3[appearance].default), variants$3[appearance][intent]);
    let disabledProps = {};

    if (disabled) {
      disabledProps = {
        bg: 'canvas-100',
        color: 'muted',
        cursor: 'not-allowed'
      };
    }

    let readOnlyProps = {};

    if (readOnly) {
      readOnlyProps.tabIndex = -1;

      if (appearance === 'minimal') {
        readOnlyProps.borderColor = 'transparent';
      }
    }

    let ariaProps = {};

    if (required) {
      ariaProps['aria-required'] = true;
    }

    return React__default.createElement(Box, Object.assign({
      ref: ref,
      className: cn('sl-input', className),
      pos: "relative"
    }, matchedProps), icon ? React__default.createElement(InputIcon, {
      icon: icon
    }) : null, React__default.createElement(Box, Object.assign({
      as: reakit.Input,
      pl: icon ? 8 : sizes$5[size].padding,
      pr: sizes$5[size].padding,
      fontSize: fontSizes[size],
      rounded: true,
      h: size,
      border: true,
      w: "full",
      disabled: disabled,
      readOnly: readOnly,
      pos: "relative",
      zIndex: 10
    }, stateProps, readOnlyProps, disabledProps, ariaProps, remainingProps)));
  }));

  const InputIcon = ({
    icon
  }) => {
    let elem = icon;

    if (isIconProp(icon)) {
      elem = React__default.createElement(Icon, {
        icon: icon,
        size: "sm",
        fixedWidth: true
      });
    }

    return React__default.createElement(Flex, {
      pos: "absolute",
      align: "center",
      className: "sl-z-0",
      style: {
        top: 0,
        bottom: 0,
        left: 0,
        lineHeight: 0
      },
      pl: 2
    }, elem);
  };

  const LinkHeading = React.memo(function LinkHeading(_a) {
    var {
      id,
      children,
      className
    } = _a,
        props = tslib.__rest(_a, ["id", "children", "className"]);

    const _className = cn('sl-link-heading', className); // Just in case browser doesn't scroll correctly - handle it


    React__default.useEffect(() => {
      if (document.location.hash === `#${id}`) {
        const timer = setTimeout(() => {
          document.querySelector(`#${id}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
        return () => clearTimeout(timer);
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);
    return React__default.createElement(Box, Object.assign({
      as: Heading,
      className: _className,
      id: id
    }, props), React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring",
      focusClass: "sl-focus-ring"
    }, React__default.createElement(Link, {
      href: `#${id}`,
      className: "sl-link-heading__link",
      display: "inline-flex",
      alignItems: "center",
      color: "current"
    }, React__default.createElement(Box, null, children), React__default.createElement(Box, {
      className: "sl-link-heading__icon",
      ml: 4,
      fontSize: "base",
      color: "muted"
    }, React__default.createElement(Icon, {
      icon: "link"
    })))));
  });

  function ListBoxBase(props, forwardRef) {
    const {
      matchedProps,
      remainingProps
    } = splitBoxProps(props);
    const domRef = React.useRef();
    const ref = forwardRef || domRef;
    const state = list.useListState(props);
    const {
      listBoxProps
    } = listbox.useListBox(remainingProps, state, ref);
    return React.createElement(Box, Object.assign({}, listBoxProps, matchedProps, {
      color: matchedProps.color,
      ref: ref
    }), [...state.collection].map(item => React.createElement(ListBoxOption, {
      key: item.key,
      item: item,
      state: state
    })));
  } // forwardRef doesn't support generic parameters, so cast the result to the correct type
  // https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref


  const ListBox = React.forwardRef(ListBoxBase);

  function ListBoxOption({
    item,
    state
  }) {
    const {
      rendered,
      key
    } = item;
    const isDisabled = state.disabledKeys.has(key);
    const ref = React.useRef();
    const {
      optionProps
    } = listbox.useOption({
      key,
      isDisabled
    }, state, ref);
    const {
      isFocusVisible,
      focusProps
    } = focus.useFocusRing();
    return React.createElement(Box, Object.assign({}, utils$1.mergeProps(optionProps, focusProps), {
      bg: {
        default: isFocusVisible ? 'canvas-200' : 'transparent',
        hover: 'canvas-200'
      },
      color: "body",
      cursor: "pointer",
      ref: ref
    }), rendered);
  }

  const ListBoxItem = collections.Item;

  const PanelContent = _a => {
    var {
      children
    } = _a,
        props = tslib.__rest(_a, ["children"]);

    return React__default.createElement(Box, Object.assign({
      p: 4,
      className: "sl-panel__content"
    }, props), children);
  };

  const titlebarVariants = {
    default: {
      bg: 'canvas-200',
      borderColor: {
        default: 'input',
        focus: 'primary'
      },
      color: 'muted'
    },
    minimal: {
      pos: 'relative',
      fontWeight: 'medium'
    }
  };
  const iconVariants$1 = {
    default: {
      mr: 1.5
    },
    minimal: {
      pos: 'absolute',
      left: -4,
      color: 'muted',
      fontWeight: 'normal'
    }
  };
  const PanelTitlebar = React.memo(_a => {
    var {
      children,
      icon,
      appearance = 'default',
      rightComponent,
      onClick,
      bg,
      tabIndex
    } = _a,
        props = tslib.__rest(_a, ["children", "icon", "appearance", "rightComponent", "onClick", "bg", "tabIndex"]);

    return React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring"
    }, React__default.createElement(Flex, Object.assign({
      className: "sl-panel__titlebar",
      pos: "relative",
      zIndex: {
        focus: 10
      },
      align: "center",
      fontSize: "base",
      userSelect: "none",
      pl: appearance === 'default' ? icon ? 3 : 4 : undefined,
      pr: appearance === 'default' ? rightComponent ? 3 : 4 : undefined
    }, titlebarVariants[appearance], {
      bg: bg || titlebarVariants[appearance].bg
    }, props, {
      tabIndex: tabIndex
    }), React__default.createElement(Flex, {
      flex: 1,
      align: "center",
      h: "lg",
      onClick: onClick
    }, icon && React__default.createElement(Box, Object.assign({}, iconVariants$1[appearance]), icon), children), rightComponent));
  });

  const Panel = _a => {
    var {
      appearance = 'default',
      id,
      className,
      children,
      isCollapsible = true,
      isOpen: isOpenProp,
      defaultIsOpen = false,
      onChange,
      rounded
    } = _a,
        extraProps = tslib.__rest(_a, ["appearance", "id", "className", "children", "isCollapsible", "isOpen", "defaultIsOpen", "onChange", "rounded"]);

    const [isOpen, setIsOpen] = useControllableState({
      value: isOpenProp,
      defaultValue: defaultIsOpen,
      onChange,
      propsMap: {
        value: 'isOpen',
        defaultValue: 'defaultIsOpen',
        onChange: 'onChange'
      }
    });
    const isMinimal = appearance === 'minimal';
    const isPanelOpen = !isCollapsible || isCollapsible && isOpen;
    const handleChange = React__default.useCallback(() => {
      if (!isCollapsible) return;
      setIsOpen(!isOpen);
    }, [isCollapsible, isOpen, setIsOpen]);
    const handleKeyDown = React__default.useCallback(e => {
      if (!isCollapsible) return;

      if (e.keyCode === tsKeycodeEnum.Key.Space || e.keyCode === tsKeycodeEnum.Key.Enter) {
        e.preventDefault();
        handleChange();
      }
    }, [handleChange, isCollapsible]);
    const [titlebarElement, ...contentElements] = React__default.Children.toArray(children);

    if (!React__default.isValidElement(titlebarElement) || React__default.isValidElement(titlebarElement) && titlebarElement.type !== PanelTitlebar) {
      throw new Error('Panel.Titlebar must be the first child in a Panel');
    }

    let icon;

    if (isCollapsible) {
      if (isMinimal) {
        icon = isPanelOpen ? 'chevron-down' : 'chevron-right';
      } else {
        icon = ['fas', isPanelOpen ? 'caret-down' : 'caret-right'];
      }
    }

    const titlebarComponent = React__default.cloneElement(titlebarElement, {
      icon: icon ? React__default.createElement(Icon, {
        icon: icon,
        fixedWidth: true,
        size: isMinimal ? 'xs' : undefined
      }) : undefined,
      role: isCollapsible ? 'button' : undefined,
      'aria-expanded': isCollapsible ? isPanelOpen : undefined,
      'aria-controls': isCollapsible ? id : undefined,
      cursor: isCollapsible ? 'pointer' : undefined,
      tabIndex: isCollapsible ? 0 : undefined,
      appearance,
      onClick: handleChange,
      onKeyDown: handleKeyDown
    });
    return React__default.createElement(Box, Object.assign({
      w: "full",
      className: cn('sl-panel', 'sl-outline-none', className),
      overflowX: !isMinimal && rounded ? 'hidden' : undefined,
      overflowY: !isMinimal && rounded ? 'hidden' : undefined,
      rounded: rounded ? 'lg' : undefined
    }, extraProps), titlebarComponent, isPanelOpen ? React__default.createElement(Box, {
      className: "sl-panel__content-wrapper",
      bg: isMinimal ? undefined : 'canvas-100',
      id: isCollapsible ? id : undefined,
      role: isCollapsible ? 'region' : undefined
    }, contentElements) : null);
  };
  Panel.Titlebar = PanelTitlebar;
  Panel.Content = PanelContent;

  const defaultElement$9 = 'p';
  const sizes$6 = {
    leading: {
      fontSize: 'paragraph-leading',
      lineHeight: 'paragraph-leading'
    },
    default: {
      fontSize: 'paragraph',
      lineHeight: 'paragraph'
    },
    small: {
      fontSize: 'paragraph-small',
      lineHeight: 'paragraph-small'
    },
    tiny: {
      fontSize: 'paragraph-tiny',
      lineHeight: 'paragraph-tiny'
    }
  };
  const Paragraph = React.memo(React.forwardRef((_a, ref) => {
    var {
      size = 'default'
    } = _a,
        restProps = tslib.__rest(_a, ["size"]);
    /**
     * Explicitely do not allow end user to override font and color... Paragraph should only be used for prose, not UI.
     */


    return React__default.createElement(Box, Object.assign({
      as: defaultElement$9,
      ref: ref
    }, sizes$6[size], restProps, {
      fontFamily: "prose",
      color: "paragraph"
    }));
  }));

  const Popover = React.forwardRef((props, ref) => {
    const {
      renderTrigger,
      children,
      isOpen,
      defaultOpen,
      placement,
      scrollRef,
      onOpen,
      onClose,
      offset = 8,
      crossOffset = 0,
      shouldFlip = true,
      p
    } = props;
    const onOpenChange = React.useCallback($isOpen => {
      if ($isOpen && onOpen) onOpen();
      if (!$isOpen && onClose) onClose();
    }, [onClose, onOpen]);
    let state = useOverlayTriggerState({
      isOpen,
      defaultOpen,
      onOpenChange
    });

    const _triggerRef = utils.useFocusableRef(React.useRef());

    const triggerRef = props.triggerRef || _triggerRef;
    const popoverRef = React.useRef();
    let unwrappedPopoverRef = useUnwrapDOMRef(popoverRef); // Get props for the trigger and overlay. This also handles
    // hiding the overlay when a parent element of the trigger scrolls
    // (which invalidates the popover positioning).

    let {
      triggerProps,
      overlayProps
    } = overlays.useOverlayTrigger({
      type: 'dialog'
    }, state, triggerRef); // Get popover positioning props relative to the trigger

    let {
      overlayProps: positionProps
    } = overlays.useOverlayPosition({
      targetRef: triggerRef,
      overlayRef: unwrappedPopoverRef,
      placement,
      offset,
      scrollRef,
      crossOffset,
      shouldFlip,
      isOpen: state.isOpen,
      onClose
    }); // if isOpen is provided (controlled mode), do not use our own onPress handler

    const onPress = isOpen === void 0 ? state.toggle : undefined;
    return React__default.createElement(React__default.Fragment, null, React__default.createElement(interactions.PressResponder, Object.assign({}, triggerProps, {
      onPress: onPress,
      isPressed: state.isOpen
    }), React__default.cloneElement(runIfFn(renderTrigger, {
      isOpen: state.isOpen
    }), {
      ref: triggerRef
    })), React__default.createElement(_Overlay, {
      isOpen: state.isOpen
    }, React__default.createElement(PopoverWrapper, Object.assign({}, overlayProps, positionProps, {
      ref: popoverRef,
      isOpen: state.isOpen,
      onClose: state.close,
      p: p
    }), runIfFn(children, {
      close: state.close
    }))));
  });
  const PopoverWrapper = React.forwardRef((_a, ref) => {
    var {
      children,
      isOpen,
      onClose,
      style,
      p = 4
    } = _a,
        otherProps = tslib.__rest(_a, ["children", "isOpen", "onClose", "style", "p"]);

    let domRef = utils.useDOMRef(ref); // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.

    let {
      overlayProps
    } = overlays.useOverlay({
      onClose,
      isOpen,
      isDismissable: true
    }, domRef); // Hide content outside the modal from screen readers.

    let {
      modalProps
    } = overlays.useModal({}); // Get props for the dialog

    let {
      dialogProps
    } = dialog.useDialog({}, domRef);

    const _b = utils$1.mergeProps(overlayProps, dialogProps, otherProps, modalProps),
          containerProps = tslib.__rest(_b, ["color"]);

    return React__default.createElement(focus.FocusScope, {
      restoreFocus: true,
      contain: true,
      autoFocus: true
    }, React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring"
    }, React__default.createElement(Box, Object.assign({}, containerProps, {
      p: p,
      bg: "canvas-dialog",
      boxShadow: "lg",
      rounded: true,
      ref: domRef,
      style: style,
      role: "presentation",
      "data-testid": "popover"
    }), children)));
  });

  const Prose = React.memo(function Prose(_a) {
    var {
      className
    } = _a,
        props = tslib.__rest(_a, ["className"]);

    return React__default.createElement(Box, Object.assign({
      className: cn('sl-prose', className)
    }, props));
  });

  const Provider = ({
    children,
    className,
    style
  }) => {
    return React__default.createElement(ssr.SSRProvider, null, React__default.createElement(reakit.Provider, null, React__default.createElement(overlays.OverlayProvider, {
      className: cn(className),
      style: style
    }, children)));
  };

  // See examples of getCollectionNode https://github.com/adobe/react-spectrum/search?q=getCollectionNode
  const SelectAction = _props => {
    return null;
  };
  const isSelectAction = item => {
    return item && typeof item === 'object' && item.hasOwnProperty('onPress') ? true : false;
  };

  SelectAction.getCollectionNode = function* getCollectionNode(props) {
    const {
      label
    } = props;
    const textValue = label || '';
    yield {
      type: 'item',
      props,
      rendered: textValue,
      textValue,
      'aria-label': props['aria-label'],
      hasChildNodes: false
    };
  };

  // See examples of getCollectionNode https://github.com/adobe/react-spectrum/search?q=getCollectionNode
  const SelectOption = _props => {
    return null;
  };
  const isSelectOption = item => {
    return item && typeof item === 'object' && item.hasOwnProperty('value') ? true : false;
  };

  SelectOption.getCollectionNode = function* getCollectionNode(props) {
    const {
      value,
      label
    } = props;
    const textValue = (typeof label === 'string' ? label : '') || props['aria-label'] || value || '';
    yield {
      type: 'item',
      props,
      rendered: label || value,
      textValue,
      'aria-label': props['aria-label'],
      hasChildNodes: false
    };
  };

  function SelectSection(props) {
    return null;
  }
  const isSelectSection = item => {
    return item && typeof item === 'object' && item.hasOwnProperty('options') ? true : false;
  };

  SelectSection.getCollectionNode = function* getCollectionNode(props) {
    const {
      children,
      title,
      options
    } = props;
    yield {
      type: 'section',
      hasChildNodes: true,
      rendered: title,
      'aria-label': props['aria-label'],

      *childNodes() {
        if (typeof children === 'function') {
          if (!options) {
            throw new Error('SelectSection props.options is missing');
          }

          for (let item of options) {
            yield {
              type: 'item',
              value: item,
              renderer: children
            };
          }
        } else {
          let items = [];
          React__default.Children.forEach(children, child => {
            items.push({
              type: 'item',
              element: child
            });
          });
          yield* items;
        }
      }

    };
  };

  function Select(_a) {
    var _b, _c;

    var {
      flexGrow,
      flex,
      w,
      size,
      renderTrigger,
      triggerTextPrefix,
      options,
      value,
      defaultValue,
      onChange,
      isClearable,
      placeholder = 'select an option',
      onOpen,
      onClose,
      isDisabled
    } = _a,
        props = tslib.__rest(_a, ["flexGrow", "flex", "w", "size", "renderTrigger", "triggerTextPrefix", "options", "value", "defaultValue", "onChange", "isClearable", "placeholder", "onOpen", "onClose", "isDisabled"]);

    const listboxRef = React.useRef();
    const triggerRef = utils.useFocusableRef(React.useRef());
    const onOpenChange = React.useCallback($isOpen => {
      if ($isOpen && onOpen) onOpen();
      if (!$isOpen && onClose) onClose();
    }, [onClose, onOpen]);
    const onSelection = React.useCallback(val => {
      if (onChange) {
        // val is potentially undefined due to an issue in react-aria
        // here we make sure to pass as null when falsey, so that Select mode does not change from controlled to uncontrolled
        onChange(val || null);
      }
    }, [onChange]);
    const [disabledKeys, setDisabledKeys] = React.useState([]);
    let keyCounter = 0;
    const children = React.useCallback(item => {
      keyCounter++;

      if (isSelectSection(item)) {
        return React__default.createElement(SelectSection, Object.assign({
          key: item.title || keyCounter
        }, item), item => {
          keyCounter++;

          if (isSelectOption(item)) {
            return React__default.createElement(SelectOption, Object.assign({
              key: item.value
            }, item));
          }

          if (isSelectAction(item)) {
            return React__default.createElement(SelectAction, Object.assign({
              key: item.label
            }, item));
          }
        });
      }

      if (isSelectOption(item)) {
        return React__default.createElement(SelectOption, Object.assign({
          key: item.value
        }, item));
      }

      if (isSelectAction(item)) {
        return React__default.createElement(SelectAction, Object.assign({
          key: item.label
        }, item));
      }

      return null;
    }, [keyCounter]); // Create state based on the incoming props

    const state = select$1.useSelectState({
      selectedKey: value,
      defaultSelectedKey: defaultValue,
      onSelectionChange: onSelection,
      isDisabled,
      placeholder,
      items: options,
      children,
      onOpenChange,
      disabledKeys
    });
    const computedDisabledKeys = useCollectionKeyAccumulator(state.collection, 'isDisabled', true);
    React__default.useEffect(() => {
      setDisabledKeys(computedDisabledKeys);
    }, [computedDisabledKeys]);
    const clearSelection = React.useCallback(() => {
      if (isClearable) {
        state.setSelectedKey(null);
      }
    }, [isClearable, state]);
    const {
      triggerProps,
      menuProps
    } = select.useSelect({
      selectedKey: value,
      defaultSelectedKey: defaultValue,
      isDisabled,
      disallowEmptySelection: true,
      placeholder,
      items: options,
      children,
      'aria-label': props['aria-label']
    }, state, triggerRef);
    /**
     * Menu list items have a fixed height and padding, we can use
     * this information to adjust menu location so that active item
     * is focused on center, where the user's mouse is.
     *
     * This approach does not take <Section /> into account, or overflow / scrolling. Depending on need, we
     * might want to put effort into a more robust implementation at a later date.
     */

    const [buttonWidth] = useSize(triggerRef);
    const index = ((_b = state.selectedItem) === null || _b === void 0 ? void 0 : _b.index) || 0;
    const baseOffset = size === 'sm' ? -32 : -37;
    const offset = baseOffset + index * -24;
    const crossOffset = size === 'sm' ? -21 : -17;
    const triggerElem = renderTrigger ? runIfFn(renderTrigger, Object.assign(Object.assign({}, triggerProps), {
      placeholder
    }), {
      selectedItem: (_c = state.selectedItem) === null || _c === void 0 ? void 0 : _c.props
    }) : React__default.createElement(FieldButton, Object.assign({}, triggerProps, {
      size: size,
      disabled: isDisabled,
      placeholder: placeholder,
      onClear: isClearable ? clearSelection : undefined
    }), state.selectedItem ? triggerTextPrefix ? `${triggerTextPrefix}${state.selectedItem.rendered}` : state.selectedItem.rendered : undefined);
    return React__default.createElement(Box, {
      className: "sl-select",
      pos: "relative",
      flexGrow: flexGrow,
      flex: flex,
      w: w
    }, React__default.createElement(select.HiddenSelect, {
      state: state,
      triggerRef: triggerRef,
      name: props.name
    }), React__default.createElement(Popover, {
      triggerRef: triggerRef,
      scrollRef: listboxRef,
      isOpen: state.isOpen,
      onClose: state.close,
      offset: offset,
      crossOffset: crossOffset,
      placement: "bottom left",
      shouldFlip: false,
      p: 0,
      renderTrigger: triggerElem
    }, React__default.createElement(ListBoxPopup, Object.assign({}, menuProps, {
      ref: listboxRef,
      options: options,
      state: state,
      minW: buttonWidth + Math.abs(crossOffset) + 4
    }))));
  }
  const ListBoxPopup = React.forwardRef((_a, ref) => {
    var {
      state,
      minW,
      options
    } = _a,
        otherProps = tslib.__rest(_a, ["state", "minW", "options"]); // Get props for the listbox


    const {
      listBoxProps
    } = listbox.useListBox(Object.assign({
      autoFocus: 'first',
      shouldFocusWrap: true,
      selectionMode: 'single',
      items: options,
      disallowEmptySelection: true
    }, otherProps), state, ref); // pull color out, not needed and conflicting types

    const _b = utils$1.mergeProps(listBoxProps, otherProps),
          restProps = tslib.__rest(_b, ["color"]);

    return React__default.createElement(React__default.Fragment, null, React__default.createElement(overlays.DismissButton, {
      onDismiss: state.close
    }), React__default.createElement(Box, Object.assign({}, restProps, {
      ref: ref,
      py: 2,
      noFocusRing: true,
      overflowY: "auto",
      style: {
        minWidth: minW,
        maxHeight: 'inherit'
      }
    }), [...state.collection].map(item => {
      const {
        type
      } = item;

      if (type === 'item') {
        return React__default.createElement(SelectItem, {
          key: item.key,
          item: item,
          state: state
        });
      }

      if (type === 'section') {
        return React__default.createElement(Section, {
          key: item.key,
          item: item,
          state: state
        });
      }

      if (type === 'placeholder') {
        return React__default.createElement("div", {
          // aria-selected isn't needed here since this option is not selectable.
          role: "option"
        }, "no items to select");
      }
    })), React__default.createElement(overlays.DismissButton, {
      onDismiss: state.close
    }));
  });
  const Section = React.memo(({
    item,
    state
  }) => {
    const isDark = useThemeIsDark();

    const _a = listbox.useListBoxSection({
      heading: item.rendered,
      'aria-label': item['aria-label']
    }),
          {
      itemProps
    } = _a,
          _b = _a.headingProps,
          headingPropsWithoutColor = tslib.__rest(_b, ["color"]),
          {
      groupProps
    } = _a;

    const _c = separator.useSeparator({
      elementType: 'li'
    }).separatorProps,
          separatorPropsWithoutColor = tslib.__rest(_c, ["color"]);

    return React__default.createElement(React__default.Fragment, null, item.key !== state.collection.getFirstKey() && React__default.createElement(Box, Object.assign({}, separatorPropsWithoutColor, {
      my: 2,
      borderT: true,
      borderColor: isDark ? 'input' : undefined
    })), React__default.createElement("div", Object.assign({}, itemProps), item.rendered && React__default.createElement(Box, Object.assign({}, headingPropsWithoutColor, {
      pl: 7,
      textTransform: "uppercase",
      color: "light",
      pb: 1,
      cursor: "default",
      fontSize: "sm"
    }), item.rendered), React__default.createElement("div", Object.assign({}, groupProps), [...item.childNodes].map(node => {
      let item;

      if (node.type === 'item') {
        item = React__default.createElement(SelectItem, {
          key: node.key,
          item: node,
          state: state
        });
      } else {
        item = null;
      }

      if (node.wrapper) {
        item = node.wrapper(item);
      }

      return item;
    }))));
  });
  const SelectItem = React.memo(({
    item,
    state
  }) => {
    // Get props for the option element
    const ref = React.useRef();
    const isDisabled = state.disabledKeys.has(item.key);
    const isSelected = state.selectionManager.isSelected(item.key);
    const {
      optionProps
    } = listbox.useOption({
      key: item.key,
      isDisabled,
      isSelected,
      shouldFocusOnHover: true
    }, state, ref); // Handle focus events so we can apply highlighted
    // style to the focused option

    const [isFocused, setFocused] = React.useState(false);
    const {
      focusProps
    } = interactions.useFocus({
      onFocusChange: setFocused
    });
    let props = {};

    if (item.props.onPress) {
      props = utils$1.mergeProps(optionProps, focusProps, {
        onClick: () => {
          if (isDisabled) return;
          item.props.onPress();
          state.close();
        },
        onKeyUp: e => {
          if (e.key === 'Enter') {
            if (isDisabled) return;
            item.props.onPress();
            state.close();
          }
        },
        onKeyDown: null,
        onMouseDown: null,
        onPointerDown: null,
        onPointerUp: null
      });
    } else {
      props = utils$1.mergeProps(optionProps, focusProps);
    }

    return React__default.createElement(MenuItem, Object.assign({}, props, {
      ref: ref,
      text: item.rendered,
      checked: !!isSelected,
      disabled: isDisabled,
      meta: item.props.meta,
      __active: isFocused
    }));
  });

  function useControlledState$1(value, defaultValue, onChange) {
    let [stateValue, setStateValue] = React.useState(value || defaultValue);
    let ref = React.useRef(value !== undefined);
    let wasControlled = ref.current;
    let isControlled = value !== undefined; // Internal state reference for useCallback

    let stateRef = React.useRef(stateValue);

    if (wasControlled !== isControlled) {
      console.warn("WARN: A component changed from " + (wasControlled ? 'controlled' : 'uncontrolled') + " to " + (isControlled ? 'controlled' : 'uncontrolled') + ".");
    }

    ref.current = isControlled;
    let setValue = React.useCallback(function (value) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      let onChangeCaller = function onChangeCaller(value) {
        if (onChange) {
          if (!Object.is(stateRef.current, value)) {
            for (var _len2 = arguments.length, onChangeArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              onChangeArgs[_key2 - 1] = arguments[_key2];
            }

            onChange(value, ...onChangeArgs);
          }
        }

        if (!isControlled) {
          stateRef.current = value;
        }
      };

      if (typeof value === 'function') {
        // this supports functional updates https://reactjs.org/docs/hooks-reference.html#functional-updates
        // when someone using useControlledState calls setControlledState(myFunc)
        // this will call our useState setState with a function as well which invokes myFunc and calls onChange with the value from myFunc
        // if we're in an uncontrolled state, then we also return the value of myFunc which to setState looks as though it was just called with myFunc from the beginning
        // otherwise we just return the controlled value, which won't cause a rerender because React knows to bail out when the value is the same
        let updateFunction = function updateFunction(oldValue) {
          for (var _len3 = arguments.length, functionArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            functionArgs[_key3 - 1] = arguments[_key3];
          }

          let interceptedValue = value(isControlled ? stateRef.current : oldValue, ...functionArgs);
          onChangeCaller(interceptedValue, ...args);

          if (!isControlled) {
            return interceptedValue;
          }

          return oldValue;
        };

        setStateValue(updateFunction);
      } else {
        if (!isControlled) {
          setStateValue(value);
        }

        onChangeCaller(value, ...args);
      }
    }, [isControlled, onChange]); // If a controlled component's value prop changes, we need to update stateRef

    if (isControlled) {
      stateRef.current = value;
    } else {
      value = stateValue;
    }

    return [value, setValue];
  }

  /**
   * Provides state management for toggle components like checkboxes and switches.
   */
  function useToggleState(props) {
    if (props === void 0) {
      props = {};
    }

    let {
      isReadOnly,
      onChange
    } = props; // have to provide an empty function so useControlledState doesn't throw a fit
    // can't use useControlledState's prop calling because we need the event object from the change

    let [isSelected, setSelected] = useControlledState$1(props.isSelected, props.defaultSelected || false, () => {});

    function updateSelected(value) {
      if (!isReadOnly) {
        setSelected(value);

        if (onChange) {
          onChange(value);
        }
      }
    }

    function toggleState() {
      if (!isReadOnly) {
        setSelected(prev => {
          let newVal = !prev;

          if (onChange) {
            onChange(newVal);
          }

          return newVal;
        });
      }
    }

    return {
      isSelected,
      setSelected: updateSelected,
      toggle: toggleState
    };
  }

  const sizes$7 = {
    lg: {
      width: 12,
      height: 6,
      fontSize: 'lg'
    },
    md: {
      width: 10,
      height: 5,
      fontSize: 'sm'
    },
    sm: {
      width: 8,
      height: 4,
      fontSize: '2xs'
    }
  };

  const defaultElement$a = 'input';
  const Switch = React.memo(React.forwardRef((_a, ref) => {
    var {
      size = 'md',
      showIcon = false,
      className,
      isDisabled,
      isSelected,
      defaultSelected,
      onChange
    } = _a,
        props = tslib.__rest(_a, ["size", "showIcon", "className", "isDisabled", "isSelected", "defaultSelected", "onChange"]);

    const isDark = useThemeIsDark();
    const state = useToggleState(Object.assign({
      onChange,
      isSelected,
      defaultSelected
    }, props));
    const {
      inputProps
    } = _switch.useSwitch(Object.assign({
      isDisabled
    }, props), state, ref);
    const {
      matchedProps,
      remainingProps
    } = splitBoxProps(props);
    let disabledProps = {};

    if (isDisabled) {
      disabledProps = {
        bg: isDark ? 'canvas-100' : 'canvas-200',
        cursor: 'not-allowed'
      };
    }

    const checkboxProps = utils$1.mergeProps(inputProps, {
      color: undefined
    });
    return React__default.createElement(Box, Object.assign({
      ref: ref,
      className: cn('sl-switch', className),
      h: sizes$7[size].height,
      w: sizes$7[size].width,
      fontSize: sizes$7[size].fontSize,
      pos: "relative",
      display: "block",
      userSelect: "none"
    }, matchedProps, remainingProps), React__default.createElement(Box, {
      as: "label",
      pos: "absolute",
      w: "full",
      h: "full"
    }, React__default.createElement(Box, Object.assign({
      as: defaultElement$a,
      pos: "absolute",
      m: 0,
      zIndex: -1,
      top: 0,
      left: 0,
      opacity: 0,
      disabled: isDisabled
    }, checkboxProps)), React__default.createElement(Box, Object.assign({
      as: "span",
      cursor: "pointer",
      className: "sl-switch__indicator",
      rounded: "full",
      w: "full",
      h: "full",
      display: "block",
      bg: isDark ? 'canvas-50' : 'canvas-500'
    }, disabledProps), showIcon && React__default.createElement(Flex, {
      className: "sl-switch__icon",
      pos: "absolute",
      align: "center",
      style: {
        top: 0,
        bottom: 0,
        left: 0,
        lineHeight: 1
      },
      pl: 1,
      color: isDark ? 'body' : 'canvas-pure'
    }, React__default.createElement(Icon, {
      icon: "check",
      fixedWidth: true
    })))));
  }));

  function Item(props) {
    return null;
  }

  Item.getCollectionNode = function* getCollectionNode(props, context) {
    let {
      childItems,
      title,
      children
    } = props;
    let rendered = props.title || props.children;
    let textValue = props.textValue || (typeof rendered === 'string' ? rendered : '') || props['aria-label'] || '';

    if (!textValue && !(context === null || context === void 0 ? void 0 : context.suppressTextValueWarning)) {
      console.warn('<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop.');
    }

    yield {
      // This is the key difference - allows us to use `id` or `value` as the key, rather than just `key`
      key: props.id || props.value,
      type: 'item',
      props: props,
      rendered,
      textValue,
      'aria-label': props['aria-label'],
      hasChildNodes: hasChildItems(props),

      *childNodes() {
        if (childItems) {
          for (let child of childItems) {
            yield {
              type: 'item',
              value: child
            };
          }
        } else if (title) {
          let items = [];
          React__default.Children.forEach(children, child => {
            items.push({
              type: 'item',
              element: child
            });
          });
          yield* items;
        }
      }

    };
  };

  function hasChildItems(props) {
    if (props.hasChildItems != null) {
      return props.hasChildItems;
    }

    if (props.childItems) {
      return true;
    }

    if (props.title && React__default.Children.count(props.children) > 0) {
      return true;
    }

    return false;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  // https://en.wikipedia.org/wiki/Right-to-left
  const $d26e725ad56fbcb2c25f52b7de27$var$RTL_SCRIPTS = new Set(['Arab', 'Syrc', 'Samr', 'Mand', 'Thaa', 'Mend', 'Nkoo', 'Adlm', 'Rohg', 'Hebr']);
  const $d26e725ad56fbcb2c25f52b7de27$var$RTL_LANGS = new Set(['ae', 'ar', 'arc', 'bcc', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he', 'ku', 'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi']);
  /**
   * Determines if a locale is read right to left using [Intl.Locale]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale}.
   */

  function $d26e725ad56fbcb2c25f52b7de27$export$isRTL(locale) {
    // If the Intl.Locale API is available, use it to get the script for the locale.
    // This is more accurate than guessing by language, since languages can be written in multiple scripts.
    // @ts-ignore
    if (Intl.Locale) {
      // @ts-ignore
      let script = new Intl.Locale(locale).maximize().script;
      return $d26e725ad56fbcb2c25f52b7de27$var$RTL_SCRIPTS.has(script);
    } // If not, just guess by the language (first part of the locale)


    let lang = locale.split('-')[0];
    return $d26e725ad56fbcb2c25f52b7de27$var$RTL_LANGS.has(lang);
  }

  /**
   * Gets the locale setting of the browser.
   */
  function $e851d0b81d46abd5f971c8e95c27f1$export$getDefaultLocale() {
    // @ts-ignore
    let locale = typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage) || 'en-US';
    return {
      locale,
      direction: $d26e725ad56fbcb2c25f52b7de27$export$isRTL(locale) ? 'rtl' : 'ltr'
    };
  }

  let $e851d0b81d46abd5f971c8e95c27f1$var$currentLocale = $e851d0b81d46abd5f971c8e95c27f1$export$getDefaultLocale();
  let $e851d0b81d46abd5f971c8e95c27f1$var$listeners = new Set();

  function $e851d0b81d46abd5f971c8e95c27f1$var$updateLocale() {
    $e851d0b81d46abd5f971c8e95c27f1$var$currentLocale = $e851d0b81d46abd5f971c8e95c27f1$export$getDefaultLocale();

    for (let listener of $e851d0b81d46abd5f971c8e95c27f1$var$listeners) {
      listener($e851d0b81d46abd5f971c8e95c27f1$var$currentLocale);
    }
  }
  /**
   * Returns the current browser/system language, and updates when it changes.
   */


  function $e851d0b81d46abd5f971c8e95c27f1$export$useDefaultLocale() {
    let isSSR = ssr.useIsSSR();
    let [defaultLocale, setDefaultLocale] = React.useState($e851d0b81d46abd5f971c8e95c27f1$var$currentLocale);
    React.useEffect(() => {
      if ($e851d0b81d46abd5f971c8e95c27f1$var$listeners.size === 0) {
        window.addEventListener('languagechange', $e851d0b81d46abd5f971c8e95c27f1$var$updateLocale);
      }

      $e851d0b81d46abd5f971c8e95c27f1$var$listeners.add(setDefaultLocale);
      return () => {
        $e851d0b81d46abd5f971c8e95c27f1$var$listeners.delete(setDefaultLocale);

        if ($e851d0b81d46abd5f971c8e95c27f1$var$listeners.size === 0) {
          window.removeEventListener('languagechange', $e851d0b81d46abd5f971c8e95c27f1$var$updateLocale);
        }
      };
    }, []); // We cannot determine the browser's language on the server, so default to
    // en-US. This will be updated after hydration on the client to the correct value.

    if (isSSR) {
      return {
        locale: 'en-US',
        direction: 'ltr'
      };
    }

    return defaultLocale;
  }

  const $cff8541df3b5c83067b2ab3ee0d20$var$I18nContext = React__default.createContext(null);
  /**
   * Returns the current locale and layout direction.
   */

  function useLocale() {
    let defaultLocale = $e851d0b81d46abd5f971c8e95c27f1$export$useDefaultLocale();
    let context = React.useContext($cff8541df3b5c83067b2ab3ee0d20$var$I18nContext);
    return context || defaultLocale;
  }

  /**
   * Handles typeahead interactions with collections.
   */
  function useTypeSelect(options) {
    let {
      keyboardDelegate,
      selectionManager,
      onTypeSelect
    } = options;
    let state = React.useRef({
      search: '',
      timeout: null
    }).current;

    let onKeyDown = e => {
      let character = $c78d7fa5f7d5832f9b4f97b33a679865$var$getStringForKey(e.key);

      if (!character || e.ctrlKey || e.metaKey) {
        return;
      } // Do not propagate the Spacebar event if it's meant to be part of the search.
      // When we time out, the search term becomes empty, hence the check on length.
      // Trimming is to account for the case of pressing the Spacebar more than once,
      // which should cycle through the selection/deselection of the focused item.


      if (character === ' ' && state.search.trim().length > 0) {
        e.preventDefault();

        if (!('continuePropagation' in e)) {
          e.stopPropagation();
        }
      }

      state.search += character; // Use the delegate to find a key to focus.
      // Prioritize items after the currently focused item, falling back to searching the whole list.

      let key = keyboardDelegate.getKeyForSearch(state.search, selectionManager.focusedKey); // If no key found, search from the top.

      if (key == null) {
        key = keyboardDelegate.getKeyForSearch(state.search);
      }

      if (key != null) {
        selectionManager.setFocusedKey(key);

        if (onTypeSelect) {
          onTypeSelect(key);
        }
      }

      clearTimeout(state.timeout);
      state.timeout = setTimeout(() => {
        state.search = '';
      }, 500);
    };

    return {
      typeSelectProps: {
        // Using a capturing listener to catch the keydown event before
        // other hooks in order to handle the Spacebar event.
        onKeyDownCapture: keyboardDelegate.getKeyForSearch ? onKeyDown : null
      }
    };
  }

  function $c78d7fa5f7d5832f9b4f97b33a679865$var$getStringForKey(key) {
    // If the key is of length 1, it is an ASCII value.
    // Otherwise, if there are no ASCII characters in the key name,
    // it is a Unicode character.
    // See https://www.w3.org/TR/uievents-key/
    if (key.length === 1 || !/^[A-Z]/i.test(key)) {
      return key;
    }

    return '';
  }

  function $a9b9aa71af07c56ab1d89ca45381f4b$var$isCtrlKeyPressed(e) {
    if (utils$1.isMac()) {
      return e.metaKey;
    }

    return e.ctrlKey;
  }

  /**
   * Handles interactions with selectable collections.
   */
  function useSelectableCollection(options) {
    let {
      selectionManager: manager,
      keyboardDelegate: delegate,
      ref,
      autoFocus = false,
      shouldFocusWrap = false,
      disallowEmptySelection = false,
      disallowSelectAll = false,
      selectOnFocus = false,
      disallowTypeAhead = false,
      shouldUseVirtualFocus,
      allowsTabNavigation = false
    } = options;
    let {
      direction
    } = useLocale();

    let onKeyDown = e => {
      // Let child element (e.g. menu button) handle the event if the Alt key is pressed.
      // Keyboard events bubble through portals. Don't handle keyboard events
      // for elements outside the collection (e.g. menus).
      if (e.altKey || !ref.current.contains(e.target)) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          {
            if (delegate.getKeyBelow) {
              e.preventDefault();
              let nextKey = manager.focusedKey != null ? delegate.getKeyBelow(manager.focusedKey) : delegate.getFirstKey();

              if (nextKey != null) {
                manager.setFocusedKey(nextKey);

                if (manager.selectionMode === 'single' && selectOnFocus) {
                  manager.replaceSelection(nextKey);
                }
              } else if (shouldFocusWrap) {
                let wrapKey = delegate.getFirstKey(manager.focusedKey);
                manager.setFocusedKey(wrapKey);

                if (manager.selectionMode === 'single' && selectOnFocus) {
                  manager.replaceSelection(wrapKey);
                }
              }

              if (e.shiftKey && manager.selectionMode === 'multiple') {
                manager.extendSelection(nextKey);
              }
            }

            break;
          }

        case 'ArrowUp':
          {
            if (delegate.getKeyAbove) {
              e.preventDefault();
              let nextKey = manager.focusedKey != null ? delegate.getKeyAbove(manager.focusedKey) : delegate.getLastKey();

              if (nextKey != null) {
                manager.setFocusedKey(nextKey);

                if (manager.selectionMode === 'single' && selectOnFocus) {
                  manager.replaceSelection(nextKey);
                }
              } else if (shouldFocusWrap) {
                let wrapKey = delegate.getLastKey(manager.focusedKey);
                manager.setFocusedKey(wrapKey);

                if (manager.selectionMode === 'single' && selectOnFocus) {
                  manager.replaceSelection(wrapKey);
                }
              }

              if (e.shiftKey && manager.selectionMode === 'multiple') {
                manager.extendSelection(nextKey);
              }
            }

            break;
          }

        case 'ArrowLeft':
          {
            if (delegate.getKeyLeftOf) {
              e.preventDefault();
              let nextKey = delegate.getKeyLeftOf(manager.focusedKey);

              if (nextKey != null) {
                manager.setFocusedKey(nextKey, direction === 'rtl' ? 'first' : 'last');

                if (manager.selectionMode === 'single' && selectOnFocus) {
                  manager.replaceSelection(nextKey);
                }
              }

              if (e.shiftKey && manager.selectionMode === 'multiple') {
                manager.extendSelection(nextKey);
              }
            }

            break;
          }

        case 'ArrowRight':
          {
            if (delegate.getKeyRightOf) {
              e.preventDefault();
              let nextKey = delegate.getKeyRightOf(manager.focusedKey);

              if (nextKey != null) {
                manager.setFocusedKey(nextKey, direction === 'rtl' ? 'last' : 'first');

                if (manager.selectionMode === 'single' && selectOnFocus) {
                  manager.replaceSelection(nextKey);
                }
              }

              if (e.shiftKey && manager.selectionMode === 'multiple') {
                manager.extendSelection(nextKey);
              }
            }

            break;
          }

        case 'Home':
          if (delegate.getFirstKey) {
            e.preventDefault();
            let firstKey = delegate.getFirstKey(manager.focusedKey, $a9b9aa71af07c56ab1d89ca45381f4b$var$isCtrlKeyPressed(e));
            manager.setFocusedKey(firstKey);

            if (manager.selectionMode === 'single' && selectOnFocus) {
              manager.replaceSelection(firstKey);
            }

            if ($a9b9aa71af07c56ab1d89ca45381f4b$var$isCtrlKeyPressed(e) && e.shiftKey && manager.selectionMode === 'multiple') {
              manager.extendSelection(firstKey);
            }
          }

          break;

        case 'End':
          if (delegate.getLastKey) {
            e.preventDefault();
            let lastKey = delegate.getLastKey(manager.focusedKey, $a9b9aa71af07c56ab1d89ca45381f4b$var$isCtrlKeyPressed(e));
            manager.setFocusedKey(lastKey);

            if (manager.selectionMode === 'single' && selectOnFocus) {
              manager.replaceSelection(lastKey);
            }

            if ($a9b9aa71af07c56ab1d89ca45381f4b$var$isCtrlKeyPressed(e) && e.shiftKey && manager.selectionMode === 'multiple') {
              manager.extendSelection(lastKey);
            }
          }

          break;

        case 'PageDown':
          if (delegate.getKeyPageBelow) {
            e.preventDefault();
            let nextKey = delegate.getKeyPageBelow(manager.focusedKey);

            if (nextKey != null) {
              manager.setFocusedKey(nextKey);

              if (e.shiftKey && manager.selectionMode === 'multiple') {
                manager.extendSelection(nextKey);
              }
            }
          }

          break;

        case 'PageUp':
          if (delegate.getKeyPageAbove) {
            e.preventDefault();
            let nextKey = delegate.getKeyPageAbove(manager.focusedKey);

            if (nextKey != null) {
              manager.setFocusedKey(nextKey);

              if (e.shiftKey && manager.selectionMode === 'multiple') {
                manager.extendSelection(nextKey);
              }
            }
          }

          break;

        case 'a':
          if ($a9b9aa71af07c56ab1d89ca45381f4b$var$isCtrlKeyPressed(e) && manager.selectionMode === 'multiple' && disallowSelectAll !== true) {
            e.preventDefault();
            manager.selectAll();
          }

          break;

        case 'Escape':
          e.preventDefault();

          if (!disallowEmptySelection) {
            manager.clearSelection();
          }

          break;

        case 'Tab':
          {
            if (!allowsTabNavigation) {
              // There may be elements that are "tabbable" inside a collection (e.g. in a grid cell).
              // However, collections should be treated as a single tab stop, with arrow key navigation internally.
              // We don't control the rendering of these, so we can't override the tabIndex to prevent tabbing.
              // Instead, we handle the Tab key, and move focus manually to the first/last tabbable element
              // in the collection, so that the browser default behavior will apply starting from that element
              // rather than the currently focused one.
              if (e.shiftKey) {
                ref.current.focus();
              } else {
                let walker = focus.getFocusableTreeWalker(ref.current, {
                  tabbable: true
                });
                let next;
                let last;

                do {
                  last = walker.lastChild();

                  if (last) {
                    next = last;
                  }
                } while (last);

                if (next && !next.contains(document.activeElement)) {
                  next.focus();
                }
              }

              break;
            }
          }
      }
    };

    let onFocus = e => {
      if (manager.isFocused) {
        // If a focus event bubbled through a portal, reset focus state.
        if (!e.currentTarget.contains(e.target)) {
          manager.setFocused(false);
        }

        return;
      } // Focus events can bubble through portals. Ignore these events.


      if (!e.currentTarget.contains(e.target)) {
        return;
      }

      manager.setFocused(true);

      if (manager.focusedKey == null) {
        // If the user hasn't yet interacted with the collection, there will be no focusedKey set.
        // Attempt to detect whether the user is tabbing forward or backward into the collection
        // and either focus the first or last item accordingly.
        let relatedTarget = e.relatedTarget;

        if (relatedTarget && e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) {
          var _manager$lastSelected;

          manager.setFocusedKey((_manager$lastSelected = manager.lastSelectedKey) != null ? _manager$lastSelected : delegate.getLastKey());
        } else {
          var _manager$firstSelecte;

          manager.setFocusedKey((_manager$firstSelecte = manager.firstSelectedKey) != null ? _manager$firstSelecte : delegate.getFirstKey());
        }
      }
    };

    let onBlur = e => {
      // Don't set blurred and then focused again if moving focus within the collection.
      if (!e.currentTarget.contains(e.relatedTarget)) {
        manager.setFocused(false);
      }
    };

    React.useEffect(() => {
      if (autoFocus) {
        let focusedKey = null; // Check focus strategy to determine which item to focus

        if (autoFocus === 'first') {
          focusedKey = delegate.getFirstKey();
        }

        if (autoFocus === 'last') {
          focusedKey = delegate.getLastKey();
        } // If there are any selected keys, make the first one the new focus target


        let selectedKeys = manager.selectedKeys;

        if (selectedKeys.size) {
          focusedKey = selectedKeys.values().next().value;
        }

        manager.setFocused(true);
        manager.setFocusedKey(focusedKey); // If no default focus key is selected, focus the collection itself.

        if (focusedKey == null && !shouldUseVirtualFocus) {
          focus.focusSafely(ref.current);
        }
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);
    let handlers = {
      // We use a capturing listener to ensure that the keyboard events for the collection
      // override those of the children. For example, ArrowDown in a table should always go
      // to the cell below, and not open a menu.
      onKeyDown,
      onFocus,
      onBlur,

      onMouseDown(e) {
        // Prevent focus going to the collection when clicking on the scrollbar.
        e.preventDefault();
      }

    };
    let {
      typeSelectProps
    } = useTypeSelect({
      keyboardDelegate: delegate,
      selectionManager: manager
    });

    if (!disallowTypeAhead) {
      handlers = utils$1.mergeProps(typeSelectProps, handlers);
    } // If nothing is focused within the collection, make the collection itself tabbable.
    // This will be marshalled to either the first or last item depending on where focus came from.
    // If using virtual focus, don't set a tabIndex at all so that VoiceOver on iOS 14 doesn't try
    // to move real DOM focus to the element anyway.


    let tabIndex;

    if (!shouldUseVirtualFocus) {
      tabIndex = manager.focusedKey == null ? 0 : -1;
    }

    return {
      collectionProps: _extends({}, handlers, {
        tabIndex
      })
    };
  }

  /**
   * Handles interactions with an item in a selectable collection.
   */
  function useSelectableItem(options) {
    let {
      selectionManager: manager,
      key,
      ref,
      shouldSelectOnPressUp,
      isVirtualized,
      shouldUseVirtualFocus,
      focus: focus$1
    } = options;

    let onSelect = e => manager.select(key, e); // Focus the associated DOM node when this item becomes the focusedKey


    let isFocused = key === manager.focusedKey;
    React.useEffect(() => {
      if (isFocused && manager.isFocused && !shouldUseVirtualFocus && document.activeElement !== ref.current) {
        if (focus$1) {
          focus$1();
        } else {
          focus.focusSafely(ref.current);
        }
      }
    }, [ref, isFocused, manager.focusedKey, manager.childFocusStrategy, manager.isFocused, shouldUseVirtualFocus]); // Set tabIndex to 0 if the element is focused, or -1 otherwise so that only the last focused
    // item is tabbable.  If using virtual focus, don't set a tabIndex at all so that VoiceOver
    // on iOS 14 doesn't try to move real DOM focus to the item anyway.

    let itemProps = {};

    if (!shouldUseVirtualFocus) {
      itemProps = {
        tabIndex: isFocused ? 0 : -1,

        onFocus(e) {
          if (e.target === ref.current) {
            manager.setFocusedKey(key);
          }
        }

      };
    } // By default, selection occurs on pointer down. This can be strange if selecting an
    // item causes the UI to disappear immediately (e.g. menus).
    // If shouldSelectOnPressUp is true, we use onPressUp instead of onPressStart.
    // onPress requires a pointer down event on the same element as pointer up. For menus,
    // we want to be able to have the pointer down on the trigger that opens the menu and
    // the pointer up on the menu item rather than requiring a separate press.
    // For keyboard events, selection still occurs on key down.


    if (shouldSelectOnPressUp) {
      itemProps.onPressStart = e => {
        if (e.pointerType === 'keyboard') {
          onSelect(e);
        }
      };

      itemProps.onPressUp = e => {
        if (e.pointerType !== 'keyboard') {
          onSelect(e);
        }
      };
    } else {
      // On touch, it feels strange to select on touch down, so we special case this.
      itemProps.onPressStart = e => {
        if (e.pointerType !== 'touch') {
          onSelect(e);
        }
      };

      itemProps.onPress = e => {
        if (e.pointerType === 'touch') {
          onSelect(e);
        }
      };
    }

    if (!isVirtualized) {
      itemProps['data-key'] = key;
    }

    return {
      itemProps
    };
  }

  /* eslint-disable no-param-reassign */

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  const tabsIds = new WeakMap();
  function generateId(state, key, role) {
    if (typeof key === 'string') {
      key = key.replace(/\s+/g, '');
    }

    let baseId = tabsIds.get(state);
    return `${baseId}-${role}-${key}`;
  }

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  function useTab(props, state, ref) {
    let {
      key,
      isDisabled: propsDisabled
    } = props;
    let {
      selectionManager: manager,
      selectedKey
    } = state;
    let isSelected = key === selectedKey;
    let {
      itemProps
    } = useSelectableItem({
      selectionManager: manager,
      key,
      ref
    });
    let isDisabled = propsDisabled || state.disabledKeys.has(key);
    let {
      pressProps
    } = interactions.usePress(Object.assign(Object.assign({}, itemProps), {
      isDisabled
    }));
    let tabId = generateId(state, key, 'tab');
    let tabPanelId = generateId(state, key, 'tabpanel');
    let {
      tabIndex
    } = pressProps;
    return {
      tabProps: Object.assign(Object.assign({}, pressProps), {
        id: tabId,
        'aria-selected': isSelected,
        'aria-disabled': isDisabled || undefined,
        'aria-controls': isSelected ? tabPanelId : undefined,
        tabIndex: isDisabled ? undefined : tabIndex,
        role: 'tab'
      })
    };
  }

  /* eslint-disable no-param-reassign */

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  class TabsKeyboardDelegate {
    constructor(collection, direction, orientation, disabledKeys = new Set()) {
      this.collection = collection;
      this.flipDirection = direction === 'rtl' && orientation === 'horizontal';
      this.orientation = orientation;
      this.disabledKeys = disabledKeys;
    }

    getKeyLeftOf(key) {
      if (this.flipDirection) {
        return this.getNextKey(key);
      } else {
        if (this.orientation === 'horizontal') {
          return this.getPreviousKey(key);
        }

        return null;
      }
    }

    getKeyRightOf(key) {
      if (this.flipDirection) {
        return this.getPreviousKey(key);
      } else {
        if (this.orientation === 'horizontal') {
          return this.getNextKey(key);
        }

        return null;
      }
    }

    getKeyAbove(key) {
      if (this.orientation === 'vertical') {
        return this.getPreviousKey(key);
      }

      return null;
    }

    getKeyBelow(key) {
      if (this.orientation === 'vertical') {
        return this.getNextKey(key);
      }

      return null;
    }

    getFirstKey() {
      let key = this.collection.getFirstKey();

      if (this.disabledKeys.has(key)) {
        key = this.getNextKey(key);
      }

      return key;
    }

    getLastKey() {
      let key = this.collection.getLastKey();

      if (this.disabledKeys.has(key)) {
        key = this.getPreviousKey(key);
      }

      return key;
    }

    getNextKey(key) {
      do {
        key = this.collection.getKeyAfter(key);

        if (key == null) {
          key = this.collection.getFirstKey();
        }
      } while (this.disabledKeys.has(key));

      return key;
    }

    getPreviousKey(key) {
      do {
        key = this.collection.getKeyBefore(key);

        if (key == null) {
          key = this.collection.getLastKey();
        }
      } while (this.disabledKeys.has(key));

      return key;
    }

  }

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  function useTabList(props, state, ref) {
    let {
      orientation = 'horizontal',
      keyboardActivation = 'automatic'
    } = props;
    let {
      collection,
      selectionManager: manager,
      disabledKeys
    } = state;
    let {
      direction
    } = useLocale();
    let delegate = React.useMemo(() => new TabsKeyboardDelegate(collection, direction, orientation, disabledKeys), [collection, disabledKeys, orientation, direction]);
    let {
      collectionProps
    } = useSelectableCollection({
      ref,
      selectionManager: manager,
      keyboardDelegate: delegate,
      selectOnFocus: keyboardActivation === 'automatic',
      disallowEmptySelection: true
    }); // Compute base id for all tabs

    let tabsId = utils$1.useId();
    tabsIds.set(state, tabsId);
    let tabListLabelProps = utils$1.useLabels(Object.assign(Object.assign({}, props), {
      id: tabsId
    }));
    return {
      tabListProps: Object.assign(Object.assign({}, utils$1.mergeProps(collectionProps, tabListLabelProps)), {
        role: 'tablist',
        'aria-orientation': orientation,
        tabIndex: undefined
      })
    };
  }

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  function useTabPanel(props, state, ref) {
    let [tabIndex, setTabIndex] = React.useState(0); // The tabpanel should have tabIndex=0 when there are no tabbable elements within it.
    // Otherwise, tabbing from the focused tab should go directly to the first tabbable element
    // within the tabpanel.

    React.useLayoutEffect(() => {
      if (ref === null || ref === void 0 ? void 0 : ref.current) {
        let update = () => {
          // Detect if there are any tabbable elements and update the tabIndex accordingly.
          let walker = focus.getFocusableTreeWalker(ref.current, {
            tabbable: true
          });
          setTabIndex(walker.nextNode() ? undefined : 0);
        };

        update(); // Update when new elements are inserted, or the tabIndex/disabled attribute updates.

        let observer = new MutationObserver(update);
        observer.observe(ref.current, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['tabIndex', 'disabled']
        });
        return () => {
          observer.disconnect();
        };
      }
    }, [ref]);
    return {
      tabPanelProps: utils$1.mergeProps(props, {
        id: generateId(state, state === null || state === void 0 ? void 0 : state.selectedKey, 'tabpanel'),
        'aria-labelledby': generateId(state, state === null || state === void 0 ? void 0 : state.selectedKey, 'tab'),
        tabIndex,
        role: 'tabpanel'
      })
    };
  }

  const TabsContext = React.createContext(null);

  const variants$4 = {
    minimal: {
      horizontal: {
        regular: {
          tabList: {},
          tab: {
            py: 2,
            px: 3
          }
        },
        compact: {
          tabList: {},
          tab: {
            py: 1.5,
            px: 2
          }
        }
      },
      vertical: {
        regular: {
          tabList: {},
          tab: {
            py: 1.5,
            px: 3
          }
        },
        compact: {
          tabList: {},
          tab: {
            py: 1.5,
            px: 3
          }
        }
      }
    },
    line: {
      horizontal: {
        regular: {
          tabList: {
            borderB: 2
          },
          tab: {
            mb: -0.5,
            borderB: 2,
            py: 2,
            px: 4
          }
        },
        compact: {
          tabList: {
            borderB: 2
          },
          tab: {
            mb: -0.5,
            borderB: 2,
            py: 1.5,
            px: 2
          }
        }
      },
      vertical: {
        regular: {
          tabList: {
            borderR: 2
          },
          tab: {
            mr: -0.5,
            borderR: 2,
            py: 2,
            px: 4
          }
        },
        compact: {
          tabList: {
            borderR: 2
          },
          tab: {
            mr: -0.5,
            borderR: 2,
            py: 1.5,
            px: 3
          }
        }
      }
    }
  };

  const Tab = props => React__default.createElement(Item, Object.assign({}, props));
  Tab.getCollectionNode = Item.getCollectionNode;
  function TabImpl(props) {
    const {
      item,
      state,
      density,
      isDisabled: propsDisabled
    } = props;
    const {
      key,
      rendered,
      index
    } = item;
    const isDisabled = propsDisabled || state.disabledKeys.has(key);
    const tabContext = React.useContext(TabsContext);
    const {
      tabsProps
    } = tabContext;
    const {
      appearance,
      orientation
    } = tabsProps;
    const disabledKeys = state.disabledKeys; // sync `isDisabled` prop with tab list state disabled keys

    React__default.useEffect(() => {
      if (propsDisabled && !disabledKeys.has(key)) {
        disabledKeys.add(key);
      } else if (!propsDisabled && disabledKeys.has(key)) {
        disabledKeys.delete(key);
      }
    }, [disabledKeys, propsDisabled, key]);
    const ref = React.useRef();
    const {
      tabProps
    } = useTab({
      key,
      isDisabled
    }, state, ref);
    const {
      hoverProps
    } = interactions.useHover(Object.assign({}, props));
    const isSelected = state.selectedKey === key;

    const _a = utils$1.mergeProps(tabProps, hoverProps),
          propsWithoutColor = tslib.__rest(_a, ["color"]);

    const stateProps = Object.assign({}, variants$4[appearance][orientation][density].tab);

    if (appearance === 'minimal') {
      if (orientation === 'vertical') {
        // @ts-expect-error
        stateProps.ml = -1 * stateProps.px;

        if (index === 0) {
          // @ts-expect-error
          stateProps.mt = -1 * stateProps.py;
        }
      } else {
        if (index === 0) {
          // @ts-expect-error
          stateProps.ml = -1 * stateProps.px;
        }
      }
    } else {
      if (orientation === 'vertical') {
        // @ts-expect-error
        stateProps.ml = -1 * stateProps.px;
      }
    }
    /**
     * If in loading or disabled states, remove other ui effects like hover
     */


    if (isDisabled) {
      for (const i in stateProps) {
        const prop = stateProps[i];

        if (prop && typeof prop === 'object') {
          // remove props immutably
          const _b = stateProps[i],
                newProps = tslib.__rest(_b, ["active", "hover"]);

          stateProps[i] = newProps;
        }
      }
    }

    return React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring"
    }, React__default.createElement(Box, Object.assign({}, propsWithoutColor, {
      ref: ref
    }, stateProps, {
      borderColor: isSelected ? 'primary' : 'transparent',
      cursor: isDisabled ? 'not-allowed' : isSelected ? 'default' : 'pointer',
      fontWeight: "medium",
      opacity: isDisabled ? 60 : undefined,
      color: isSelected ? 'primary-dark' : {
        default: 'muted',
        hover: isDisabled ? undefined : 'body'
      }
    }), rendered));
  }

  /*
   * Copyright 2020 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   */
  function useTabListState(props) {
    let state = list.useSingleSelectListState(Object.assign(Object.assign({}, props), {
      // @ts-ignore
      suppressTextValueWarning: true
    }));
    React.useEffect(() => {
      // Ensure a tab is always selected (in case no selected key was specified or if selected item was deleted from collection)
      let selectedKey = state.selectedKey;

      if (state.selectionManager.isEmpty || !state.collection.getItem(selectedKey)) {
        selectedKey = state.collection.getFirstKey();
        state.selectionManager.replaceSelection(selectedKey);
      }

      if (state.selectionManager.focusedKey == null) {
        state.selectionManager.setFocusedKey(selectedKey);
      }
    }, [state.selectionManager, state.selectedKey, state.collection]);
    return state;
  }

  /**
   * A TabList is used within Tabs to group tabs that a user can switch between.
   * The keys of the items within the <TabList> must match up with a corresponding item inside the <TabPanels>.
   */

  function TabList(_a) {
    var {
      fontSize,
      density = 'regular'
    } = _a,
        props = tslib.__rest(_a, ["fontSize", "density"]);

    const tabContext = React.useContext(TabsContext);
    const {
      refs,
      tabState,
      tabsProps
    } = tabContext;
    const {
      orientation,
      selectedId,
      onChange
    } = tabsProps;
    const {
      collapse,
      setTabListState
    } = tabState;
    const {
      tablistRef
    } = refs;
    const {
      appearance
    } = tabsProps; // Pass original Tab props but override children to create the collection.

    const state = useTabListState(Object.assign(Object.assign({}, tabsProps), {
      selectedKey: onChange ? selectedId : undefined,
      defaultSelectedKey: onChange ? undefined : selectedId,
      onSelectionChange: onChange,
      children: props.children
    }));
    const {
      tabListProps
    } = useTabList(Object.assign(Object.assign({}, tabsProps), props), state, tablistRef);
    React.useEffect(() => {
      // Passing back to root as useTabPanel needs the TabListState
      setTabListState(state); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.disabledKeys, state.selectedItem, state.selectedKey, props.children]);

    const tabListPropsWithoutColor = tslib.__rest(tabListProps, ["color"]);

    const stateProps = Object.assign({}, variants$4[appearance][orientation][density].tabList);
    const tabContent = React__default.createElement(Stack, Object.assign({}, tabListPropsWithoutColor, {
      ref: tablistRef,
      direction: orientation
    }, stateProps, {
      fontSize: fontSize
    }), [...state.collection].map(item => {
      var _a;

      return React__default.createElement(TabImpl, {
        key: item.key,
        item: item,
        state: state,
        density: density,
        isDisabled: (_a = item.props) === null || _a === void 0 ? void 0 : _a.isDisabled
      });
    }));
    return tabContent; // TODO: auto collapse w Select when overflows
    // if (orientation === 'vertical') {
    //   return tabContent;
    // } else {
    //   return (
    //     <div ref={wrapperRef} className={classNames(styles, 'collapseWrapper')}>
    //       {collapse ? (
    //         <Select
    //           {...props}
    //           {...tabProps}
    //           id={tabPanelProps['aria-labelledby']}
    //           state={state}
    //           className={tabListclassName}
    //         />
    //       ) : (
    //         tabContent
    //       )}
    //     </div>
    //   );
    // }
  }

  const TabPanel = props => React.createElement(Item, Object.assign({}, props));
  TabPanel.getCollectionNode = Item.getCollectionNode;

  function TabPanels(_a) {
    var {
      p = 4,
      m
    } = _a,
        props = tslib.__rest(_a, ["p", "m"]);

    const {
      tabState,
      tabPanelProps: ctxTabPanelProps,
      tabsProps
    } = React.useContext(TabsContext);
    const {
      tabListState
    } = tabState;
    const ref = React.useRef();
    const {
      tabPanelProps
    } = useTabPanel({}, tabListState, ref);

    if (ctxTabPanelProps['aria-labelledby']) {
      tabPanelProps['aria-labelledby'] = ctxTabPanelProps['aria-labelledby'];
    }

    const factory = nodes => new list.ListCollection(nodes);

    const collection = collections.useCollection(props, factory, {
      suppressTextValueWarning: true
    });
    const selectedItem = tabListState ? collection.getItem(tabListState.selectedKey) : null;
    const {
      orientation
    } = tabsProps;

    const tabPanelPropsWithoutColor = tslib.__rest(tabPanelProps, ["color"]);

    const py = orientation === 'vertical' ? undefined : p;
    const px = orientation === 'vertical' ? p : undefined;
    return React__default.createElement(focus.FocusRing, {
      focusRingClass: "sl-focus-ring"
    }, React__default.createElement(Box, Object.assign({}, tabPanelPropsWithoutColor, {
      ref: ref,
      py: py,
      px: px,
      flex: 1,
      m: m
    }), selectedItem && selectedItem.props.children));
  }

  const Tabs = React.forwardRef((props, ref) => {
    const {
      children,
      appearance = 'minimal',
      orientation = 'horizontal'
    } = props;
    const domRef = useDOMRef(ref);
    const tablistRef = React.useRef();
    const wrapperRef = React.useRef();
    const [collapse, setCollapse] = utils.useValueEffect(false);
    const [selectedTab, setSelectedTab] = React.useState();
    const [tabListState, setTabListState] = React.useState(null);
    React.useEffect(() => {
      if (tablistRef.current) {
        let selectedTab = tablistRef.current.querySelector(`[data-key="${tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey}"]`);

        if (selectedTab != null) {
          setSelectedTab(selectedTab);
        }
      } // collapse is in the dep array so selectedTab can be updated for TabLine positioning

    }, [children, tabListState === null || tabListState === void 0 ? void 0 : tabListState.selectedKey, collapse, tablistRef]); // TODO: when we add logic to collapse overflow tabs
    // const direction: 'ltr' | 'rtl' = 'ltr';
    // const checkShouldCollapse = React.useCallback(() => {
    //   const computeShouldCollapse = () => {
    //     if (wrapperRef.current) {
    //       const tabsComponent = wrapperRef.current;
    //       const tabs = tablistRef.current.querySelectorAll('[role="tab"]');
    //       const lastTab = tabs[tabs.length - 1];
    //       // @ts-expect-error
    //       const end = direction === 'rtl' ? 'left' : 'right';
    //       const farEdgeTabList = tabsComponent.getBoundingClientRect()[end];
    //       const farEdgeLastTab = lastTab?.getBoundingClientRect()[end];
    //       // @ts-expect-error
    //       const shouldCollapse = direction === 'rtl' ? farEdgeLastTab < farEdgeTabList : farEdgeTabList < farEdgeLastTab;
    //       return shouldCollapse;
    //     }
    //   };
    //   if (orientation !== 'vertical') {
    //     setCollapse(function* () {
    //       // Make Tabs render in non-collapsed state
    //       yield false;
    //       // Compute if Tabs should collapse and update
    //       yield computeShouldCollapse();
    //     });
    //   }
    // }, [tablistRef, wrapperRef, direction, orientation, setCollapse]);
    // React.useEffect(() => {
    //   checkShouldCollapse();
    // }, [children, checkShouldCollapse]);
    // useResizeObserver({ref: wrapperRef, onResize: checkShouldCollapse});

    let tabPanelProps = {
      'aria-labelledby': undefined
    }; // When the tabs are collapsed, the tabPanel should be labelled by the Picker button element.

    let collapsibleTabListId = utils$1.useId();

    if (collapse && orientation !== 'vertical') {
      tabPanelProps['aria-labelledby'] = collapsibleTabListId;
    }

    return React.createElement(NoSsr, null, React.createElement(TabsContext.Provider, {
      value: {
        tabsProps: Object.assign(Object.assign({}, props), {
          orientation,
          appearance
        }),
        tabState: {
          tabListState,
          setTabListState,
          selectedTab,
          collapse
        },
        refs: {
          tablistRef,
          wrapperRef
        },
        tabPanelProps
      }
    }, React.createElement(Stack, {
      ref: domRef,
      w: "full",
      direction: orientation === 'vertical' ? 'horizontal' : 'vertical'
    }, props.children)));
  });

  const TOOLTIP_DELAY = 500;
  const TOOLTIP_OFFSET = 8;
  const Tooltip = props => {
    const {
      renderTrigger,
      children,
      placement,
      isOpen,
      defaultOpen,
      onOpen,
      onClose,
      delay = TOOLTIP_DELAY,
      offset = TOOLTIP_OFFSET,
      crossOffset,
      isDisabled,
      shouldFlip = true,
      hideArrow
    } = props;
    const overlayRef = React.useRef();
    const tooltipTriggerRef = React.useRef();

    const _triggerRef = React.useRef();

    const focusableTriggerRef = utils.useFocusableRef(props.triggerRef || _triggerRef); // should not need to call this, keep an eye on https://github.com/adobe/react-spectrum/issues/1175#issuecomment-712565101

    interactions.useInteractionModality();
    const onOpenChange = React.useCallback($isOpen => {
      if ($isOpen && onOpen) onOpen();
      if (!$isOpen && onClose) onClose();
    }, [onClose, onOpen]);
    let state = tooltip$1.useTooltipTriggerState({
      isOpen,
      defaultOpen,
      delay,
      isDisabled,
      onOpenChange
    }); // Get props for the trigger and overlay. This also handles
    // hiding the overlay when a parent element of the trigger scrolls
    // (which invalidates the popover positioning).

    let {
      triggerProps,
      tooltipProps
    } = tooltip.useTooltipTrigger({
      isDisabled
    }, state, tooltipTriggerRef); // Get popover positioning props relative to the trigger

    let {
      overlayProps: positionProps
    } = overlays.useOverlayPosition({
      targetRef: tooltipTriggerRef,
      overlayRef,
      placement,
      offset,
      crossOffset,
      shouldFlip,
      isOpen: state.isOpen,
      onClose
    });
    return React__default.createElement(focus.FocusableProvider, Object.assign({}, triggerProps, {
      ref: tooltipTriggerRef
    }), React__default.cloneElement(runIfFn(renderTrigger, {
      isOpen: state.isOpen
    }), {
      ref: focusableTriggerRef
    }), React__default.createElement(_Overlay, {
      isOpen: state.isOpen
    }, React__default.createElement(TooltipWrapper, Object.assign({}, tooltipProps, positionProps, {
      placement: placement,
      ref: overlayRef,
      state: state,
      hideArrow: hideArrow
    }), runIfFn(children, {
      close: state.close
    }))));
  };
  const TooltipWrapper = React.forwardRef((_a, ref) => {
    var {
      children,
      state,
      style,
      placement,
      hideArrow
    } = _a,
        otherProps = tslib.__rest(_a, ["children", "state", "style", "placement", "hideArrow"]);

    const isDark = useThemeIsDark(); // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal. Using expect-error so that we know when to remove this
    // @ts-expect-error useTooltip typing is incorrect, state is expected

    let {
      tooltipProps
    } = tooltip.useTooltip({
      children
    }, state);

    const _b = utils$1.mergeProps(tooltipProps, otherProps),
          containerProps = tslib.__rest(_b, ["color"]);

    return React__default.createElement(Box, Object.assign({}, containerProps, {
      style: style,
      ref: ref,
      "data-testid": "tooltip",
      "data-theme": "dark"
    }), React__default.createElement(Box, {
      bg: isDark ? 'canvas-dialog' : 'canvas-pure',
      rounded: true,
      boxShadow: "lg",
      fontSize: "sm",
      py: 1,
      px: 1.5
    }, !hideArrow && React__default.createElement(TooltipArrow, {
      placement: placement
    }), children));
  });

  const TooltipArrow = ({
    placement
  }) => {
    const isDark = useThemeIsDark();
    const arrowProps = computeArrowPosition(placement);
    return React__default.createElement(Box, {
      pos: "absolute",
      color: isDark ? 'canvas-dialog' : 'canvas-pure',
      style: arrowProps.style
    }, React__default.createElement(Icon, {
      icon: arrowProps.icon
    }));
  };

  const computeArrowPosition = placement => {
    // just in case... provide default
    const [first, second] = (placement || 'bottom').split(' ');
    let icon = 'caret-up';
    const style = {
      fontSize: 16,
      lineHeight: 0
    };

    switch (first) {
      case 'bottom':
        style.top = -10;
        style.marginLeft = -5;
        break;

      case 'top':
        style.bottom = -10;
        style.marginLeft = -5;
        icon = 'caret-down';
        break;

      case 'left':
        style.right = -5;
        style.marginTop = -8;
        icon = 'caret-right';
        break;

      case 'right':
        style.left = -5;
        style.marginTop = -8;
        icon = 'caret-left';
        break;

      default:
        console.warn("Hey, you're using an invalid placement prop! Check out the docs for appropriate usage, or remove it.");
    }

    switch (second) {
      case 'bottom':
        style.bottom = '10%';
        style.marginTop = undefined;
        break;

      case 'top':
        style.top = '10%';
        style.marginTop = undefined;
        break;

      case 'left':
        style.left = '10%';
        style.marginLeft = undefined;
        break;

      case 'right':
        style.right = '10%';
        style.marginLeft = undefined;
        break;

      default:
        if (first === 'top' || first === 'bottom') {
          style.left = '50%';
        } else {
          style.top = '50%';
        }

    }

    return {
      icon,
      style
    };
  };

  const TreeItem = props => {
    return React.createElement("div", Object.assign({}, props));
  };

  var css = "blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:initial;background-image:none}:focus{outline:none}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:var(--font-ui);line-height:1.5}body{font-family:inherit;line-height:inherit;min-height:100vh;text-rendering:optimizeSpeed;margin:0}*,:after,:before{box-sizing:border-box;border:0 solid var(--color-border,currentColor)}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-ms-input-placeholder,textarea::-ms-input-placeholder{color:#a1a1aa}input::placeholder,textarea::placeholder{color:#a1a1aa}[role=button],button{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}code,kbd,pre,samp{font-family:var(--font-mono)}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}button{font-family:var(--font-ui)}select{-moz-appearance:none;-webkit-appearance:none}select::-ms-expand{display:none}select{font-size:inherit}iframe{border:0}@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}.sl-content-center{align-content:center}.sl-content-start{align-content:flex-start}.sl-content-end{align-content:flex-end}.sl-content-between{align-content:space-between}.sl-content-around{align-content:space-around}.sl-content-evenly{align-content:space-evenly}.sl-items-start{align-items:flex-start}.sl-items-end{align-items:flex-end}.sl-items-center{align-items:center}.sl-items-baseline{align-items:baseline}.sl-items-stretch{align-items:stretch}.sl-self-auto{align-self:auto}.sl-self-start{align-self:flex-start}.sl-self-end{align-self:flex-end}.sl-self-center{align-self:center}.sl-self-stretch{align-self:stretch}.sl-bg-transparent{background-color:initial}.sl-bg-current{background-color:currentColor}.sl-bg-lighten-100{background-color:var(--color-lighten-100)}.sl-bg-darken-100{background-color:var(--color-darken-100)}.sl-bg-primary{background-color:var(--color-primary)}.sl-bg-primary-tint{background-color:var(--color-primary-tint)}.sl-bg-primary-light{background-color:var(--color-primary-light)}.sl-bg-primary-dark{background-color:var(--color-primary-dark)}.sl-bg-primary-darker{background-color:var(--color-primary-darker)}.sl-bg-success{background-color:var(--color-success)}.sl-bg-success-tint{background-color:var(--color-success-tint)}.sl-bg-success-light{background-color:var(--color-success-light)}.sl-bg-success-dark{background-color:var(--color-success-dark)}.sl-bg-success-darker{background-color:var(--color-success-darker)}.sl-bg-warning{background-color:var(--color-warning)}.sl-bg-warning-tint{background-color:var(--color-warning-tint)}.sl-bg-warning-light{background-color:var(--color-warning-light)}.sl-bg-warning-dark{background-color:var(--color-warning-dark)}.sl-bg-warning-darker{background-color:var(--color-warning-darker)}.sl-bg-danger{background-color:var(--color-danger)}.sl-bg-danger-tint{background-color:var(--color-danger-tint)}.sl-bg-danger-light{background-color:var(--color-danger-light)}.sl-bg-danger-dark{background-color:var(--color-danger-dark)}.sl-bg-danger-darker{background-color:var(--color-danger-darker)}.sl-bg-code{background-color:var(--color-code)}.sl-bg-on-code{background-color:var(--color-on-code)}.sl-bg-on-primary{background-color:var(--color-on-primary)}.sl-bg-on-success{background-color:var(--color-on-success)}.sl-bg-on-warning{background-color:var(--color-on-warning)}.sl-bg-on-danger{background-color:var(--color-on-danger)}.sl-bg-canvas-50{background-color:var(--color-canvas-50)}.sl-bg-canvas-100{background-color:var(--color-canvas-100)}.sl-bg-canvas-200{background-color:var(--color-canvas-200)}.sl-bg-canvas-300{background-color:var(--color-canvas-300)}.sl-bg-canvas-400{background-color:var(--color-canvas-400)}.sl-bg-canvas-500{background-color:var(--color-canvas-500)}.sl-bg-canvas-pure{background-color:var(--color-canvas-pure)}.sl-bg-canvas{background-color:var(--color-canvas)}.sl-bg-canvas-tint{background-color:var(--color-canvas-tint)}.sl-bg-canvas-dialog{background-color:var(--color-canvas-dialog)}.sl-bg-body{background-color:var(--color-text)}.sl-bg-body-muted{background-color:var(--color-text-muted)}.sl-bg-body-light{background-color:var(--color-text-light)}.hover\\:sl-bg-transparent:hover{background-color:initial}.hover\\:sl-bg-current:hover{background-color:currentColor}.hover\\:sl-bg-lighten-100:hover{background-color:var(--color-lighten-100)}.hover\\:sl-bg-darken-100:hover{background-color:var(--color-darken-100)}.hover\\:sl-bg-primary:hover{background-color:var(--color-primary)}.hover\\:sl-bg-primary-tint:hover{background-color:var(--color-primary-tint)}.hover\\:sl-bg-primary-light:hover{background-color:var(--color-primary-light)}.hover\\:sl-bg-primary-dark:hover{background-color:var(--color-primary-dark)}.hover\\:sl-bg-primary-darker:hover{background-color:var(--color-primary-darker)}.hover\\:sl-bg-success:hover{background-color:var(--color-success)}.hover\\:sl-bg-success-tint:hover{background-color:var(--color-success-tint)}.hover\\:sl-bg-success-light:hover{background-color:var(--color-success-light)}.hover\\:sl-bg-success-dark:hover{background-color:var(--color-success-dark)}.hover\\:sl-bg-success-darker:hover{background-color:var(--color-success-darker)}.hover\\:sl-bg-warning:hover{background-color:var(--color-warning)}.hover\\:sl-bg-warning-tint:hover{background-color:var(--color-warning-tint)}.hover\\:sl-bg-warning-light:hover{background-color:var(--color-warning-light)}.hover\\:sl-bg-warning-dark:hover{background-color:var(--color-warning-dark)}.hover\\:sl-bg-warning-darker:hover{background-color:var(--color-warning-darker)}.hover\\:sl-bg-danger:hover{background-color:var(--color-danger)}.hover\\:sl-bg-danger-tint:hover{background-color:var(--color-danger-tint)}.hover\\:sl-bg-danger-light:hover{background-color:var(--color-danger-light)}.hover\\:sl-bg-danger-dark:hover{background-color:var(--color-danger-dark)}.hover\\:sl-bg-danger-darker:hover{background-color:var(--color-danger-darker)}.hover\\:sl-bg-code:hover{background-color:var(--color-code)}.hover\\:sl-bg-on-code:hover{background-color:var(--color-on-code)}.hover\\:sl-bg-on-primary:hover{background-color:var(--color-on-primary)}.hover\\:sl-bg-on-success:hover{background-color:var(--color-on-success)}.hover\\:sl-bg-on-warning:hover{background-color:var(--color-on-warning)}.hover\\:sl-bg-on-danger:hover{background-color:var(--color-on-danger)}.hover\\:sl-bg-canvas-50:hover{background-color:var(--color-canvas-50)}.hover\\:sl-bg-canvas-100:hover{background-color:var(--color-canvas-100)}.hover\\:sl-bg-canvas-200:hover{background-color:var(--color-canvas-200)}.hover\\:sl-bg-canvas-300:hover{background-color:var(--color-canvas-300)}.hover\\:sl-bg-canvas-400:hover{background-color:var(--color-canvas-400)}.hover\\:sl-bg-canvas-500:hover{background-color:var(--color-canvas-500)}.hover\\:sl-bg-canvas-pure:hover{background-color:var(--color-canvas-pure)}.hover\\:sl-bg-canvas:hover{background-color:var(--color-canvas)}.hover\\:sl-bg-canvas-tint:hover{background-color:var(--color-canvas-tint)}.hover\\:sl-bg-canvas-dialog:hover{background-color:var(--color-canvas-dialog)}.hover\\:sl-bg-body:hover{background-color:var(--color-text)}.hover\\:sl-bg-body-muted:hover{background-color:var(--color-text-muted)}.hover\\:sl-bg-body-light:hover{background-color:var(--color-text-light)}.focus\\:sl-bg-transparent:focus{background-color:initial}.focus\\:sl-bg-current:focus{background-color:currentColor}.focus\\:sl-bg-lighten-100:focus{background-color:var(--color-lighten-100)}.focus\\:sl-bg-darken-100:focus{background-color:var(--color-darken-100)}.focus\\:sl-bg-primary:focus{background-color:var(--color-primary)}.focus\\:sl-bg-primary-tint:focus{background-color:var(--color-primary-tint)}.focus\\:sl-bg-primary-light:focus{background-color:var(--color-primary-light)}.focus\\:sl-bg-primary-dark:focus{background-color:var(--color-primary-dark)}.focus\\:sl-bg-primary-darker:focus{background-color:var(--color-primary-darker)}.focus\\:sl-bg-success:focus{background-color:var(--color-success)}.focus\\:sl-bg-success-tint:focus{background-color:var(--color-success-tint)}.focus\\:sl-bg-success-light:focus{background-color:var(--color-success-light)}.focus\\:sl-bg-success-dark:focus{background-color:var(--color-success-dark)}.focus\\:sl-bg-success-darker:focus{background-color:var(--color-success-darker)}.focus\\:sl-bg-warning:focus{background-color:var(--color-warning)}.focus\\:sl-bg-warning-tint:focus{background-color:var(--color-warning-tint)}.focus\\:sl-bg-warning-light:focus{background-color:var(--color-warning-light)}.focus\\:sl-bg-warning-dark:focus{background-color:var(--color-warning-dark)}.focus\\:sl-bg-warning-darker:focus{background-color:var(--color-warning-darker)}.focus\\:sl-bg-danger:focus{background-color:var(--color-danger)}.focus\\:sl-bg-danger-tint:focus{background-color:var(--color-danger-tint)}.focus\\:sl-bg-danger-light:focus{background-color:var(--color-danger-light)}.focus\\:sl-bg-danger-dark:focus{background-color:var(--color-danger-dark)}.focus\\:sl-bg-danger-darker:focus{background-color:var(--color-danger-darker)}.focus\\:sl-bg-code:focus{background-color:var(--color-code)}.focus\\:sl-bg-on-code:focus{background-color:var(--color-on-code)}.focus\\:sl-bg-on-primary:focus{background-color:var(--color-on-primary)}.focus\\:sl-bg-on-success:focus{background-color:var(--color-on-success)}.focus\\:sl-bg-on-warning:focus{background-color:var(--color-on-warning)}.focus\\:sl-bg-on-danger:focus{background-color:var(--color-on-danger)}.focus\\:sl-bg-canvas-50:focus{background-color:var(--color-canvas-50)}.focus\\:sl-bg-canvas-100:focus{background-color:var(--color-canvas-100)}.focus\\:sl-bg-canvas-200:focus{background-color:var(--color-canvas-200)}.focus\\:sl-bg-canvas-300:focus{background-color:var(--color-canvas-300)}.focus\\:sl-bg-canvas-400:focus{background-color:var(--color-canvas-400)}.focus\\:sl-bg-canvas-500:focus{background-color:var(--color-canvas-500)}.focus\\:sl-bg-canvas-pure:focus{background-color:var(--color-canvas-pure)}.focus\\:sl-bg-canvas:focus{background-color:var(--color-canvas)}.focus\\:sl-bg-canvas-tint:focus{background-color:var(--color-canvas-tint)}.focus\\:sl-bg-canvas-dialog:focus{background-color:var(--color-canvas-dialog)}.focus\\:sl-bg-body:focus{background-color:var(--color-text)}.focus\\:sl-bg-body-muted:focus{background-color:var(--color-text-muted)}.focus\\:sl-bg-body-light:focus{background-color:var(--color-text-light)}.active\\:sl-bg-transparent:active{background-color:initial}.active\\:sl-bg-current:active{background-color:currentColor}.active\\:sl-bg-lighten-100:active{background-color:var(--color-lighten-100)}.active\\:sl-bg-darken-100:active{background-color:var(--color-darken-100)}.active\\:sl-bg-primary:active{background-color:var(--color-primary)}.active\\:sl-bg-primary-tint:active{background-color:var(--color-primary-tint)}.active\\:sl-bg-primary-light:active{background-color:var(--color-primary-light)}.active\\:sl-bg-primary-dark:active{background-color:var(--color-primary-dark)}.active\\:sl-bg-primary-darker:active{background-color:var(--color-primary-darker)}.active\\:sl-bg-success:active{background-color:var(--color-success)}.active\\:sl-bg-success-tint:active{background-color:var(--color-success-tint)}.active\\:sl-bg-success-light:active{background-color:var(--color-success-light)}.active\\:sl-bg-success-dark:active{background-color:var(--color-success-dark)}.active\\:sl-bg-success-darker:active{background-color:var(--color-success-darker)}.active\\:sl-bg-warning:active{background-color:var(--color-warning)}.active\\:sl-bg-warning-tint:active{background-color:var(--color-warning-tint)}.active\\:sl-bg-warning-light:active{background-color:var(--color-warning-light)}.active\\:sl-bg-warning-dark:active{background-color:var(--color-warning-dark)}.active\\:sl-bg-warning-darker:active{background-color:var(--color-warning-darker)}.active\\:sl-bg-danger:active{background-color:var(--color-danger)}.active\\:sl-bg-danger-tint:active{background-color:var(--color-danger-tint)}.active\\:sl-bg-danger-light:active{background-color:var(--color-danger-light)}.active\\:sl-bg-danger-dark:active{background-color:var(--color-danger-dark)}.active\\:sl-bg-danger-darker:active{background-color:var(--color-danger-darker)}.active\\:sl-bg-code:active{background-color:var(--color-code)}.active\\:sl-bg-on-code:active{background-color:var(--color-on-code)}.active\\:sl-bg-on-primary:active{background-color:var(--color-on-primary)}.active\\:sl-bg-on-success:active{background-color:var(--color-on-success)}.active\\:sl-bg-on-warning:active{background-color:var(--color-on-warning)}.active\\:sl-bg-on-danger:active{background-color:var(--color-on-danger)}.active\\:sl-bg-canvas-50:active{background-color:var(--color-canvas-50)}.active\\:sl-bg-canvas-100:active{background-color:var(--color-canvas-100)}.active\\:sl-bg-canvas-200:active{background-color:var(--color-canvas-200)}.active\\:sl-bg-canvas-300:active{background-color:var(--color-canvas-300)}.active\\:sl-bg-canvas-400:active{background-color:var(--color-canvas-400)}.active\\:sl-bg-canvas-500:active{background-color:var(--color-canvas-500)}.active\\:sl-bg-canvas-pure:active{background-color:var(--color-canvas-pure)}.active\\:sl-bg-canvas:active{background-color:var(--color-canvas)}.active\\:sl-bg-canvas-tint:active{background-color:var(--color-canvas-tint)}.active\\:sl-bg-canvas-dialog:active{background-color:var(--color-canvas-dialog)}.active\\:sl-bg-body:active{background-color:var(--color-text)}.active\\:sl-bg-body-muted:active{background-color:var(--color-text-muted)}.active\\:sl-bg-body-light:active{background-color:var(--color-text-light)}.sl-bg-none{background-image:none}.sl-bg-gradient-to-t{background-image:linear-gradient(0deg,var(--tw-gradient-stops))}.sl-bg-gradient-to-tr{background-image:linear-gradient(to top right,var(--tw-gradient-stops))}.sl-bg-gradient-to-r{background-image:linear-gradient(90deg,var(--tw-gradient-stops))}.sl-bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.sl-bg-gradient-to-b{background-image:linear-gradient(180deg,var(--tw-gradient-stops))}.sl-bg-gradient-to-bl{background-image:linear-gradient(to bottom left,var(--tw-gradient-stops))}.sl-bg-gradient-to-l{background-image:linear-gradient(270deg,var(--tw-gradient-stops))}.sl-bg-gradient-to-tl{background-image:linear-gradient(to top left,var(--tw-gradient-stops))}.sl-border-transparent{border-color:transparent}.sl-border-current{border-color:currentColor}.sl-border-lighten-100{border-color:var(--color-lighten-100)}.sl-border-darken-100{border-color:var(--color-darken-100)}.sl-border-primary{border-color:var(--color-primary)}.sl-border-primary-tint{border-color:var(--color-primary-tint)}.sl-border-primary-light{border-color:var(--color-primary-light)}.sl-border-primary-dark{border-color:var(--color-primary-dark)}.sl-border-primary-darker{border-color:var(--color-primary-darker)}.sl-border-success{border-color:var(--color-success)}.sl-border-success-tint{border-color:var(--color-success-tint)}.sl-border-success-light{border-color:var(--color-success-light)}.sl-border-success-dark{border-color:var(--color-success-dark)}.sl-border-success-darker{border-color:var(--color-success-darker)}.sl-border-warning{border-color:var(--color-warning)}.sl-border-warning-tint{border-color:var(--color-warning-tint)}.sl-border-warning-light{border-color:var(--color-warning-light)}.sl-border-warning-dark{border-color:var(--color-warning-dark)}.sl-border-warning-darker{border-color:var(--color-warning-darker)}.sl-border-danger{border-color:var(--color-danger)}.sl-border-danger-tint{border-color:var(--color-danger-tint)}.sl-border-danger-light{border-color:var(--color-danger-light)}.sl-border-danger-dark{border-color:var(--color-danger-dark)}.sl-border-danger-darker{border-color:var(--color-danger-darker)}.sl-border-code{border-color:var(--color-code)}.sl-border-on-code{border-color:var(--color-on-code)}.sl-border-on-primary{border-color:var(--color-on-primary)}.sl-border-on-success{border-color:var(--color-on-success)}.sl-border-on-warning{border-color:var(--color-on-warning)}.sl-border-on-danger{border-color:var(--color-on-danger)}.sl-border-light{border-color:var(--color-border-light)}.sl-border-dark{border-color:var(--color-border-dark)}.sl-border-button{border-color:var(--color-border-button)}.sl-border-input{border-color:var(--color-border-input)}.sl-border-body{border-color:var(--color-text)}.hover\\:sl-border-transparent:hover{border-color:transparent}.hover\\:sl-border-current:hover{border-color:currentColor}.hover\\:sl-border-lighten-100:hover{border-color:var(--color-lighten-100)}.hover\\:sl-border-darken-100:hover{border-color:var(--color-darken-100)}.hover\\:sl-border-primary:hover{border-color:var(--color-primary)}.hover\\:sl-border-primary-tint:hover{border-color:var(--color-primary-tint)}.hover\\:sl-border-primary-light:hover{border-color:var(--color-primary-light)}.hover\\:sl-border-primary-dark:hover{border-color:var(--color-primary-dark)}.hover\\:sl-border-primary-darker:hover{border-color:var(--color-primary-darker)}.hover\\:sl-border-success:hover{border-color:var(--color-success)}.hover\\:sl-border-success-tint:hover{border-color:var(--color-success-tint)}.hover\\:sl-border-success-light:hover{border-color:var(--color-success-light)}.hover\\:sl-border-success-dark:hover{border-color:var(--color-success-dark)}.hover\\:sl-border-success-darker:hover{border-color:var(--color-success-darker)}.hover\\:sl-border-warning:hover{border-color:var(--color-warning)}.hover\\:sl-border-warning-tint:hover{border-color:var(--color-warning-tint)}.hover\\:sl-border-warning-light:hover{border-color:var(--color-warning-light)}.hover\\:sl-border-warning-dark:hover{border-color:var(--color-warning-dark)}.hover\\:sl-border-warning-darker:hover{border-color:var(--color-warning-darker)}.hover\\:sl-border-danger:hover{border-color:var(--color-danger)}.hover\\:sl-border-danger-tint:hover{border-color:var(--color-danger-tint)}.hover\\:sl-border-danger-light:hover{border-color:var(--color-danger-light)}.hover\\:sl-border-danger-dark:hover{border-color:var(--color-danger-dark)}.hover\\:sl-border-danger-darker:hover{border-color:var(--color-danger-darker)}.hover\\:sl-border-code:hover{border-color:var(--color-code)}.hover\\:sl-border-on-code:hover{border-color:var(--color-on-code)}.hover\\:sl-border-on-primary:hover{border-color:var(--color-on-primary)}.hover\\:sl-border-on-success:hover{border-color:var(--color-on-success)}.hover\\:sl-border-on-warning:hover{border-color:var(--color-on-warning)}.hover\\:sl-border-on-danger:hover{border-color:var(--color-on-danger)}.hover\\:sl-border-light:hover{border-color:var(--color-border-light)}.hover\\:sl-border-dark:hover{border-color:var(--color-border-dark)}.hover\\:sl-border-button:hover{border-color:var(--color-border-button)}.hover\\:sl-border-input:hover{border-color:var(--color-border-input)}.hover\\:sl-border-body:hover{border-color:var(--color-text)}.focus\\:sl-border-transparent:focus{border-color:transparent}.focus\\:sl-border-current:focus{border-color:currentColor}.focus\\:sl-border-lighten-100:focus{border-color:var(--color-lighten-100)}.focus\\:sl-border-darken-100:focus{border-color:var(--color-darken-100)}.focus\\:sl-border-primary:focus{border-color:var(--color-primary)}.focus\\:sl-border-primary-tint:focus{border-color:var(--color-primary-tint)}.focus\\:sl-border-primary-light:focus{border-color:var(--color-primary-light)}.focus\\:sl-border-primary-dark:focus{border-color:var(--color-primary-dark)}.focus\\:sl-border-primary-darker:focus{border-color:var(--color-primary-darker)}.focus\\:sl-border-success:focus{border-color:var(--color-success)}.focus\\:sl-border-success-tint:focus{border-color:var(--color-success-tint)}.focus\\:sl-border-success-light:focus{border-color:var(--color-success-light)}.focus\\:sl-border-success-dark:focus{border-color:var(--color-success-dark)}.focus\\:sl-border-success-darker:focus{border-color:var(--color-success-darker)}.focus\\:sl-border-warning:focus{border-color:var(--color-warning)}.focus\\:sl-border-warning-tint:focus{border-color:var(--color-warning-tint)}.focus\\:sl-border-warning-light:focus{border-color:var(--color-warning-light)}.focus\\:sl-border-warning-dark:focus{border-color:var(--color-warning-dark)}.focus\\:sl-border-warning-darker:focus{border-color:var(--color-warning-darker)}.focus\\:sl-border-danger:focus{border-color:var(--color-danger)}.focus\\:sl-border-danger-tint:focus{border-color:var(--color-danger-tint)}.focus\\:sl-border-danger-light:focus{border-color:var(--color-danger-light)}.focus\\:sl-border-danger-dark:focus{border-color:var(--color-danger-dark)}.focus\\:sl-border-danger-darker:focus{border-color:var(--color-danger-darker)}.focus\\:sl-border-code:focus{border-color:var(--color-code)}.focus\\:sl-border-on-code:focus{border-color:var(--color-on-code)}.focus\\:sl-border-on-primary:focus{border-color:var(--color-on-primary)}.focus\\:sl-border-on-success:focus{border-color:var(--color-on-success)}.focus\\:sl-border-on-warning:focus{border-color:var(--color-on-warning)}.focus\\:sl-border-on-danger:focus{border-color:var(--color-on-danger)}.focus\\:sl-border-light:focus{border-color:var(--color-border-light)}.focus\\:sl-border-dark:focus{border-color:var(--color-border-dark)}.focus\\:sl-border-button:focus{border-color:var(--color-border-button)}.focus\\:sl-border-input:focus{border-color:var(--color-border-input)}.focus\\:sl-border-body:focus{border-color:var(--color-text)}.sl-rounded-none{border-radius:0}.sl-rounded-sm{border-radius:1px}.sl-rounded{border-radius:2px}.sl-rounded-lg{border-radius:5px}.sl-rounded-xl{border-radius:7px}.sl-rounded-full{border-radius:9999px}.sl-rounded-t-none{border-top-left-radius:0;border-top-right-radius:0}.sl-rounded-r-none{border-top-right-radius:0;border-bottom-right-radius:0}.sl-rounded-b-none{border-bottom-right-radius:0;border-bottom-left-radius:0}.sl-rounded-l-none{border-top-left-radius:0;border-bottom-left-radius:0}.sl-rounded-t-sm{border-top-left-radius:1px;border-top-right-radius:1px}.sl-rounded-r-sm{border-top-right-radius:1px;border-bottom-right-radius:1px}.sl-rounded-b-sm{border-bottom-right-radius:1px;border-bottom-left-radius:1px}.sl-rounded-l-sm{border-top-left-radius:1px;border-bottom-left-radius:1px}.sl-rounded-t{border-top-left-radius:2px;border-top-right-radius:2px}.sl-rounded-r{border-top-right-radius:2px}.sl-rounded-b,.sl-rounded-r{border-bottom-right-radius:2px}.sl-rounded-b,.sl-rounded-l{border-bottom-left-radius:2px}.sl-rounded-l{border-top-left-radius:2px}.sl-rounded-t-lg{border-top-left-radius:5px;border-top-right-radius:5px}.sl-rounded-r-lg{border-top-right-radius:5px;border-bottom-right-radius:5px}.sl-rounded-b-lg{border-bottom-right-radius:5px;border-bottom-left-radius:5px}.sl-rounded-l-lg{border-top-left-radius:5px;border-bottom-left-radius:5px}.sl-rounded-t-xl{border-top-left-radius:7px;border-top-right-radius:7px}.sl-rounded-r-xl{border-top-right-radius:7px;border-bottom-right-radius:7px}.sl-rounded-b-xl{border-bottom-right-radius:7px;border-bottom-left-radius:7px}.sl-rounded-l-xl{border-top-left-radius:7px;border-bottom-left-radius:7px}.sl-rounded-t-full{border-top-left-radius:9999px;border-top-right-radius:9999px}.sl-rounded-r-full{border-top-right-radius:9999px;border-bottom-right-radius:9999px}.sl-rounded-b-full{border-bottom-right-radius:9999px;border-bottom-left-radius:9999px}.sl-rounded-l-full{border-top-left-radius:9999px;border-bottom-left-radius:9999px}.sl-rounded-tl-none{border-top-left-radius:0}.sl-rounded-tr-none{border-top-right-radius:0}.sl-rounded-br-none{border-bottom-right-radius:0}.sl-rounded-bl-none{border-bottom-left-radius:0}.sl-rounded-tl-sm{border-top-left-radius:1px}.sl-rounded-tr-sm{border-top-right-radius:1px}.sl-rounded-br-sm{border-bottom-right-radius:1px}.sl-rounded-bl-sm{border-bottom-left-radius:1px}.sl-rounded-tl{border-top-left-radius:2px}.sl-rounded-tr{border-top-right-radius:2px}.sl-rounded-br{border-bottom-right-radius:2px}.sl-rounded-bl{border-bottom-left-radius:2px}.sl-rounded-tl-lg{border-top-left-radius:5px}.sl-rounded-tr-lg{border-top-right-radius:5px}.sl-rounded-br-lg{border-bottom-right-radius:5px}.sl-rounded-bl-lg{border-bottom-left-radius:5px}.sl-rounded-tl-xl{border-top-left-radius:7px}.sl-rounded-tr-xl{border-top-right-radius:7px}.sl-rounded-br-xl{border-bottom-right-radius:7px}.sl-rounded-bl-xl{border-bottom-left-radius:7px}.sl-rounded-tl-full{border-top-left-radius:9999px}.sl-rounded-tr-full{border-top-right-radius:9999px}.sl-rounded-br-full{border-bottom-right-radius:9999px}.sl-rounded-bl-full{border-bottom-left-radius:9999px}.sl-border-solid{border-style:solid}.sl-border-dashed{border-style:dashed}.sl-border-dotted{border-style:dotted}.sl-border-double{border-style:double}.sl-border-none{border-style:none}.sl-border-0{border-width:0}.sl-border-2{border-width:2px}.sl-border-4{border-width:4px}.sl-border-8{border-width:8px}.sl-border{border-width:1px}.sl-border-t-0{border-top-width:0}.sl-border-r-0{border-right-width:0}.sl-border-b-0{border-bottom-width:0}.sl-border-l-0{border-left-width:0}.sl-border-t-2{border-top-width:2px}.sl-border-r-2{border-right-width:2px}.sl-border-b-2{border-bottom-width:2px}.sl-border-l-2{border-left-width:2px}.sl-border-t-4{border-top-width:4px}.sl-border-r-4{border-right-width:4px}.sl-border-b-4{border-bottom-width:4px}.sl-border-l-4{border-left-width:4px}.sl-border-t-8{border-top-width:8px}.sl-border-r-8{border-right-width:8px}.sl-border-b-8{border-bottom-width:8px}.sl-border-l-8{border-left-width:8px}.sl-border-t{border-top-width:1px}.sl-border-r{border-right-width:1px}.sl-border-b{border-bottom-width:1px}.sl-border-l{border-left-width:1px}*{--tw-shadow:0 0 transparent}.sl-shadow-sm{--tw-shadow:var(--shadow-sm);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.sl-shadow,.sl-shadow-md{--tw-shadow:var(--shadow-md)}.sl-shadow,.sl-shadow-lg,.sl-shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.sl-shadow-lg{--tw-shadow:var(--shadow-lg)}.sl-shadow-xl{--tw-shadow:var(--shadow-xl)}.sl-shadow-2xl,.sl-shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.sl-shadow-2xl{--tw-shadow:var(--shadow-2xl)}.hover\\:sl-shadow-sm:hover{--tw-shadow:var(--shadow-sm);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.hover\\:sl-shadow-md:hover,.hover\\:sl-shadow:hover{--tw-shadow:var(--shadow-md)}.hover\\:sl-shadow-lg:hover,.hover\\:sl-shadow-md:hover,.hover\\:sl-shadow:hover{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.hover\\:sl-shadow-lg:hover{--tw-shadow:var(--shadow-lg)}.hover\\:sl-shadow-xl:hover{--tw-shadow:var(--shadow-xl)}.hover\\:sl-shadow-2xl:hover,.hover\\:sl-shadow-xl:hover{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.hover\\:sl-shadow-2xl:hover{--tw-shadow:var(--shadow-2xl)}.focus\\:sl-shadow-sm:focus{--tw-shadow:var(--shadow-sm);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.focus\\:sl-shadow-md:focus,.focus\\:sl-shadow:focus{--tw-shadow:var(--shadow-md)}.focus\\:sl-shadow-lg:focus,.focus\\:sl-shadow-md:focus,.focus\\:sl-shadow:focus{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.focus\\:sl-shadow-lg:focus{--tw-shadow:var(--shadow-lg)}.focus\\:sl-shadow-xl:focus{--tw-shadow:var(--shadow-xl)}.focus\\:sl-shadow-2xl:focus,.focus\\:sl-shadow-xl:focus{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.focus\\:sl-shadow-2xl:focus{--tw-shadow:var(--shadow-2xl)}.sl-box-border{box-sizing:border-box}.sl-box-content{box-sizing:initial}.sl-cursor-auto{cursor:auto}.sl-cursor{cursor:default}.sl-cursor-pointer{cursor:pointer}.sl-cursor-wait{cursor:wait}.sl-cursor-text{cursor:text}.sl-cursor-move{cursor:move}.sl-cursor-not-allowed{cursor:not-allowed}.sl-cursor-zoom-in{cursor:zoom-in}.sl-cursor-zoom-out{cursor:zoom-out}.sl-block{display:block}.sl-inline-block{display:inline-block}.sl-inline{display:inline}.sl-flex{display:flex}.sl-inline-flex{display:inline-flex}.sl-table{display:table}.sl-inline-table{display:inline-table}.sl-table-caption{display:table-caption}.sl-table-cell{display:table-cell}.sl-table-column{display:table-column}.sl-table-column-group{display:table-column-group}.sl-table-footer-group{display:table-footer-group}.sl-table-header-group{display:table-header-group}.sl-table-row-group{display:table-row-group}.sl-table-row{display:table-row}.sl-flow-root{display:flow-root}.sl-grid{display:grid}.sl-inline-grid{display:inline-grid}.sl-contents{display:contents}.sl-list-item{display:list-item}.sl-hidden{display:none}.sl-flex-1{flex:1 1 0%}.sl-flex-auto{flex:1 1 auto}.sl-flex-initial{flex:0 1 auto}.sl-flex-none{flex:none}.sl-flex-row{flex-direction:row}.sl-flex-row-reverse{flex-direction:row-reverse}.sl-flex-col{flex-direction:column}.sl-flex-col-reverse{flex-direction:column-reverse}.sl-flex-grow-0{flex-grow:0}.sl-flex-grow{flex-grow:1}.sl-flex-shrink-0{flex-shrink:0}.sl-flex-shrink{flex-shrink:1}.sl-flex-wrap{flex-wrap:wrap}.sl-flex-wrap-reverse{flex-wrap:wrap-reverse}.sl-flex-nowrap{flex-wrap:nowrap}.sl-font-sans,.sl-font-ui{font-family:var(--font-ui)}.sl-font-prose{font-family:var(--font-prose)}.sl-font-mono{font-family:var(--font-mono)}.sl-text-2xs{font-size:9px}.sl-text-xs{font-size:10px}.sl-text-sm{font-size:11px}.sl-text-base{font-size:12px}.sl-text-lg{font-size:14px}.sl-text-xl{font-size:16px}.sl-text-2xl{font-size:20px}.sl-text-3xl{font-size:24px}.sl-text-4xl{font-size:28px}.sl-text-5xl{font-size:36px}.sl-text-6xl{font-size:44px}.sl-text-paragraph-leading{font-size:var(--fs-paragraph-leading)}.sl-text-paragraph{font-size:var(--fs-paragraph)}.sl-text-paragraph-small{font-size:var(--fs-paragraph-small)}.sl-text-paragraph-tiny{font-size:var(--fs-paragraph-tiny)}.sl-antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.sl-subpixel-antialiased{-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}.sl-italic{font-style:italic}.sl-not-italic{font-style:normal}.sl-font-light{font-weight:300}.sl-font-normal{font-weight:400}.sl-font-medium{font-weight:500}.sl-font-semibold{font-weight:600}.sl-font-bold{font-weight:700}.sl-h-0{height:0}.sl-h-1{height:4px}.sl-h-2{height:8px}.sl-h-3{height:12px}.sl-h-4{height:16px}.sl-h-5{height:20px}.sl-h-6{height:24px}.sl-h-7{height:28px}.sl-h-8{height:32px}.sl-h-9{height:36px}.sl-h-10{height:40px}.sl-h-11{height:44px}.sl-h-12{height:48px}.sl-h-14{height:56px}.sl-h-16{height:64px}.sl-h-20{height:80px}.sl-h-24{height:96px}.sl-h-32{height:128px}.sl-h-40{height:160px}.sl-h-60{height:240px}.sl-h-80{height:320px}.sl-h-auto{height:auto}.sl-h-px{height:1px}.sl-h-0\\.5{height:2px}.sl-h-1\\.5{height:6px}.sl-h-2\\.5{height:10px}.sl-h-3\\.5{height:14px}.sl-h-xs{height:20px}.sl-h-sm{height:24px}.sl-h-md{height:32px}.sl-h-lg{height:36px}.sl-h-xl{height:44px}.sl-h-2xl{height:52px}.sl-h-3xl{height:60px}.sl-h-full{height:100%}.sl-h-screen{height:100vh}.sl-inset-0{top:0;right:0;bottom:0;left:0}.sl-inset-1{top:4px;right:4px;bottom:4px;left:4px}.sl-inset-2{top:8px;right:8px;bottom:8px;left:8px}.sl-inset-3{top:12px;right:12px;bottom:12px;left:12px}.sl-inset-4{top:16px;right:16px;bottom:16px;left:16px}.sl-inset-5{top:20px;right:20px;bottom:20px;left:20px}.sl-inset-6{top:24px;right:24px;bottom:24px;left:24px}.sl-inset-7{top:28px;right:28px;bottom:28px;left:28px}.sl-inset-8{top:32px;right:32px;bottom:32px;left:32px}.sl-inset-9{top:36px;right:36px;bottom:36px;left:36px}.sl-inset-10{top:40px;right:40px;bottom:40px;left:40px}.sl-inset-11{top:44px;right:44px;bottom:44px;left:44px}.sl-inset-12{top:48px;right:48px;bottom:48px;left:48px}.sl-inset-14{top:56px;right:56px;bottom:56px;left:56px}.sl-inset-16{top:64px;right:64px;bottom:64px;left:64px}.sl-inset-20{top:80px;right:80px;bottom:80px;left:80px}.sl-inset-24{top:96px;right:96px;bottom:96px;left:96px}.sl-inset-32{top:128px;right:128px;bottom:128px;left:128px}.sl-inset-40{top:160px;right:160px;bottom:160px;left:160px}.sl-inset-60{top:240px;right:240px;bottom:240px;left:240px}.sl-inset-80{top:320px;right:320px;bottom:320px;left:320px}.sl-inset-auto{top:auto;right:auto;bottom:auto;left:auto}.sl-inset-px{top:1px;right:1px;bottom:1px;left:1px}.sl-inset-0\\.5{top:2px;right:2px;bottom:2px;left:2px}.sl-inset-1\\.5{top:6px;right:6px;bottom:6px;left:6px}.sl-inset-2\\.5{top:10px;right:10px;bottom:10px;left:10px}.sl-inset-3\\.5{top:14px;right:14px;bottom:14px;left:14px}.sl--inset-0{top:0;right:0;bottom:0;left:0}.sl--inset-1{top:-4px;right:-4px;bottom:-4px;left:-4px}.sl--inset-2{top:-8px;right:-8px;bottom:-8px;left:-8px}.sl--inset-3{top:-12px;right:-12px;bottom:-12px;left:-12px}.sl--inset-4{top:-16px;right:-16px;bottom:-16px;left:-16px}.sl--inset-5{top:-20px;right:-20px;bottom:-20px;left:-20px}.sl--inset-6{top:-24px;right:-24px;bottom:-24px;left:-24px}.sl--inset-7{top:-28px;right:-28px;bottom:-28px;left:-28px}.sl--inset-8{top:-32px;right:-32px;bottom:-32px;left:-32px}.sl--inset-9{top:-36px;right:-36px;bottom:-36px;left:-36px}.sl--inset-10{top:-40px;right:-40px;bottom:-40px;left:-40px}.sl--inset-11{top:-44px;right:-44px;bottom:-44px;left:-44px}.sl--inset-12{top:-48px;right:-48px;bottom:-48px;left:-48px}.sl--inset-14{top:-56px;right:-56px;bottom:-56px;left:-56px}.sl--inset-16{top:-64px;right:-64px;bottom:-64px;left:-64px}.sl--inset-20{top:-80px;right:-80px;bottom:-80px;left:-80px}.sl--inset-24{top:-96px;right:-96px;bottom:-96px;left:-96px}.sl--inset-32{top:-128px;right:-128px;bottom:-128px;left:-128px}.sl--inset-40{top:-160px;right:-160px;bottom:-160px;left:-160px}.sl--inset-60{top:-240px;right:-240px;bottom:-240px;left:-240px}.sl--inset-80{top:-320px;right:-320px;bottom:-320px;left:-320px}.sl--inset-px{top:-1px;right:-1px;bottom:-1px;left:-1px}.sl--inset-0\\.5{top:-2px;right:-2px;bottom:-2px;left:-2px}.sl--inset-1\\.5{top:-6px;right:-6px;bottom:-6px;left:-6px}.sl--inset-2\\.5{top:-10px;right:-10px;bottom:-10px;left:-10px}.sl--inset-3\\.5{top:-14px;right:-14px;bottom:-14px;left:-14px}.sl-inset-y-0{top:0;bottom:0}.sl-inset-x-0{right:0;left:0}.sl-inset-y-1{top:4px;bottom:4px}.sl-inset-x-1{right:4px;left:4px}.sl-inset-y-2{top:8px;bottom:8px}.sl-inset-x-2{right:8px;left:8px}.sl-inset-y-3{top:12px;bottom:12px}.sl-inset-x-3{right:12px;left:12px}.sl-inset-y-4{top:16px;bottom:16px}.sl-inset-x-4{right:16px;left:16px}.sl-inset-y-5{top:20px;bottom:20px}.sl-inset-x-5{right:20px;left:20px}.sl-inset-y-6{top:24px;bottom:24px}.sl-inset-x-6{right:24px;left:24px}.sl-inset-y-7{top:28px;bottom:28px}.sl-inset-x-7{right:28px;left:28px}.sl-inset-y-8{top:32px;bottom:32px}.sl-inset-x-8{right:32px;left:32px}.sl-inset-y-9{top:36px;bottom:36px}.sl-inset-x-9{right:36px;left:36px}.sl-inset-y-10{top:40px;bottom:40px}.sl-inset-x-10{right:40px;left:40px}.sl-inset-y-11{top:44px;bottom:44px}.sl-inset-x-11{right:44px;left:44px}.sl-inset-y-12{top:48px;bottom:48px}.sl-inset-x-12{right:48px;left:48px}.sl-inset-y-14{top:56px;bottom:56px}.sl-inset-x-14{right:56px;left:56px}.sl-inset-y-16{top:64px;bottom:64px}.sl-inset-x-16{right:64px;left:64px}.sl-inset-y-20{top:80px;bottom:80px}.sl-inset-x-20{right:80px;left:80px}.sl-inset-y-24{top:96px;bottom:96px}.sl-inset-x-24{right:96px;left:96px}.sl-inset-y-32{top:128px;bottom:128px}.sl-inset-x-32{right:128px;left:128px}.sl-inset-y-40{top:160px;bottom:160px}.sl-inset-x-40{right:160px;left:160px}.sl-inset-y-60{top:240px;bottom:240px}.sl-inset-x-60{right:240px;left:240px}.sl-inset-y-80{top:320px;bottom:320px}.sl-inset-x-80{right:320px;left:320px}.sl-inset-y-auto{top:auto;bottom:auto}.sl-inset-x-auto{right:auto;left:auto}.sl-inset-y-px{top:1px;bottom:1px}.sl-inset-x-px{right:1px;left:1px}.sl-inset-y-0\\.5{top:2px;bottom:2px}.sl-inset-x-0\\.5{right:2px;left:2px}.sl-inset-y-1\\.5{top:6px;bottom:6px}.sl-inset-x-1\\.5{right:6px;left:6px}.sl-inset-y-2\\.5{top:10px;bottom:10px}.sl-inset-x-2\\.5{right:10px;left:10px}.sl-inset-y-3\\.5{top:14px;bottom:14px}.sl-inset-x-3\\.5{right:14px;left:14px}.sl--inset-y-0{top:0;bottom:0}.sl--inset-x-0{right:0;left:0}.sl--inset-y-1{top:-4px;bottom:-4px}.sl--inset-x-1{right:-4px;left:-4px}.sl--inset-y-2{top:-8px;bottom:-8px}.sl--inset-x-2{right:-8px;left:-8px}.sl--inset-y-3{top:-12px;bottom:-12px}.sl--inset-x-3{right:-12px;left:-12px}.sl--inset-y-4{top:-16px;bottom:-16px}.sl--inset-x-4{right:-16px;left:-16px}.sl--inset-y-5{top:-20px;bottom:-20px}.sl--inset-x-5{right:-20px;left:-20px}.sl--inset-y-6{top:-24px;bottom:-24px}.sl--inset-x-6{right:-24px;left:-24px}.sl--inset-y-7{top:-28px;bottom:-28px}.sl--inset-x-7{right:-28px;left:-28px}.sl--inset-y-8{top:-32px;bottom:-32px}.sl--inset-x-8{right:-32px;left:-32px}.sl--inset-y-9{top:-36px;bottom:-36px}.sl--inset-x-9{right:-36px;left:-36px}.sl--inset-y-10{top:-40px;bottom:-40px}.sl--inset-x-10{right:-40px;left:-40px}.sl--inset-y-11{top:-44px;bottom:-44px}.sl--inset-x-11{right:-44px;left:-44px}.sl--inset-y-12{top:-48px;bottom:-48px}.sl--inset-x-12{right:-48px;left:-48px}.sl--inset-y-14{top:-56px;bottom:-56px}.sl--inset-x-14{right:-56px;left:-56px}.sl--inset-y-16{top:-64px;bottom:-64px}.sl--inset-x-16{right:-64px;left:-64px}.sl--inset-y-20{top:-80px;bottom:-80px}.sl--inset-x-20{right:-80px;left:-80px}.sl--inset-y-24{top:-96px;bottom:-96px}.sl--inset-x-24{right:-96px;left:-96px}.sl--inset-y-32{top:-128px;bottom:-128px}.sl--inset-x-32{right:-128px;left:-128px}.sl--inset-y-40{top:-160px;bottom:-160px}.sl--inset-x-40{right:-160px;left:-160px}.sl--inset-y-60{top:-240px;bottom:-240px}.sl--inset-x-60{right:-240px;left:-240px}.sl--inset-y-80{top:-320px;bottom:-320px}.sl--inset-x-80{right:-320px;left:-320px}.sl--inset-y-px{top:-1px;bottom:-1px}.sl--inset-x-px{right:-1px;left:-1px}.sl--inset-y-0\\.5{top:-2px;bottom:-2px}.sl--inset-x-0\\.5{right:-2px;left:-2px}.sl--inset-y-1\\.5{top:-6px;bottom:-6px}.sl--inset-x-1\\.5{right:-6px;left:-6px}.sl--inset-y-2\\.5{top:-10px;bottom:-10px}.sl--inset-x-2\\.5{right:-10px;left:-10px}.sl--inset-y-3\\.5{top:-14px;bottom:-14px}.sl--inset-x-3\\.5{right:-14px;left:-14px}.sl-top-0{top:0}.sl-right-0{right:0}.sl-bottom-0{bottom:0}.sl-left-0{left:0}.sl-top-1{top:4px}.sl-right-1{right:4px}.sl-bottom-1{bottom:4px}.sl-left-1{left:4px}.sl-top-2{top:8px}.sl-right-2{right:8px}.sl-bottom-2{bottom:8px}.sl-left-2{left:8px}.sl-top-3{top:12px}.sl-right-3{right:12px}.sl-bottom-3{bottom:12px}.sl-left-3{left:12px}.sl-top-4{top:16px}.sl-right-4{right:16px}.sl-bottom-4{bottom:16px}.sl-left-4{left:16px}.sl-top-5{top:20px}.sl-right-5{right:20px}.sl-bottom-5{bottom:20px}.sl-left-5{left:20px}.sl-top-6{top:24px}.sl-right-6{right:24px}.sl-bottom-6{bottom:24px}.sl-left-6{left:24px}.sl-top-7{top:28px}.sl-right-7{right:28px}.sl-bottom-7{bottom:28px}.sl-left-7{left:28px}.sl-top-8{top:32px}.sl-right-8{right:32px}.sl-bottom-8{bottom:32px}.sl-left-8{left:32px}.sl-top-9{top:36px}.sl-right-9{right:36px}.sl-bottom-9{bottom:36px}.sl-left-9{left:36px}.sl-top-10{top:40px}.sl-right-10{right:40px}.sl-bottom-10{bottom:40px}.sl-left-10{left:40px}.sl-top-11{top:44px}.sl-right-11{right:44px}.sl-bottom-11{bottom:44px}.sl-left-11{left:44px}.sl-top-12{top:48px}.sl-right-12{right:48px}.sl-bottom-12{bottom:48px}.sl-left-12{left:48px}.sl-top-14{top:56px}.sl-right-14{right:56px}.sl-bottom-14{bottom:56px}.sl-left-14{left:56px}.sl-top-16{top:64px}.sl-right-16{right:64px}.sl-bottom-16{bottom:64px}.sl-left-16{left:64px}.sl-top-20{top:80px}.sl-right-20{right:80px}.sl-bottom-20{bottom:80px}.sl-left-20{left:80px}.sl-top-24{top:96px}.sl-right-24{right:96px}.sl-bottom-24{bottom:96px}.sl-left-24{left:96px}.sl-top-32{top:128px}.sl-right-32{right:128px}.sl-bottom-32{bottom:128px}.sl-left-32{left:128px}.sl-top-40{top:160px}.sl-right-40{right:160px}.sl-bottom-40{bottom:160px}.sl-left-40{left:160px}.sl-top-60{top:240px}.sl-right-60{right:240px}.sl-bottom-60{bottom:240px}.sl-left-60{left:240px}.sl-top-80{top:320px}.sl-right-80{right:320px}.sl-bottom-80{bottom:320px}.sl-left-80{left:320px}.sl-top-auto{top:auto}.sl-right-auto{right:auto}.sl-bottom-auto{bottom:auto}.sl-left-auto{left:auto}.sl-top-px{top:1px}.sl-right-px{right:1px}.sl-bottom-px{bottom:1px}.sl-left-px{left:1px}.sl-top-0\\.5{top:2px}.sl-right-0\\.5{right:2px}.sl-bottom-0\\.5{bottom:2px}.sl-left-0\\.5{left:2px}.sl-top-1\\.5{top:6px}.sl-right-1\\.5{right:6px}.sl-bottom-1\\.5{bottom:6px}.sl-left-1\\.5{left:6px}.sl-top-2\\.5{top:10px}.sl-right-2\\.5{right:10px}.sl-bottom-2\\.5{bottom:10px}.sl-left-2\\.5{left:10px}.sl-top-3\\.5{top:14px}.sl-right-3\\.5{right:14px}.sl-bottom-3\\.5{bottom:14px}.sl-left-3\\.5{left:14px}.sl--top-0{top:0}.sl--right-0{right:0}.sl--bottom-0{bottom:0}.sl--left-0{left:0}.sl--top-1{top:-4px}.sl--right-1{right:-4px}.sl--bottom-1{bottom:-4px}.sl--left-1{left:-4px}.sl--top-2{top:-8px}.sl--right-2{right:-8px}.sl--bottom-2{bottom:-8px}.sl--left-2{left:-8px}.sl--top-3{top:-12px}.sl--right-3{right:-12px}.sl--bottom-3{bottom:-12px}.sl--left-3{left:-12px}.sl--top-4{top:-16px}.sl--right-4{right:-16px}.sl--bottom-4{bottom:-16px}.sl--left-4{left:-16px}.sl--top-5{top:-20px}.sl--right-5{right:-20px}.sl--bottom-5{bottom:-20px}.sl--left-5{left:-20px}.sl--top-6{top:-24px}.sl--right-6{right:-24px}.sl--bottom-6{bottom:-24px}.sl--left-6{left:-24px}.sl--top-7{top:-28px}.sl--right-7{right:-28px}.sl--bottom-7{bottom:-28px}.sl--left-7{left:-28px}.sl--top-8{top:-32px}.sl--right-8{right:-32px}.sl--bottom-8{bottom:-32px}.sl--left-8{left:-32px}.sl--top-9{top:-36px}.sl--right-9{right:-36px}.sl--bottom-9{bottom:-36px}.sl--left-9{left:-36px}.sl--top-10{top:-40px}.sl--right-10{right:-40px}.sl--bottom-10{bottom:-40px}.sl--left-10{left:-40px}.sl--top-11{top:-44px}.sl--right-11{right:-44px}.sl--bottom-11{bottom:-44px}.sl--left-11{left:-44px}.sl--top-12{top:-48px}.sl--right-12{right:-48px}.sl--bottom-12{bottom:-48px}.sl--left-12{left:-48px}.sl--top-14{top:-56px}.sl--right-14{right:-56px}.sl--bottom-14{bottom:-56px}.sl--left-14{left:-56px}.sl--top-16{top:-64px}.sl--right-16{right:-64px}.sl--bottom-16{bottom:-64px}.sl--left-16{left:-64px}.sl--top-20{top:-80px}.sl--right-20{right:-80px}.sl--bottom-20{bottom:-80px}.sl--left-20{left:-80px}.sl--top-24{top:-96px}.sl--right-24{right:-96px}.sl--bottom-24{bottom:-96px}.sl--left-24{left:-96px}.sl--top-32{top:-128px}.sl--right-32{right:-128px}.sl--bottom-32{bottom:-128px}.sl--left-32{left:-128px}.sl--top-40{top:-160px}.sl--right-40{right:-160px}.sl--bottom-40{bottom:-160px}.sl--left-40{left:-160px}.sl--top-60{top:-240px}.sl--right-60{right:-240px}.sl--bottom-60{bottom:-240px}.sl--left-60{left:-240px}.sl--top-80{top:-320px}.sl--right-80{right:-320px}.sl--bottom-80{bottom:-320px}.sl--left-80{left:-320px}.sl--top-px{top:-1px}.sl--right-px{right:-1px}.sl--bottom-px{bottom:-1px}.sl--left-px{left:-1px}.sl--top-0\\.5{top:-2px}.sl--right-0\\.5{right:-2px}.sl--bottom-0\\.5{bottom:-2px}.sl--left-0\\.5{left:-2px}.sl--top-1\\.5{top:-6px}.sl--right-1\\.5{right:-6px}.sl--bottom-1\\.5{bottom:-6px}.sl--left-1\\.5{left:-6px}.sl--top-2\\.5{top:-10px}.sl--right-2\\.5{right:-10px}.sl--bottom-2\\.5{bottom:-10px}.sl--left-2\\.5{left:-10px}.sl--top-3\\.5{top:-14px}.sl--right-3\\.5{right:-14px}.sl--bottom-3\\.5{bottom:-14px}.sl--left-3\\.5{left:-14px}.sl-justify-start{justify-content:flex-start}.sl-justify-end{justify-content:flex-end}.sl-justify-center{justify-content:center}.sl-justify-between{justify-content:space-between}.sl-justify-around{justify-content:space-around}.sl-justify-evenly{justify-content:space-evenly}.sl-justify-items-start{justify-items:start}.sl-justify-items-end{justify-items:end}.sl-justify-items-center{justify-items:center}.sl-justify-items-stretch{justify-items:stretch}.sl-justify-self-auto{justify-self:auto}.sl-justify-self-start{justify-self:start}.sl-justify-self-end{justify-self:end}.sl-justify-self-center{justify-self:center}.sl-justify-self-stretch{justify-self:stretch}.sl-tracking-tight{letter-spacing:-.025em}.sl-tracking-normal{letter-spacing:0}.sl-tracking-wide{letter-spacing:.025em}.sl-leading-none{line-height:1}.sl-leading-tight{line-height:1.2}.sl-leading-snug{line-height:1.375}.sl-leading-normal{line-height:1.5}.sl-leading-relaxed{line-height:1.625}.sl-leading-loose{line-height:2}.sl-leading-paragraph-leading{line-height:var(--lh-paragraph-leading)}.sl-leading-paragraph{line-height:var(--lh-paragraph)}.sl-leading-paragraph-small{line-height:var(--lh-paragraph-small)}.sl-leading-paragraph-tiny{line-height:var(--lh-paragraph-tiny)}.sl-m-0{margin:0}.sl-m-1{margin:4px}.sl-m-2{margin:8px}.sl-m-3{margin:12px}.sl-m-4{margin:16px}.sl-m-5{margin:20px}.sl-m-6{margin:24px}.sl-m-7{margin:28px}.sl-m-8{margin:32px}.sl-m-9{margin:36px}.sl-m-10{margin:40px}.sl-m-11{margin:44px}.sl-m-12{margin:48px}.sl-m-14{margin:56px}.sl-m-16{margin:64px}.sl-m-20{margin:80px}.sl-m-24{margin:96px}.sl-m-32{margin:128px}.sl-m-40{margin:160px}.sl-m-60{margin:240px}.sl-m-80{margin:320px}.sl-m-auto{margin:auto}.sl-m-px{margin:1px}.sl-m-0\\.5{margin:2px}.sl-m-1\\.5{margin:6px}.sl-m-2\\.5{margin:10px}.sl-m-3\\.5{margin:14px}.sl--m-0{margin:0}.sl--m-1{margin:-4px}.sl--m-2{margin:-8px}.sl--m-3{margin:-12px}.sl--m-4{margin:-16px}.sl--m-5{margin:-20px}.sl--m-6{margin:-24px}.sl--m-7{margin:-28px}.sl--m-8{margin:-32px}.sl--m-9{margin:-36px}.sl--m-10{margin:-40px}.sl--m-11{margin:-44px}.sl--m-12{margin:-48px}.sl--m-14{margin:-56px}.sl--m-16{margin:-64px}.sl--m-20{margin:-80px}.sl--m-24{margin:-96px}.sl--m-32{margin:-128px}.sl--m-40{margin:-160px}.sl--m-60{margin:-240px}.sl--m-80{margin:-320px}.sl--m-px{margin:-1px}.sl--m-0\\.5{margin:-2px}.sl--m-1\\.5{margin:-6px}.sl--m-2\\.5{margin:-10px}.sl--m-3\\.5{margin:-14px}.sl-my-0{margin-top:0;margin-bottom:0}.sl-mx-0{margin-left:0;margin-right:0}.sl-my-1{margin-top:4px;margin-bottom:4px}.sl-mx-1{margin-left:4px;margin-right:4px}.sl-my-2{margin-top:8px;margin-bottom:8px}.sl-mx-2{margin-left:8px;margin-right:8px}.sl-my-3{margin-top:12px;margin-bottom:12px}.sl-mx-3{margin-left:12px;margin-right:12px}.sl-my-4{margin-top:16px;margin-bottom:16px}.sl-mx-4{margin-left:16px;margin-right:16px}.sl-my-5{margin-top:20px;margin-bottom:20px}.sl-mx-5{margin-left:20px;margin-right:20px}.sl-my-6{margin-top:24px;margin-bottom:24px}.sl-mx-6{margin-left:24px;margin-right:24px}.sl-my-7{margin-top:28px;margin-bottom:28px}.sl-mx-7{margin-left:28px;margin-right:28px}.sl-my-8{margin-top:32px;margin-bottom:32px}.sl-mx-8{margin-left:32px;margin-right:32px}.sl-my-9{margin-top:36px;margin-bottom:36px}.sl-mx-9{margin-left:36px;margin-right:36px}.sl-my-10{margin-top:40px;margin-bottom:40px}.sl-mx-10{margin-left:40px;margin-right:40px}.sl-my-11{margin-top:44px;margin-bottom:44px}.sl-mx-11{margin-left:44px;margin-right:44px}.sl-my-12{margin-top:48px;margin-bottom:48px}.sl-mx-12{margin-left:48px;margin-right:48px}.sl-my-14{margin-top:56px;margin-bottom:56px}.sl-mx-14{margin-left:56px;margin-right:56px}.sl-my-16{margin-top:64px;margin-bottom:64px}.sl-mx-16{margin-left:64px;margin-right:64px}.sl-my-20{margin-top:80px;margin-bottom:80px}.sl-mx-20{margin-left:80px;margin-right:80px}.sl-my-24{margin-top:96px;margin-bottom:96px}.sl-mx-24{margin-left:96px;margin-right:96px}.sl-my-32{margin-top:128px;margin-bottom:128px}.sl-mx-32{margin-left:128px;margin-right:128px}.sl-my-40{margin-top:160px;margin-bottom:160px}.sl-mx-40{margin-left:160px;margin-right:160px}.sl-my-60{margin-top:240px;margin-bottom:240px}.sl-mx-60{margin-left:240px;margin-right:240px}.sl-my-80{margin-top:320px;margin-bottom:320px}.sl-mx-80{margin-left:320px;margin-right:320px}.sl-my-auto{margin-top:auto;margin-bottom:auto}.sl-mx-auto{margin-left:auto;margin-right:auto}.sl-my-px{margin-top:1px;margin-bottom:1px}.sl-mx-px{margin-left:1px;margin-right:1px}.sl-my-0\\.5{margin-top:2px;margin-bottom:2px}.sl-mx-0\\.5{margin-left:2px;margin-right:2px}.sl-my-1\\.5{margin-top:6px;margin-bottom:6px}.sl-mx-1\\.5{margin-left:6px;margin-right:6px}.sl-my-2\\.5{margin-top:10px;margin-bottom:10px}.sl-mx-2\\.5{margin-left:10px;margin-right:10px}.sl-my-3\\.5{margin-top:14px;margin-bottom:14px}.sl-mx-3\\.5{margin-left:14px;margin-right:14px}.sl--my-0{margin-top:0;margin-bottom:0}.sl--mx-0{margin-left:0;margin-right:0}.sl--my-1{margin-top:-4px;margin-bottom:-4px}.sl--mx-1{margin-left:-4px;margin-right:-4px}.sl--my-2{margin-top:-8px;margin-bottom:-8px}.sl--mx-2{margin-left:-8px;margin-right:-8px}.sl--my-3{margin-top:-12px;margin-bottom:-12px}.sl--mx-3{margin-left:-12px;margin-right:-12px}.sl--my-4{margin-top:-16px;margin-bottom:-16px}.sl--mx-4{margin-left:-16px;margin-right:-16px}.sl--my-5{margin-top:-20px;margin-bottom:-20px}.sl--mx-5{margin-left:-20px;margin-right:-20px}.sl--my-6{margin-top:-24px;margin-bottom:-24px}.sl--mx-6{margin-left:-24px;margin-right:-24px}.sl--my-7{margin-top:-28px;margin-bottom:-28px}.sl--mx-7{margin-left:-28px;margin-right:-28px}.sl--my-8{margin-top:-32px;margin-bottom:-32px}.sl--mx-8{margin-left:-32px;margin-right:-32px}.sl--my-9{margin-top:-36px;margin-bottom:-36px}.sl--mx-9{margin-left:-36px;margin-right:-36px}.sl--my-10{margin-top:-40px;margin-bottom:-40px}.sl--mx-10{margin-left:-40px;margin-right:-40px}.sl--my-11{margin-top:-44px;margin-bottom:-44px}.sl--mx-11{margin-left:-44px;margin-right:-44px}.sl--my-12{margin-top:-48px;margin-bottom:-48px}.sl--mx-12{margin-left:-48px;margin-right:-48px}.sl--my-14{margin-top:-56px;margin-bottom:-56px}.sl--mx-14{margin-left:-56px;margin-right:-56px}.sl--my-16{margin-top:-64px;margin-bottom:-64px}.sl--mx-16{margin-left:-64px;margin-right:-64px}.sl--my-20{margin-top:-80px;margin-bottom:-80px}.sl--mx-20{margin-left:-80px;margin-right:-80px}.sl--my-24{margin-top:-96px;margin-bottom:-96px}.sl--mx-24{margin-left:-96px;margin-right:-96px}.sl--my-32{margin-top:-128px;margin-bottom:-128px}.sl--mx-32{margin-left:-128px;margin-right:-128px}.sl--my-40{margin-top:-160px;margin-bottom:-160px}.sl--mx-40{margin-left:-160px;margin-right:-160px}.sl--my-60{margin-top:-240px;margin-bottom:-240px}.sl--mx-60{margin-left:-240px;margin-right:-240px}.sl--my-80{margin-top:-320px;margin-bottom:-320px}.sl--mx-80{margin-left:-320px;margin-right:-320px}.sl--my-px{margin-top:-1px;margin-bottom:-1px}.sl--mx-px{margin-left:-1px;margin-right:-1px}.sl--my-0\\.5{margin-top:-2px;margin-bottom:-2px}.sl--mx-0\\.5{margin-left:-2px;margin-right:-2px}.sl--my-1\\.5{margin-top:-6px;margin-bottom:-6px}.sl--mx-1\\.5{margin-left:-6px;margin-right:-6px}.sl--my-2\\.5{margin-top:-10px;margin-bottom:-10px}.sl--mx-2\\.5{margin-left:-10px;margin-right:-10px}.sl--my-3\\.5{margin-top:-14px;margin-bottom:-14px}.sl--mx-3\\.5{margin-left:-14px;margin-right:-14px}.sl-mt-0{margin-top:0}.sl-mr-0{margin-right:0}.sl-mb-0{margin-bottom:0}.sl-ml-0{margin-left:0}.sl-mt-1{margin-top:4px}.sl-mr-1{margin-right:4px}.sl-mb-1{margin-bottom:4px}.sl-ml-1{margin-left:4px}.sl-mt-2{margin-top:8px}.sl-mr-2{margin-right:8px}.sl-mb-2{margin-bottom:8px}.sl-ml-2{margin-left:8px}.sl-mt-3{margin-top:12px}.sl-mr-3{margin-right:12px}.sl-mb-3{margin-bottom:12px}.sl-ml-3{margin-left:12px}.sl-mt-4{margin-top:16px}.sl-mr-4{margin-right:16px}.sl-mb-4{margin-bottom:16px}.sl-ml-4{margin-left:16px}.sl-mt-5{margin-top:20px}.sl-mr-5{margin-right:20px}.sl-mb-5{margin-bottom:20px}.sl-ml-5{margin-left:20px}.sl-mt-6{margin-top:24px}.sl-mr-6{margin-right:24px}.sl-mb-6{margin-bottom:24px}.sl-ml-6{margin-left:24px}.sl-mt-7{margin-top:28px}.sl-mr-7{margin-right:28px}.sl-mb-7{margin-bottom:28px}.sl-ml-7{margin-left:28px}.sl-mt-8{margin-top:32px}.sl-mr-8{margin-right:32px}.sl-mb-8{margin-bottom:32px}.sl-ml-8{margin-left:32px}.sl-mt-9{margin-top:36px}.sl-mr-9{margin-right:36px}.sl-mb-9{margin-bottom:36px}.sl-ml-9{margin-left:36px}.sl-mt-10{margin-top:40px}.sl-mr-10{margin-right:40px}.sl-mb-10{margin-bottom:40px}.sl-ml-10{margin-left:40px}.sl-mt-11{margin-top:44px}.sl-mr-11{margin-right:44px}.sl-mb-11{margin-bottom:44px}.sl-ml-11{margin-left:44px}.sl-mt-12{margin-top:48px}.sl-mr-12{margin-right:48px}.sl-mb-12{margin-bottom:48px}.sl-ml-12{margin-left:48px}.sl-mt-14{margin-top:56px}.sl-mr-14{margin-right:56px}.sl-mb-14{margin-bottom:56px}.sl-ml-14{margin-left:56px}.sl-mt-16{margin-top:64px}.sl-mr-16{margin-right:64px}.sl-mb-16{margin-bottom:64px}.sl-ml-16{margin-left:64px}.sl-mt-20{margin-top:80px}.sl-mr-20{margin-right:80px}.sl-mb-20{margin-bottom:80px}.sl-ml-20{margin-left:80px}.sl-mt-24{margin-top:96px}.sl-mr-24{margin-right:96px}.sl-mb-24{margin-bottom:96px}.sl-ml-24{margin-left:96px}.sl-mt-32{margin-top:128px}.sl-mr-32{margin-right:128px}.sl-mb-32{margin-bottom:128px}.sl-ml-32{margin-left:128px}.sl-mt-40{margin-top:160px}.sl-mr-40{margin-right:160px}.sl-mb-40{margin-bottom:160px}.sl-ml-40{margin-left:160px}.sl-mt-60{margin-top:240px}.sl-mr-60{margin-right:240px}.sl-mb-60{margin-bottom:240px}.sl-ml-60{margin-left:240px}.sl-mt-80{margin-top:320px}.sl-mr-80{margin-right:320px}.sl-mb-80{margin-bottom:320px}.sl-ml-80{margin-left:320px}.sl-mt-auto{margin-top:auto}.sl-mr-auto{margin-right:auto}.sl-mb-auto{margin-bottom:auto}.sl-ml-auto{margin-left:auto}.sl-mt-px{margin-top:1px}.sl-mr-px{margin-right:1px}.sl-mb-px{margin-bottom:1px}.sl-ml-px{margin-left:1px}.sl-mt-0\\.5{margin-top:2px}.sl-mr-0\\.5{margin-right:2px}.sl-mb-0\\.5{margin-bottom:2px}.sl-ml-0\\.5{margin-left:2px}.sl-mt-1\\.5{margin-top:6px}.sl-mr-1\\.5{margin-right:6px}.sl-mb-1\\.5{margin-bottom:6px}.sl-ml-1\\.5{margin-left:6px}.sl-mt-2\\.5{margin-top:10px}.sl-mr-2\\.5{margin-right:10px}.sl-mb-2\\.5{margin-bottom:10px}.sl-ml-2\\.5{margin-left:10px}.sl-mt-3\\.5{margin-top:14px}.sl-mr-3\\.5{margin-right:14px}.sl-mb-3\\.5{margin-bottom:14px}.sl-ml-3\\.5{margin-left:14px}.sl--mt-0{margin-top:0}.sl--mr-0{margin-right:0}.sl--mb-0{margin-bottom:0}.sl--ml-0{margin-left:0}.sl--mt-1{margin-top:-4px}.sl--mr-1{margin-right:-4px}.sl--mb-1{margin-bottom:-4px}.sl--ml-1{margin-left:-4px}.sl--mt-2{margin-top:-8px}.sl--mr-2{margin-right:-8px}.sl--mb-2{margin-bottom:-8px}.sl--ml-2{margin-left:-8px}.sl--mt-3{margin-top:-12px}.sl--mr-3{margin-right:-12px}.sl--mb-3{margin-bottom:-12px}.sl--ml-3{margin-left:-12px}.sl--mt-4{margin-top:-16px}.sl--mr-4{margin-right:-16px}.sl--mb-4{margin-bottom:-16px}.sl--ml-4{margin-left:-16px}.sl--mt-5{margin-top:-20px}.sl--mr-5{margin-right:-20px}.sl--mb-5{margin-bottom:-20px}.sl--ml-5{margin-left:-20px}.sl--mt-6{margin-top:-24px}.sl--mr-6{margin-right:-24px}.sl--mb-6{margin-bottom:-24px}.sl--ml-6{margin-left:-24px}.sl--mt-7{margin-top:-28px}.sl--mr-7{margin-right:-28px}.sl--mb-7{margin-bottom:-28px}.sl--ml-7{margin-left:-28px}.sl--mt-8{margin-top:-32px}.sl--mr-8{margin-right:-32px}.sl--mb-8{margin-bottom:-32px}.sl--ml-8{margin-left:-32px}.sl--mt-9{margin-top:-36px}.sl--mr-9{margin-right:-36px}.sl--mb-9{margin-bottom:-36px}.sl--ml-9{margin-left:-36px}.sl--mt-10{margin-top:-40px}.sl--mr-10{margin-right:-40px}.sl--mb-10{margin-bottom:-40px}.sl--ml-10{margin-left:-40px}.sl--mt-11{margin-top:-44px}.sl--mr-11{margin-right:-44px}.sl--mb-11{margin-bottom:-44px}.sl--ml-11{margin-left:-44px}.sl--mt-12{margin-top:-48px}.sl--mr-12{margin-right:-48px}.sl--mb-12{margin-bottom:-48px}.sl--ml-12{margin-left:-48px}.sl--mt-14{margin-top:-56px}.sl--mr-14{margin-right:-56px}.sl--mb-14{margin-bottom:-56px}.sl--ml-14{margin-left:-56px}.sl--mt-16{margin-top:-64px}.sl--mr-16{margin-right:-64px}.sl--mb-16{margin-bottom:-64px}.sl--ml-16{margin-left:-64px}.sl--mt-20{margin-top:-80px}.sl--mr-20{margin-right:-80px}.sl--mb-20{margin-bottom:-80px}.sl--ml-20{margin-left:-80px}.sl--mt-24{margin-top:-96px}.sl--mr-24{margin-right:-96px}.sl--mb-24{margin-bottom:-96px}.sl--ml-24{margin-left:-96px}.sl--mt-32{margin-top:-128px}.sl--mr-32{margin-right:-128px}.sl--mb-32{margin-bottom:-128px}.sl--ml-32{margin-left:-128px}.sl--mt-40{margin-top:-160px}.sl--mr-40{margin-right:-160px}.sl--mb-40{margin-bottom:-160px}.sl--ml-40{margin-left:-160px}.sl--mt-60{margin-top:-240px}.sl--mr-60{margin-right:-240px}.sl--mb-60{margin-bottom:-240px}.sl--ml-60{margin-left:-240px}.sl--mt-80{margin-top:-320px}.sl--mr-80{margin-right:-320px}.sl--mb-80{margin-bottom:-320px}.sl--ml-80{margin-left:-320px}.sl--mt-px{margin-top:-1px}.sl--mr-px{margin-right:-1px}.sl--mb-px{margin-bottom:-1px}.sl--ml-px{margin-left:-1px}.sl--mt-0\\.5{margin-top:-2px}.sl--mr-0\\.5{margin-right:-2px}.sl--mb-0\\.5{margin-bottom:-2px}.sl--ml-0\\.5{margin-left:-2px}.sl--mt-1\\.5{margin-top:-6px}.sl--mr-1\\.5{margin-right:-6px}.sl--mb-1\\.5{margin-bottom:-6px}.sl--ml-1\\.5{margin-left:-6px}.sl--mt-2\\.5{margin-top:-10px}.sl--mr-2\\.5{margin-right:-10px}.sl--mb-2\\.5{margin-bottom:-10px}.sl--ml-2\\.5{margin-left:-10px}.sl--mt-3\\.5{margin-top:-14px}.sl--mr-3\\.5{margin-right:-14px}.sl--mb-3\\.5{margin-bottom:-14px}.sl--ml-3\\.5{margin-left:-14px}.sl-max-h-full{max-height:100%}.sl-max-h-screen{max-height:100vh}.sl-max-w-none{max-width:none}.sl-max-w-full{max-width:100%}.sl-max-w-min{max-width:-moz-min-content;max-width:min-content}.sl-max-w-max{max-width:-moz-max-content;max-width:max-content}.sl-max-w-prose{max-width:65ch}.sl-min-h-full{min-height:100%}.sl-min-h-screen{min-height:100vh}.sl-min-w-full{min-width:100%}.sl-min-w-min{min-width:-moz-min-content;min-width:min-content}.sl-min-w-max{min-width:-moz-max-content;min-width:max-content}.sl-object-contain{object-fit:contain}.sl-object-cover{object-fit:cover}.sl-object-fill{object-fit:fill}.sl-object-none{object-fit:none}.sl-object-scale-down{object-fit:scale-down}.sl-object-bottom{object-position:bottom}.sl-object-center{object-position:center}.sl-object-left{object-position:left}.sl-object-left-bottom{object-position:left bottom}.sl-object-left-top{object-position:left top}.sl-object-right{object-position:right}.sl-object-right-bottom{object-position:right bottom}.sl-object-right-top{object-position:right top}.sl-object-top{object-position:top}.sl-opacity-0{opacity:0}.sl-opacity-5{opacity:.05}.sl-opacity-10{opacity:.1}.sl-opacity-20{opacity:.2}.sl-opacity-30{opacity:.3}.sl-opacity-40{opacity:.4}.sl-opacity-50{opacity:.5}.sl-opacity-60{opacity:.6}.sl-opacity-70{opacity:.7}.sl-opacity-90{opacity:.9}.sl-opacity-100{opacity:1}.hover\\:sl-opacity-0:hover{opacity:0}.hover\\:sl-opacity-5:hover{opacity:.05}.hover\\:sl-opacity-10:hover{opacity:.1}.hover\\:sl-opacity-20:hover{opacity:.2}.hover\\:sl-opacity-30:hover{opacity:.3}.hover\\:sl-opacity-40:hover{opacity:.4}.hover\\:sl-opacity-50:hover{opacity:.5}.hover\\:sl-opacity-60:hover{opacity:.6}.hover\\:sl-opacity-70:hover{opacity:.7}.hover\\:sl-opacity-90:hover{opacity:.9}.hover\\:sl-opacity-100:hover{opacity:1}.focus\\:sl-opacity-0:focus{opacity:0}.focus\\:sl-opacity-5:focus{opacity:.05}.focus\\:sl-opacity-10:focus{opacity:.1}.focus\\:sl-opacity-20:focus{opacity:.2}.focus\\:sl-opacity-30:focus{opacity:.3}.focus\\:sl-opacity-40:focus{opacity:.4}.focus\\:sl-opacity-50:focus{opacity:.5}.focus\\:sl-opacity-60:focus{opacity:.6}.focus\\:sl-opacity-70:focus{opacity:.7}.focus\\:sl-opacity-90:focus{opacity:.9}.focus\\:sl-opacity-100:focus{opacity:1}.active\\:sl-opacity-0:active{opacity:0}.active\\:sl-opacity-5:active{opacity:.05}.active\\:sl-opacity-10:active{opacity:.1}.active\\:sl-opacity-20:active{opacity:.2}.active\\:sl-opacity-30:active{opacity:.3}.active\\:sl-opacity-40:active{opacity:.4}.active\\:sl-opacity-50:active{opacity:.5}.active\\:sl-opacity-60:active{opacity:.6}.active\\:sl-opacity-70:active{opacity:.7}.active\\:sl-opacity-90:active{opacity:.9}.active\\:sl-opacity-100:active{opacity:1}.disabled\\:sl-opacity-0:disabled{opacity:0}.disabled\\:sl-opacity-5:disabled{opacity:.05}.disabled\\:sl-opacity-10:disabled{opacity:.1}.disabled\\:sl-opacity-20:disabled{opacity:.2}.disabled\\:sl-opacity-30:disabled{opacity:.3}.disabled\\:sl-opacity-40:disabled{opacity:.4}.disabled\\:sl-opacity-50:disabled{opacity:.5}.disabled\\:sl-opacity-60:disabled{opacity:.6}.disabled\\:sl-opacity-70:disabled{opacity:.7}.disabled\\:sl-opacity-90:disabled{opacity:.9}.disabled\\:sl-opacity-100:disabled{opacity:1}.sl-outline-none{outline:2px solid transparent;outline-offset:2px}.sl-overflow-auto{overflow:auto}.sl-overflow-hidden{overflow:hidden}.sl-overflow-visible{overflow:visible}.sl-overflow-scroll{overflow:scroll}.sl-overflow-x-auto{overflow-x:auto}.sl-overflow-y-auto{overflow-y:auto}.sl-overflow-x-hidden{overflow-x:hidden}.sl-overflow-y-hidden{overflow-y:hidden}.sl-overflow-x-visible{overflow-x:visible}.sl-overflow-y-visible{overflow-y:visible}.sl-overflow-x-scroll{overflow-x:scroll}.sl-overflow-y-scroll{overflow-y:scroll}.sl-overscroll-auto{overscroll-behavior:auto}.sl-overscroll-contain{overscroll-behavior:contain}.sl-overscroll-none{overscroll-behavior:none}.sl-overscroll-y-auto{overscroll-behavior-y:auto}.sl-overscroll-y-contain{overscroll-behavior-y:contain}.sl-overscroll-y-none{overscroll-behavior-y:none}.sl-overscroll-x-auto{overscroll-behavior-x:auto}.sl-overscroll-x-contain{overscroll-behavior-x:contain}.sl-overscroll-x-none{overscroll-behavior-x:none}.sl-p-0{padding:0}.sl-p-1{padding:4px}.sl-p-2{padding:8px}.sl-p-3{padding:12px}.sl-p-4{padding:16px}.sl-p-5{padding:20px}.sl-p-6{padding:24px}.sl-p-7{padding:28px}.sl-p-8{padding:32px}.sl-p-9{padding:36px}.sl-p-10{padding:40px}.sl-p-11{padding:44px}.sl-p-12{padding:48px}.sl-p-14{padding:56px}.sl-p-16{padding:64px}.sl-p-20{padding:80px}.sl-p-24{padding:96px}.sl-p-32{padding:128px}.sl-p-40{padding:160px}.sl-p-60{padding:240px}.sl-p-80{padding:320px}.sl-p-px{padding:1px}.sl-p-0\\.5{padding:2px}.sl-p-1\\.5{padding:6px}.sl-p-2\\.5{padding:10px}.sl-p-3\\.5{padding:14px}.sl-py-0{padding-top:0;padding-bottom:0}.sl-px-0{padding-left:0;padding-right:0}.sl-py-1{padding-top:4px;padding-bottom:4px}.sl-px-1{padding-left:4px;padding-right:4px}.sl-py-2{padding-top:8px;padding-bottom:8px}.sl-px-2{padding-left:8px;padding-right:8px}.sl-py-3{padding-top:12px;padding-bottom:12px}.sl-px-3{padding-left:12px;padding-right:12px}.sl-py-4{padding-top:16px;padding-bottom:16px}.sl-px-4{padding-left:16px;padding-right:16px}.sl-py-5{padding-top:20px;padding-bottom:20px}.sl-px-5{padding-left:20px;padding-right:20px}.sl-py-6{padding-top:24px;padding-bottom:24px}.sl-px-6{padding-left:24px;padding-right:24px}.sl-py-7{padding-top:28px;padding-bottom:28px}.sl-px-7{padding-left:28px;padding-right:28px}.sl-py-8{padding-top:32px;padding-bottom:32px}.sl-px-8{padding-left:32px;padding-right:32px}.sl-py-9{padding-top:36px;padding-bottom:36px}.sl-px-9{padding-left:36px;padding-right:36px}.sl-py-10{padding-top:40px;padding-bottom:40px}.sl-px-10{padding-left:40px;padding-right:40px}.sl-py-11{padding-top:44px;padding-bottom:44px}.sl-px-11{padding-left:44px;padding-right:44px}.sl-py-12{padding-top:48px;padding-bottom:48px}.sl-px-12{padding-left:48px;padding-right:48px}.sl-py-14{padding-top:56px;padding-bottom:56px}.sl-px-14{padding-left:56px;padding-right:56px}.sl-py-16{padding-top:64px;padding-bottom:64px}.sl-px-16{padding-left:64px;padding-right:64px}.sl-py-20{padding-top:80px;padding-bottom:80px}.sl-px-20{padding-left:80px;padding-right:80px}.sl-py-24{padding-top:96px;padding-bottom:96px}.sl-px-24{padding-left:96px;padding-right:96px}.sl-py-32{padding-top:128px;padding-bottom:128px}.sl-px-32{padding-left:128px;padding-right:128px}.sl-py-40{padding-top:160px;padding-bottom:160px}.sl-px-40{padding-left:160px;padding-right:160px}.sl-py-60{padding-top:240px;padding-bottom:240px}.sl-px-60{padding-left:240px;padding-right:240px}.sl-py-80{padding-top:320px;padding-bottom:320px}.sl-px-80{padding-left:320px;padding-right:320px}.sl-py-px{padding-top:1px;padding-bottom:1px}.sl-px-px{padding-left:1px;padding-right:1px}.sl-py-0\\.5{padding-top:2px;padding-bottom:2px}.sl-px-0\\.5{padding-left:2px;padding-right:2px}.sl-py-1\\.5{padding-top:6px;padding-bottom:6px}.sl-px-1\\.5{padding-left:6px;padding-right:6px}.sl-py-2\\.5{padding-top:10px;padding-bottom:10px}.sl-px-2\\.5{padding-left:10px;padding-right:10px}.sl-py-3\\.5{padding-top:14px;padding-bottom:14px}.sl-px-3\\.5{padding-left:14px;padding-right:14px}.sl-pt-0{padding-top:0}.sl-pr-0{padding-right:0}.sl-pb-0{padding-bottom:0}.sl-pl-0{padding-left:0}.sl-pt-1{padding-top:4px}.sl-pr-1{padding-right:4px}.sl-pb-1{padding-bottom:4px}.sl-pl-1{padding-left:4px}.sl-pt-2{padding-top:8px}.sl-pr-2{padding-right:8px}.sl-pb-2{padding-bottom:8px}.sl-pl-2{padding-left:8px}.sl-pt-3{padding-top:12px}.sl-pr-3{padding-right:12px}.sl-pb-3{padding-bottom:12px}.sl-pl-3{padding-left:12px}.sl-pt-4{padding-top:16px}.sl-pr-4{padding-right:16px}.sl-pb-4{padding-bottom:16px}.sl-pl-4{padding-left:16px}.sl-pt-5{padding-top:20px}.sl-pr-5{padding-right:20px}.sl-pb-5{padding-bottom:20px}.sl-pl-5{padding-left:20px}.sl-pt-6{padding-top:24px}.sl-pr-6{padding-right:24px}.sl-pb-6{padding-bottom:24px}.sl-pl-6{padding-left:24px}.sl-pt-7{padding-top:28px}.sl-pr-7{padding-right:28px}.sl-pb-7{padding-bottom:28px}.sl-pl-7{padding-left:28px}.sl-pt-8{padding-top:32px}.sl-pr-8{padding-right:32px}.sl-pb-8{padding-bottom:32px}.sl-pl-8{padding-left:32px}.sl-pt-9{padding-top:36px}.sl-pr-9{padding-right:36px}.sl-pb-9{padding-bottom:36px}.sl-pl-9{padding-left:36px}.sl-pt-10{padding-top:40px}.sl-pr-10{padding-right:40px}.sl-pb-10{padding-bottom:40px}.sl-pl-10{padding-left:40px}.sl-pt-11{padding-top:44px}.sl-pr-11{padding-right:44px}.sl-pb-11{padding-bottom:44px}.sl-pl-11{padding-left:44px}.sl-pt-12{padding-top:48px}.sl-pr-12{padding-right:48px}.sl-pb-12{padding-bottom:48px}.sl-pl-12{padding-left:48px}.sl-pt-14{padding-top:56px}.sl-pr-14{padding-right:56px}.sl-pb-14{padding-bottom:56px}.sl-pl-14{padding-left:56px}.sl-pt-16{padding-top:64px}.sl-pr-16{padding-right:64px}.sl-pb-16{padding-bottom:64px}.sl-pl-16{padding-left:64px}.sl-pt-20{padding-top:80px}.sl-pr-20{padding-right:80px}.sl-pb-20{padding-bottom:80px}.sl-pl-20{padding-left:80px}.sl-pt-24{padding-top:96px}.sl-pr-24{padding-right:96px}.sl-pb-24{padding-bottom:96px}.sl-pl-24{padding-left:96px}.sl-pt-32{padding-top:128px}.sl-pr-32{padding-right:128px}.sl-pb-32{padding-bottom:128px}.sl-pl-32{padding-left:128px}.sl-pt-40{padding-top:160px}.sl-pr-40{padding-right:160px}.sl-pb-40{padding-bottom:160px}.sl-pl-40{padding-left:160px}.sl-pt-60{padding-top:240px}.sl-pr-60{padding-right:240px}.sl-pb-60{padding-bottom:240px}.sl-pl-60{padding-left:240px}.sl-pt-80{padding-top:320px}.sl-pr-80{padding-right:320px}.sl-pb-80{padding-bottom:320px}.sl-pl-80{padding-left:320px}.sl-pt-px{padding-top:1px}.sl-pr-px{padding-right:1px}.sl-pb-px{padding-bottom:1px}.sl-pl-px{padding-left:1px}.sl-pt-0\\.5{padding-top:2px}.sl-pr-0\\.5{padding-right:2px}.sl-pb-0\\.5{padding-bottom:2px}.sl-pl-0\\.5{padding-left:2px}.sl-pt-1\\.5{padding-top:6px}.sl-pr-1\\.5{padding-right:6px}.sl-pb-1\\.5{padding-bottom:6px}.sl-pl-1\\.5{padding-left:6px}.sl-pt-2\\.5{padding-top:10px}.sl-pr-2\\.5{padding-right:10px}.sl-pb-2\\.5{padding-bottom:10px}.sl-pl-2\\.5{padding-left:10px}.sl-pt-3\\.5{padding-top:14px}.sl-pr-3\\.5{padding-right:14px}.sl-pb-3\\.5{padding-bottom:14px}.sl-pl-3\\.5{padding-left:14px}.sl-placeholder::-ms-input-placeholder{color:var(--color-text-light)}.sl-placeholder::placeholder{color:var(--color-text-light)}.sl-placeholder-primary::-ms-input-placeholder{color:#3898ff ;}.sl-placeholder-primary::placeholder{color:#3898ff ;}.sl-placeholder-success::-ms-input-placeholder{color:#0ea06f ;}.sl-placeholder-success::placeholder{color:#0ea06f ;}.sl-placeholder-warning::-ms-input-placeholder{color:#f3602b ;}.sl-placeholder-warning::placeholder{color:#f3602b ;}.sl-placeholder-danger::-ms-input-placeholder{color:#f05151 ;}.sl-placeholder-danger::placeholder{color:#f05151 ;}.sl-pointer-events-none{pointer-events:none}.sl-pointer-events-auto{pointer-events:auto}.sl-static{position:static}.sl-fixed{position:fixed}.sl-absolute{position:absolute}.sl-relative{position:relative}.sl-sticky{position:-webkit-sticky;position:sticky}.sl-resize-none{resize:none}.sl-resize-y{resize:vertical}.sl-resize-x{resize:horizontal}.sl-resize{resize:both}.sl-ring-primary{--tw-ring-color:hsla(var(--primary-h),80%,61%,var(--tw-ring-opacity)) ;}.sl-ring-success{--tw-ring-color:hsla(var(--success-h),84%,34%,var(--tw-ring-opacity)) ;}.sl-ring-warning{--tw-ring-color:hsla(var(--warning-h),89%,56%,var(--tw-ring-opacity)) ;}.sl-ring-danger{--tw-ring-color:hsla(var(--danger-h),84%,63%,var(--tw-ring-opacity)) ;}.focus\\:sl-ring-primary:focus{--tw-ring-color:hsla(var(--primary-h),80%,61%,var(--tw-ring-opacity)) ;}.focus\\:sl-ring-success:focus{--tw-ring-color:hsla(var(--success-h),84%,34%,var(--tw-ring-opacity)) ;}.focus\\:sl-ring-warning:focus{--tw-ring-color:hsla(var(--warning-h),89%,56%,var(--tw-ring-opacity)) ;}.focus\\:sl-ring-danger:focus{--tw-ring-color:hsla(var(--danger-h),84%,63%,var(--tw-ring-opacity)) ;}.sl-ring-opacity-0{--tw-ring-opacity:0}.sl-ring-opacity-5{--tw-ring-opacity:0.05}.sl-ring-opacity-10{--tw-ring-opacity:0.1}.sl-ring-opacity-20{--tw-ring-opacity:0.2}.sl-ring-opacity-30{--tw-ring-opacity:0.3}.sl-ring-opacity-40{--tw-ring-opacity:0.4}.sl-ring-opacity-50{--tw-ring-opacity:0.5}.sl-ring-opacity-60{--tw-ring-opacity:0.6}.sl-ring-opacity-70{--tw-ring-opacity:0.7}.sl-ring-opacity-90{--tw-ring-opacity:0.9}.sl-ring-opacity-100{--tw-ring-opacity:1}.focus\\:sl-ring-opacity-0:focus{--tw-ring-opacity:0}.focus\\:sl-ring-opacity-5:focus{--tw-ring-opacity:0.05}.focus\\:sl-ring-opacity-10:focus{--tw-ring-opacity:0.1}.focus\\:sl-ring-opacity-20:focus{--tw-ring-opacity:0.2}.focus\\:sl-ring-opacity-30:focus{--tw-ring-opacity:0.3}.focus\\:sl-ring-opacity-40:focus{--tw-ring-opacity:0.4}.focus\\:sl-ring-opacity-50:focus{--tw-ring-opacity:0.5}.focus\\:sl-ring-opacity-60:focus{--tw-ring-opacity:0.6}.focus\\:sl-ring-opacity-70:focus{--tw-ring-opacity:0.7}.focus\\:sl-ring-opacity-90:focus{--tw-ring-opacity:0.9}.focus\\:sl-ring-opacity-100:focus{--tw-ring-opacity:1}*{--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(147,197,253,0.5);--tw-ring-offset-shadow:0 0 transparent;--tw-ring-shadow:0 0 transparent}.sl-ring{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)}.sl-ring-inset{--tw-ring-inset:inset}.focus\\:sl-ring:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)}.focus\\:sl-ring-inset:focus{--tw-ring-inset:inset}.sl-table-auto{table-layout:auto}.sl-table-fixed{table-layout:fixed}.sl-text-left{text-align:left}.sl-text-center{text-align:center}.sl-text-right{text-align:right}.sl-text-justify{text-align:justify}.sl-text-transparent{color:transparent}.sl-text-current{color:currentColor}.sl-text-lighten-100{color:var(--color-lighten-100)}.sl-text-darken-100{color:var(--color-darken-100)}.sl-text-primary{color:var(--color-primary)}.sl-text-primary-tint{color:var(--color-primary-tint)}.sl-text-primary-light{color:var(--color-primary-light)}.sl-text-primary-dark{color:var(--color-primary-dark)}.sl-text-primary-darker{color:var(--color-primary-darker)}.sl-text-success{color:var(--color-success)}.sl-text-success-tint{color:var(--color-success-tint)}.sl-text-success-light{color:var(--color-success-light)}.sl-text-success-dark{color:var(--color-success-dark)}.sl-text-success-darker{color:var(--color-success-darker)}.sl-text-warning{color:var(--color-warning)}.sl-text-warning-tint{color:var(--color-warning-tint)}.sl-text-warning-light{color:var(--color-warning-light)}.sl-text-warning-dark{color:var(--color-warning-dark)}.sl-text-warning-darker{color:var(--color-warning-darker)}.sl-text-danger{color:var(--color-danger)}.sl-text-danger-tint{color:var(--color-danger-tint)}.sl-text-danger-light{color:var(--color-danger-light)}.sl-text-danger-dark{color:var(--color-danger-dark)}.sl-text-danger-darker{color:var(--color-danger-darker)}.sl-text-code{color:var(--color-code)}.sl-text-on-code{color:var(--color-on-code)}.sl-text-on-primary{color:var(--color-on-primary)}.sl-text-on-success{color:var(--color-on-success)}.sl-text-on-warning{color:var(--color-on-warning)}.sl-text-on-danger{color:var(--color-on-danger)}.sl-text-body{color:var(--color-text)}.sl-text-muted{color:var(--color-text-muted)}.sl-text-light{color:var(--color-text-light)}.sl-text-heading{color:var(--color-text-heading)}.sl-text-paragraph{color:var(--color-text-paragraph)}.sl-text-canvas-50{color:var(--color-canvas-50)}.sl-text-canvas-100{color:var(--color-canvas-100)}.sl-text-canvas-200{color:var(--color-canvas-200)}.sl-text-canvas-300{color:var(--color-canvas-300)}.sl-text-canvas-pure{color:var(--color-canvas-pure)}.sl-text-canvas{color:var(--color-canvas)}.sl-text-canvas-dialog{color:var(--color-canvas-dialog)}.sl-text-link{color:var(--color-link)}.sl-text-link-dark{color:var(--color-link-dark)}.hover\\:sl-text-transparent:hover{color:transparent}.hover\\:sl-text-current:hover{color:currentColor}.hover\\:sl-text-lighten-100:hover{color:var(--color-lighten-100)}.hover\\:sl-text-darken-100:hover{color:var(--color-darken-100)}.hover\\:sl-text-primary:hover{color:var(--color-primary)}.hover\\:sl-text-primary-tint:hover{color:var(--color-primary-tint)}.hover\\:sl-text-primary-light:hover{color:var(--color-primary-light)}.hover\\:sl-text-primary-dark:hover{color:var(--color-primary-dark)}.hover\\:sl-text-primary-darker:hover{color:var(--color-primary-darker)}.hover\\:sl-text-success:hover{color:var(--color-success)}.hover\\:sl-text-success-tint:hover{color:var(--color-success-tint)}.hover\\:sl-text-success-light:hover{color:var(--color-success-light)}.hover\\:sl-text-success-dark:hover{color:var(--color-success-dark)}.hover\\:sl-text-success-darker:hover{color:var(--color-success-darker)}.hover\\:sl-text-warning:hover{color:var(--color-warning)}.hover\\:sl-text-warning-tint:hover{color:var(--color-warning-tint)}.hover\\:sl-text-warning-light:hover{color:var(--color-warning-light)}.hover\\:sl-text-warning-dark:hover{color:var(--color-warning-dark)}.hover\\:sl-text-warning-darker:hover{color:var(--color-warning-darker)}.hover\\:sl-text-danger:hover{color:var(--color-danger)}.hover\\:sl-text-danger-tint:hover{color:var(--color-danger-tint)}.hover\\:sl-text-danger-light:hover{color:var(--color-danger-light)}.hover\\:sl-text-danger-dark:hover{color:var(--color-danger-dark)}.hover\\:sl-text-danger-darker:hover{color:var(--color-danger-darker)}.hover\\:sl-text-code:hover{color:var(--color-code)}.hover\\:sl-text-on-code:hover{color:var(--color-on-code)}.hover\\:sl-text-on-primary:hover{color:var(--color-on-primary)}.hover\\:sl-text-on-success:hover{color:var(--color-on-success)}.hover\\:sl-text-on-warning:hover{color:var(--color-on-warning)}.hover\\:sl-text-on-danger:hover{color:var(--color-on-danger)}.hover\\:sl-text-body:hover{color:var(--color-text)}.hover\\:sl-text-muted:hover{color:var(--color-text-muted)}.hover\\:sl-text-light:hover{color:var(--color-text-light)}.hover\\:sl-text-heading:hover{color:var(--color-text-heading)}.hover\\:sl-text-paragraph:hover{color:var(--color-text-paragraph)}.hover\\:sl-text-canvas-50:hover{color:var(--color-canvas-50)}.hover\\:sl-text-canvas-100:hover{color:var(--color-canvas-100)}.hover\\:sl-text-canvas-200:hover{color:var(--color-canvas-200)}.hover\\:sl-text-canvas-300:hover{color:var(--color-canvas-300)}.hover\\:sl-text-canvas-pure:hover{color:var(--color-canvas-pure)}.hover\\:sl-text-canvas:hover{color:var(--color-canvas)}.hover\\:sl-text-canvas-dialog:hover{color:var(--color-canvas-dialog)}.hover\\:sl-text-link:hover{color:var(--color-link)}.hover\\:sl-text-link-dark:hover{color:var(--color-link-dark)}.focus\\:sl-text-transparent:focus{color:transparent}.focus\\:sl-text-current:focus{color:currentColor}.focus\\:sl-text-lighten-100:focus{color:var(--color-lighten-100)}.focus\\:sl-text-darken-100:focus{color:var(--color-darken-100)}.focus\\:sl-text-primary:focus{color:var(--color-primary)}.focus\\:sl-text-primary-tint:focus{color:var(--color-primary-tint)}.focus\\:sl-text-primary-light:focus{color:var(--color-primary-light)}.focus\\:sl-text-primary-dark:focus{color:var(--color-primary-dark)}.focus\\:sl-text-primary-darker:focus{color:var(--color-primary-darker)}.focus\\:sl-text-success:focus{color:var(--color-success)}.focus\\:sl-text-success-tint:focus{color:var(--color-success-tint)}.focus\\:sl-text-success-light:focus{color:var(--color-success-light)}.focus\\:sl-text-success-dark:focus{color:var(--color-success-dark)}.focus\\:sl-text-success-darker:focus{color:var(--color-success-darker)}.focus\\:sl-text-warning:focus{color:var(--color-warning)}.focus\\:sl-text-warning-tint:focus{color:var(--color-warning-tint)}.focus\\:sl-text-warning-light:focus{color:var(--color-warning-light)}.focus\\:sl-text-warning-dark:focus{color:var(--color-warning-dark)}.focus\\:sl-text-warning-darker:focus{color:var(--color-warning-darker)}.focus\\:sl-text-danger:focus{color:var(--color-danger)}.focus\\:sl-text-danger-tint:focus{color:var(--color-danger-tint)}.focus\\:sl-text-danger-light:focus{color:var(--color-danger-light)}.focus\\:sl-text-danger-dark:focus{color:var(--color-danger-dark)}.focus\\:sl-text-danger-darker:focus{color:var(--color-danger-darker)}.focus\\:sl-text-code:focus{color:var(--color-code)}.focus\\:sl-text-on-code:focus{color:var(--color-on-code)}.focus\\:sl-text-on-primary:focus{color:var(--color-on-primary)}.focus\\:sl-text-on-success:focus{color:var(--color-on-success)}.focus\\:sl-text-on-warning:focus{color:var(--color-on-warning)}.focus\\:sl-text-on-danger:focus{color:var(--color-on-danger)}.focus\\:sl-text-body:focus{color:var(--color-text)}.focus\\:sl-text-muted:focus{color:var(--color-text-muted)}.focus\\:sl-text-light:focus{color:var(--color-text-light)}.focus\\:sl-text-heading:focus{color:var(--color-text-heading)}.focus\\:sl-text-paragraph:focus{color:var(--color-text-paragraph)}.focus\\:sl-text-canvas-50:focus{color:var(--color-canvas-50)}.focus\\:sl-text-canvas-100:focus{color:var(--color-canvas-100)}.focus\\:sl-text-canvas-200:focus{color:var(--color-canvas-200)}.focus\\:sl-text-canvas-300:focus{color:var(--color-canvas-300)}.focus\\:sl-text-canvas-pure:focus{color:var(--color-canvas-pure)}.focus\\:sl-text-canvas:focus{color:var(--color-canvas)}.focus\\:sl-text-canvas-dialog:focus{color:var(--color-canvas-dialog)}.focus\\:sl-text-link:focus{color:var(--color-link)}.focus\\:sl-text-link-dark:focus{color:var(--color-link-dark)}.sl-underline{text-decoration:underline}.sl-line-through{text-decoration:line-through}.sl-no-underline{text-decoration:none}.sl-truncate{overflow:hidden;white-space:nowrap}.sl-overflow-ellipsis,.sl-truncate{text-overflow:ellipsis}.sl-overflow-clip{text-overflow:clip}.sl-uppercase{text-transform:uppercase}.sl-lowercase{text-transform:lowercase}.sl-capitalize{text-transform:capitalize}.sl-normal-case{text-transform:none}.sl-transform{transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sl-transform,.sl-transform-gpu{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1}.sl-transform-gpu{transform:translate3d(var(--tw-translate-x),var(--tw-translate-y),0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sl-transform-none{transform:none}.sl-delay-75{transition-delay:75ms}.sl-delay-150{transition-delay:.15s}.sl-delay-300{transition-delay:.3s}.sl-delay-500{transition-delay:.5s}.sl-delay-1000{transition-delay:1s}.sl-duration-75{transition-duration:75ms}.sl-duration-150{transition-duration:.15s}.sl-duration-300{transition-duration:.3s}.sl-duration-500{transition-duration:.5s}.sl-duration-1000{transition-duration:1s}.sl-transition{transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.sl-translate-x-0{--tw-translate-x:0px}.sl-translate-x-1{--tw-translate-x:4px}.sl-translate-x-2{--tw-translate-x:8px}.sl-translate-x-3{--tw-translate-x:12px}.sl-translate-x-4{--tw-translate-x:16px}.sl-translate-x-5{--tw-translate-x:20px}.sl-translate-x-6{--tw-translate-x:24px}.sl-translate-x-7{--tw-translate-x:28px}.sl-translate-x-8{--tw-translate-x:32px}.sl-translate-x-9{--tw-translate-x:36px}.sl-translate-x-10{--tw-translate-x:40px}.sl-translate-x-11{--tw-translate-x:44px}.sl-translate-x-12{--tw-translate-x:48px}.sl-translate-x-14{--tw-translate-x:56px}.sl-translate-x-16{--tw-translate-x:64px}.sl-translate-x-20{--tw-translate-x:80px}.sl-translate-x-24{--tw-translate-x:96px}.sl-translate-x-32{--tw-translate-x:128px}.sl-translate-x-40{--tw-translate-x:160px}.sl-translate-x-60{--tw-translate-x:240px}.sl-translate-x-80{--tw-translate-x:320px}.sl-translate-x-px{--tw-translate-x:1px}.sl-translate-x-0\\.5{--tw-translate-x:2px}.sl-translate-x-1\\.5{--tw-translate-x:6px}.sl-translate-x-2\\.5{--tw-translate-x:10px}.sl-translate-x-3\\.5{--tw-translate-x:14px}.sl--translate-x-0{--tw-translate-x:0px}.sl--translate-x-1{--tw-translate-x:-4px}.sl--translate-x-2{--tw-translate-x:-8px}.sl--translate-x-3{--tw-translate-x:-12px}.sl--translate-x-4{--tw-translate-x:-16px}.sl--translate-x-5{--tw-translate-x:-20px}.sl--translate-x-6{--tw-translate-x:-24px}.sl--translate-x-7{--tw-translate-x:-28px}.sl--translate-x-8{--tw-translate-x:-32px}.sl--translate-x-9{--tw-translate-x:-36px}.sl--translate-x-10{--tw-translate-x:-40px}.sl--translate-x-11{--tw-translate-x:-44px}.sl--translate-x-12{--tw-translate-x:-48px}.sl--translate-x-14{--tw-translate-x:-56px}.sl--translate-x-16{--tw-translate-x:-64px}.sl--translate-x-20{--tw-translate-x:-80px}.sl--translate-x-24{--tw-translate-x:-96px}.sl--translate-x-32{--tw-translate-x:-128px}.sl--translate-x-40{--tw-translate-x:-160px}.sl--translate-x-60{--tw-translate-x:-240px}.sl--translate-x-80{--tw-translate-x:-320px}.sl--translate-x-px{--tw-translate-x:-1px}.sl--translate-x-0\\.5{--tw-translate-x:-2px}.sl--translate-x-1\\.5{--tw-translate-x:-6px}.sl--translate-x-2\\.5{--tw-translate-x:-10px}.sl--translate-x-3\\.5{--tw-translate-x:-14px}.sl-translate-y-0{--tw-translate-y:0px}.sl-translate-y-1{--tw-translate-y:4px}.sl-translate-y-2{--tw-translate-y:8px}.sl-translate-y-3{--tw-translate-y:12px}.sl-translate-y-4{--tw-translate-y:16px}.sl-translate-y-5{--tw-translate-y:20px}.sl-translate-y-6{--tw-translate-y:24px}.sl-translate-y-7{--tw-translate-y:28px}.sl-translate-y-8{--tw-translate-y:32px}.sl-translate-y-9{--tw-translate-y:36px}.sl-translate-y-10{--tw-translate-y:40px}.sl-translate-y-11{--tw-translate-y:44px}.sl-translate-y-12{--tw-translate-y:48px}.sl-translate-y-14{--tw-translate-y:56px}.sl-translate-y-16{--tw-translate-y:64px}.sl-translate-y-20{--tw-translate-y:80px}.sl-translate-y-24{--tw-translate-y:96px}.sl-translate-y-32{--tw-translate-y:128px}.sl-translate-y-40{--tw-translate-y:160px}.sl-translate-y-60{--tw-translate-y:240px}.sl-translate-y-80{--tw-translate-y:320px}.sl-translate-y-px{--tw-translate-y:1px}.sl-translate-y-0\\.5{--tw-translate-y:2px}.sl-translate-y-1\\.5{--tw-translate-y:6px}.sl-translate-y-2\\.5{--tw-translate-y:10px}.sl-translate-y-3\\.5{--tw-translate-y:14px}.sl--translate-y-0{--tw-translate-y:0px}.sl--translate-y-1{--tw-translate-y:-4px}.sl--translate-y-2{--tw-translate-y:-8px}.sl--translate-y-3{--tw-translate-y:-12px}.sl--translate-y-4{--tw-translate-y:-16px}.sl--translate-y-5{--tw-translate-y:-20px}.sl--translate-y-6{--tw-translate-y:-24px}.sl--translate-y-7{--tw-translate-y:-28px}.sl--translate-y-8{--tw-translate-y:-32px}.sl--translate-y-9{--tw-translate-y:-36px}.sl--translate-y-10{--tw-translate-y:-40px}.sl--translate-y-11{--tw-translate-y:-44px}.sl--translate-y-12{--tw-translate-y:-48px}.sl--translate-y-14{--tw-translate-y:-56px}.sl--translate-y-16{--tw-translate-y:-64px}.sl--translate-y-20{--tw-translate-y:-80px}.sl--translate-y-24{--tw-translate-y:-96px}.sl--translate-y-32{--tw-translate-y:-128px}.sl--translate-y-40{--tw-translate-y:-160px}.sl--translate-y-60{--tw-translate-y:-240px}.sl--translate-y-80{--tw-translate-y:-320px}.sl--translate-y-px{--tw-translate-y:-1px}.sl--translate-y-0\\.5{--tw-translate-y:-2px}.sl--translate-y-1\\.5{--tw-translate-y:-6px}.sl--translate-y-2\\.5{--tw-translate-y:-10px}.sl--translate-y-3\\.5{--tw-translate-y:-14px}.hover\\:sl-translate-x-0:hover{--tw-translate-x:0px}.hover\\:sl-translate-x-1:hover{--tw-translate-x:4px}.hover\\:sl-translate-x-2:hover{--tw-translate-x:8px}.hover\\:sl-translate-x-3:hover{--tw-translate-x:12px}.hover\\:sl-translate-x-4:hover{--tw-translate-x:16px}.hover\\:sl-translate-x-5:hover{--tw-translate-x:20px}.hover\\:sl-translate-x-6:hover{--tw-translate-x:24px}.hover\\:sl-translate-x-7:hover{--tw-translate-x:28px}.hover\\:sl-translate-x-8:hover{--tw-translate-x:32px}.hover\\:sl-translate-x-9:hover{--tw-translate-x:36px}.hover\\:sl-translate-x-10:hover{--tw-translate-x:40px}.hover\\:sl-translate-x-11:hover{--tw-translate-x:44px}.hover\\:sl-translate-x-12:hover{--tw-translate-x:48px}.hover\\:sl-translate-x-14:hover{--tw-translate-x:56px}.hover\\:sl-translate-x-16:hover{--tw-translate-x:64px}.hover\\:sl-translate-x-20:hover{--tw-translate-x:80px}.hover\\:sl-translate-x-24:hover{--tw-translate-x:96px}.hover\\:sl-translate-x-32:hover{--tw-translate-x:128px}.hover\\:sl-translate-x-40:hover{--tw-translate-x:160px}.hover\\:sl-translate-x-60:hover{--tw-translate-x:240px}.hover\\:sl-translate-x-80:hover{--tw-translate-x:320px}.hover\\:sl-translate-x-px:hover{--tw-translate-x:1px}.hover\\:sl-translate-x-0\\.5:hover{--tw-translate-x:2px}.hover\\:sl-translate-x-1\\.5:hover{--tw-translate-x:6px}.hover\\:sl-translate-x-2\\.5:hover{--tw-translate-x:10px}.hover\\:sl-translate-x-3\\.5:hover{--tw-translate-x:14px}.hover\\:sl--translate-x-0:hover{--tw-translate-x:0px}.hover\\:sl--translate-x-1:hover{--tw-translate-x:-4px}.hover\\:sl--translate-x-2:hover{--tw-translate-x:-8px}.hover\\:sl--translate-x-3:hover{--tw-translate-x:-12px}.hover\\:sl--translate-x-4:hover{--tw-translate-x:-16px}.hover\\:sl--translate-x-5:hover{--tw-translate-x:-20px}.hover\\:sl--translate-x-6:hover{--tw-translate-x:-24px}.hover\\:sl--translate-x-7:hover{--tw-translate-x:-28px}.hover\\:sl--translate-x-8:hover{--tw-translate-x:-32px}.hover\\:sl--translate-x-9:hover{--tw-translate-x:-36px}.hover\\:sl--translate-x-10:hover{--tw-translate-x:-40px}.hover\\:sl--translate-x-11:hover{--tw-translate-x:-44px}.hover\\:sl--translate-x-12:hover{--tw-translate-x:-48px}.hover\\:sl--translate-x-14:hover{--tw-translate-x:-56px}.hover\\:sl--translate-x-16:hover{--tw-translate-x:-64px}.hover\\:sl--translate-x-20:hover{--tw-translate-x:-80px}.hover\\:sl--translate-x-24:hover{--tw-translate-x:-96px}.hover\\:sl--translate-x-32:hover{--tw-translate-x:-128px}.hover\\:sl--translate-x-40:hover{--tw-translate-x:-160px}.hover\\:sl--translate-x-60:hover{--tw-translate-x:-240px}.hover\\:sl--translate-x-80:hover{--tw-translate-x:-320px}.hover\\:sl--translate-x-px:hover{--tw-translate-x:-1px}.hover\\:sl--translate-x-0\\.5:hover{--tw-translate-x:-2px}.hover\\:sl--translate-x-1\\.5:hover{--tw-translate-x:-6px}.hover\\:sl--translate-x-2\\.5:hover{--tw-translate-x:-10px}.hover\\:sl--translate-x-3\\.5:hover{--tw-translate-x:-14px}.hover\\:sl-translate-y-0:hover{--tw-translate-y:0px}.hover\\:sl-translate-y-1:hover{--tw-translate-y:4px}.hover\\:sl-translate-y-2:hover{--tw-translate-y:8px}.hover\\:sl-translate-y-3:hover{--tw-translate-y:12px}.hover\\:sl-translate-y-4:hover{--tw-translate-y:16px}.hover\\:sl-translate-y-5:hover{--tw-translate-y:20px}.hover\\:sl-translate-y-6:hover{--tw-translate-y:24px}.hover\\:sl-translate-y-7:hover{--tw-translate-y:28px}.hover\\:sl-translate-y-8:hover{--tw-translate-y:32px}.hover\\:sl-translate-y-9:hover{--tw-translate-y:36px}.hover\\:sl-translate-y-10:hover{--tw-translate-y:40px}.hover\\:sl-translate-y-11:hover{--tw-translate-y:44px}.hover\\:sl-translate-y-12:hover{--tw-translate-y:48px}.hover\\:sl-translate-y-14:hover{--tw-translate-y:56px}.hover\\:sl-translate-y-16:hover{--tw-translate-y:64px}.hover\\:sl-translate-y-20:hover{--tw-translate-y:80px}.hover\\:sl-translate-y-24:hover{--tw-translate-y:96px}.hover\\:sl-translate-y-32:hover{--tw-translate-y:128px}.hover\\:sl-translate-y-40:hover{--tw-translate-y:160px}.hover\\:sl-translate-y-60:hover{--tw-translate-y:240px}.hover\\:sl-translate-y-80:hover{--tw-translate-y:320px}.hover\\:sl-translate-y-px:hover{--tw-translate-y:1px}.hover\\:sl-translate-y-0\\.5:hover{--tw-translate-y:2px}.hover\\:sl-translate-y-1\\.5:hover{--tw-translate-y:6px}.hover\\:sl-translate-y-2\\.5:hover{--tw-translate-y:10px}.hover\\:sl-translate-y-3\\.5:hover{--tw-translate-y:14px}.hover\\:sl--translate-y-0:hover{--tw-translate-y:0px}.hover\\:sl--translate-y-1:hover{--tw-translate-y:-4px}.hover\\:sl--translate-y-2:hover{--tw-translate-y:-8px}.hover\\:sl--translate-y-3:hover{--tw-translate-y:-12px}.hover\\:sl--translate-y-4:hover{--tw-translate-y:-16px}.hover\\:sl--translate-y-5:hover{--tw-translate-y:-20px}.hover\\:sl--translate-y-6:hover{--tw-translate-y:-24px}.hover\\:sl--translate-y-7:hover{--tw-translate-y:-28px}.hover\\:sl--translate-y-8:hover{--tw-translate-y:-32px}.hover\\:sl--translate-y-9:hover{--tw-translate-y:-36px}.hover\\:sl--translate-y-10:hover{--tw-translate-y:-40px}.hover\\:sl--translate-y-11:hover{--tw-translate-y:-44px}.hover\\:sl--translate-y-12:hover{--tw-translate-y:-48px}.hover\\:sl--translate-y-14:hover{--tw-translate-y:-56px}.hover\\:sl--translate-y-16:hover{--tw-translate-y:-64px}.hover\\:sl--translate-y-20:hover{--tw-translate-y:-80px}.hover\\:sl--translate-y-24:hover{--tw-translate-y:-96px}.hover\\:sl--translate-y-32:hover{--tw-translate-y:-128px}.hover\\:sl--translate-y-40:hover{--tw-translate-y:-160px}.hover\\:sl--translate-y-60:hover{--tw-translate-y:-240px}.hover\\:sl--translate-y-80:hover{--tw-translate-y:-320px}.hover\\:sl--translate-y-px:hover{--tw-translate-y:-1px}.hover\\:sl--translate-y-0\\.5:hover{--tw-translate-y:-2px}.hover\\:sl--translate-y-1\\.5:hover{--tw-translate-y:-6px}.hover\\:sl--translate-y-2\\.5:hover{--tw-translate-y:-10px}.hover\\:sl--translate-y-3\\.5:hover{--tw-translate-y:-14px}.sl-select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.sl-select-text{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.sl-select-all{-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all;user-select:all}.sl-select-auto{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.sl-align-baseline{vertical-align:initial}.sl-align-top{vertical-align:top}.sl-align-middle{vertical-align:middle}.sl-align-bottom{vertical-align:bottom}.sl-align-text-top{vertical-align:text-top}.sl-align-text-bottom{vertical-align:text-bottom}.sl-visible{visibility:visible}.sl-invisible{visibility:hidden}.sl-group:hover .group-hover\\:sl-visible{visibility:visible}.sl-group:hover .group-hover\\:sl-invisible{visibility:hidden}.sl-group:focus .group-focus\\:sl-visible{visibility:visible}.sl-group:focus .group-focus\\:sl-invisible{visibility:hidden}.sl-whitespace-normal{white-space:normal}.sl-whitespace-nowrap{white-space:nowrap}.sl-whitespace-pre{white-space:pre}.sl-whitespace-pre-line{white-space:pre-line}.sl-whitespace-pre-wrap{white-space:pre-wrap}.sl-w-0{width:0}.sl-w-1{width:4px}.sl-w-2{width:8px}.sl-w-3{width:12px}.sl-w-4{width:16px}.sl-w-5{width:20px}.sl-w-6{width:24px}.sl-w-7{width:28px}.sl-w-8{width:32px}.sl-w-9{width:36px}.sl-w-10{width:40px}.sl-w-11{width:44px}.sl-w-12{width:48px}.sl-w-14{width:56px}.sl-w-16{width:64px}.sl-w-20{width:80px}.sl-w-24{width:96px}.sl-w-32{width:128px}.sl-w-40{width:160px}.sl-w-60{width:240px}.sl-w-80{width:320px}.sl-w-auto{width:auto}.sl-w-px{width:1px}.sl-w-0\\.5{width:2px}.sl-w-1\\.5{width:6px}.sl-w-2\\.5{width:10px}.sl-w-3\\.5{width:14px}.sl-w-xs{width:20px}.sl-w-sm{width:24px}.sl-w-md{width:32px}.sl-w-lg{width:36px}.sl-w-xl{width:44px}.sl-w-2xl{width:52px}.sl-w-3xl{width:60px}.sl-w-1\\/2{width:50%}.sl-w-1\\/3{width:33.333333%}.sl-w-2\\/3{width:66.666667%}.sl-w-1\\/4{width:25%}.sl-w-2\\/4{width:50%}.sl-w-3\\/4{width:75%}.sl-w-1\\/5{width:20%}.sl-w-2\\/5{width:40%}.sl-w-3\\/5{width:60%}.sl-w-4\\/5{width:80%}.sl-w-1\\/6{width:16.666667%}.sl-w-2\\/6{width:33.333333%}.sl-w-3\\/6{width:50%}.sl-w-4\\/6{width:66.666667%}.sl-w-5\\/6{width:83.333333%}.sl-w-full{width:100%}.sl-w-screen{width:100vw}.sl-w-min{width:-moz-min-content;width:min-content}.sl-w-max{width:-moz-max-content;width:max-content}.sl-break-normal{overflow-wrap:normal;word-break:normal}.sl-break-words{overflow-wrap:break-word}.sl-break-all{word-break:break-all}.sl-z-0{z-index:0}.sl-z-10{z-index:10}.sl-z-20{z-index:20}.sl-z-30{z-index:30}.sl-z-40{z-index:40}.sl-z-50{z-index:50}.sl-z-auto{z-index:auto}.focus\\:sl-z-0:focus{z-index:0}.focus\\:sl-z-10:focus{z-index:10}.focus\\:sl-z-20:focus{z-index:20}.focus\\:sl-z-30:focus{z-index:30}.focus\\:sl-z-40:focus{z-index:40}.focus\\:sl-z-50:focus{z-index:50}.focus\\:sl-z-auto:focus{z-index:auto}:root{--font-prose:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";--font-ui:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";--font-mono:\"SF Mono\",ui-monospace,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;--font-code:var(--font-mono);--fs-paragraph-leading:22px;--fs-paragraph:16px;--fs-code:14px;--fs-paragraph-small:14px;--fs-paragraph-tiny:12px;--lh-paragraph-leading:30px;--lh-paragraph:24px;--lh-code:1.5;--lh-paragraph-small:20px;--lh-paragraph-tiny:18px;--color-code:var(--color-canvas-50);--color-on-code:var(--color-text-heading)}.sl-aspect-ratio:before{display:block;height:0;content:\"\";padding-bottom:calc(1/var(--ratio)*100%)}.sl-aspect-ratio>:not(style){align-items:center;display:flex;height:100%;top:0;right:0;bottom:0;left:0;justify-content:center;overflow:hidden;position:absolute;width:100%}.sl-aspect-ratio>img,.sl-aspect-ratio>video{object-fit:cover}.sl-badge,.sl-button{align-items:center;border-width:1px;display:inline-flex;outline:2px solid transparent;outline-offset:2px;line-height:0}.sl-button-group>.sl-button:not(:first-child):not(:last-child){border-right:0;border-radius:0}.sl-button-group>.sl-button:first-child:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}.sl-button-group>.sl-button:last-child:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.Link>code{color:var(--color-link)}.Link:hover>code{color:var(--color-link-dark)}.sl-link-heading:hover .sl-link-heading__icon{opacity:1}.sl-link-heading__icon{opacity:0}.sl-prose{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:var(--fs-paragraph-small)}.sl-prose>:first-child{margin-top:0}.sl-prose>:last-child{margin-bottom:0}.sl-prose>h1{margin-top:0;margin-bottom:40px}.sl-prose>h2{margin-top:40px;margin-bottom:28px}.sl-prose strong{font-weight:600}.sl-prose h1+h2{color:var(--color-text-muted);font-weight:400;font-size:20px;line-height:1.5;margin-top:-30px;margin-bottom:40px}.sl-prose>h3{margin-top:40px;margin-bottom:16px}.sl-prose>h4{margin-top:32px;margin-bottom:8px}.sl-prose p{font-family:var(--font-prose);font-size:var(--fs-paragraph);line-height:var(--lh-paragraph);margin-top:16px;margin-bottom:16px;color:var(--color-text-paragraph)}.sl-prose p:first-child{margin-top:0}.sl-prose p:last-child{margin-bottom:0}.sl-prose p a,.sl-prose table a{color:var(--color-link)}.sl-prose p a:hover,.sl-prose table a:hover{color:var(--color-link-dark)}.sl-prose p a,.sl-prose table a{--color-link:var(--color-primary);--color-link-dark:var(--color-primary-dark)}.sl-prose hr{margin-top:16px;margin-bottom:16px}.sl-prose .sl-live-code{margin:24px -4px;table-layout:auto;width:100%}.sl-prose .sl-live-code__inner>pre{margin-top:0;margin-bottom:0}.sl-prose .sl-callout,.sl-prose .sl-product-image{margin-top:24px;margin-bottom:24px}.sl-prose .sl-product-image figure,.sl-prose .sl-product-image img,.sl-prose .sl-product-image video{margin-top:0;margin-bottom:0}.sl-prose ol,.sl-prose ul{font-size:var(--fs-paragraph);line-height:var(--lh-paragraph);color:var(--color-text-paragraph);counter-reset:list-counter;margin-top:24px;margin-bottom:24px}.sl-prose ol li,.sl-prose ul li{padding-left:32px}.sl-prose ol li{position:relative;counter-increment:list-counter}.sl-prose ol li:before{content:counter(list-counter) \".\";position:absolute;left:12px}.sl-prose ul:not(.contains-task-list) li{position:relative}.sl-prose ul:not(.contains-task-list) li:before{background-color:var(--color-text);opacity:.7;border-radius:50%;content:\"\";position:absolute;top:10px;left:12px;height:6px;width:6px}.sl-prose li{font-size:var(--fs-paragraph);margin-top:4px;margin-bottom:4px;color:var(--color-text-paragraph);padding-left:28px}.sl-prose li p{margin-top:12px;margin-bottom:12px}.sl-prose li>:first-child{margin-top:0}.sl-prose>ol p+:last-child,.sl-prose>ul p+:last-child{margin-bottom:12px}.sl-prose ol ol,.sl-prose ol ul,.sl-prose ul ol,.sl-prose ul ul{margin-top:2px;margin-bottom:2px}.sl-prose ul.contains-task-list input{position:relative;top:1px;margin-left:-30px;margin-right:10px}.sl-prose ul.contains-task-list p{margin-top:0}.sl-prose figure>*{margin-top:0;margin-bottom:0}.sl-prose figure figcaption{font-size:var(--fs-paragraph-small);line-height:var(--lh-paragraph-small);margin-top:8px;padding-left:16px;padding-right:16px;text-align:center;color:var(--color-text-muted)}.sl-prose blockquote p{margin-top:8px;margin-bottom:8px}.sl-prose table{margin-left:-4px;margin-right:-4px;margin-bottom:24px;overflow-x:auto;table-layout:auto;width:100%}.sl-prose thead td,.sl-prose thead th{font-size:12px;font-weight:500;padding:8px 12px;color:var(--color-text-muted);text-transform:uppercase}.sl-prose thead td:first-child,.sl-prose thead th:first-child{padding-left:4px}.sl-prose tbody{border-radius:5px;box-shadow:0 0 0 1px var(--color-border,currentColor)}.sl-prose tbody tr{border-top-width:1px}.sl-prose tbody tr:first-child{border-top:0}.sl-prose tbody tr:nth-child(2n){background-color:var(--color-canvas-50)}.sl-prose td{padding:10px 12px;vertical-align:top}.sl-prose td:not([align=center],[align=right]),.sl-prose th:not([align=center],[align=right]){text-align:left}.sl-prose .JsonSchemaViewer{border-radius:5px;border-width:1px;margin-left:-4px;margin-right:-4px}.sl-prose .mermaid{margin-top:24px;margin-bottom:24px}.sl-prose .mermaid>svg{border-radius:5px;border-width:1px;padding:20px;height:auto!important}.sl-prose .sl-code-group .mermaid,.sl-prose .sl-code-group pre{margin-top:0}.sl-stack--horizontal.sl-stack--2>:not(style)~:not(style){margin-left:8px}.sl-stack--horizontal.sl-stack--3>:not(style)~:not(style){margin-left:12px}.sl-stack--horizontal.sl-stack--4>:not(style)~:not(style){margin-left:16px}.sl-stack--horizontal.sl-stack--6>:not(style)~:not(style){margin-left:24px}.sl-stack--horizontal.sl-stack--8>:not(style)~:not(style){margin-left:32px}.sl-stack--horizontal.sl-stack--10>:not(style)~:not(style){margin-left:40px}.sl-stack--horizontal.sl-stack--12>:not(style)~:not(style){margin-left:48px}.sl-stack--horizontal.sl-stack--14>:not(style)~:not(style){margin-left:56px}.sl-stack--horizontal.sl-stack--16>:not(style)~:not(style){margin-left:64px}.sl-stack--horizontal.sl-stack--20>:not(style)~:not(style){margin-left:80px}.sl-stack--horizontal.sl-stack--24>:not(style)~:not(style){margin-left:96px}.sl-stack--horizontal.sl-stack--32>:not(style)~:not(style){margin-left:128px}.sl-stack--vertical.sl-stack--2>:not(style)~:not(style){margin-top:8px}.sl-stack--vertical.sl-stack--3>:not(style)~:not(style){margin-top:12px}.sl-stack--vertical.sl-stack--4>:not(style)~:not(style){margin-top:16px}.sl-stack--vertical.sl-stack--6>:not(style)~:not(style){margin-top:24px}.sl-stack--vertical.sl-stack--8>:not(style)~:not(style){margin-top:32px}.sl-stack--vertical.sl-stack--10>:not(style)~:not(style){margin-top:40px}.sl-stack--vertical.sl-stack--12>:not(style)~:not(style){margin-top:48px}.sl-stack--vertical.sl-stack--14>:not(style)~:not(style){margin-top:56px}.sl-stack--vertical.sl-stack--16>:not(style)~:not(style){margin-top:64px}.sl-stack--vertical.sl-stack--20>:not(style)~:not(style){margin-top:80px}.sl-stack--vertical.sl-stack--24>:not(style)~:not(style){margin-top:96px}.sl-stack--vertical.sl-stack--32>:not(style)~:not(style){margin-top:128px}.sl-switch .sl-switch__indicator{transition:background-color .1s cubic-bezier(.4,1,.75,.9)}.sl-switch .sl-switch__indicator .sl-switch__icon{visibility:hidden}.sl-switch .sl-switch__indicator:before{content:\"\";background-color:var(--color-canvas);border-radius:50%;height:calc(100% - 4px);width:calc(50% - 4px);left:0;margin:2px;position:absolute;transition:left .1s cubic-bezier(.4,1,.75,.9)}.sl-switch input:checked:disabled~.sl-switch__indicator{background-color:var(--color-primary-light)}.sl-switch input:checked~.sl-switch__indicator{background-color:var(--color-primary)}.sl-switch input:checked~.sl-switch__indicator .sl-switch__icon{visibility:visible}.sl-switch input:checked~.sl-switch__indicator:before{left:50%}input{background-color:initial}.sl-focus-ring{border-radius:2px;--tw-ring-color:hsla(var(--primary-h),80%,61%,var(--tw-ring-opacity)) ;;--tw-ring-opacity:0.5;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)}";

  const GLOBAL_CSS_ID = 'mosaic-global';
  const GLOBAL_CSS_THEME_ID = 'mosaic-theme';
  const injectStyles = ({
    mode
  } = {}) => {
    // do not attempt if we are not in a browser environment
    if (typeof document === 'undefined') return;
    appendCss(GLOBAL_CSS_ID, css);
    return subscribeTheme({
      mode
    });
  };
  const subscribeTheme = ({
    mode: initialMode
  } = {}) => {
    // do not attempt if we are not in a browser environment
    if (typeof document === 'undefined') return; // allow user to force a starting theme mode if they so desire

    if (initialMode) {
      useThemeStore.getState().setMode(initialMode);
    }

    const {
      theme,
      mode
    } = useThemeStore.getState();
    /**
     * If user did not init theme earlier, do so now
     */

    const dataTheme = document.documentElement.getAttribute('data-theme');

    if (!dataTheme) {
      document.documentElement.setAttribute('data-theme', getResolvedThemeMode(mode));
    }

    injectTheme(theme, mode);
    const unsub = useThemeStore.subscribe(state => {
      try {
        injectTheme(state.theme, state.mode);
      } catch (e) {
        // noop, usually due to in flight theme change while user is editing
        console.warn('Error computing and applying theme', e);
      }
    }, s => ({
      mode: s.mode,
      theme: s.theme
    }), shallow);
    return unsub;
  };

  const injectTheme = (theme, mode) => {
    const {
      setColorValues,
      setInvertedColorValues
    } = useThemeStore.getState();

    if (typeof document !== 'undefined') {
      const userMode = getResolvedThemeMode(mode);
      document.documentElement.setAttribute('data-theme', userMode);
    }

    const {
      css: lightCss
    } = computeTheme(theme, 'light');
    const {
      css: darkCss
    } = computeTheme(theme, 'dark');
    replaceCss(`${GLOBAL_CSS_THEME_ID}-light`, lightCss);
    replaceCss(`${GLOBAL_CSS_THEME_ID}-dark`, darkCss);
    const {
      colorValues,
      invertedColorValues
    } = computeTheme(theme, mode);
    setColorValues(colorValues);
    setInvertedColorValues(invertedColorValues);
  };

  const InlineStyles = () => {
    return React__default.createElement(React__default.Fragment, null, React__default.createElement("style", {
      id: GLOBAL_CSS_ID,
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: css
      }
    }), React__default.createElement(InlineTheme, null));
  };

  const InlineTheme = () => {
    const {
      theme
    } = useThemeStore();
    return React__default.createElement(React__default.Fragment, null, React__default.createElement("style", {
      id: `${GLOBAL_CSS_THEME_ID}-light`,
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: computeTheme(theme, 'light').css
      }
    }), React__default.createElement("style", {
      id: `${GLOBAL_CSS_THEME_ID}-dark`,
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: computeTheme(theme, 'dark').css
      }
    }));
  };
  /**
   * Small snippet to set the basics re theme as early as possible during rendering, to avoid major flashes of white etc.
   */


  const INIT_THEME_JS = `try {
  var query = window.matchMedia("(prefers-color-scheme: dark)");

  var preference = window.localStorage.getItem('${THEME_STORAGE_KEY}');
  preference = preference ? JSON.parse(preference) : { mode: "${DEFAULT_THEME_MODE}" };

  var theme = (preference.mode === "system" && query.matches) || preference.mode === "dark" ? "dark" : "light";
  document.documentElement.setAttribute('data-theme', theme);
} catch (e) {
  console.warn('problem setting initial theme mode', e);
}`;
  const InitTheme = () => {
    return React__default.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: INIT_THEME_JS
      }
    });
  };

  Object.defineProperty(exports, 'PressResponder', {
    enumerable: true,
    get: function () {
      return interactions.PressResponder;
    }
  });
  Object.defineProperty(exports, 'Pressable', {
    enumerable: true,
    get: function () {
      return interactions.Pressable;
    }
  });
  Object.defineProperty(exports, 'useId', {
    enumerable: true,
    get: function () {
      return utils$1.useId;
    }
  });
  Object.defineProperty(exports, 'useIsSSR', {
    enumerable: true,
    get: function () {
      return ssr.useIsSSR;
    }
  });
  Object.defineProperty(exports, 'useSSRSafeId', {
    enumerable: true,
    get: function () {
      return ssr.useSSRSafeId;
    }
  });
  exports.Article = Article;
  exports.AspectRatio = AspectRatio;
  exports.Avatar = Avatar;
  exports.Badge = Badge;
  exports.Box = Box;
  exports.Button = Button;
  exports.ButtonGroup = ButtonGroup;
  exports.Callout = Callout;
  exports.Card = Card;
  exports.Code = Code;
  exports.Container = Container;
  exports.CopyButton = CopyButton;
  exports.DEFAULT_THEME_MODE = DEFAULT_THEME_MODE;
  exports.Divider = Divider;
  exports.EntityName = EntityName;
  exports.FieldButton = FieldButton;
  exports.Flex = Flex;
  exports.GLOBAL_CSS_ID = GLOBAL_CSS_ID;
  exports.GLOBAL_CSS_THEME_ID = GLOBAL_CSS_THEME_ID;
  exports.Grid = Grid;
  exports.HStack = HStack;
  exports.Heading = Heading;
  exports.INIT_THEME_JS = INIT_THEME_JS;
  exports.Icon = Icon;
  exports.Image = Image;
  exports.InitTheme = InitTheme;
  exports.InlineStyles = InlineStyles;
  exports.Input = Input;
  exports.InvertTheme = InvertTheme;
  exports.InvertThemeContext = InvertThemeContext;
  exports.Link = Link;
  exports.LinkHeading = LinkHeading;
  exports.ListBox = ListBox;
  exports.ListBoxItem = ListBoxItem;
  exports.MENU_ITEM_IDENT_WIDTH = MENU_ITEM_IDENT_WIDTH;
  exports.Menu = Menu;
  exports.MenuDivider = MenuDivider;
  exports.MenuItem = MenuItem;
  exports.MenuOption = MenuOption;
  exports.MenuRadioGroup = MenuRadioGroup;
  exports.Modal = Modal;
  exports.NoSsr = NoSsr;
  exports.Overlay = _Overlay;
  exports.Panel = Panel;
  exports.Paragraph = Paragraph;
  exports.Popover = Popover;
  exports.ProductImage = ProductImage;
  exports.Prose = Prose;
  exports.Provider = Provider;
  exports.Select = Select;
  exports.Stack = Stack;
  exports.Switch = Switch;
  exports.THEME_STORAGE_KEY = THEME_STORAGE_KEY;
  exports.Tab = Tab;
  exports.TabImpl = TabImpl;
  exports.TabList = TabList;
  exports.TabPanel = TabPanel;
  exports.TabPanels = TabPanels;
  exports.Tabs = Tabs;
  exports.Text = Text;
  exports.Tooltip = Tooltip;
  exports.TreeItem = TreeItem;
  exports.VStack = VStack;
  exports.WithDomRef = WithDomRef;
  exports.__DEV__ = __DEV__;
  exports.accumulateCollectionKeysByProp = accumulateCollectionKeysByProp;
  exports.appendCss = appendCss;
  exports.borderPropNames = borderPropNames;
  exports.borderProps = borderProps;
  exports.colorPropNames = colorPropNames;
  exports.colorProps = colorProps;
  exports.computeTheme = computeTheme;
  exports.containerSizes = containerSizes;
  exports.defaultTheme = defaultTheme;
  exports.error = error;
  exports.findCss = findCss;
  exports.flexPropNames = flexPropNames;
  exports.flexProps = flexProps;
  exports.getContrastColor = getContrastColor;
  exports.getCssVariable = getCssVariable;
  exports.getResolvedThemeMode = getResolvedThemeMode;
  exports.injectStyles = injectStyles;
  exports.interactivityPropNames = interactivityPropNames;
  exports.interactivityProps = interactivityProps;
  exports.isArray = isArray;
  exports.isDefined = isDefined;
  exports.isEmpty = isEmpty;
  exports.isEmptyArray = isEmptyArray;
  exports.isEmptyObject = isEmptyObject;
  exports.isFunction = isFunction;
  exports.isIconDefinition = isIconDefinition;
  exports.isIconProp = isIconProp;
  exports.isInputEvent = isInputEvent;
  exports.isNotEmptyObject = isNotEmptyObject;
  exports.isNotNumber = isNotNumber;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isNumeric = isNumeric;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.layoutPropNames = layoutPropNames;
  exports.layoutProps = layoutProps;
  exports.marginProps = marginProps;
  exports.noop = noop;
  exports.once = once;
  exports.paddingProps = paddingProps;
  exports.parseHsl = parseHsl;
  exports.positionPropNames = positionPropNames;
  exports.positionProps = positionProps;
  exports.prefersDarkMode = prefersDarkMode;
  exports.replaceCss = replaceCss;
  exports.ringPropNames = ringPropNames;
  exports.ringProps = ringProps;
  exports.runIfFn = runIfFn;
  exports.shadowPropNames = shadowPropNames;
  exports.shadowProps = shadowProps;
  exports.sizePropNames = sizePropNames;
  exports.sizeProps = sizeProps;
  exports.spacingPropNames = spacingPropNames;
  exports.splitBoxProps = splitBoxProps;
  exports.splitProps = splitProps;
  exports.stringifyHsl = stringifyHsl;
  exports.subscribeTheme = subscribeTheme;
  exports.transformPropNames = transformPropNames;
  exports.transformProps = transformProps;
  exports.typographyPropNames = typographyPropNames;
  exports.typographyProps = typographyProps;
  exports.useClipboard = useClipboard;
  exports.useCollectionKeyAccumulator = useCollectionKeyAccumulator;
  exports.useControllableProp = useControllableProp;
  exports.useControllableState = useControllableState;
  exports.useDOMRef = useDOMRef;
  exports.useIconStore = useIconStore;
  exports.useModalState = useModalState;
  exports.useTheme = useTheme;
  exports.useThemeIsDark = useThemeIsDark;
  exports.useThemeMode = useThemeMode;
  exports.useThemeStore = useThemeStore;
  exports.useUnwrapDOMRef = useUnwrapDOMRef;
  exports.warn = warn;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
