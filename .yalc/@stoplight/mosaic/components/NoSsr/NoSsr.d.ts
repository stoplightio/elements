/**
 * Adapted from Material UI - https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/NoSsr/NoSsr.js
 */
import React from 'react';
export declare type NoSsrProps = {
    defer?: boolean;
    fallback?: React.ReactNode;
};
/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */
export declare const NoSsr: React.FC<NoSsrProps>;
