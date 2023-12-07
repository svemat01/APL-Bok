import { db, userTable } from '$db/index.ts';
import { count } from 'drizzle-orm';

export const isSetup = async () => {
    const usersCount = await db
        .select({ value: count() })
        .from(userTable)
        .then((res) => res[0].value);

    return usersCount !== 0;
}