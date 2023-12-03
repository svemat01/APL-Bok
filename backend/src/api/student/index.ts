import { elysiaBase } from "$/setup.ts";
import { db } from "$db/index.ts";
import { student as studentTable } from "$db/schema/student.ts";
import { combineResponses } from "$utils/combineSchema.ts";
import { baseCookies, signedCookies } from "$utils/cookies.ts";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { studentAPL } from './apl/index.ts';
import { studentAuthResponse } from '$utils/authHelpers.ts';

export const StudentRoutes = new Elysia({ prefix: "/student" })
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

            const student = await db.query.student.findFirst({
                where: eq(studentTable.username, username),
                columns: {
                    id: true,
                    passwordHash: true,
                    firstName: true,
                },
            });

            if (!student) {
                set.status = 400;
                return {
                    message: "Invalid username or password",
                };
            }

            const passwordMatch = await Bun.password.verify(
                password,
                student.passwordHash
            );

            if (!passwordMatch) {
                set.status = 400;
                return {
                    message: "Invalid username or password",
                    dd: "dd",
                };
            }

            profile.value = {
                id: student.id,
                type: "student",
                name: student.firstName,
            };

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
            response: combineResponses({
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
            }),
        }
    )
    .guard({
        beforeHandle: [
            ({ set, cookie: { profile } }) => {
                if (!profile.value) {
                    set.status = 401;
                    return {
                        message: "Not signed in",
                    };
                }

                if (profile.value.type !== "student") {
                    set.status = 403;
                    return {
                        message: "Not a student",
                    };
                }
            },
        ],
        cookie: t.Cookie({
            profile: t.Optional(signedCookies.profile),
        }),
        response: studentAuthResponse,
    })
    .use(studentAPL)
    .get(
        "/me",
        async ({ set, cookie: { profile } }) => {
            if (!profile.value) {
                set.status = 401;
                return {
                    message: "Not signed in",
                };
            }

            const student = await db.query.student.findFirst({
                where: eq(studentTable.id, profile.value.id),
                columns: {
                    firstName: true,
                    lastName: true,
                    username: true,
                    email: true,
                    phone: true,
                },
                with: {
                    studentToGroup: {
                        columns: {},
                        with: {
                            group: {
                                columns: {
                                    id: true,
                                    name: true,
                                },
                            },
                        }
                    },
                }
            });

            if (!student) {
                set.status = 500;
                return {
                    message: "Internal server error",
                };
            }

            set.status = 200;

            return {
                firstName: student.firstName,
                lastName: student.lastName,
                username: student.username,
                email: student.email,
                phone: student.phone,
                group: student.studentToGroup.map(({ group }) => ({
                    id: group.id,
                    name: group.name,
                }))
            };
        },
        {
            response: {
                ...studentAuthResponse,
                200: t.Object({
                    firstName: t.String(),
                    lastName: t.String(),
                    username: t.String(),
                    email: t.Nullable(t.String()),
                    phone: t.Nullable(t.String()),
                    group: t.Array(t.Object({
                        id: t.Number(),
                        name: t.String(),
                    })),
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
                description: "Get the current student",
            },
            cookie: baseCookies,
        }
    )



