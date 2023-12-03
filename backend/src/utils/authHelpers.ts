import { t } from 'elysia';

export const studentAuthResponse = {
    401: t.Object(
        {
            message: t.Literal("Not signed in"),
        },
        {
            description: "Not signed in",
        }
    ),
    403: t.Object(
        {
            message: t.Literal("Not a student"),
        },
        {
            description: "Not a student",
        }
    ),
};