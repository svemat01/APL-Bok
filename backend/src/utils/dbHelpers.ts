import { Name, Table, count, getTableName } from 'drizzle-orm';
import { db, userTable } from '../db/index.ts';
import { SQLiteTableWithColumns, TableConfig } from 'drizzle-orm/sqlite-core';
import { useCache } from 'cache-fns';
import { useLocalCache } from './cache/localCache.ts';

export const countRows = async <TableC extends TableConfig>(
    table: SQLiteTableWithColumns<TableC>,
    column?: TableC['columns'][keyof TableC['columns']],
) => {
    return useCache<number>(
        `countRows:${getTableName(table)}:${column?.name ?? '*'}`,
        useLocalCache(),
        async () => {
            return db
                .select({ value: count(column) })
                .from(table)
                .then((rows) => rows.at(0)?.value ?? 0)
                .catch(() => undefined);
        },
    ).then((count) => count ?? -1);
};

export const isSetup = () => {
    return useCache<boolean>('is_database_setup', useLocalCache(), async () => {
        const userCount = await countRows(userTable);
        return userCount > 0;
    }) as Promise<boolean>;
};
