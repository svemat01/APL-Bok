import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { student } from './student.ts';
import { relations, sql } from 'drizzle-orm';
import { apl } from './apl.ts';

export const report = sqliteTable("report", {
    id: integer("id").primaryKey(),
    aplId: integer("apl_id").notNull().references(() => apl.id),
    studentId: integer("student_id").notNull().references(() => student.id),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    date: integer("created_at", {mode: "timestamp"}).notNull().default(sql`CURRENT_TIMESTAMP`),
    shiftStart: integer("shift_start", {mode: "timestamp"}).notNull(),
    shiftEnd: integer("shift_end", {mode: "timestamp"}).notNull(),
});

export const reportRelations = relations(report, ({ one }) => ({
    studentId: one(student, {
        fields: [report.studentId],
        references: [student.id],
    }),
    aplId: one(apl, {
        fields: [report.aplId],
        references: [apl.id],
    }),
}));