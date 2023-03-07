import { Story } from '@storybook/react';
import * as React from 'react';
import { APIProps } from './API';
declare const _default: {
    title: string;
    component: React.FC<APIProps>;
    argTypes: {
        apiDescriptionDocument: {
            control: string;
            type: {
                required: boolean;
            };
            table: {
                category: string;
            };
        };
        apiDescriptionUrl: {
            control: string;
            table: {
                category: string;
            };
        };
        layout: {
            control: {
                type: string;
            };
            table: {
                category: string;
            };
        };
        basePath: {
            table: {
                category: string;
            };
        };
        router: {
            table: {
                category: string;
            };
        };
    };
    args: {
        router: string;
    };
};
export default _default;
export declare const APIWithYamlProvidedDirectly: Story<APIProps>;
export declare const APIWithJSONProvidedDirectly: Story<APIProps>;
export declare const APIWithoutDescription: Story<APIProps>;
export declare const APIWithInternalOperations: Story<APIProps>;
export declare const OpenApi3Schema: Story<APIProps>;
export declare const BadgesForSchema: Story<APIProps>;
export declare const StackedLayout: Story<APIProps>;
export declare const Box: Story<APIProps>;
export declare const DigitalOcean: Story<APIProps>;
export declare const Github: Story<APIProps>;
export declare const Instagram: Story<APIProps>;
