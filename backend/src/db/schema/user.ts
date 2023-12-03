import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const teacher = sqliteTable('teacher', {
    id: integer("id").primaryKey(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
})