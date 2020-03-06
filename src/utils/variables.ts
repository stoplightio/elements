import { safeParse } from '@stoplight/json';
import { IHttpRequest } from '@stoplight/types';
import { safeStringify } from '@stoplight/yaml';
import { escapeRegExp, forEach, get, isEmpty, isUndefined, replace, trim, uniq } from 'lodash';

export const extractVariables = (target: string | Partial<IHttpRequest>, re?: RegExp) => {
  const toProcess = safeStringify(target);
  const matches = [];

  const reg =
    re ||
    new RegExp(/\{([\[\]\.\w]+)\}|\{(\$\.[\[\]\.\w- ']+)\}|\{(\$\$\.[\[\]\.\w- ']+)\}|\{(input\.[\[\]\.\w- ']+)\}/g);

  while (true) {
    const match = reg.exec(toProcess);
    if (!match || isEmpty(match)) {
      return uniq(matches);
    }
    matches.push(match[0]);
  }
};

export const cleanVariableValue = (value: string) => {
  let cleaned = safeStringify(value);
  if (typeof cleaned === 'string') {
    // escape double quotes
    cleaned = cleaned.replace(/\"|\{|\}/g, '');
  }
  return cleaned;
};

// will likely need to be rewritten to accommodate for the types we are using
export const replaceVariables = (target: string | Partial<IHttpRequest>, variables = {}) => {
  const parsedVariables = forEach(variables, variable => safeParse(variable));

  if (isEmpty(target) || isEmpty(parsedVariables)) {
    return target;
  }
  let processed = false;
  let toProcess = safeStringify(target);

  const matches = extractVariables(target);

  forEach(matches, match => {
    const trimmedVariable = trim(match, '{} ');
    const variable = replace(trimmedVariable, /^(\$\$|\$|input)\./gi, '');
    let value = get(parsedVariables, variable);

    if (isUndefined(value)) {
      value = get(parsedVariables, trimmedVariable);
    }

    if (typeof value !== 'undefined') {
      if (typeof value === 'string') {
        const replaceRegExp = new RegExp(escapeRegExp(match), 'g');
        toProcess = toProcess.replace(replaceRegExp, cleanVariableValue(value));
      } else {
        let m = replace(match, '$$.', '\\$\\$.');
        if (m === match) {
          m = replace(match, '$.', '\\$.');
        }
        match = m;
        toProcess = toProcess.replace(new RegExp(`"${match}"|${match}`, 'g'), cleanVariableValue(value));
      }
      processed = true;
    }
  });

  if (processed) {
    toProcess = replaceVariables(toProcess, variables);
  }

  return safeParse(toProcess);
};
