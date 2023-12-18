import { fetchApi } from '$lib';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';
import type { PageLoad } from './$types';

export type Company = {
    id: number;
    name: string;
    location: string;
};

export const load = (async () => {
    const { data, error } = await fetchApi('/api/admin/companies/', {
        method: 'GET',
    });

    handleApiRedirects(error);

    return {
        companies: data satisfies Company[] | null,
        title: 'Companies',
    };
}) satisfies PageLoad;