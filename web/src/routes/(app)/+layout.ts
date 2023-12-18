import type { LayoutLoad } from './$types';

import { fetchApi } from '$lib';
import { assertApiResponse } from '$lib/utils/apiHelpers.js';

export const load = (async () => {
    const { data, error } = await fetchApi('/api/me', {
        method: 'GET',
    });

    assertApiResponse(error);

    return {
        currentUser: data,
    };
}) satisfies LayoutLoad;
