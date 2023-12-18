import { mentor } from './mentor';
import { user } from './user.ts';
import { company } from './company';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { report } from './report.ts';

export const apl = sqliteTable('apl', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    userId: integer("user_id").notNull().references(() => user.id),
    companyId: integer("company_id").notNull().references(() => company.id),
    mentorId: integer("mentor_id").references(() => mentor.id),
    startDate: integer("start_date", {mode: 'timestamp'}).notNull(),
    endDate: integer("end_date", {mode: 'timestamp'}).notNull(),
})

export const apl_relations = relations(apl, ({ one, many }) => ({
    user: one(user, {
        fields: [apl.userId],
        references: [user.id],
    }),
    company: one(company, {
        fields: [apl.companyId],
        references: [company.id],
    }),
    mentor: one(mentor, {
        fields: [apl.mentorId],
        references: [mentor.id],
    }),
    report: many(report),
}))