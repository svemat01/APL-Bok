import type { PageLoad } from './$types';

import { fetchApi } from '$lib';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';

export const load = (async () => {
    const { data, error } = await fetchApi('/api/admin/summary', {
        method: 'GET',
    });

    handleApiRedirects(error);

    return {
        summary: data,
    };
}) satisfies PageLoad;
