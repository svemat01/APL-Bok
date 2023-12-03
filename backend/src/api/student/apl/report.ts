import { elysiaBase } from "$/setup.ts";
import { db, apl as aplTable, report as reportTable } from "$db/index.ts";
import { studentAuthResponse } from "$utils/authHelpers.ts";
import { baseCookies } from "$utils/cookies.ts";
import { and, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

export const studentAPLReport = new Elysia({ prefix: "/report" })
    .use(elysiaBase)
    .guard({
        params: t.Object({
            aplId: t.Integer(),
        }),
    })
    .get(
        "/",
        async ({ set, cookie: { profile }, params: { aplId } }) => {
            const reports = await db.query.report.findMany({
                where: and(
                    eq(reportTable.aplId, aplId),
                    eq(reportTable.studentId, profile.value.id)
                ),
                columns: {
                    id: true,
                    rating: true,
                    comment: true,
                    date: true,
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
                        rating: t.Integer(),
                        comment: t.Nullable(t.String()),
                        date: t.Integer(),
                        shiftStart: t.Integer(),
                        shiftEnd: t.Integer(),
                    })
                ),
                ...studentAuthResponse,
            },
        }
    )
    .post(
        "/",
        async ({
            set,
            cookie: { profile },
            params: { aplId },
            body: { rating, comment, date, shiftStart, shiftEnd },
        }) => {
            const apl = await db.query.apl.findFirst({
                where: and(
                    eq(aplTable.id, aplId),
                    eq(aplTable.studentId, profile.value.id)
                ),
            });

            if (!apl) {
                set.status = 404;
                return {
                    message: "APL not found",
                };
            }

            const report = await db.query.report.findFirst({
                where: and(
                    eq(reportTable.aplId, aplId),
                    eq(reportTable.studentId, profile.value.id)
                ),
            });

            if (report) {
                set.status = 400;
                return {
                    message: "Report already exists",
                };
            }

            // await db.query.report.insert({
            //     rating,
            //     comment,
            //     date: new Date(date),
            //     shiftStart: new Date(shiftStart),
            //     shiftEnd: new Date(shiftEnd),
            //     aplId,
            //     studentId: profile.value.id,
            // });

            await db.insert(reportTable).values({
                rating,
                comment,
                date: new Date(date),
                shiftStart: new Date(shiftStart),
                shiftEnd: new Date(shiftEnd),
                aplId,
                studentId: profile.value.id,
            }).execute();

            set.status = 200;
            return {
                message: "Report created",
            };
        },
        {
            response: {
                200: t.Object({
                    message: t.String(),
                }),
                400: t.Object({
                    message: t.String(),
                }),
                404: t.Object({
                    message: t.String(),
                }),
                ...studentAuthResponse,
            },
            params: t.Object({
                aplId: t.Integer(),
            }),
            body: t.Object({
                rating: t.Integer({
                    minimum: 1,
                    maximum: 5,
                }),
                comment: t.Nullable(t.String({
                    maxLength: 500,
                })),
                date: t.Integer(),
                shiftStart: t.Integer(),
                shiftEnd: t.Integer(),
            }),
            cookie: baseCookies,
        }
    )
    .group("/:reportId", (apl) =>
        apl.get(
            "/",
            async ({ set, cookie: { profile }, params: { aplId } }) => {
                const report = await db.query.report.findFirst({
                    where: and(
                        eq(reportTable.id, aplId),
                        eq(reportTable.studentId, profile.value.id)
                    ),
                    columns: {
                        id: true,
                        rating: true,
                        comment: true,
                        date: true,
                        shiftStart: true,
                        shiftEnd: true,
                    },
                });

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
                    200: t.Object({
                        id: t.Integer(),
                        rating: t.Integer(),
                        comment: t.Nullable(t.String()),
                        date: t.Integer(),
                        shiftStart: t.Integer(),
                        shiftEnd: t.Integer(),
                    }),
                    404: t.Object({
                        message: t.String(),
                    }),
                    ...studentAuthResponse,
                },
                params: t.Object({
                    aplId: t.Integer(),
                }),
                cookie: baseCookies,
            }
        )
    );
