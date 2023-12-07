import * as company from "./company.ts";
import * as group from "./group.ts";
import * as apl from "./apl.ts";
import * as report from "./report.ts";
import * as mentor from "./mentor.ts";
import * as user from "./user.ts";

export const schema = {
    ...company,
    ...group,
    ...apl,
    ...report,
    ...mentor,
    ...user,
};

export const tables = Object.fromEntries(
    Object.entries(schema).map(([name, table]) => [
        name+"Table",
        table,
    ])
) as {
    [K in keyof typeof schema as `${K}Table`]: typeof schema[K]
};