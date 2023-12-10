import { elysiaUserBase } from '../../setup.ts';
import { db, companyTable } from '../../db/index.ts';
import { requirePermissions, PERMISSION } from '../../utils/authHelpers.ts';
import { HttpError } from '../../utils/errors.ts';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

export const AdminCompaniesRoutes = new Elysia({ prefix: "/companies" })
    .use(elysiaUserBase)
    // Get all companies
    .get("/", async ({ user }) => {
        requirePermissions(user.permissions, [PERMISSION.MANAGE_COMPANIES, PERMISSION.VIEW_COMPANIES]);

        const companies = await db.query.company.findMany({
            columns: {
                id: true,
                name: true,
                location: true,
            },
        });

        return companies;
    }, {
        response: {
            200: t.Array(
                t.Object({
                    id: t.Integer(),
                    name: t.String(),
                    location: t.String(),
                })
            ),
        },
    })
    // Create a new company
    .post("/", async ({ user, body }) => {
        requirePermissions(user.permissions, PERMISSION.MANAGE_COMPANIES);

        const { name, location } = body;

        const company = await db.insert(companyTable).values({
            name,
            location,
        }).returning({ id: companyTable.id }).then((rows) => rows[0]);

        return {
            id: company.id,
        };
    }, {
        response: {
            200: t.Object({
                id: t.Integer(),
            }),
        },
        body: t.Object({
            name: t.String(),
            location: t.String(),
        }),
    })
    .group(
        "/:companyId",
        company => company
        .get("/", async ({ user, params }) => {
            requirePermissions(user.permissions, [PERMISSION.MANAGE_COMPANIES, PERMISSION.VIEW_COMPANIES]);

            const { companyId } = params;

            const company = await db.query.company.findFirst({
                where: eq(companyTable.id, companyId),
                columns: {
                    id: true,
                    name: true,
                    location: true,
                },
            });

            if (!company) {
                throw new HttpError(404, "Company not found");
            }

            return company;
        }, {
            response: {
                200: t.Object({
                    id: t.Integer(),
                    name: t.String(),
                    location: t.String(),
                }),
            },
            params: t.Object({
                companyId: t.Integer(),
            }),
        })
        .put("/", async ({ user, params, body }) => {
            requirePermissions(user.permissions, PERMISSION.MANAGE_COMPANIES);

            const { companyId } = params;
            const { name, location } = body;

            await db.update(companyTable).set({
                name,
                location,
            }).where(eq(companyTable.id, companyId));

            return {
                message: "Company updated",
            };
        }, {
            response: {
                200: t.Object({
                    message: t.String(),
                }),
            },
            params: t.Object({
                companyId: t.Integer(),
            }),
            body: t.Object({
                name: t.String(),
                location: t.String(),
            }),
        })
        .delete("/", async ({ user, params }) => {
            requirePermissions(user.permissions, PERMISSION.MANAGE_COMPANIES);

            const { companyId } = params;

            await db.delete(companyTable).where(eq(companyTable.id, companyId));

            return {
                message: "Company deleted",
            };
        }, {
            response: {
                200: t.Object({
                    message: t.String(),
                }),
            },
            params: t.Object({
                companyId: t.Integer(),
            }),
        })
    )