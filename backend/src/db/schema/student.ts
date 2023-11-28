import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { group } from './group.ts';

export const student = sqliteTable('student', {
    id: integer("id").primaryKey(),
    username: text("username").notNull().unique(),
    password_hash: text("password_hash").notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    phone_number: text("phone_number"),
    email: text("email"),
})

export const studentToGroup = sqliteTable('student_to_group', {
    student_id: integer("student_id").notNull().references(() => student.id),
    group_id: integer("group_id").notNull().references(() => group.id),
})
