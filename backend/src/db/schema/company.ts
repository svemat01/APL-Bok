import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const company = sqliteTable('company', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    location: text("location").notNull(),
})