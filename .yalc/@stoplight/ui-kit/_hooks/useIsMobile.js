"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.useIsMobile = (enableDrawer) => {
    const [isMobile, setIsMobile] = React.useState(exports.checkMobile(enableDrawer));
    const updateLayout = React.useCallback(() => {
        setIsMobile(exports.checkMobile(enableDrawer));
    }, []);
    React.useEffect(() => {
        window.addEventListener('resize', updateLayout);
        return () => {
            window.removeEventListener('resize', updateLayout);
        };
    }, [updateLayout]);
    return isMobile;
};
exports.checkMobile = (enableDrawer) => {
    if (enableDrawer === true) {
        enableDrawer = 768;
    }
    else if (enableDrawer === false) {
        return false;
    }
    return typeof window !== 'undefined' && window.innerWidth < enableDrawer;
};
//# sourceMappingURL=useIsMobile.js.map