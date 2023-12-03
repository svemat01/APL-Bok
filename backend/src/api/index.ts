import { elysiaBase } from "$/setup.ts";
import { baseCookies, signedCookies } from "$utils/cookies.ts";
import Elysia, { Handler, t } from "elysia";
import { StudentRoutes } from "./student/index.ts";

export const ApiRoutes = new Elysia({ prefix: "/api" })
    .use(elysiaBase)
    .use(StudentRoutes)
    .post(
        "/logout",
        async ({ set, cookie: { profile } }) => {
            if (!profile.value) {
                set.status = 401;
                return {
                    message: "Not signed in",
                };
            }

            profile.remove();

            set.status = 200;
            return {
                message: "Signed out",
            };
        },
        {
            response: {
                401: t.Object({
                    message: t.Literal("Not signed in"),
                }),
                200: t.Object(
                    {
                        message: t.Literal("Signed out"),
                    },
                    {
                        description: "Signed out",
                    }
                ),
            },
            detail: {
                description: "Sign out the current profile",
            },
            cookie: baseCookies,
        }
    )
