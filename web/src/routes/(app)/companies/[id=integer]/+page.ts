import { fetchApi } from '$lib';
import { error as skError } from '@sveltejs/kit';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';
import type { PageLoad } from './$types';
import { z } from 'zod';

export const _permissionsSchema = z.object({
    permissions: z.record(z.boolean()),
});

export const load = (async ({ params, parent }) => {
    const { currentUser } = await parent();

    const companyId = parseInt(params.id);

    const { data, error } = await fetchApi('/api/admin/companies/:companyId/', {
        method: 'GET',
        params: {
            companyId,
        },
    });

    handleApiRedirects(error);

    if (!data) {
        throw skError(404, 'Company not found');
    }

    return {
        company: data,
        title: `Company ${data.id}`,
    };
}) satisfies PageLoad;
