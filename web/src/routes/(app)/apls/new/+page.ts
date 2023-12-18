import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

import type { PageLoad } from './$types';

import { fetchApi } from '$lib';

export const _newAplSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    companyId: z.number(),
    startDate: z.date(),
    endDate: z.date(),
});

export const load = (async () => {
    const { data: companies } = await fetchApi('/api/admin/companies/', {
        method: 'GET',
    });

    const form = await superValidate(_newAplSchema, {});

    return { form, title: 'Add new APL', companies: companies ?? [] };
}) satisfies PageLoad;
