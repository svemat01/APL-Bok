import { t } from 'elysia';
import { hasPermission } from 'permissio';
import { HttpError } from './errors.ts';

export enum PERMISSION {
    ADMIN,
    VIEW_USERS,
    MANAGE_USERS,
    VIEW_REPORTS,
    MANAGE_REPORTS,
    VIEW_MENTORS,
    MANAGE_MENTORS,
    VIEW_COMPANIES,
    MANAGE_COMPANIES,
    MANAGE_APLS
}

export const PERMISSIONS = Object.values(PERMISSION).filter((v) => typeof v === 'string') as (keyof typeof PERMISSION)[];

// export const PERMISSIONS = ([
//     "ADMIN",
//     "VIEW_USERS",
//     "MANAGE_USERS",
//     "VIEW_REPORTS",
//     "MANAGE_REPORTS",
//     "VIEW_MENTORS",
//     "MANAGE_MENTORS",
//     "VIEW_COMPANIES",
//     "MANAGE_COMPANIES",
// ] as const) satisfies (keyof typeof PERMISSION)[];

// export const PERMISSIONS = [
//     'ADMIN',
//     'VIEW_USERS',
//     'MANAGE_USERS',
//     'VIEW_REPORTS',
//     'MANAGE_REPORTS',
//     'VIEW_MENTORS',
//     'MANAGE_MENTORS',
//     'VIEW_COMPANIES',
//     'MANAGE_COMPANIES',
// ] as const;

// export const PERMISSION = {
//     ADMIN: 0,
//     VIEW_USERS: 1,
//     MANAGE_USERS: 2,
//     VIEW_REPORTS: 3,
//     MANAGE_REPORTS: 4,
//     VIEW_MENTORS: 5,
//     MANAGE_MENTORS: 6,
//     VIEW_COMPANIES: 7,
//     MANAGE_COMPANIES: 8,
// } as const satisfies Record<(typeof PERMISSIONS)[number], number>;

// list all permisions from a bitfield of permissions (bigint)
export const listPermissions = (permissions: bigint | null) => {
    const perms: PERMISSION[] = [];

    if (permissions === null) {
        return perms;
    }

    for (let i = 0; i < 64; i++) {
        if (hasPermission(permissions, i)) {
            perms.push(i);
        }
    }

    return perms;
};

// I need a checker function for creating new users or modifying existing users. The new user should not be able to have more permissions than the current user. unless the current user is an admin. The permission system is a bigint bit field of the PERMISSIONS enum so a simple smaller than operation is not enough.
export const canGrantPermissions = (
    currentPermissions: bigint | null,
    newPermissions: bigint,
) => {
    if (currentPermissions === null) {
        return false;
    }

    if (hasPermission(currentPermissions, PERMISSION.ADMIN)) {
        return true;
    }

    return (currentPermissions & newPermissions) === newPermissions;
};

export const requirePermissions = (
    permissions: bigint,
    ...required: (PERMISSION | PERMISSION[])[]
) => {
    if (hasPermission(permissions, PERMISSION.ADMIN)) {
        return;
    }

    for (const permission of required) {
        if (Array.isArray(permission)) {
            let hasAnyPermission = false;
            for (const p of permission) {
                if (hasPermission(permissions, p)) {
                    hasAnyPermission = true;
                    break;
                }
            }
            if (!hasAnyPermission) {
                throw new HttpError(
                    403,
                    'Missing permission: ' +
                        permission.map((p) => PERMISSION[p]).join(' or '),
                );
            }
        } else {
            if (!hasPermission(permissions, permission)) {
                throw new HttpError(
                    403,
                    'Missing permission: ' + PERMISSION[permission],
                );
            }
        }
    }
};

export const userAuthResponse = {
    401: t.Object(
        {
            message: t.Literal('Not signed in'),
        },
        {
            description: 'Not signed in',
        },
    ),
    403: t.Object(
        {
            message: t.String(),
        },
        {
            description: 'Missing permission',
        },
    ),
};
