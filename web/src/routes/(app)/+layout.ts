import { fetchApi } from '$lib';
import { assertApiResponse } from '$lib/util/apiHelpers.js';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    const { data, error } = await fetchApi('/api/me', {
        method: 'GET',
    });

    assertApiResponse(error);

    return {
        currentUser: data,
    };
}) satisfies LayoutLoad;
