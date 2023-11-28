import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const group = sqliteTable("group", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
});
