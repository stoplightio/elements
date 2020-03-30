import './Request/Body';
import './Request/Editor';
import './Request/Endpoint';
import './Request/Headers';
import './Request/Method';
import './Request/Parameters';
import './Request/Send';
import './RequestMaker';
import './Response/Body';
import './Response/Headers';
import './Response/Viewer';
import './Response/ViolationsDisplay';

import { addDecorator } from '@storybook/react';

import { DarkModeContainer } from './DarkModeContainer';

addDecorator(DarkModeContainer);
