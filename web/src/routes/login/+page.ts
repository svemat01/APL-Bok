import { fetchApi } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _setupSchema = z.object({
    username: z.string().toLowerCase(),
    password: z.string(),
});

export const load = (async () => {
    const setupResponse = await fetchApi('/api/me', {
        method: 'GET',
        // credentials: 'same-origin',
    });

    if (setupResponse.data) {
        throw redirect(307, '/');
    }

    const form = await superValidate(_setupSchema, {});

    return { form, title: 'Login' };
}) satisfies PageLoad;
