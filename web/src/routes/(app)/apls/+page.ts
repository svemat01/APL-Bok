import { fetchApi } from '$lib';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';
import type { PageLoad } from './$types';

export type APL = {
    id: number;
    name: string;
    company: string;
    startDate: number;
    endDate: number;
    user: string;
};

export const load = (async () => {
    const { data, error } = await fetchApi('/api/admin/apls/', {
        method: 'GET',
    });

    handleApiRedirects(error);

    return {
        users: data satisfies APL[] | null,
        title: 'APLs',
    };
}) satisfies PageLoad;
