import type { App } from '@apl-bok/backend/src';
import { edenFetch } from '@elysiajs/eden';

// export const app = edenTreaty<App>("")
export const fetchApi = edenFetch<App>('http://jab-mbp:3000', {
    fetcher: (url, options) =>
        fetch(url, {
            credentials: 'include',
            ...options,
        }),
});
