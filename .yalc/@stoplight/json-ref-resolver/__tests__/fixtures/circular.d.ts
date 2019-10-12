declare const _default: {
    definitions: {
        TenantProcessRule: {
            type: string;
            properties: {
                applications: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                tenant_id: {
                    type: string;
                };
            };
        };
        Recipe: {
            type: string;
            properties: {
                actionParams: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                actionTemplateId: {
                    type: string;
                };
                active: {
                    type: string;
                };
                categoryId: {
                    type: string;
                };
                createdAt: {
                    type: string;
                    format: string;
                };
                id: {
                    type: string;
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                ruleIds: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                scope: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                title: {
                    type: string;
                };
                triggerParams: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                triggerTemplateId: {
                    type: string;
                };
                userId: {
                    type: string;
                };
            };
        };
        Customer: {
            type: string;
            required: string[];
            properties: {
                partners: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                status: {
                    type: string;
                    enum: string[];
                };
                zones: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        ServiceOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        StateResult: {
            type: string;
            properties: {
                assetState: {
                    type: string;
                };
                regionId: {
                    type: string;
                };
                regionName: {
                    type: string;
                };
                stateDwellTime: {
                    type: string;
                    format: string;
                };
                stateEntry: {
                    type: string;
                    format: string;
                };
                stateExit: {
                    type: string;
                    format: string;
                };
                streamId: {
                    type: string;
                };
            };
        };
        ByteString: {
            type: string;
            properties: {
                empty: {
                    type: string;
                };
                validUtf8: {
                    type: string;
                };
            };
        };
        'Parser«NamePart»': {
            type: string;
        };
        UninterpretedOption: {
            type: string;
            properties: {
                aggregateValue: {
                    type: string;
                };
                aggregateValueBytes: {
                    $ref: string;
                };
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                doubleValue: {
                    type: string;
                    format: string;
                };
                identifierValue: {
                    type: string;
                };
                identifierValueBytes: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                nameCount: {
                    type: string;
                    format: string;
                };
                nameList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                nameOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                negativeIntValue: {
                    type: string;
                    format: string;
                };
                parserForType: {
                    $ref: string;
                };
                positiveIntValue: {
                    type: string;
                    format: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                stringValue: {
                    $ref: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        DemoTasks: {
            type: string;
            properties: {
                peripheralId: {
                    type: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
            };
        };
        MethodOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        EventData: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
                type: {
                    type: string;
                };
                value: {
                    type: string;
                };
            };
        };
        PeripheralMeta: {
            type: string;
            required: string[];
            properties: {
                mobilityState: {
                    type: string;
                    enum: string[];
                };
                services: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                tasks: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                idPath: {
                    description: string;
                    $ref: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        TaggedAssetAssignment: {
            type: string;
            properties: {
                assetId: {
                    type: string;
                };
                assetName: {
                    type: string;
                };
                id: {
                    type: string;
                };
                lastSeen: {
                    type: string;
                    format: string;
                };
                status: {
                    type: string;
                };
                tag_id: {
                    type: string;
                };
                updatedDt: {
                    type: string;
                    format: string;
                };
            };
        };
        Asset: {
            type: string;
            properties: {
                category: {
                    type: string;
                };
                categoryName: {
                    type: string;
                };
                createdAt: {
                    type: string;
                    format: string;
                };
                description: {
                    type: string;
                };
                externalId: {
                    type: string;
                };
                id: {
                    type: string;
                };
                imageURL: {
                    type: string;
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                name: {
                    type: string;
                };
                payload: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                payloadOf: {
                    type: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                sortOrder: {
                    type: string;
                    format: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
            };
        };
        StreamResultValue: {
            type: string;
            properties: {
                areaName: {
                    type: string;
                };
                receiverId: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
                value: {
                    type: string;
                };
            };
        };
        IoctlOrBuilder: {
            type: string;
            properties: {
                actionType: {
                    type: string;
                    enum: string[];
                };
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                cid: {
                    type: string;
                };
                cidBytes: {
                    $ref: string;
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                optionsCount: {
                    type: string;
                    format: string;
                };
                optionsList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                optionsOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                sid: {
                    type: string;
                };
                sidBytes: {
                    $ref: string;
                };
                unknownFields: {
                    $ref: string;
                };
                value: {
                    $ref: string;
                };
            };
        };
        Space: {
            type: string;
            required: string[];
            properties: {
                bounds: {
                    $ref: string;
                };
                locus: {
                    $ref: string;
                };
                order: {
                    type: string;
                    format: string;
                };
                tags: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        RoleDTO: {
            type: string;
            properties: {
                editable: {
                    type: string;
                };
                id: {
                    type: string;
                };
                permissions: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                tenantId: {
                    type: string;
                };
            };
        };
        TriggerType: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
            };
        };
        SensorTagSummary: {
            type: string;
            properties: {
                health: {
                    $ref: string;
                };
                heartBeat: {
                    $ref: string;
                };
                sensorTag: {
                    $ref: string;
                };
                taggedAsset: {
                    $ref: string;
                };
            };
        };
        Capability: {
            type: string;
            properties: {
                action: {
                    $ref: string;
                };
                defaultOrder: {
                    type: string;
                    format: string;
                };
                description: {
                    type: string;
                };
                displayable: {
                    type: string;
                };
                editable: {
                    type: string;
                };
                enabled: {
                    type: string;
                };
                name: {
                    type: string;
                };
                state: {
                    $ref: string;
                };
            };
        };
        EnumOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                allowAlias: {
                    type: string;
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        AssetVisitResult: {
            type: string;
            properties: {
                areaLocation: {
                    type: string;
                };
                assetExternalId: {
                    type: string;
                };
                assetName: {
                    type: string;
                };
                assetType: {
                    type: string;
                };
                dwellTime: {
                    type: string;
                };
                entry: {
                    type: string;
                };
                exit: {
                    type: string;
                };
                site: {
                    type: string;
                };
                status: {
                    type: string;
                };
                taggedAssetId: {
                    type: string;
                };
            };
        };
        PeripheralCommands: {
            type: string;
            properties: {
                unknownFields: {
                    $ref: string;
                };
            };
        };
        Ioctl: {
            type: string;
            required: string[];
            properties: {
                options: {
                    type: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                cId: {
                    type: string;
                    description: string;
                };
                action: {
                    type: string;
                    description: string;
                    enum: string[];
                };
            };
            description: string;
        };
        NamePartOrBuilder: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                isExtension: {
                    type: string;
                };
                namePart: {
                    type: string;
                };
                namePartBytes: {
                    $ref: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        'Parser«Property»': {
            type: string;
        };
        Parser: {
            type: string;
        };
        AssetResultValue: {
            type: string;
            properties: {
                areaName: {
                    type: string;
                };
                cId: {
                    type: string;
                };
                receiverId: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
                value: {
                    type: string;
                };
            };
        };
        PostalAddress: {
            type: string;
            properties: {
                city: {
                    type: string;
                };
                countryCode: {
                    type: string;
                };
                postalCode: {
                    type: string;
                };
                stateCode: {
                    type: string;
                };
                streetAddr: {
                    type: string;
                };
            };
        };
        OptionOrBuilder: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                optionType: {
                    type: string;
                    enum: string[];
                };
                unknownFields: {
                    $ref: string;
                };
                val: {
                    type: string;
                    format: string;
                };
            };
        };
        Peripheral: {
            type: string;
            required: string[];
            properties: {
                config: {
                    $ref: string;
                };
                leafId: {
                    type: string;
                };
                peripheralId: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                deviceClass: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
                receiverId: {
                    type: string;
                    description: string;
                };
                data: {
                    type: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                status: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                lastUpdate: {
                    type: string;
                    format: string;
                    description: string;
                };
                tasks: {
                    type: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                tenantId: {
                    type: string;
                    description: string;
                };
                physicalId: {
                    type: string;
                    description: string;
                };
                tags: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                    };
                };
                createdAt: {
                    type: string;
                    format: string;
                    description: string;
                };
                description: {
                    type: string;
                    description: string;
                };
                categoryId: {
                    type: string;
                    description: string;
                };
                assetId: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        InputType: {
            type: string;
            properties: {
                defaultValue: {
                    type: string;
                };
                name: {
                    type: string;
                };
                type: {
                    $ref: string;
                };
            };
        };
        VisitResult: {
            type: string;
            properties: {
                dwellTime: {
                    type: string;
                    format: string;
                };
                entry: {
                    type: string;
                    format: string;
                };
                exit: {
                    type: string;
                    format: string;
                };
                regionId: {
                    type: string;
                };
                regionName: {
                    type: string;
                };
                regionType: {
                    type: string;
                };
                subRegions: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        UnknownFieldSet: {
            type: string;
            properties: {
                defaultInstanceForType: {
                    $ref: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                serializedSizeAsMessageSet: {
                    type: string;
                    format: string;
                };
            };
        };
        Building: {
            type: string;
            required: string[];
            properties: {
                address: {
                    $ref: string;
                };
                bounds: {
                    $ref: string;
                };
                locus: {
                    $ref: string;
                };
                numFloors: {
                    type: string;
                    format: string;
                };
                order: {
                    type: string;
                    format: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                tags: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        PeripheralBase: {
            type: string;
            required: string[];
            properties: {
                peripheralId: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                deviceClass: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
                status: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                lastUpdate: {
                    type: string;
                    format: string;
                    description: string;
                };
                tenantId: {
                    type: string;
                    description: string;
                };
                physicalId: {
                    type: string;
                    description: string;
                };
                createdAt: {
                    type: string;
                    format: string;
                    description: string;
                };
                categoryId: {
                    type: string;
                    description: string;
                };
                assetId: {
                    type: string;
                    description: string;
                };
            };
        };
        EnumValueOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        Notification: {
            type: string;
            properties: {
                createdAt: {
                    type: string;
                    format: string;
                };
                deliveredAt: {
                    type: string;
                    format: string;
                };
                level: {
                    type: string;
                };
                message: {
                    $ref: string;
                };
                source: {
                    type: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                topic: {
                    $ref: string;
                };
                transport: {
                    type: string;
                    enum: string[];
                };
                userId: {
                    type: string;
                };
            };
        };
        ServiceMeta: {
            type: string;
            required: string[];
            properties: {
                characteristics: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        NotificationContext: {
            type: string;
            properties: {
                applicableId: {
                    type: string;
                };
                categoryId: {
                    type: string;
                };
                deviceId: {
                    type: string;
                };
                level: {
                    type: string;
                };
                message: {
                    type: string;
                };
                notifTime: {
                    type: string;
                    format: string;
                };
                notifType: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
                transport: {
                    type: string;
                };
                userId: {
                    type: string;
                };
            };
        };
        ObjectType: {
            type: string;
            required: string[];
            properties: {
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        'Parser«Tasks»': {
            type: string;
        };
        MessageOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                messageSetWireFormat: {
                    type: string;
                };
                noStandardDescriptorAccessor: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        ActionMeta: {
            type: string;
            properties: {
                actionId: {
                    type: string;
                };
                bulkEnabled: {
                    type: string;
                };
                inputTypes: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        BatteryStatResult: {
            type: string;
            properties: {
                assetExternalId: {
                    type: string;
                };
                assetName: {
                    type: string;
                };
                assetType: {
                    type: string;
                };
                bLevel: {
                    type: string;
                };
                lastLocation: {
                    type: string;
                };
                lastUpdated: {
                    type: string;
                };
                taggedAssetId: {
                    type: string;
                };
            };
        };
        BoundingBox: {
            type: string;
            properties: {
                bottomRight: {
                    $ref: string;
                };
                topLeft: {
                    $ref: string;
                };
            };
        };
        MetricsValueResult: {
            type: string;
            properties: {
                metrics: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                scope: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
        };
        DataType: {
            type: string;
            properties: {
                format: {
                    type: string;
                };
                unitType: {
                    type: string;
                };
            };
        };
        Partner: {
            type: string;
            required: string[];
            properties: {
                customers: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                peripheralTypes: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        Property: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                name: {
                    type: string;
                };
                nameBytes: {
                    $ref: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                unknownFields: {
                    $ref: string;
                };
                value: {
                    type: string;
                };
                valueBytes: {
                    $ref: string;
                };
            };
        };
        EnumValueDescriptor: {
            type: string;
            properties: {
                file: {
                    $ref: string;
                };
                fullName: {
                    type: string;
                };
                index: {
                    type: string;
                    format: string;
                };
                name: {
                    type: string;
                };
                number: {
                    type: string;
                    format: string;
                };
                options: {
                    $ref: string;
                };
                type: {
                    $ref: string;
                };
            };
        };
        ObjectMeta: {
            type: string;
            properties: {
                applicationName: {
                    type: string;
                };
                categories: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                id: {
                    type: string;
                };
                metric: {
                    type: string;
                };
                name: {
                    type: string;
                };
                properties: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                stage: {
                    type: string;
                };
                triggerGroups: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                type: {
                    type: string;
                };
            };
        };
        ReceiverSummary: {
            type: string;
            properties: {
                health: {
                    $ref: string;
                };
                heartBeat: {
                    $ref: string;
                };
                receiverSummaryDetail: {
                    $ref: string;
                };
            };
        };
        CommandOrBuilder: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                exec: {
                    $ref: string;
                };
                execOrBuilder: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                setup: {
                    $ref: string;
                };
                setupOrBuilder: {
                    $ref: string;
                };
                teardown: {
                    $ref: string;
                };
                teardownOrBuilder: {
                    $ref: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        ReceiverConfig: {
            type: string;
            required: string[];
            properties: {
                allowedTypes: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                children: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                config: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                id: {
                    type: string;
                };
                mqttConfig: {
                    $ref: string;
                };
                parent: {
                    type: string;
                };
                physicalId: {
                    type: string;
                };
                serverTime: {
                    type: string;
                    format: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        ReceiverSummaryDetail: {
            type: string;
            properties: {
                areaId: {
                    type: string;
                };
                areaName: {
                    type: string;
                };
                buildingId: {
                    type: string;
                };
                buildingName: {
                    type: string;
                };
                identifier: {
                    type: string;
                };
                name: {
                    type: string;
                };
                parentId: {
                    type: string;
                };
                parentName: {
                    type: string;
                };
                physicalId: {
                    type: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
            };
        };
        ReceiverCredentials: {
            type: string;
            properties: {
                apiKey: {
                    type: string;
                };
                apiSecret: {
                    type: string;
                };
                leafId: {
                    type: string;
                };
                receiverId: {
                    type: string;
                };
            };
        };
        'Parser«EnumValueOptions»': {
            type: string;
        };
        'Parser«MessageOptions»': {
            type: string;
        };
        'Parser«Command»': {
            type: string;
        };
        ActionTemplate: {
            type: string;
            properties: {
                applicableTriggerTemplates: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                description: {
                    type: string;
                };
                id: {
                    type: string;
                };
                inputForm: {
                    type: string;
                };
                name: {
                    type: string;
                };
                preResolvedParams: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
        };
        JarFile: {
            type: string;
            properties: {
                jarFileName: {
                    type: string;
                };
            };
        };
        UserDevice: {
            type: string;
            properties: {
                appPlatform: {
                    type: string;
                    enum: string[];
                };
                confirmationKey: {
                    type: string;
                };
                deviceIdentifier: {
                    type: string;
                };
                deviceName: {
                    type: string;
                };
                id: {
                    type: string;
                };
                providerDetails: {
                    type: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                transport: {
                    type: string;
                    enum: string[];
                };
                userId: {
                    type: string;
                };
            };
        };
        MqttRequest: {
            type: string;
            properties: {
                unknownFields: {
                    $ref: string;
                };
            };
        };
        MessageLite: {
            type: string;
            properties: {
                defaultInstanceForType: {
                    $ref: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
            };
        };
        TripData: {
            type: string;
            properties: {
                destination: {
                    type: string;
                };
                destinationId: {
                    type: string;
                };
                distance: {
                    type: string;
                    format: string;
                };
                dwellTime: {
                    type: string;
                    format: string;
                };
                entry: {
                    type: string;
                    format: string;
                };
                exit: {
                    type: string;
                    format: string;
                };
                origin: {
                    type: string;
                };
                originId: {
                    type: string;
                };
            };
        };
        ProcessRuleDTO: {
            type: string;
            properties: {
                app_id: {
                    type: string;
                };
                is_ruleset: {
                    type: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                recipe_id: {
                    type: string;
                };
                rule_class: {
                    type: string;
                };
                rule_id: {
                    type: string;
                };
                rule_type: {
                    type: string;
                };
                stage_id: {
                    type: string;
                    enum: string[];
                };
                tenant_id: {
                    type: string;
                };
            };
        };
        AssetsSensorTag: {
            type: string;
            properties: {
                assets: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                sensorTags: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        'Parser«EventData»': {
            type: string;
        };
        NotificationAlert: {
            type: string;
            properties: {
                alertType: {
                    type: string;
                };
                areaName: {
                    type: string;
                };
                assetCategoryId: {
                    type: string;
                };
                assetCategoryName: {
                    type: string;
                };
                assetId: {
                    type: string;
                };
                assetName: {
                    type: string;
                };
                level: {
                    type: string;
                };
                message: {
                    type: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                siteName: {
                    type: string;
                };
                sourceId: {
                    type: string;
                };
                sourceType: {
                    type: string;
                };
                tagId: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
            };
        };
        PropertyOrBuilder: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                name: {
                    type: string;
                };
                nameBytes: {
                    $ref: string;
                };
                unknownFields: {
                    $ref: string;
                };
                value: {
                    type: string;
                };
                valueBytes: {
                    $ref: string;
                };
            };
        };
        MetricsValue: {
            type: string;
            properties: {
                group: {
                    type: string;
                };
                interval: {
                    type: string;
                    format: string;
                };
                metrics: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                name: {
                    type: string;
                };
                scope: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
                type: {
                    type: string;
                };
            };
        };
        NotificationAlertExt: {
            type: string;
            properties: {
                alertType: {
                    type: string;
                };
                areaName: {
                    type: string;
                };
                assetCategoryId: {
                    type: string;
                };
                assetCategoryName: {
                    type: string;
                };
                assetExternalId: {
                    type: string;
                };
                assetId: {
                    type: string;
                };
                assetName: {
                    type: string;
                };
                level: {
                    type: string;
                };
                message: {
                    type: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                siteName: {
                    type: string;
                };
                sourceId: {
                    type: string;
                };
                sourceType: {
                    type: string;
                };
                tagId: {
                    type: string;
                };
                taggedAssetId: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
            };
        };
        FileOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                ccGenericServices: {
                    type: string;
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                goPackage: {
                    type: string;
                };
                goPackageBytes: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                javaGenerateEqualsAndHash: {
                    type: string;
                };
                javaGenericServices: {
                    type: string;
                };
                javaMultipleFiles: {
                    type: string;
                };
                javaOuterClassname: {
                    type: string;
                };
                javaOuterClassnameBytes: {
                    $ref: string;
                };
                javaPackage: {
                    type: string;
                };
                javaPackageBytes: {
                    $ref: string;
                };
                optimizeFor: {
                    type: string;
                    enum: string[];
                };
                parserForType: {
                    $ref: string;
                };
                pyGenericServices: {
                    type: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        DescriptorMeta: {
            type: string;
            required: string[];
            properties: {
                standard: {
                    type: string;
                };
                value: {
                    type: string;
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        TaggedAsset: {
            type: string;
            properties: {
                areaName: {
                    type: string;
                };
                asset: {
                    $ref: string;
                };
                assetState: {
                    type: string;
                };
                buildingName: {
                    type: string;
                };
                categoryImageURL: {
                    type: string;
                };
                createdAt: {
                    type: string;
                    format: string;
                };
                currentArea: {
                    type: string;
                };
                currentAreaId: {
                    type: string;
                };
                currentConnector: {
                    type: string;
                };
                currentConnectorId: {
                    type: string;
                };
                currentConnectorName: {
                    type: string;
                };
                id: {
                    type: string;
                };
                lastSeen: {
                    type: string;
                    format: string;
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                position: {
                    $ref: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                sensorTag: {
                    $ref: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tagImageURL: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
                tenantName: {
                    type: string;
                };
            };
        };
        ActionType: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
            };
        };
        UserDTO: {
            type: string;
            required: string[];
            properties: {
                details: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                id: {
                    type: string;
                    description: string;
                };
                modifiedTime: {
                    type: string;
                    format: string;
                };
                primaryEmail: {
                    type: string;
                };
                securityQset: {
                    type: string;
                };
                securityQuestions: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                userDevices: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                tenantId: {
                    type: string;
                    description: string;
                };
                password: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
                enabled: {
                    type: string;
                    example: boolean;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                roles: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                    };
                };
                permissions: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                    };
                };
                properties: {
                    type: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                    };
                };
            };
            description: string;
        };
        ReportDTO: {
            type: string;
            properties: {
                rows: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
        };
        FieldOptions: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                ctype: {
                    type: string;
                    enum: string[];
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                deprecated: {
                    type: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                experimentalMapKey: {
                    type: string;
                };
                experimentalMapKeyBytes: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                lazy: {
                    type: string;
                };
                packed: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionCount: {
                    type: string;
                    format: string;
                };
                uninterpretedOptionList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                uninterpretedOptionOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                unknownFields: {
                    $ref: string;
                };
                weak: {
                    type: string;
                };
            };
        };
        Result: {
            type: string;
            required: string[];
            properties: {
                cId: {
                    type: string;
                    description: string;
                };
                cName: {
                    type: string;
                    description: string;
                };
                data: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                format: {
                    type: string;
                    description: string;
                };
                oId: {
                    type: string;
                    description: string;
                };
                oName: {
                    type: string;
                    description: string;
                };
                oType: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                sId: {
                    type: string;
                    description: string;
                };
                sName: {
                    type: string;
                    description: string;
                };
                sourceData: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                unit: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        MQTTConfigBean: {
            type: string;
            properties: {
                brokerurl: {
                    type: string;
                };
                enabled: {
                    type: string;
                };
                externalBrokerurl: {
                    type: string;
                };
                password: {
                    type: string;
                };
                userid: {
                    type: string;
                };
            };
        };
        ProcessRule: {
            type: string;
            properties: {
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                rule_class: {
                    type: string;
                };
                rule_id: {
                    type: string;
                };
            };
        };
        GeoPoint: {
            type: string;
            properties: {
                latitude: {
                    type: string;
                    format: string;
                };
                longitude: {
                    type: string;
                    format: string;
                };
            };
        };
        NotificationTopic: {
            type: string;
            properties: {
                category: {
                    type: string;
                };
                description: {
                    type: string;
                };
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                notificationType: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
            };
        };
        'Parser«Ioctl»': {
            type: string;
        };
        GeoEventData: {
            type: string;
            properties: {
                cId: {
                    type: string;
                };
                eventTime: {
                    type: string;
                    format: string;
                };
                leafId: {
                    type: string;
                };
                peripheralId: {
                    type: string;
                };
                sId: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
                value: {
                    type: string;
                };
            };
        };
        PeripheralTasks: {
            type: string;
            properties: {
                peripheralId: {
                    type: string;
                };
                tasks: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                type: {
                    type: string;
                };
            };
        };
        ServiceDescriptor: {
            type: string;
            properties: {
                file: {
                    $ref: string;
                };
                fullName: {
                    type: string;
                };
                index: {
                    type: string;
                    format: string;
                };
                methods: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                name: {
                    type: string;
                };
                options: {
                    $ref: string;
                };
            };
        };
        ReceiverAuth: {
            type: string;
            properties: {
                physicalId: {
                    type: string;
                };
                secret: {
                    type: string;
                };
            };
        };
        AccessToken: {
            type: string;
            properties: {
                expiry: {
                    type: string;
                    format: string;
                };
                token: {
                    type: string;
                };
            };
        };
        MqttResponse: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                correlationId: {
                    type: string;
                };
                correlationIdBytes: {
                    $ref: string;
                };
                dataCount: {
                    type: string;
                    format: string;
                };
                dataList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                dataOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                responseCode: {
                    type: string;
                    format: string;
                };
                responseTime: {
                    type: string;
                    format: string;
                };
                responseType: {
                    type: string;
                };
                responseTypeBytes: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        'Parser«UninterpretedOption»': {
            type: string;
        };
        JobData: {
            type: string;
            properties: {
                cassandraContactPt: {
                    type: string;
                };
                dataSource: {
                    type: string;
                };
                endTime: {
                    type: string;
                };
                fileName: {
                    type: string;
                };
                startTime: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
            };
        };
        'Parser«Option»': {
            type: string;
        };
        'Parser«FieldOptions»': {
            type: string;
        };
        Tasks: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                commandsCount: {
                    type: string;
                    format: string;
                };
                commandsList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                commandsOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        AssetResult: {
            type: string;
            required: string[];
            properties: {
                areaName: {
                    type: string;
                    description: string;
                };
                assetData: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                assetName: {
                    type: string;
                    description: string;
                };
                cId: {
                    type: string;
                    description: string;
                };
                cName: {
                    type: string;
                    description: string;
                };
                data: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                format: {
                    type: string;
                    description: string;
                };
                oId: {
                    type: string;
                    description: string;
                };
                oName: {
                    type: string;
                    description: string;
                };
                oType: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                sId: {
                    type: string;
                    description: string;
                };
                sName: {
                    type: string;
                    description: string;
                };
                sourceData: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                unit: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        DevicePropertyMeta: {
            type: string;
            properties: {
                modLevel: {
                    type: string;
                };
                name: {
                    type: string;
                };
                type: {
                    type: string;
                };
                value: {
                    type: string;
                };
            };
        };
        Receiver: {
            type: string;
            required: string[];
            properties: {
                parent: {
                    type: string;
                };
                physicalId: {
                    type: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        EnumDescriptor: {
            type: string;
            properties: {
                containingType: {
                    $ref: string;
                };
                file: {
                    $ref: string;
                };
                fullName: {
                    type: string;
                };
                index: {
                    type: string;
                    format: string;
                };
                name: {
                    type: string;
                };
                options: {
                    $ref: string;
                };
                values: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        StatsValue: {
            type: string;
            properties: {
                count: {
                    type: string;
                    format: string;
                };
                max: {
                    type: string;
                    format: string;
                };
                mean: {
                    type: string;
                    format: string;
                };
                min: {
                    type: string;
                    format: string;
                };
                stdev: {
                    type: string;
                    format: string;
                };
                time: {
                    type: string;
                    format: string;
                };
            };
        };
        Role: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                permissions: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                tenantId: {
                    type: string;
                };
            };
        };
        Area: {
            type: string;
            required: string[];
            properties: {
                bounds: {
                    $ref: string;
                };
                deleted: {
                    type: string;
                };
                locus: {
                    $ref: string;
                };
                order: {
                    type: string;
                    format: string;
                };
                receiver: {
                    $ref: string;
                };
                tags: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        NamePart: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                isExtension: {
                    type: string;
                };
                namePart: {
                    type: string;
                };
                namePartBytes: {
                    $ref: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        TriggerTemplate: {
            type: string;
            properties: {
                applicableMetric: {
                    type: string;
                };
                description: {
                    type: string;
                };
                id: {
                    type: string;
                };
                inputForm: {
                    type: string;
                };
                msgDetail: {
                    type: string;
                };
                msgSummary: {
                    type: string;
                };
                name: {
                    type: string;
                };
                preResolvedParams: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                triggerGroups: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                type: {
                    type: string;
                };
            };
        };
        'Parser«Message»': {
            type: string;
        };
        State: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
                type: {
                    $ref: string;
                };
            };
        };
        Stats: {
            type: string;
            properties: {
                data: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            description: string;
        };
        ClfMessage: {
            type: string;
            properties: {
                altBody: {
                    type: string;
                };
                body: {
                    type: string;
                };
                subject: {
                    type: string;
                };
                transport: {
                    type: string;
                    enum: string[];
                };
            };
        };
        Descriptor: {
            type: string;
            properties: {
                containingType: {
                    $ref: string;
                };
                enumTypes: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                extensions: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                file: {
                    $ref: string;
                };
                fullName: {
                    type: string;
                };
                index: {
                    type: string;
                    format: string;
                };
                name: {
                    type: string;
                };
                nestedTypes: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                options: {
                    $ref: string;
                };
            };
        };
        Option: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                optionType: {
                    type: string;
                    enum: string[];
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                unknownFields: {
                    $ref: string;
                };
                val: {
                    type: string;
                    format: string;
                };
            };
        };
        ReceiverDetail: {
            type: string;
            required: string[];
            properties: {
                area: {
                    $ref: string;
                };
                areaId: {
                    type: string;
                };
                attributes: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                building: {
                    $ref: string;
                };
                lastReported: {
                    type: string;
                    format: string;
                };
                parent: {
                    type: string;
                };
                physicalId: {
                    type: string;
                };
                position: {
                    $ref: string;
                };
                provisionedAt: {
                    type: string;
                    format: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tags: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                tenantId: {
                    type: string;
                };
                tenantName: {
                    type: string;
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        DeviceEvent: {
            type: string;
            properties: {
                deviceId: {
                    type: string;
                };
                deviceType: {
                    type: string;
                };
                level: {
                    type: string;
                };
                payload: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                time: {
                    type: string;
                    format: string;
                };
            };
        };
        Action: {
            type: string;
            properties: {
                targetId: {
                    type: string;
                };
                targetType: {
                    type: string;
                };
            };
        };
        Category: {
            type: string;
            properties: {
                assetStateValues: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                createdAt: {
                    type: string;
                    format: string;
                };
                description: {
                    type: string;
                };
                id: {
                    type: string;
                };
                imageURL: {
                    type: string;
                };
                metrics: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                name: {
                    type: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                sortOrder: {
                    type: string;
                    format: string;
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
            };
        };
        Message: {
            type: string;
            properties: {
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                parserForType: {
                    $ref: string;
                };
                serializedSize: {
                    type: string;
                    format: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        DeviceMeta: {
            type: string;
            properties: {
                payload: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                time: {
                    type: string;
                    format: string;
                };
            };
        };
        IdCommand: {
            type: string;
            required: string[];
            properties: {
                options: {
                    type: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                cId: {
                    type: string;
                    description: string;
                };
                action: {
                    type: string;
                    description: string;
                    enum: string[];
                };
                inAdvert: {
                    type: string;
                    example: boolean;
                    description: string;
                };
                sId: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        UserCredsModifier: {
            type: string;
            required: string[];
            properties: {
                newSecret: {
                    type: string;
                };
                oldSecret: {
                    type: string;
                };
            };
        };
        DeviceEventResult: {
            type: string;
            properties: {
                deviceId: {
                    type: string;
                };
                deviceType: {
                    type: string;
                };
                events: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        DeviceTypeMeta: {
            type: string;
            properties: {
                command: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                configuration: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                deviceID: {
                    type: string;
                };
                deviceType: {
                    type: string;
                };
                monitor: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
            };
        };
        'Parser«MqttResponse»': {
            type: string;
        };
        FieldDescriptor: {
            type: string;
            properties: {
                containingType: {
                    $ref: string;
                };
                defaultValue: {
                    type: string;
                };
                enumType: {
                    $ref: string;
                };
                extension: {
                    type: string;
                };
                extensionScope: {
                    $ref: string;
                };
                file: {
                    $ref: string;
                };
                fullName: {
                    type: string;
                };
                index: {
                    type: string;
                    format: string;
                };
                javaType: {
                    type: string;
                    enum: string[];
                };
                liteJavaType: {
                    type: string;
                    enum: string[];
                };
                liteType: {
                    type: string;
                    enum: string[];
                };
                messageType: {
                    $ref: string;
                };
                name: {
                    type: string;
                };
                number: {
                    type: string;
                    format: string;
                };
                optional: {
                    type: string;
                };
                options: {
                    $ref: string;
                };
                packable: {
                    type: string;
                };
                packed: {
                    type: string;
                };
                repeated: {
                    type: string;
                };
                required: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
            };
        };
        PropertyMeta: {
            type: string;
            properties: {
                appType: {
                    type: string;
                    enum: string[];
                };
                defaultValue: {
                    type: string;
                };
                description: {
                    type: string;
                };
                keyName: {
                    type: string;
                };
                name: {
                    type: string;
                };
                required: {
                    type: string;
                };
                simpleClassName: {
                    type: string;
                };
                type: {
                    type: string;
                    enum: string[];
                };
            };
        };
        ProcessRuleStage: {
            type: string;
            properties: {
                ruleset: {
                    $ref: string;
                };
                stage_id: {
                    type: string;
                };
            };
        };
        'Parser«MethodOptions»': {
            type: string;
        };
        SensorTag: {
            type: string;
            properties: {
                createdAt: {
                    type: string;
                    format: string;
                };
                id: {
                    type: string;
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                status: {
                    type: string;
                    enum: string[];
                };
                tenantId: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
        };
        PeripheralTypeMeta: {
            type: string;
            properties: {
                createdAt: {
                    type: string;
                    format: string;
                };
                deviceClass: {
                    type: string;
                };
                enabled: {
                    type: string;
                };
                idCommand: {
                    $ref: string;
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                regEx: {
                    type: string;
                };
            };
            description: string;
        };
        'Parser«EnumOptions»': {
            type: string;
        };
        UninterpretedOptionOrBuilder: {
            type: string;
            properties: {
                aggregateValue: {
                    type: string;
                };
                aggregateValueBytes: {
                    $ref: string;
                };
                allFields: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                defaultInstanceForType: {
                    $ref: string;
                };
                descriptorForType: {
                    $ref: string;
                };
                doubleValue: {
                    type: string;
                    format: string;
                };
                identifierValue: {
                    type: string;
                };
                identifierValueBytes: {
                    $ref: string;
                };
                initializationErrorString: {
                    type: string;
                };
                initialized: {
                    type: string;
                };
                nameCount: {
                    type: string;
                    format: string;
                };
                nameList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                nameOrBuilderList: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                negativeIntValue: {
                    type: string;
                    format: string;
                };
                positiveIntValue: {
                    type: string;
                    format: string;
                };
                stringValue: {
                    $ref: string;
                };
                unknownFields: {
                    $ref: string;
                };
            };
        };
        ApplicationProcessRule: {
            type: string;
            properties: {
                app_id: {
                    type: string;
                };
                stages: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        Zone: {
            type: string;
            required: string[];
            properties: {
                regions: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        Point: {
            type: string;
            properties: {
                height: {
                    type: string;
                    format: string;
                };
                lat: {
                    type: string;
                    format: string;
                };
                lng: {
                    type: string;
                    format: string;
                };
            };
        };
        ResultValue: {
            type: string;
            properties: {
                reporterId: {
                    type: string;
                };
                reporterName: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
                value: {
                    type: string;
                };
            };
        };
        EventDataResult: {
            type: string;
            properties: {
                level: {
                    type: string;
                };
                module: {
                    type: string;
                };
                name: {
                    type: string;
                };
                time: {
                    type: string;
                    format: string;
                };
                type: {
                    type: string;
                };
                value: {
                    type: string;
                };
            };
        };
        PeripheralCapabilities: {
            type: string;
            properties: {
                capabilities: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                peripheralActions: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        MethodDescriptor: {
            type: string;
            properties: {
                file: {
                    $ref: string;
                };
                fullName: {
                    type: string;
                };
                index: {
                    type: string;
                    format: string;
                };
                inputType: {
                    $ref: string;
                };
                name: {
                    type: string;
                };
                options: {
                    $ref: string;
                };
                outputType: {
                    $ref: string;
                };
                service: {
                    $ref: string;
                };
            };
        };
        NotificationSubscription: {
            type: string;
            properties: {
                categoryRegEx: {
                    type: string;
                };
                createdAt: {
                    type: string;
                    format: string;
                };
                device: {
                    $ref: string;
                };
                levelRegEx: {
                    type: string;
                };
                modifiedAt: {
                    type: string;
                    format: string;
                };
                notifTypeRegEx: {
                    type: string;
                };
                notificationStatus: {
                    type: string;
                };
                regExString: {
                    type: string;
                };
                tenantId: {
                    type: string;
                };
                userId: {
                    type: string;
                };
            };
        };
        FileDescriptor: {
            type: string;
            properties: {
                dependencies: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                enumTypes: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                extensions: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                messageTypes: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                name: {
                    type: string;
                };
                options: {
                    $ref: string;
                };
                package: {
                    type: string;
                };
                publicDependencies: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                services: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        'Parser«FileOptions»': {
            type: string;
        };
        'Parser«MessageLite»': {
            type: string;
        };
        'Parser«ServiceOptions»': {
            type: string;
        };
        ProcessRuleSet: {
            type: string;
            properties: {
                properties: {
                    type: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                rule_class: {
                    type: string;
                };
                rule_id: {
                    type: string;
                };
                rules: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
        };
        Command: {
            type: string;
            required: string[];
            properties: {
                config: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                options: {
                    type: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                    };
                };
                cId: {
                    type: string;
                    description: string;
                };
                action: {
                    type: string;
                    description: string;
                    enum: string[];
                };
            };
            description: string;
        };
        UserCredentials: {
            type: string;
            required: string[];
            properties: {
                login: {
                    type: string;
                };
                secret: {
                    type: string;
                };
            };
        };
        CharacteristicMeta: {
            type: string;
            required: string[];
            properties: {
                descriptors: {
                    type: string;
                    description: string;
                    items: {
                        $ref: string;
                    };
                };
                properties: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                        enum: string[];
                    };
                };
                unitType: {
                    type: string;
                    description: string;
                };
                identifier: {
                    type: string;
                    description: string;
                };
                type: {
                    type: string;
                    description: string;
                };
                name: {
                    type: string;
                    description: string;
                };
            };
            description: string;
        };
        NotifEvent: {
            type: string;
            properties: {
                unknownFields: {
                    $ref: string;
                };
            };
        };
    };
};
export default _default;
