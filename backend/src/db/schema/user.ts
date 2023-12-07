import { apl } from './apl.ts';
import { sqliteTable, integer, text, blob } from 'drizzle-orm/sqlite-core';
import { group } from './group.ts';
import { relations } from 'drizzle-orm';

export const user = sqliteTable('user', {
    id: integer("id").primaryKey(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    permissions: text("permissions").notNull().default("0"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text("phone"),
    email: text("email"),
})

export const userRelations = relations(user, ({ many }) => ({
	userToGroup: many(userToGroup),
    apl: many(apl),
}));

export const userToGroup = sqliteTable('user_to_group', {
    userId: integer("user_id").notNull().references(() => user.id),
    groupId: integer("group_id").notNull().references(() => group.id),
})

export const userToGroupRelations = relations(userToGroup, ({ one }) => ({
	group: one(group, {
		fields: [userToGroup.groupId],
		references: [group.id],
	}),
	user: one(user, {
		fields: [userToGroup.userId],
		references: [user.id],
	}),
}));