import type { PageLoad } from './$types';

import { fetchApi } from '$lib';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';

export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
};

export const load = (async () => {
    const { data, error } = await fetchApi('/api/admin/users/', {
        method: 'GET',
    });

    handleApiRedirects(error);

    return {
        users: data satisfies User[] | null,
        title: 'Users',
    };
}) satisfies PageLoad;
