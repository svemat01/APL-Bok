import type { App } from '@apl-bok/backend/src';
import { edenFetch } from '@elysiajs/eden';

// export const app = edenTreaty<App>("")
export const fetchApi = edenFetch<App>(import.meta.env.VITE_API_URL, {
    fetcher: (url, options) =>
        fetch(url, {
            credentials: 'include',
            ...options,
        }),
});
