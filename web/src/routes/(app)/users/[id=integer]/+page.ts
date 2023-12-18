import { fetchApi } from '$lib';
import { error as skError } from '@sveltejs/kit';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';
import type { PageLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { PERMISSION, PERMISSIONS } from '@apl-bok/backend/src/utils/authHelpers.js';
import { hasPermission } from 'permissio';

export const _permissionsSchema = z.object({
    permissions: z.record(z.boolean()),
});

export const load = (async ({ params, parent }) => {
    const { currentUser } = await parent();

    const userId = parseInt(params.id);

    const { data, error } = await fetchApi('/api/admin/users/:userId/', {
        method: 'GET',
        params: {
            userId,
        },
    });

    handleApiRedirects(error);

    if (!data) {
        throw skError(404, 'User not found');
    }

    const permissionRaw = BigInt(data.permissions);

    const permissions = Object.fromEntries(
        PERMISSIONS.map((perm) => [perm, hasPermission(permissionRaw, PERMISSION[perm])]),
    );

    // const permissionsForm = superValidate(
    //     {
    //         permissions,
    //     },
    //     _permissionsSchema,
    // );

    return {
        user: data,
        permissions,
        title: `User ${data.id}`,
    };
}) satisfies PageLoad;
