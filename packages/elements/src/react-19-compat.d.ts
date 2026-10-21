// @stoplight/mosaic types are written against @types/react <=18, where these attributes existed on
// HTMLAttributes. @types/react 19 removed them, which makes mosaic's `Pick<..., keyof HTMLAttributes>`
// props types demand them. Re-declare them (as optional) until mosaic ships React 19 types.
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    placeholder?: string | undefined;
    onPointerEnterCapture?: PointerEventHandler<T> | undefined;
    onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
  }
}
