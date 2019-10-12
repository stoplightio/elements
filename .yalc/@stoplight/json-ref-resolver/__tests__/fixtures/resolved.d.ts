declare const _default: {
    'https://exporter.io/resolved': {
        swagger: string;
        info: {
            version: string;
            title: string;
            description: string;
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
                    responses: {
                        '200': {
                            description: string;
                            schema: {
                                title: string;
                                allOf: ({
                                    title: string;
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                        };
                                        completed: {
                                            type: string[];
                                        };
                                        id?: undefined;
                                        completed_at?: undefined;
                                        created_at?: undefined;
                                        updated_at?: undefined;
                                        user?: undefined;
                                    };
                                    required: string[];
                                } | {
                                    type: string;
                                    properties: {
                                        id: {
                                            type: string;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        completed_at: {
                                            type: string[];
                                            format: string;
                                        };
                                        created_at: {
                                            type: string;
                                            format: string;
                                        };
                                        updated_at: {
                                            type: string;
                                            format: string;
                                        };
                                        user: {
                                            title: string;
                                            type: string;
                                            properties: {
                                                address: {
                                                    foo: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                age: {
                                                    type: string;
                                                    minimum: number;
                                                    maximum: number;
                                                };
                                            };
                                            required: string[];
                                        };
                                        name?: undefined;
                                        completed?: undefined;
                                    };
                                    required: string[];
                                    title?: undefined;
                                })[];
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
                                random: string;
                            };
                        };
                        '404': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                        '500': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
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
                            title: string;
                            type: string;
                            properties: {
                                name: {
                                    type: string;
                                };
                                completed: {
                                    type: string[];
                                };
                            };
                            required: string[];
                        };
                    }[];
                    responses: {
                        '200': {
                            description: string;
                            schema: {
                                title: string;
                                allOf: ({
                                    title: string;
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                        };
                                        completed: {
                                            type: string[];
                                        };
                                        id?: undefined;
                                        completed_at?: undefined;
                                        created_at?: undefined;
                                        updated_at?: undefined;
                                        user?: undefined;
                                    };
                                    required: string[];
                                } | {
                                    type: string;
                                    properties: {
                                        id: {
                                            type: string;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        completed_at: {
                                            type: string[];
                                            format: string;
                                        };
                                        created_at: {
                                            type: string;
                                            format: string;
                                        };
                                        updated_at: {
                                            type: string;
                                            format: string;
                                        };
                                        user: {
                                            title: string;
                                            type: string;
                                            properties: {
                                                address: {
                                                    foo: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                age: {
                                                    type: string;
                                                    minimum: number;
                                                    maximum: number;
                                                };
                                            };
                                            required: string[];
                                        };
                                        name?: undefined;
                                        completed?: undefined;
                                    };
                                    required: string[];
                                    title?: undefined;
                                })[];
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
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                        '404': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                        '500': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
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
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                        '404': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                        '500': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
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
                            title: string;
                            type: string;
                            properties: {
                                name: {
                                    type: string;
                                };
                                completed: {
                                    type: string[];
                                };
                            };
                            required: string[];
                        };
                        description: string;
                    }[];
                    responses: {
                        '201': {
                            description: string;
                            schema: {
                                title: string;
                                allOf: ({
                                    title: string;
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                        };
                                        completed: {
                                            type: string[];
                                        };
                                        id?: undefined;
                                        completed_at?: undefined;
                                        created_at?: undefined;
                                        updated_at?: undefined;
                                        user?: undefined;
                                    };
                                    required: string[];
                                } | {
                                    type: string;
                                    properties: {
                                        id: {
                                            type: string;
                                            minimum: number;
                                            maximum: number;
                                        };
                                        completed_at: {
                                            type: string[];
                                            format: string;
                                        };
                                        created_at: {
                                            type: string;
                                            format: string;
                                        };
                                        updated_at: {
                                            type: string;
                                            format: string;
                                        };
                                        user: {
                                            title: string;
                                            type: string;
                                            properties: {
                                                address: {
                                                    foo: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                age: {
                                                    type: string;
                                                    minimum: number;
                                                    maximum: number;
                                                };
                                            };
                                            required: string[];
                                        };
                                        name?: undefined;
                                        completed?: undefined;
                                    };
                                    required: string[];
                                    title?: undefined;
                                })[];
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
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                        '500': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
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
                    parameters: ({
                        name: string;
                        in: string;
                        description: string;
                        required: boolean;
                        type: string;
                        maximum: number;
                    } | {
                        name: string;
                        in: string;
                        required: boolean;
                        type: string;
                        description?: undefined;
                        maximum?: undefined;
                    })[];
                    responses: {
                        '200': {
                            description: string;
                            schema: {
                                type: string;
                                items: {
                                    title: string;
                                    allOf: ({
                                        title: string;
                                        type: string;
                                        properties: {
                                            name: {
                                                type: string;
                                            };
                                            completed: {
                                                type: string[];
                                            };
                                            id?: undefined;
                                            completed_at?: undefined;
                                            created_at?: undefined;
                                            updated_at?: undefined;
                                            user?: undefined;
                                        };
                                        required: string[];
                                    } | {
                                        type: string;
                                        properties: {
                                            id: {
                                                type: string;
                                                minimum: number;
                                                maximum: number;
                                            };
                                            completed_at: {
                                                type: string[];
                                                format: string;
                                            };
                                            created_at: {
                                                type: string;
                                                format: string;
                                            };
                                            updated_at: {
                                                type: string;
                                                format: string;
                                            };
                                            user: {
                                                title: string;
                                                type: string;
                                                properties: {
                                                    address: {
                                                        foo: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    age: {
                                                        type: string;
                                                        minimum: number;
                                                        maximum: number;
                                                    };
                                                };
                                                required: string[];
                                            };
                                            name?: undefined;
                                            completed?: undefined;
                                        };
                                        required: string[];
                                        title?: undefined;
                                    })[];
                                };
                            };
                            examples: {
                                'application/json': {
                                    id: number;
                                    name: string;
                                    completed: boolean;
                                }[];
                                empty: never[];
                            };
                        };
                        '500': {
                            description: string;
                            schema: {
                                type: string;
                                title: string;
                                properties: {
                                    status: {
                                        type: string;
                                    };
                                    error: {
                                        type: string;
                                    };
                                };
                                required: string[];
                            };
                            examples: {
                                'application/json': {
                                    status: string;
                                    error: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        parameters: {
            limit: {
                name: string;
                in: string;
                description: string;
                required: boolean;
                type: string;
                maximum: number;
            };
            skip: {
                name: string;
                in: string;
                required: boolean;
                type: string;
            };
        };
        definitions: {
            'todo-partial': {
                title: string;
                type: string;
                properties: {
                    name: {
                        type: string;
                    };
                    completed: {
                        type: string[];
                    };
                };
                required: string[];
            };
            'todo-full': {
                title: string;
                allOf: ({
                    title: string;
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        completed: {
                            type: string[];
                        };
                        id?: undefined;
                        completed_at?: undefined;
                        created_at?: undefined;
                        updated_at?: undefined;
                        user?: undefined;
                    };
                    required: string[];
                } | {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            minimum: number;
                            maximum: number;
                        };
                        completed_at: {
                            type: string[];
                            format: string;
                        };
                        created_at: {
                            type: string;
                            format: string;
                        };
                        updated_at: {
                            type: string;
                            format: string;
                        };
                        user: {
                            title: string;
                            type: string;
                            properties: {
                                address: {
                                    foo: string;
                                };
                                name: {
                                    type: string;
                                    description: string;
                                };
                                age: {
                                    type: string;
                                    minimum: number;
                                    maximum: number;
                                };
                            };
                            required: string[];
                        };
                        name?: undefined;
                        completed?: undefined;
                    };
                    required: string[];
                    title?: undefined;
                })[];
            };
        };
        tags: {
            name: string;
        }[];
    };
};
export default _default;
