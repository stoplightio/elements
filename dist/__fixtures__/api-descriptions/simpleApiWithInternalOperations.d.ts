export declare const simpleApiWithInternalOperations: {
    swagger: string;
    info: {
        title: string;
        description: string;
        version: string;
        contact: {
            name: string;
            url: string;
        };
        license: {
            name: string;
        };
    };
    host: string;
    schemes: string[];
    consumes: string[];
    produces: string[];
    securityDefinitions: {
        apikey: {
            name: string;
            type: string;
            in: string;
            description: string;
        };
    };
    tags: {
        name: string;
    }[];
    paths: {
        '/todos/{todoId}': {
            parameters: {
                name: string;
                in: string;
                required: boolean;
                type: string;
            }[];
            get: {
                operationId: string;
                summary: string;
                tags: string[];
                'x-internal': boolean;
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            'application/json': {
                                id: number;
                                name: string;
                                completed: boolean;
                                completed_at: string;
                                created_at: string;
                                updated_at: string;
                            };
                        };
                    };
                    '404': {
                        $ref: string;
                    };
                    '500': {
                        $ref: string;
                    };
                };
            };
            put: {
                operationId: string;
                summary: string;
                tags: string[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        $ref: string;
                        example: {
                            name: string;
                            completed: boolean;
                        };
                    };
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            'application/json': {
                                id: number;
                                name: string;
                                completed: boolean;
                                completed_at: null;
                                created_at: string;
                                updated_at: string;
                            };
                        };
                    };
                    '401': {
                        $ref: string;
                    };
                    '404': {
                        $ref: string;
                    };
                    '500': {
                        $ref: string;
                    };
                };
                security: {
                    apikey: never[];
                }[];
            };
            delete: {
                operationId: string;
                summary: string;
                tags: string[];
                responses: {
                    '204': {
                        description: string;
                    };
                    '401': {
                        $ref: string;
                    };
                    '404': {
                        $ref: string;
                    };
                    '500': {
                        $ref: string;
                    };
                };
                security: {
                    apikey: never[];
                }[];
            };
        };
        '/todos': {
            post: {
                operationId: string;
                summary: string;
                tags: string[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        $ref: string;
                        example: {
                            name: string;
                            completed: boolean;
                        };
                    };
                }[];
                responses: {
                    '201': {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            'application/json': {
                                id: number;
                                name: string;
                                completed: null;
                                completed_at: null;
                                created_at: string;
                                updated_at: string;
                            };
                        };
                    };
                    '401': {
                        $ref: string;
                    };
                    '500': {
                        $ref: string;
                    };
                };
                security: {
                    apikey: never[];
                }[];
                description: string;
            };
            get: {
                operationId: string;
                summary: string;
                tags: string[];
                parameters: {
                    $ref: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        schema: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        examples: {
                            'application/json': {
                                id: number;
                                name: string;
                                completed: boolean;
                            }[];
                        };
                    };
                    '500': {
                        $ref: string;
                    };
                };
                description: string;
            };
        };
    };
    definitions: {
        InternalSchema: {
            title: string;
            description: string;
            schema: {
                type: string;
            };
            'x-internal': boolean;
        };
    };
};
