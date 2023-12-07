import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { userToGroup } from './user.ts';

export const group = sqliteTable("group", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
});

export const groupRelations = relations(group, ({ many }) => ({
	groupToGroup: many(userToGroup),
}));
