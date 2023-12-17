import { elysiaBase, elysiaUserBase } from "../../setup.ts";
import { db, aplTable } from "../../db/index.ts";
import { userAuthResponse } from "../../utils/authHelpers.ts";
import { baseCookies } from "../../utils/cookies.ts";
import { and, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { AplReportRoutes } from "./report.ts";

export const AplRoutes = new Elysia({ prefix: "/apl" })
    .use(elysiaUserBase)
    .get(
        "/",
        async ({ set, cookie: { profile } }) => {
            const apls = await db.query.apl.findMany({
                where: eq(aplTable.userId, profile.value.id),
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
                ...userAuthResponse,
            },
            detail: {
                description: "Get all APLs for current user",
            },
        }
    )
    .group("/:aplId", (apl) =>
        apl
            .get(
                "/",
                async ({ set, cookie: { profile }, params: { aplId } }) => {
                    const apl = await db.query.apl.findMany({
                        where: and(
                            eq(aplTable.id, aplId),
                            eq(aplTable.userId, profile.value.id)
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
                        limit: 1,
                    }).then((apls) => apls.at(0));

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
                        ...userAuthResponse,
                    },
                    params: t.Object({
                        aplId: t.Numeric(),
                    }),
                    cookie: baseCookies,
                    detail: {
                        description: "Get an APL",
                    },
                }
            )
            .use(AplReportRoutes)
    );
