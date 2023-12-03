import { mentor } from './mentor';
import { student } from './student';
import { company } from './company';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { report } from './report.ts';

export const apl = sqliteTable('apl', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    studentId: integer("student_id").notNull().references(() => student.id),
    companyId: integer("company_id").notNull().references(() => company.id),
    mentorId: integer("mentor_id").notNull().references(() => mentor.id),
    startDate: integer("start_date", {mode: 'timestamp'}).notNull(),
    endDate: integer("end_date", {mode: 'timestamp'}).notNull(),
})

export const apl_relations = relations(apl, ({ one, many }) => ({
    student: one(student, {
        fields: [apl.studentId],
        references: [student.id],
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