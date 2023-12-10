import { db, userTable } from "./db/index.ts";
import { PERMISSION, userAuthResponse } from "./utils/authHelpers.ts";
import { baseCookies, signedCookies } from "./utils/cookies.ts";
import { ENV } from "./utils/environment.ts";
import { HttpError } from "./utils/errors.ts";
import { ip } from "./utils/ipPlugin.ts";
import swagger from "@elysiajs/swagger";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { createPermissions, hasPermission } from "permissio";

export const elysiaBase = new Elysia({
    cookie: {
        sign: Object.keys(signedCookies),
        secrets: ENV.COOKIE_SECRET,
    },
})

export const elysiaUserBase = new Elysia()
    .use(elysiaBase)
    .derive(async ({ cookie: { profile } }) => {
        console.log("profile", profile.value);
        if (!profile.value) {
            return;
        }

        const user = await db.query.user
            .findMany({
                where: eq(userTable.id, profile.value.id),
                columns: {
                    id: true,
                    firstName: true,
                    username: true,
                    permissions: true,
                },
                limit: 1,
            })
            .then((users) => users.at(0));

        if (!user) {
            throw new HttpError(500, "User not found");
        }

        const permissions = BigInt(user.permissions);

        return {
            user: {
                ...user,
                permissions,
            }
        };
    });
