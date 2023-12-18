import { elysiaUserBase } from '../../../setup.ts';
import { db, aplTable } from '../../../db/index.ts';
import { requirePermissions, PERMISSION } from '../../../utils/authHelpers.ts';
import { HttpError } from '../../../utils/errors.ts';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

export const AdminAplsRoutes = new Elysia({ prefix: '/apls' })
    .use(elysiaUserBase)
    // Get all apls
    .get(
        '/',
        async ({ user }) => {
            requirePermissions(user.permissions, [PERMISSION.MANAGE_APLS]);

            const apls = await db.query.apl.findMany({
                columns: {
                    id: true,
                    name: true,
                    startDate: true,
                    endDate: true,
                },
                with: {
                    company: {
                        columns: {
                            name: true,
                        },
                    },
                    user: {
                        columns: {
                            firstName: true,
                            lastName: true,
                        },
                    }
                },
            });

            return apls.map((apl) => ({
                id: apl.id,
                name: apl.name,
                startDate: apl.startDate.getTime(),
                endDate: apl.endDate.getTime(),
                company: apl.company.name,
                user: `${apl.user.firstName} ${apl.user.lastName}`
            }));
        },
        {
            response: {
                200: t.Array(
                    t.Object({
                        id: t.Integer(),
                        name: t.String(),
                        startDate: t.Number(),
                        endDate: t.Number(),
                        company: t.String(),
                        user: t.String(),
                    }),
                ),
            },
        },
    )
    // Create a new apl
    .post(
        '/',
        async ({ user, body }) => {
            requirePermissions(user.permissions, PERMISSION.MANAGE_APLS);

            const { name, startDate, endDate, companyId } = body;

            const apl = await db
                .insert(aplTable)
                .values({
                    name,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    companyId,
                    userId: user.id,
                })
                .returning({ id: aplTable.id })
                .then((rows) => rows[0]);

            return {
                id: apl.id,
            };
        },
        {
            response: {
                200: t.Object({
                    id: t.Integer(),
                }),
            },
            body: t.Object({
                name: t.String(),
                startDate: t.Number(),
                endDate: t.Number(),
                companyId: t.Integer(),
            }),
        },
    )
    .group('/:aplId', (apl) =>
        apl
            .get(
                '/',
                async ({ user, params }) => {
                    requirePermissions(user.permissions, [
                        PERMISSION.MANAGE_APLS,
                    ]);

                    const { aplId } = params;

                    const apl = await db.query.apl
                        .findMany({
                            where: eq(aplTable.id, aplId),
                            columns: {
                                id: true,
                                name: true,
                                startDate: true,
                                endDate: true,
                            },
                            with: {
                                company: {
                                    columns: {
                                        id: true,
                                        name: true,
                                    },
                                },
                                mentor: {
                                    columns: {
                                        id: true,
                                        name: true,
                                    },
                                },
                                report: {
                                    columns: {
                                        id: true,
                                        date: true,
                                        rating: true,
                                        shiftStart: true,
                                        shiftEnd: true,
                                    },
                                },
                                user: {
                                    columns: {
                                        id: true,
                                        firstName: true,
                                        lastName: true,
                                    },
                                }
                            },
                        })
                        .then((rows) => rows.at(0));

                    if (!apl) {
                        throw new HttpError(404, 'APL not found');
                    }

                    return {
                        ...apl,
                        startDate: apl.startDate.getTime(),
                        endDate: apl.endDate.getTime(),
                        report: apl.report.map((report) => ({
                            ...report,
                            date: report.date.getTime(),
                            shiftStart: report.shiftStart.getTime(),
                            shiftEnd: report.shiftEnd.getTime(),
                        })),
                    }
                },
                {
                    response: {
                        200: t.Object({
                            id: t.Integer(),
                            name: t.String(),
                            startDate: t.Integer(),
                            endDate: t.Integer(),
                            company: t.Object({
                                id: t.Integer(),
                                name: t.String(),
                            }),
                            mentor: t.Nullable(
                                t.Object({
                                    id: t.Integer(),
                                    name: t.String(),
                                }),
                            ),
                            report: t.Array(
                                t.Object({
                                    id: t.Integer(),
                                    date: t.Integer(),
                                    rating: t.Integer(),
                                    shiftStart: t.Integer(),
                                    shiftEnd: t.Integer(),
                                }),
                            ),
                            user: t.Object({
                                id: t.Integer(),
                                firstName: t.String(),
                                lastName: t.String(),
                            })
                        }),
                    },
                    params: t.Object({
                        aplId: t.Numeric(),
                    }),
                },
            )
            .put(
                '/',
                async ({ user, params, body }) => {
                    requirePermissions(
                        user.permissions,
                        PERMISSION.MANAGE_APLS,
                    );

                    const { aplId } = params;
                    const { name, startDate, endDate } = body;

                    await db
                        .update(aplTable)
                        .set({
                            name,
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                        })
                        .where(eq(aplTable.id, aplId));

                    return {
                        message: 'APL updated',
                    };
                },
                {
                    response: {
                        200: t.Object({
                            message: t.String(),
                        }),
                    },
                    params: t.Object({
                        aplId: t.Numeric(),
                    }),
                    body: t.Object({
                        name: t.String(),
                        startDate: t.Number(),
                        endDate: t.Number(),
                    }),
                },
            )
            .delete(
                '/',
                async ({ user, params }) => {
                    requirePermissions(
                        user.permissions,
                        PERMISSION.MANAGE_APLS,
                    );

                    const { aplId } = params;

                    await db.delete(aplTable).where(eq(aplTable.id, aplId));

                    return {
                        message: 'APL deleted',
                    };
                },
                {
                    response: {
                        200: t.Object({
                            message: t.String(),
                        }),
                    },
                    params: t.Object({
                        aplId: t.Numeric(),
                    }),
                },
            ),
    );
