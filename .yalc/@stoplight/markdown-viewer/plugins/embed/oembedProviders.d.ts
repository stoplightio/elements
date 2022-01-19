declare const _default: ({
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
        proxy: boolean;
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
        formats: string[];
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
        discovery: boolean;
    }[];
})[];
export default _default;
