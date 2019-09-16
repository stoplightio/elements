import { IconName, Intent } from '@stoplight/ui-kit';
import * as React from 'react';
interface ISendButton {
    disabled?: boolean;
    className?: string;
    intent?: Intent;
    icon?: IconName;
}
export declare const SendButton: React.FunctionComponent<ISendButton>;
export {};
