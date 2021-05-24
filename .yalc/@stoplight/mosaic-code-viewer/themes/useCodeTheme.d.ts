export declare const useCodeTheme: () => {
    mode: "light" | "dark";
} & {
    plain: {
        [styleKey: string]: string | number | void;
        color?: string;
        backgroundColor?: string;
        fontStyle?: "normal" | "italic";
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through";
        opacity?: number;
    };
    styles: {
        types: string[];
        style: {
            [styleKey: string]: string | number | void;
            color?: string;
            backgroundColor?: string;
            fontStyle?: "normal" | "italic";
            fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
            textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through";
            opacity?: number;
        };
        languages?: ("markup" | "bash" | "clike" | "c" | "cpp" | "css" | "javascript" | "jsx" | "coffeescript" | "actionscript" | "css-extr" | "diff" | "git" | "go" | "graphql" | "handlebars" | "json" | "less" | "makefile" | "markdown" | "objectivec" | "ocaml" | "python" | "reason" | "sass" | "scss" | "sql" | "stylus" | "tsx" | "typescript" | "wasm" | "yaml")[];
    }[];
};
