import { SignedCookies, signedCookies } from "$utils/cookies.ts";
import { db } from "$db/index.ts";
import { Handler, Static, t } from "elysia";
import { TObject } from "@sinclair/typebox";

export const isSignedIn = (
    type: NonNullable<SignedCookies["profile"]>["type"],
    profile: SignedCookies["profile"],
) => {
        
};
