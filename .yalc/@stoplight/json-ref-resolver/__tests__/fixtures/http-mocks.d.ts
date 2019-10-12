declare const _default: {
    'https://raw.githubusercontent.com/bojand/json-schema-test-samples/master/id.json': {
        description: string;
        type: string;
        minLength: number;
    };
    'https://raw.githubusercontent.com/bojand/json-schema-test-samples/master/foo.json': {
        description: string;
        readOnly: boolean;
        type: string;
    };
    'https://raw.githubusercontent.com/bojand/json-schema-test-samples/master/bar.json': {
        description: string;
        type: string;
    };
    'https://raw.githubusercontent.com/bojand/json-schema-test-samples/master/common-definitions.json': {
        $schema: string;
        description: string;
        type: string;
        definitions: {
            id: {
                description: string;
                readOnly: boolean;
                format: string;
                example: string;
                type: string;
                minLength: number;
            };
            created_at: {
                description: string;
                example: string;
                format: string;
                readOnly: boolean;
                type: string;
            };
            updated_at: {
                description: string;
                example: string;
                format: string;
                readOnly: boolean;
                type: string;
            };
            email: {
                description: string;
                format: string;
                readOnly: boolean;
                type: string;
                minLength: number;
            };
        };
    };
    'https://raw.githubusercontent.com/bojand/json-schema-test-samples/master/address.json': {
        $schema: string;
        description: string;
        type: string;
        definitions: {
            address1: {
                type: string;
            };
            address2: {
                type: string;
            };
            city: {
                type: string;
            };
            postalCode: {
                type: string;
            };
            state: {
                type: string;
            };
            country: {
                type: string;
            };
        };
        properties: {
            address1: {
                $ref: string;
            };
            address2: {
                $ref: string;
            };
            city: {
                $ref: string;
            };
            postalCode: {
                $ref: string;
            };
            state: {
                $ref: string;
            };
            country: {
                $ref: string;
            };
        };
    };
    'https://foo.com/1/master/main.hub.yml': {
        pages: {
            '/': {
                data: {
                    children: {
                        data: {
                            $ref: string;
                        };
                    }[];
                };
            };
        };
    };
    'https://foo.com/1/master/notifications.hub.yml': {
        pages: {
            '/': {
                title: string;
                data: {
                    foo: string;
                };
            };
        };
    };
    'https://root.com/foo.yml': {
        $ref: string;
    };
    'https://root.com/relative/bar.yml': {
        foo: string;
    };
    'https://exporter.stoplight.io/4254/master/main.oas2.yml': {
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
                                random: string;
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
                        description: string;
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
                                empty: never[];
                            };
                        };
                        '500': {
                            $ref: string;
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
                    $ref: string;
                    type?: undefined;
                    properties?: undefined;
                    required?: undefined;
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
                            $ref: string;
                        };
                    };
                    required: string[];
                    $ref?: undefined;
                })[];
            };
        };
        tags: {
            name: string;
        }[];
    };
    'https://exporter.stoplight.io/4254/master/common.oas2.yml': {
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
        securityDefinitions: {};
        paths: {};
        responses: {
            '401': {
                description: string;
                schema: {
                    $ref: string;
                };
                examples: {
                    'application/json': {
                        status: string;
                        error: string;
                    };
                };
            };
            '403': {
                description: string;
                schema: {
                    $ref: string;
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
                    $ref: string;
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
                    $ref: string;
                };
                examples: {
                    'application/json': {
                        status: string;
                        error: string;
                    };
                };
            };
        };
        definitions: {
            user: {
                title: string;
                type: string;
                properties: {
                    name: {
                        type: string;
                        description: string;
                    };
                    address: {
                        $ref: string;
                    };
                    age: {
                        type: string;
                        minimum: number;
                        maximum: number;
                    };
                };
                required: string[];
            };
            'error-response': {
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
        };
    };
    'https://exporter.stoplight.io/4254/master/foo/main.oas2.yml': {
        definitions: {
            address: {
                foo: string;
            };
        };
    };
    'https://back-pointing.com/a': {
        name: string;
        value: {
            $ref: string;
        };
        defs: {
            one: {
                name: string;
                value: {
                    $ref: string;
                };
            };
        };
    };
    'https://back-pointing.com/b': {
        name: string;
        defs: {
            one: {
                name: string;
                value: {
                    $ref: string;
                };
            };
            two: string;
        };
    };
    'https://back-pointing.com/c': {
        name: string;
        value: {
            $ref: string;
        };
    };
    'https://exporter.stoplight.io/123/version%2F1.0/car.oas2.yml': {
        definitions: {
            inner: boolean;
        };
    };
    'https://exporter.stoplight.io/with-dead-refs': {
        data: {
            car: {
                $ref: string;
            };
            deadInner: {
                $ref: string;
            };
        };
        deadOuter: {
            $ref: string;
        };
        deadLocal: {
            car: {
                $ref: string;
            };
            deadInner: {
                $ref: string;
            };
        };
    };
};
export default _default;
