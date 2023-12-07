import { setupPassword } from "$/index.ts";
import { elysiaUserBase } from "$/setup.ts";
import { db, userTable } from "$db/index.ts";
import { isSetup } from "$utils/setup.ts";
import { count } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { AdminUsersRoutes } from './users.ts';
import { AdminReportsRoutes } from './reports.ts';
import { AdminCompaniesRoutes } from './companies.ts';

export const AdminRoutes = new Elysia({ prefix: "/admin" })
    .use(elysiaUserBase)
    // System Setup
    .get(
        "/setup",
        async () => {
            if (await isSetup()) {
                return {
                    message: "Setup not required",
                    isSetup: true,
                };
            } else {
                return {
                    message: "Setup required",
                    isSetup: false,
                };
            }
        },
        {
            response: {
                200: t.Object({
                    message: t.String(),
                    isSetup: t.Boolean(),
                }),
            },
        }
    )
    .post(
        "/setup",
        async ({ set, body }) => {
            if (await isSetup()) {
                set.status = 400;

                return {
                    message: "Setup already complete",
                };
            }

            if (body.setupPassword !== setupPassword) {
                set.status = 400;

                return {
                    message: "Invalid setup password",
                };
            }

            const { username, password, firstName, lastName } = body;

            const passwordHash = await Bun.password.hash(password);

            await db.insert(userTable).values({
                username,
                passwordHash,
                firstName,
                lastName,
            });

            return {
                message: "Setup complete",
            };
        },
        {
            body: t.Object({
                username: t.String(),
                password: t.String(),
                firstName: t.String(),
                lastName: t.String(),
                setupPassword: t.String(),
            }),
            response: {
                200: t.Object({
                    message: t.String(),
                }),
                400: t.Object({
                    message: t.String(),
                }),
            },
        }
    )
    .use(AdminUsersRoutes)
    .use(AdminReportsRoutes)
    .use(AdminCompaniesRoutes)

