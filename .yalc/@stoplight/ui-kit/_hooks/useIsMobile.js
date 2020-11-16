"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
exports.useIsMobile = (enableDrawer) => {
    const [isMobile, setIsMobile] = React.useState(exports.checkMobile(enableDrawer));
    const updateLayout = React.useCallback(() => {
        setIsMobile(exports.checkMobile(enableDrawer));
    }, [enableDrawer]);
    React.useEffect(() => {
        window.addEventListener('resize', updateLayout);
        return () => {
            window.removeEventListener('resize', updateLayout);
        };
    }, [updateLayout]);
    return isMobile;
};
exports.checkMobile = (enableDrawer) => {
    if (enableDrawer === false) {
        return false;
    }
    return typeof window !== 'undefined' && window.innerWidth < 768;
};
//# sourceMappingURL=useIsMobile.js.map