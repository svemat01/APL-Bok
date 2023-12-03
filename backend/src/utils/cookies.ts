import { Static, t } from "elysia";

export const cookies = {};

export type Cookies = {
    [key in keyof typeof cookies]: Static<(typeof cookies)[key]>;
};

export const signedCookies = {
    profile: t.Object({
        id: t.Numeric(),
        name: t.String(),
        type: t.Union([t.Literal("student"), t.Literal("mentor")]),
    }),
};

export type SignedCookies = {
    [key in keyof typeof signedCookies]: Static<(typeof signedCookies)[key]>;
};

export const baseCookies = t.Cookie({
    ...cookies,
    ...signedCookies,
});
