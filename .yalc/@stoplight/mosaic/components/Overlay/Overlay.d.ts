import React, { ReactNode } from 'react';
export declare type OverlayProps = {
    children: ReactNode;
    isOpen?: boolean;
    container?: Element;
};
declare let _Overlay: React.ForwardRefExoticComponent<OverlayProps & React.RefAttributes<import("@react-types/shared").DOMRefValue<HTMLDivElement>>>;
export { _Overlay as Overlay };
