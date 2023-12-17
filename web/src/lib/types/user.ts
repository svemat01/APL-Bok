import type { App } from '@apl-bok/backend/src';

export type User = App['schema']['/api/admin/users/:userId/']['get']['response']['200'];

export type CurrentUser = App['schema']['/api/me']['get']['response']['200'];
