import { fetchApi } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _setupSchema = z.object({
    username: z.string().min(3).toLowerCase(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    setupPassword: z.string().min(8),
});

export const load = (async () => {
    const setupResponse = await fetchApi('/api/setup', {
        method: 'GET',
    });

    if (setupResponse.data?.isSetup) {
        throw redirect(307, '/login');
    }

    const form = await superValidate(_setupSchema, {});

    return { form };
}) satisfies PageLoad;
