import { elysiaUserBase } from "$/setup.ts";
import { aplTable, db, reportTable } from "$db/index.ts";
import { PERMISSION, requirePermissions } from "$utils/authHelpers.ts";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

export const AdminReportsRoutes = new Elysia({ prefix: "/reports" })
    .use(elysiaUserBase)
    .get(
        "/",
        async ({ user }) => {
            requirePermissions(user.permissions, [
                PERMISSION.MANAGE_REPORTS,
                PERMISSION.VIEW_REPORTS,
            ]);

            const reports = await db.query.report.findMany({
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
                    })
                ),
            },
        }
    )
    .post(
        "/",
        async ({ user, set, body }) => {
            requirePermissions(user.permissions, PERMISSION.MANAGE_REPORTS);

            const { aplId, comment, date, rating, shiftStart, shiftEnd, userId } = body;

            const report = await db
                .insert(reportTable)
                .values({
                    aplId,
                    userId,
                    comment,
                    date: new Date(date),
                    rating,
                    shiftStart: new Date(shiftStart),
                    shiftEnd: new Date(shiftEnd),
                })
                .execute();

            set.status = 201;
            return {
                message: "Report created",
            }
        },
        {
            response: {
                201: t.Object({
                    message: t.String(),
                }),
            },
            body: t.Object({
                aplId: t.Integer(),
                userId: t.Integer(),
                comment: t.Nullable(t.String()),
                date: t.Integer(),
                rating: t.Integer(),
                shiftStart: t.Integer(),
                shiftEnd: t.Integer(),
            }),
        }
    )
    .group("/:reportId", (report) =>
        report
            .get(
                "/",
                async ({ set, params: { reportId } }) => {
                    const report = await db.query.report.findMany({
                        where: eq(reportTable.id, reportId),
                        columns: {
                            id: true,
                            aplId: true,
                            comment: true,
                            date: true,
                            rating: true,
                            shiftStart: true,
                            shiftEnd: true,
                        },
                        limit: 1,
                    }).then((reports) => reports.at(0));

                    if (!report) {
                        set.status = 404;
                        return {
                            message: "Report not found",
                        };
                    }

                    return {
                        ...report,
                        date: report.date.getTime(),
                        shiftStart: report.shiftStart.getTime(),
                        shiftEnd: report.shiftEnd.getTime(),
                    };
                },
                {
                    response: {
                        404: t.Object({
                            message: t.String(),
                        }),
                        200: t.Object({
                            id: t.Integer(),
                            aplId: t.Integer(),
                            comment: t.Nullable(t.String()),
                            date: t.Integer(),
                            rating: t.Integer(),
                            shiftStart: t.Integer(),
                            shiftEnd: t.Integer(),
                        }),
                    },
                    params: t.Object({
                        reportId: t.Integer(),
                    }),
                }
            )
            .delete(
                "/",
                async ({ set, params: { reportId } }) => {
                    const report = await db
                        .delete(reportTable)
                        .where(eq(reportTable.id, reportId))
                        .execute().then(() => true).catch(() => false);

                    if (!report) {
                        set.status = 404;
                        return {
                            message: "Report not found",
                        };
                    }

                    return {
                        message: "Report deleted",
                    };
                },
                {
                    response: {
                        200: t.Object({
                            message: t.String(),
                        }),
                    },
                    params: t.Object({
                        reportId: t.Integer(),
                    }),
                }
            )
    );
