import { ResolverSetter } from 'cache-fns';
import NodeCache from 'node-cache';

export const cache = new NodeCache({
    stdTTL: 5,
});

export const useLocalCache: <K>() => ResolverSetter<K> = () => ({
    async get(key) {
        const data = cache.get(key);

        if (!data) return;

        return JSON.parse(data as string);
    },
    set(key, value) {
        cache.set(key, JSON.stringify(value));
    },
});
