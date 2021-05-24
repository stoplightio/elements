/**
 * Pass a lodash style property path to pluck a specific theme property out. This helps with performance
 * if theme is being updated, since calling component will only re-render when the particular theme value
 * that is subscribed to changes.
 */
export declare const useTheme: (property?: string) => {
    themeValue: any;
    setColor: (name: "background" | "text" | "primary" | "success" | "warning" | "danger", val: string | import("..").HslColor2) => void;
    reset: () => void;
};
