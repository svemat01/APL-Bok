import { edenFetch } from '@elysiajs/eden';
import type { App } from '@apl-bok/backend/src';

// export const app = edenTreaty<App>("")
export const fetchApi = edenFetch<App>('http://jab-mbp:3000', {
    fetcher: (url, options) =>
        fetch(url, {
            credentials: 'include',
            ...options,
        }),
});
