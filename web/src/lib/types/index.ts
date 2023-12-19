import type { App } from '@apl-bok/backend/src';

type _AppSchema = App['schema'];

type _Response<
    Route extends keyof _AppSchema,
    Method extends keyof _AppSchema[Route] = keyof _AppSchema[Route],
> = _AppSchema[Route][Method] extends { response: infer Response } ? Response : never;

export type ApiResponse<
    Route extends keyof _AppSchema,
    Method extends keyof _AppSchema[Route] = keyof _AppSchema[Route],
    Status extends keyof _Response<Route, Method> = keyof _Response<Route, Method>,
> = _Response<Route, Method>[Status];
