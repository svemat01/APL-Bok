import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { apl } from './apl.ts';
import { mentor } from './mentor.ts';

export const company = sqliteTable('company', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    location: text("location").notNull(),
})

export const companyRelations = relations(company, ({ many }) => ({
    apl: many(apl),
    mentor: many(mentor),
}))