import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { schema, tables } from "./schema";
import { eq, sql } from 'drizzle-orm';

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema, logger: true });

migrate(db, {
    migrationsFolder: "drizzle",
});

export const { aplTable, companyTable, groupTable, mentorTable, reportTable, userTable } = tables;


// limit 1 works but not findFirst

