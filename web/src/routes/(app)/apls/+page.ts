import type { PageLoad } from './$types';

import { fetchApi } from '$lib';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';

export type APL = {
    id: number;
    name: string;
    company: string;
    startDate: string;
    endDate: string;
    user: string;
};

export const load = (async () => {
    const { data, error } = await fetchApi('/api/admin/apls/', {
        method: 'GET',
    });

    handleApiRedirects(error);

    // sleep 1 second to show loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        apls: (data ?? []) satisfies APL[],
        title: 'APLs',
    };
}) satisfies PageLoad;
