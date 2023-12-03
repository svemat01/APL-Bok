import { signedCookies } from "$utils/cookies.ts";
import { ENV } from '$utils/environment.ts';
import swagger from "@elysiajs/swagger";
import Elysia, { t } from "elysia";

export const elysiaBase = new Elysia({
    cookie: {
        sign: Object.keys(signedCookies),
        secrets: ENV.COOKIE_SECRET,
    },
});
