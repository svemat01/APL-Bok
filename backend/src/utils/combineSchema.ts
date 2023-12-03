import { TAnySchema, TObject } from "@sinclair/typebox";
import { t } from "elysia";
import { inspect } from 'util';

// // allow combining {200: t.String()} and {200: t.Number(), 400: t.String()} into {200: t.String() | t.Number(), 400: t.String()}
export const combineResponses = <T extends Record<number, TAnySchema>[]>(...rest: T) => {
    const combined: T[number] = {} as T[number];
    for (const response of rest) {
        for (const [codeStr, schema] of Object.entries(response)) {
            const code = parseInt(codeStr);
            if (combined[code]) {
                combined[code] = t.Union([combined[code], schema]);
            } else {
                combined[code] = schema;
            }
        }
    }
    return combined;
}