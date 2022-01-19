declare type OEmbedCommon<T> = {
    type: T;
    version: '1.0';
    title?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
};
export declare type OEmbedPhoto = OEmbedCommon<'photo'> & {
    url: string;
    width: number;
    height: number;
};
export declare type OEmbedVideo = OEmbedCommon<'video'> & {
    html: string;
    width: number;
    height: number;
};
export declare type OEmbedLink = OEmbedCommon<'link'>;
export declare type OEmbedRich = OEmbedCommon<'rich'> & {
    html: string;
    width: number;
    height: number;
};
export declare type OEmbed = OEmbedPhoto | OEmbedVideo | OEmbedLink | OEmbedRich;
export {};
