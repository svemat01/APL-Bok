import { userAuthResponse } from './../../utils/authHelpers.ts';
import { elysiaUserBase } from '../../setup.ts';
import { aplTable, db, groupTable, userTable } from '../../db/index.ts';
import { userToGroup } from '../../db/schema/user.ts';
import {
    PERMISSION,
    canGrantPermissions,
    requirePermissions,
} from '../../utils/authHelpers.ts';
import { HttpError } from '../../utils/errors.ts';
import { count, eq, sql } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

export const AdminUsersRoutes = new Elysia({ prefix: '/users' })
    .use(elysiaUserBase)
    // Get all users
    .get('/', async ({ user }) => {
        requirePermissions(user.permissions, [
            PERMISSION.MANAGE_USERS,
            PERMISSION.VIEW_USERS,
        ]);

        const users = await db.query.user.findMany({
            columns: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                permissions: true,
            },
        });

        return users;
    }, {
        response: {
            ...userAuthResponse,
            200: t.Array(
                t.Object({
                    id: t.Integer(),
                    username: t.String(),
                    firstName: t.String(),
                    lastName: t.String(),
                    permissions: t.String(),
                }),
            ),
        },
    })
    // Get amount of users
    .get('/count', async ({ user }) => {
        requirePermissions(user.permissions, [
            PERMISSION.MANAGE_USERS,
            PERMISSION.VIEW_USERS,
        ]);

        const _count = await db
            .select({
                value: count(userTable.id),
            })
            .from(userTable)
            .then((res) => res.at(0)?.value);

        return {
            count: _count,
        };
    })
    // Create new user
    .post(
        '/',
        async ({ user, body }) => {
            requirePermissions(user.permissions, [PERMISSION.MANAGE_USERS]);

            const permissions = BigInt(body.permissions);

            const isAllowed = canGrantPermissions(
                user.permissions,
                permissions,
            );

            if (!isAllowed) {
                throw new HttpError(403, 'You cannot grant these permissions');
            }

            const { username, password, firstName, lastName } = body;

            const passwordHash = await Bun.password.hash(password);

            const result = await db
                .insert(userTable)
                .values({
                    username,
                    passwordHash,
                    firstName,
                    lastName,
                    permissions: permissions.toString(),
                })
                .returning({ id: userTable.id})
                .then((users) => users.at(0)?.id)
                .catch(() => undefined);

            if (!result) {
                throw new HttpError(409, 'Username already exists');
            }

            return {
                id: result,
            };
        },
        {
            body: t.Object({
                username: t.String(),
                password: t.String(),
                firstName: t.String(),
                lastName: t.String(),
                permissions: t.String(),
            }),
            response: {
                200: t.Object({
                    id: t.Integer(),
                }),
                409: t.Object({
                    message: t.String(),
                }),
            },
        },
    )
    .post(
        '/bulk',
        async ({ user, body }) => {
            requirePermissions(user.permissions, [PERMISSION.MANAGE_USERS]);

            // check if can

            const users = await Promise.all(
                body.map(async (newUser) => {
                    const permissions = BigInt(newUser.permissions);

                    const isAllowed = canGrantPermissions(
                        user.permissions,
                        permissions,
                    );

                    if (!isAllowed) {
                        throw new HttpError(
                            403,
                            'You cannot grant these permissions',
                        );
                    }

                    const hashedPassword = await Bun.password.hash(
                        newUser.password,
                    );

                    return {
                        username: newUser.username,
                        passwordHash: hashedPassword,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        permissions: permissions.toString(),
                    };
                }),
            );

            const result = await db
                .insert(userTable)
                .values(users)
                .then(() => true)
                .catch(() => false);

            if (!result) {
                throw new HttpError(401, 'Username already exists');
            }

            return {
                message: 'Users created',
            };
        },
        {
            body: t.Array(
                t.Object({
                    username: t.String(),
                    password: t.String(),
                    firstName: t.String(),
                    lastName: t.String(),
                    permissions: t.String(),
                }),
            ),
            response: {
                200: t.Object({
                    message: t.String(),
                }),
            },
        },
    )
    .group('/:userId', (user) =>
        user
            // Get user
            .get('/', async ({ user, params: { userId } }) => {
                requirePermissions(user.permissions, [
                    PERMISSION.MANAGE_USERS,
                    PERMISSION.VIEW_USERS,
                ]);

                console.log(userId);

                const targetUser = await db.query.user
                    .findMany({
                        where: eq(userTable.id, userId),
                        columns: {
                            id: true,
                            username: true,
                            firstName: true,
                            lastName: true,
                            permissions: true,
                        },
                        with: {
                            apl: {
                                columns: {
                                    id: true,
                                    name: true,
                                    startDate: true,
                                    endDate: true,
                                },
                            },
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
                    .then((users) => users.at(0))

                if (!targetUser) {
                    throw new HttpError(400, 'User not found');
                }

                return {
                    id: targetUser.id,
                    username: targetUser.username,
                    firstName: targetUser.firstName,
                    lastName: targetUser.lastName,
                    permissions: targetUser.permissions,
                    apl: targetUser.apl.map((apl) => ({
                        ...apl,
                        startDate: apl.startDate.getTime(),
                        endDate: apl.endDate.getTime(),
                    })),
                    groups: targetUser.userToGroup.map((group) => group.group),
                };
            }, {
                response: {
                    ...userAuthResponse,
                    200: t.Object({
                        id: t.Integer(),
                        username: t.String(),
                        firstName: t.String(),
                        lastName: t.String(),
                        permissions: t.String(),
                        apl: t.Array(
                            t.Object({
                                id: t.Integer(),
                                name: t.String(),
                                startDate: t.Integer(),
                                endDate: t.Integer(),
                            }),
                        ),
                        groups: t.Array(
                            t.Object({
                                id: t.Integer(),
                                name: t.String(),
                            }),
                        ),
                    }),
                },
                params: t.Object({
                    userId: t.Numeric(),
                }),
            })
            // Update user permissions
            .put(
                '/permissions',
                async ({ user, params: { userId }, body }) => {
                    requirePermissions(user.permissions, [
                        PERMISSION.MANAGE_USERS,
                    ]);

                    const permissions = BigInt(body.permissions);

                    const isAllowed = canGrantPermissions(
                        user.permissions,
                        permissions,
                    );

                    if (!isAllowed) {
                        throw new HttpError(
                            403,
                            'You cannot grant these permissions',
                        );
                    }

                    const result = await db
                        .update(userTable)
                        .set({
                            permissions: permissions.toString(),
                        })
                        .where(eq(userTable.id, userId))
                        .then(() => true)
                        .catch(() => false);

                    if (!result) {
                        throw new HttpError(
                            400,
                            'Failed to update permissions',
                        );
                    }

                    return {
                        message: 'User updated',
                    };
                },
                {
                    body: t.Object({
                        permissions: t.String(),
                    }),
                    response: {
                        200: t.Object({
                            message: t.String(),
                        }),
                    },
                    params: t.Object({
                        userId: t.Numeric(),
                    }),
                },
            )
            // Delete user
            .delete(
                '/',
                async ({ user, params: { userId } }) => {
                    requirePermissions(user.permissions, [
                        PERMISSION.MANAGE_USERS,
                    ]);

                    const targetUser = await db.query.user
                        .findMany({
                            where: eq(userTable.id, userId),
                            columns: {
                                permissions: true,
                            },
                            limit: 1,
                        })
                        .then((users) => users.at(0));

                    if (!targetUser) {
                        throw new HttpError(400, 'User not found');
                    }

                    const isAllowed = canGrantPermissions(
                        user.permissions,
                        BigInt(targetUser.permissions),
                    );

                    if (!isAllowed) {
                        throw new HttpError(403, 'You cannot delete this user');
                    }

                    const result = await db
                        .delete(userTable)
                        .where(eq(userTable.id, userId))
                        .then(() => true)
                        .catch(() => false);

                    if (!result) {
                        throw new HttpError(400, 'Failed to delete user');
                    }

                    return {
                        message: 'User deleted',
                    };
                },
                {
                    response: {
                        200: t.Object({
                            message: t.String(),
                        }),
                    },
                    params: t.Object({
                        userId: t.Numeric(),
                    }),
                },
            )
            // Get all apls for user
            .get(
                '/apls',
                async ({ user, params: { userId } }) => {
                    requirePermissions(user.permissions, [
                        PERMISSION.MANAGE_USERS,
                        PERMISSION.VIEW_USERS,
                    ]);

                    const apls = await db.query.apl.findMany({
                        where: eq(aplTable.userId, userId),
                        columns: {
                            id: true,
                            name: true,
                            startDate: true,
                            endDate: true,
                            companyId: true,
                            mentorId: true,
                        },
                    });

                    return apls.map((apl) => ({
                        ...apl,
                        startDate: apl.startDate.getTime(),
                        endDate: apl.endDate.getTime(),
                    }));
                },
                {
                    response: {
                        200: t.Array(
                            t.Object({
                                id: t.Integer(),
                                name: t.String(),
                                startDate: t.Integer(),
                                endDate: t.Integer(),
                                companyId: t.Integer(),
                                mentorId: t.Integer(),
                            }),
                        ),
                    },
                    params: t.Object({
                        userId: t.Numeric(),
                    }),
                },
            )
            // Get all reports for user
            .get(
                '/reports',
                async ({ user, params: { userId } }) => {
                    requirePermissions(user.permissions, [
                        PERMISSION.MANAGE_USERS,
                        PERMISSION.VIEW_USERS,
                    ]);

                    const reports = await db.query.report.findMany({
                        where: eq(aplTable.userId, userId),
                        columns: {
                            id: true,
                            aplId: true,
                            comment: true,
                            date: true,
                            rating: true,
                            shiftStart: true,
                            shiftEnd: true,
                        },
                    });

                    return reports.map((report) => ({
                        ...report,
                        date: report.date.getTime(),
                        shiftStart: report.shiftStart.getTime(),
                        shiftEnd: report.shiftEnd.getTime(),
                    }));
                },
                {
                    response: {
                        200: t.Array(
                            t.Object({
                                id: t.Integer(),
                                aplId: t.Integer(),
                                comment: t.Nullable(t.String()),
                                date: t.Integer(),
                                rating: t.Integer(),
                                shiftStart: t.Integer(),
                                shiftEnd: t.Integer(),
                            }),
                        ),
                    },
                    params: t.Object({
                        userId: t.Numeric(),
                    }),
                },
            )
            // Get all groups for user
            .get(
                '/groups',
                async ({ user, params: { userId } }) => {
                    requirePermissions(user.permissions, [
                        PERMISSION.MANAGE_USERS,
                        PERMISSION.VIEW_USERS,
                    ]);

                    const groups = await db.query.userToGroup.findMany({
                        where: eq(userToGroup.userId, userId),
                        columns: {},
                        with: {
                            group: {
                                columns: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    });

                    return groups.map((group) => group.group);
                },
                {
                    response: {
                        200: t.Array(
                            t.Object({
                                id: t.Integer(),
                                name: t.String(),
                            }),
                        ),
                    },
                    params: t.Object({
                        userId: t.Numeric(),
                    }),
                },
            ),
    );
