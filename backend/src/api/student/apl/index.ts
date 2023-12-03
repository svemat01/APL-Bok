import { elysiaBase } from "$/setup.ts";
import { db, apl as aplTable } from "$db/index.ts";
import { studentAuthResponse } from "$utils/authHelpers.ts";
import { baseCookies } from "$utils/cookies.ts";
import { and, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { studentAPLReport } from "./report.ts";

export const studentAPL = new Elysia({ prefix: "/apl" })
    .use(elysiaBase)
    .get(
        "/",
        async ({ set, cookie: { profile } }) => {
            const apls = await db.query.apl.findMany({
                where: eq(aplTable.studentId, profile.value.id),
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
                        company: t.Object({
                            name: t.String(),
                        }),
                    })
                ),
                ...studentAuthResponse,
            },
        }
    )
    .group("/:aplId", (apl) =>
        apl
            .get(
                "/",
                async ({ set, cookie: { profile }, params: { aplId } }) => {
                    const apl = await db.query.apl.findFirst({
                        where: and(
                            eq(aplTable.id, aplId),
                            eq(aplTable.studentId, profile.value.id)
                        ),
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
                        },
                    });

                    if (!apl) {
                        set.status = 404;
                        return {
                            message: "APL not found",
                        };
                    }

                    return {
                        ...apl,
                        startDate: apl.startDate.getTime(),
                        endDate: apl.endDate.getTime(),
                    };
                },
                {
                    response: {
                        200: t.Object({
                            id: t.Integer(),
                            name: t.String(),
                            startDate: t.Integer(),
                            endDate: t.Integer(),
                            company: t.Object({
                                name: t.String(),
                            }),
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
            .use(studentAPLReport)
    );
