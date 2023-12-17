import { fetchApi } from '$lib';
import { handleApiRedirects } from '$lib/util/apiHelpers.js';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const userId = parseInt(params.id);

    const { data, error } = await fetchApi('/api/admin/users/:userId/', {
        method: 'GET',
        params: {
            userId,
        },
    });

    handleApiRedirects(error);

    return {
        user: data,
        title: data ? `User ${data.id}` : 'User not found',
    };
}) satisfies PageLoad;
