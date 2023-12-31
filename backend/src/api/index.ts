import { elysiaBase, elysiaUserBase } from "../setup.ts";
import { baseCookies, signedCookies } from "../utils/cookies.ts";
import Elysia, { Handler, t } from "elysia";
import { db, userTable } from "../db/index.ts";
import { eq } from "drizzle-orm";
import { PERMISSION, listPermissions, userAuthResponse } from "../utils/authHelpers.ts";
import { AplRoutes } from "./apl/index.ts";
import { AdminRoutes } from './admin/index.ts';
import { setupPassword } from '../index.ts';
import { isSetup } from '../utils/dbHelpers.ts';
import { faker } from '@faker-js/faker';

export const ApiRoutes = new Elysia({
    prefix: "/api",
})
    .use(elysiaBase)
    .post(
        "/login",
        async ({ set, cookie: { profile }, body }) => {
            if (profile.value) {
                set.status = 400;
                return {
                    message: "Already signed in",
                };
            }

            const { username, password } = body;

            const user = await db.query.user
                .findMany({
                    where: eq(userTable.username, username),
                    columns: {
                        id: true,
                        passwordHash: true,
                        firstName: true,
                    },
                    limit: 1,
                })
                .then((users) => users.at(0));

            if (!user) {
                set.status = 400;
                return {
                    message: "Invalid username or password",
                };
            }

            const passwordMatch = await Bun.password
                .verify(password, user.passwordHash)
                .catch((e) => {
                    console.log("Invalid password");
                });

            console.log("user", user);

            // if (!passwordMatch) {
            //     set.status = 400;
            //     return {
            //         message: "Invalid username or password",
            //     };
            // }

            profile.value = {
                id: user.id,
            };

            // profile.set({
            //     maxAge: 60 * 60 * 24 * 7,
            // })
            // profile.add({
            //     maxAge: 60 * 60 * 24 * 7,
            //     domain: "localhost:5173",
            // })

            set.status = 200;
            return {
                message: "Signed in",
            };
        },
        {
            cookie: baseCookies,
            body: t.Object({
                username: t.String(),
                password: t.String(),
            }),
            response: {
                200: t.Object(
                    {
                        message: t.Literal("Signed in"),
                    },
                    {
                        description: "Signed in",
                    }
                ),
                400: t.Object(
                    {
                        message: t.Union([
                            t.Literal("Already signed in"),
                            t.Literal("Invalid username or password"),
                        ]),
                    },
                    {
                        description: "Bad Request",
                    }
                ),
            },
        }
    )
    // System Setup
    .get(
        '/setup',
        async ({cookie: {profile}}) => {
            if (await isSetup()) {
                return {
                    message: 'Setup not required',
                    isSetup: true,
                    loggedIn: !!profile.value,
                };
            } else {
                return {
                    message: 'Setup required',
                    isSetup: false,
                    loggedIn: !!profile.value,
                };
            }
        },
        {
            cookie: baseCookies,
            response: {
                200: t.Object({
                    message: t.String(),
                    isSetup: t.Boolean(),
                    loggedIn: t.Boolean(),
                }),
            },
        },
    )
    .post(
        '/setup',
        async ({ set, body, cookie: { profile } }) => {
            if (await isSetup()) {
                set.status = 412;

                return {
                    message: 'Setup already complete',
                };
            }

            if (body.setupPassword !== setupPassword) {
                set.status = 400;

                return {
                    message: 'Invalid setup password',
                };
            }

            const { username, password, firstName, lastName } = body;

            const passwordHash = await Bun.password.hash(password);

            const id = await db.insert(userTable).values({
                username,
                passwordHash,
                firstName,
                lastName,
                permissions: '1',
            }).returning({id: userTable.id}).then(users => users.at(0)?.id);

            if (!id) {
                set.status = 500;

                return {
                    message: 'Internal server error',
                };
            }

            profile.value = {
                id,
            };

            return {
                message: 'Setup complete',
            };
        },
        {
            cookie: baseCookies,
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
                    message: t.Literal('Invalid setup password'),
                }),
                412: t.Object({
                    message: t.Literal('Setup already complete'),
                }),
            },
        },
    )
    .guard({
        beforeHandle: [
            async ({ set, cookie: { profile } }) => {
                // console.log("profile", profile.value);
                if (!await isSetup()) {
                    set.status = 412;

                    return {
                        message: 'Setup not complete',
                    };
                }

                if (!profile.value) {
                    set.status = 401;
                    return {
                        message: "Not signed in",
                    };
                }
            },
        ],
        cookie: baseCookies,
        response: {
            ...userAuthResponse,
            412: t.Object(
                {
                    message: t.Literal("Setup not complete"),
                },
                {
                    description: "Setup not complete",
                }
            ),
        },
    })
    .use(elysiaUserBase)
    .post(
        "/logout",
        async ({ set, cookie: { profile }, user }) => {
            if (!profile.value) {
                set.status = 401;
                return {
                    message: "Not signed in",
                };
            }

            profile.remove({
                domain: profile.domain,
                path: profile.path ?? "/",
                sameSite: profile.sameSite,
                secure: profile.secure,
            });

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
    .get(
        "/me",
        async ({ set, cookie: { profile } }) => {
            if (!profile.value) {
                set.status = 401;
                return {
                    message: "Not signed in",
                };
            }

            const user = await db.query.user
                .findMany({
                    where: eq(userTable.id, profile.value.id),
                    columns: {
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true,
                        phone: true,
                        permissions: true,
                    },
                    with: {
                        userToGroup: {
                            columns: {},
                            with: {
                                group: {
                                    columns: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                    limit: 1,
                })
                .then((users) => users.at(0));

            if (!user) {
                set.status = 500;
                return {
                    message: "Internal server error",
                };
            }

            set.status = 200;

            const permissions = listPermissions(BigInt(user.permissions)).map( permission => PERMISSION[permission])

            return {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                group: user.userToGroup.map(({ group }) => ({
                    id: group.id,
                    name: group.name,
                })),
                permissions,
            };
        },
        {
            response: {
                ...userAuthResponse,
                200: t.Object({
                    firstName: t.String(),
                    lastName: t.String(),
                    username: t.String(),
                    email: t.Nullable(t.String()),
                    phone: t.Nullable(t.String()),
                    group: t.Array(
                        t.Object({
                            id: t.Number(),
                            name: t.String(),
                        })
                    ),
                    permissions: t.Array(t.String()),
                }),
                500: t.Object(
                    {
                        message: t.Literal("Internal server error"),
                    },
                    {
                        description: "Internal server error",
                    }
                ),
            },
            detail: {
                description: "Get the current user",
            },
            cookie: baseCookies,
        }
    )
    .post('/fake-fill', async ({ body }) => {
        const passwordHash = await Bun.password.hash('password');
        for (let i = 0; i < body.count; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();

            await db.insert(userTable).values({
                username: faker.internet.userName({
                    firstName,
                    lastName,
                }).toLowerCase(),
                passwordHash,
                firstName,
                lastName,
                permissions: '0',
            });
        }

    }, {
        body: t.Object({
            count: t.Number(),
        }),
    })
    .use(AplRoutes)
    .use(AdminRoutes)
