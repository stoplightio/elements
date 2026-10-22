// Compiled with `module: nodenext`, like an ES module package that depends on Elements would be (see
// tsconfig.json next to this file). Fails when the declarations of a package can't be resolved from its published
// layout, for example because a relative import in them has no file extension.
import { API, type APIProps } from '@stoplight/elements';
import { Docs } from '@stoplight/elements-core';
import { StoplightProject } from '@stoplight/elements-dev-portal';

// Unresolved imports would silently be `any`, which these would accept
// @ts-expect-error
export const apiIsNotAny: number = API;
// @ts-expect-error
export const docsIsNotAny: number = Docs;
// @ts-expect-error
export const projectIsNotAny: number = StoplightProject;
// @ts-expect-error
export const propsAreNotAny: APIProps = { apiDescriptionUrl: 1 };
