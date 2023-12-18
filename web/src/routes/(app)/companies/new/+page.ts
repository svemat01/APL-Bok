import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _newCompanySchema = z.object({
    name: z.string(),
    location: z.string(),
});

export const load = (async () => {
    const form = await superValidate(_newCompanySchema, {});

    return { form, title: 'Add new company' };
}) satisfies PageLoad;
