import { mentor } from './mentor';
import { student } from './student';
import { company } from './company';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const internship_location = sqliteTable('internship_location', {
    id: integer("id").primaryKey(),
    student_id: integer("student_id").notNull().references(() => student.id),
    company_id: integer("company_id").notNull().references(() => company.id),
    mentor_id: integer("mentor_id").notNull().references(() => mentor.id),
    start_date: integer("start_date", {mode: 'timestamp'}).notNull(),
    end_date: integer("end_date", {mode: 'timestamp'}).notNull(),
})