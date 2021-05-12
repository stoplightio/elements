import { nanoid } from 'nanoid';
import * as React from 'react';

export const useUniqueId = (prefix: string = 'id_') => React.useRef(`${prefix}${nanoid(8)}`).current;
