import { apl } from './apl.ts';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { company } from './company.ts';
import { relations } from 'drizzle-orm';

export const mentor = sqliteTable('mentor', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    companyId: integer("company_id").notNull().references(() => company.id),
})

export const mentorRelations = relations(mentor, ({ one, many }) => ({
    companyId: one(company, {
        fields: [mentor.companyId],
        references: [company.id],
    }),
    apl: many(apl),
}))

