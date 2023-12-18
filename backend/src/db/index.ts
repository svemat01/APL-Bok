import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { schema, tables } from './schema';
import {
    TableRelationalConfig,
    TablesRelationalConfig,
    eq,
    sql,
} from 'drizzle-orm';
import { RelationalQueryBuilder } from 'drizzle-orm/sqlite-core/query-builders/query';

const sqlite = new Database('sqlite.db');

export const db = drizzle(sqlite, { schema, logger: true });

// export const findFirst = <
//     Table extends RelationalQueryBuilder<
//         'sync' | 'async',
//         Record<string, unknown>,
//         TablesRelationalConfig,
//         TableRelationalConfig
//     >,
//     Config extends Parameters<Table['findFirst']>[0],
// >(
//     table: Table,
//     where: Config,
// ) =>
//     table
//         .findMany({
//             ...where,
//             limit: 1,
//         })
//         .then((res) => res.at(0)) as ReturnType<Table['findFirst']<Config>>;

// const t = db.query.user.findFirst();

// const user = findFirst(db.query.user, {})

// findFirst(db.query.user, {});

migrate(db, {
    migrationsFolder: 'drizzle',
});

export const {
    aplTable,
    companyTable,
    groupTable,
    mentorTable,
    reportTable,
    userTable,
} = tables;

// limit 1 works but not findFirst
