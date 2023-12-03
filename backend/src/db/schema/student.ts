import { apl } from './apl.ts';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { group } from './group.ts';
import { relations } from 'drizzle-orm';

export const student = sqliteTable('student', {
    id: integer("id").primaryKey(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text("phone"),
    email: text("email"),
})

export const studentRelations = relations(student, ({ many }) => ({
	studentToGroup: many(studentToGroup),
    apl: many(apl),
}));

export const studentToGroup = sqliteTable('student_to_group', {
    studentId: integer("student_id").notNull().references(() => student.id),
    groupId: integer("group_id").notNull().references(() => group.id),
})

export const studentToGroupRelations = relations(studentToGroup, ({ one }) => ({
	group: one(group, {
		fields: [studentToGroup.groupId],
		references: [group.id],
	}),
	student: one(student, {
		fields: [studentToGroup.studentId],
		references: [student.id],
	}),
}));