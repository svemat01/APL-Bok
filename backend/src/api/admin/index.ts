import { setupPassword } from '../../index.ts';
import { elysiaBase, elysiaUserBase } from '../..//setup.ts';
import { companyTable, db, userTable } from '../../db/index.ts';
import { count } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { AdminUsersRoutes } from './users.ts';
import { AdminReportsRoutes } from './reports.ts';
import { AdminCompaniesRoutes } from './companies.ts';
import { countRows } from '../../utils/dbHelpers.ts';
import { AdminAplsRoutes } from './apl/index.ts';

export const AdminRoutes = new Elysia({ prefix: '/admin' })
    .use(elysiaUserBase)
    // Get dashboard summary
    .get(
        '/summary',
        async () => {
            // const users = await countRows(userTable, userTable.id);
            const [users, companies] = await Promise.all([
                countRows(userTable, userTable.id),
                countRows(companyTable, companyTable.id),
            ]);

            return {
                users,
                companies,
            };
        },
        {
            response: {
                200: t.Object({
                    users: t.Number(),
                    companies: t.Number(),
                }),
                401: t.Object({
                    message: t.String(),
                }),
            },
        },
    )
    .use(AdminUsersRoutes)
    .use(AdminReportsRoutes)
    .use(AdminCompaniesRoutes)
    .use(AdminAplsRoutes);
