import type { Config } from "drizzle-kit";
 
export default {
  schema: "../backend/src/db/schema/*",
  out: "../backend/drizzle",
  driver: 'better-sqlite',
  dbCredentials: {
    url: "../backend/sqlite.db"
  }
} satisfies Config;