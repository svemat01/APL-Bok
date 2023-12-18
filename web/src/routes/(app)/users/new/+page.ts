import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

import type { PageLoad } from './$types';

export const _newUserSchema = z.object({
    username: z.string().min(3).toLowerCase(),
    password: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    permissions: z.string(),
});

export const load = (async () => {
    const form = await superValidate(_newUserSchema, {});

    return { form, title: 'Add new user' };
}) satisfies PageLoad;
