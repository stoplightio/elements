export declare const InstagramAPI: {
    swagger: string;
    schemes: string[];
    host: string;
    basePath: string;
    info: {
        contact: {
            name: string;
            url: string;
            'x-twitter': string;
        };
        description: string;
        termsOfService: string;
        title: string;
        version: string;
        'x-apisguru-categories': string[];
        'x-logo': {
            url: string;
        };
        'x-origin': {
            format: string;
            url: string;
            version: string;
        }[];
        'x-preferred': boolean;
        'x-providerName': string;
        'x-unofficialSpec': boolean;
    };
    externalDocs: {
        description: string;
        url: string;
    };
    produces: string[];
    securityDefinitions: {
        api_key: {
            in: string;
            name: string;
            type: string;
        };
        instagram_auth: {
            authorizationUrl: string;
            flow: string;
            scopes: {
                basic: string;
                comments: string;
                follower_list: string;
                likes: string;
                public_content: string;
                relationships: string;
            };
            type: string;
        };
    };
    tags: {
        description: string;
        name: string;
    }[];
    paths: {
        '/geographies/{geo-id}/media/recent': {
            get: {
                deprecated: boolean;
                description: string;
                parameters: ({
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                    format?: undefined;
                } | {
                    description: string;
                    format: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                })[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/locations/search': {
            get: {
                description: string;
                parameters: ({
                    description: string;
                    format: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                } | {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                    format?: undefined;
                })[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/locations/{location-id}': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/locations/{location-id}/media/recent': {
            get: {
                description: string;
                parameters: ({
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                    format?: undefined;
                } | {
                    description: string;
                    format: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                })[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/popular': {
            get: {
                deprecated: boolean;
                description: string;
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/search': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    format: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/shortcode/{shortcode}': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/{media-id}': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/{media-id}/comments': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
            post: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/{media-id}/comments/{comment-id}': {
            delete: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/media/{media-id}/likes': {
            delete: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
            post: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/tags/search': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/tags/{tag-name}': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/tags/{tag-name}/media/recent': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/search': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/self/feed': {
            get: {
                deprecated: boolean;
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/self/media/liked': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/self/requested-by': {
            get: {
                description: string;
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/{user-id}': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                    '404': {
                        description: string;
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/{user-id}/followed-by': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/{user-id}/follows': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/users/{user-id}/media/recent': {
            get: {
                description: string;
                parameters: ({
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                    format?: undefined;
                } | {
                    description: string;
                    format: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                })[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
        '/internal/operation': {
            get: {
                description: string;
                'x-internal': boolean;
            };
        };
        '/users/{user-id}/relationship': {
            get: {
                description: string;
                parameters: {
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
            post: {
                description: string;
                parameters: ({
                    description: string;
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                    enum?: undefined;
                } | {
                    description: string;
                    enum: string[];
                    in: string;
                    name: string;
                    required: boolean;
                    type: string;
                })[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                    };
                };
                security: ({
                    api_key: never[];
                    instagram_auth?: undefined;
                } | {
                    instagram_auth: string[];
                    api_key?: undefined;
                })[];
                summary: string;
                tags: string[];
            };
        };
    };
    definitions: {
        CaptionData: {
            properties: {
                created_time: {
                    description: string;
                    type: string;
                };
                from: {
                    $ref: string;
                    description: string;
                };
                id: {
                    description: string;
                    type: string;
                };
                text: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        CommentEntry: {
            properties: {
                created_time: {
                    description: string;
                    type: string;
                };
                from: {
                    $ref: string;
                    description: string;
                };
                id: {
                    description: string;
                    type: string;
                };
                text: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        CommentsCollection: {
            properties: {
                count: {
                    description: string;
                    type: string;
                };
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
            };
            type: string;
        };
        CommentsResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        CursorPaginationInfo: {
            properties: {
                next_cursor: {
                    description: string;
                    type: string;
                };
                next_url: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        IdPaginationInfo: {
            properties: {
                next_max_id: {
                    description: string;
                    type: string;
                };
                next_url: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        ImageInfo: {
            properties: {
                height: {
                    description: string;
                    type: string;
                };
                url: {
                    description: string;
                    type: string;
                };
                width: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        ImagesData: {
            properties: {
                low_resolution: {
                    $ref: string;
                    description: string;
                };
                standard_resolution: {
                    $ref: string;
                    description: string;
                };
                thumbnail: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        LikesCollection: {
            properties: {
                count: {
                    description: string;
                    type: string;
                };
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
            };
            type: string;
        };
        LocationInfo: {
            properties: {
                id: {
                    description: string;
                    type: string;
                };
                latitude: {
                    description: string;
                    format: string;
                    type: string;
                };
                longitude: {
                    description: string;
                    format: string;
                    type: string;
                };
                name: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        LocationInfoResponse: {
            properties: {
                data: {
                    $ref: string;
                    description: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        LocationSearchResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        MediaEntry: {
            properties: {
                attribution: {
                    description: string;
                    type: string;
                };
                caption: {
                    $ref: string;
                    description: string;
                };
                comments: {
                    $ref: string;
                    description: string;
                };
                created_time: {
                    description: string;
                    type: string;
                };
                filter: {
                    description: string;
                    type: string;
                };
                id: {
                    description: string;
                    type: string;
                };
                images: {
                    $ref: string;
                    description: string;
                };
                likes: {
                    $ref: string;
                    description: string;
                };
                link: {
                    description: string;
                    type: string;
                };
                location: {
                    $ref: string;
                    description: string;
                };
                tags: {
                    description: string;
                    items: {
                        type: string;
                    };
                    type: string;
                };
                type: {
                    description: string;
                    enum: string[];
                    type: string;
                };
                user: {
                    $ref: string;
                    description: string;
                };
                user_has_liked: {
                    description: string;
                    type: string;
                };
                users_in_photo: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                videos: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        MediaEntryResponse: {
            properties: {
                data: {
                    $ref: string;
                    description: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        MediaListResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
                pagination: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        MediaSearchResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        MetaData: {
            properties: {
                code: {
                    description: string;
                    format: string;
                    type: string;
                };
            };
            type: string;
        };
        Position: {
            properties: {
                x: {
                    description: string;
                    format: string;
                    type: string;
                };
                y: {
                    description: string;
                    format: string;
                    type: string;
                };
            };
            type: string;
        };
        RelationshipInfo: {
            properties: {
                incoming_status: {
                    description: string;
                    enum: string[];
                    type: string;
                };
                outgoing_status: {
                    description: string;
                    enum: string[];
                    type: string;
                };
                target_user_is_private: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        RelationshipPostResponse: {
            properties: {
                data: {
                    $ref: string;
                    description: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        RelationshipResponse: {
            properties: {
                data: {
                    $ref: string;
                    description: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        RelationshipStatus: {
            properties: {
                outgoing_status: {
                    description: string;
                    enum: string[];
                    type: string;
                };
            };
            type: string;
        };
        StatusResponse: {
            properties: {
                data: {
                    description: string;
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        TagInfo: {
            properties: {
                media_count: {
                    description: string;
                    format: string;
                    type: string;
                };
                name: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        TagInfoResponse: {
            properties: {
                data: {
                    $ref: string;
                    description: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        TagMediaListResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
                pagination: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        TagPaginationInfo: {
            properties: {
                deprecation_warning: {
                    description: string;
                    type: string;
                };
                min_tag_id: {
                    description: string;
                    type: string;
                };
                next_max_id: {
                    description: string;
                    type: string;
                };
                next_max_tag_id: {
                    description: string;
                    type: string;
                };
                next_min_id: {
                    description: string;
                    type: string;
                };
                next_url: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        TagSearchResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        UserCounts: {
            properties: {
                followed_by: {
                    description: string;
                    format: string;
                    type: string;
                };
                follows: {
                    description: string;
                    format: string;
                    type: string;
                };
                media: {
                    description: string;
                    format: string;
                    type: string;
                };
            };
            type: string;
        };
        UserInPhoto: {
            properties: {
                position: {
                    $ref: string;
                    description: string;
                };
                user: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        UserInfo: {
            properties: {
                bio: {
                    description: string;
                    type: string;
                };
                counts: {
                    $ref: string;
                    description: string;
                };
                full_name: {
                    description: string;
                    type: string;
                };
                id: {
                    description: string;
                    type: string;
                };
                profile_picture: {
                    description: string;
                    type: string;
                };
                username: {
                    description: string;
                    type: string;
                };
                website: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        UserResponse: {
            properties: {
                data: {
                    $ref: string;
                    description: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        UserShortInfo: {
            properties: {
                full_name: {
                    description: string;
                    type: string;
                };
                id: {
                    description: string;
                    type: string;
                };
                profile_picture: {
                    description: string;
                    type: string;
                };
                username: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        UsersInfoResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        UsersPagingResponse: {
            properties: {
                data: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                meta: {
                    $ref: string;
                    description: string;
                };
                pagination: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        VideosData: {
            properties: {
                low_resolution: {
                    $ref: string;
                    description: string;
                };
                standard_resolution: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        InternalObject: {
            description: string;
            type: string;
            properties: {
                a: {
                    type: string;
                };
            };
            'x-internal': boolean;
        };
    };
};
