import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { company } from './company.ts';

export const mentor = sqliteTable('mentor', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    company_id: integer("company_id").notNull().references(() => company.id),
})