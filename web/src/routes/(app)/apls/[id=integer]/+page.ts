import { error as skError } from '@sveltejs/kit';
import { z } from 'zod';

import type { PageLoad } from './$types';

import { fetchApi } from '$lib';
import type { ApiResponse } from '$lib/types/index.js';
import { handleApiRedirects } from '$lib/utils/apiHelpers.js';

export const _permissionsSchema = z.object({
    permissions: z.record(z.boolean()),
});

export type Report = Omit<AplRepsonse['report'][number], 'date' | 'shiftStart' | 'shiftEnd'> & {
    date: Date;
    shiftStart: Date;
    shiftEnd: Date;
};

type AplRepsonse = ApiResponse<'/api/admin/apls/:aplId/', 'get', 200>;

export type Apl = Omit<AplRepsonse, 'report'> & {
    report: Report[];
};

export const load = (async ({ params }) => {
    const aplId = parseInt(params.id);

    const { data, error } = await fetchApi('/api/admin/apls/:aplId/', {
        method: 'GET',
        params: {
            aplId,
        },
    });

    handleApiRedirects(error);

    if (!data) {
        throw skError(404, 'APL not found');
    }

    return {
        apl: {
            ...data,
            report: data.report.map((report) => ({
                ...report,
                date: new Date(report.date),
                shiftStart: new Date(report.shiftStart),
                shiftEnd: new Date(report.shiftEnd),
            })),
        } satisfies Apl,
        title: `APL ${data.id}`,
    };
}) satisfies PageLoad;
