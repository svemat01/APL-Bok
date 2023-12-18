import { z } from 'zod';

import { goto } from '$app/navigation';

const setupRequiredResponse = z.object({
    status: z.literal(412),
    value: z.object({
        message: z.literal('Setup not complete'),
    }),
});

const unauthorizedResponse = z.object({
    status: z.literal(401),
    value: z.object({
        message: z.literal('Not signed in'),
    }),
});

export function handleApiRedirects<
    FetchError extends {
        status: number;
        value: unknown;
    },
>(error: FetchError | null) {
    if (!error) return;

    if (setupRequiredResponse.safeParse(error)?.success) {
        void goto('/setup');
    } else if (unauthorizedResponse.safeParse(error)?.success) {
        void goto('/login');
    } else if (error.status === 403) {
        void goto('/');
    }
}

export function assertApiResponse<
    FetchError extends {
        status: number;
        value: unknown;
    },
>(error: FetchError | null): asserts error is null {
    if (!error) return;

    handleApiRedirects(error);

    throw error;
}
