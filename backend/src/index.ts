import { ApiRoutes } from "./api/index.ts";
import { db, userTable } from "./db/index.ts";
import Elysia from "elysia";
import { elysiaBase } from "./setup.ts";
import { ENV } from "./utils/environment.ts";
import swagger from "@elysiajs/swagger";
import { signedCookies } from "./utils/cookies.ts";
import { ip } from "./utils/ipPlugin.ts";
import { canGrantPermissions } from "./utils/authHelpers.ts";
import { HttpError } from './utils/errors.ts';
import { cors } from '@elysiajs/cors'
import { randomInt } from "crypto";
import { isSetup } from './utils/dbHelpers.ts';

// Generate random password
export const setupPassword = generateSetupPassword();

function generateSetupPassword(): string {
    const words = ["happy", "sunny", "brave", "clever", "kind", "cat", "dog", "bird", "tree", "flower"];
    const randomWords = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = randomInt(words.length);
        randomWords.push(words[randomIndex]);
    }
    const randomNumber = randomInt(1000, 9999);
    return `${randomWords.join("-")}-${randomNumber}`;
}

const app = new Elysia({
    cookie: {
        sign: Object.keys(signedCookies),
        secrets: ENV.COOKIE_SECRET,
    },
})
    .use(cors({
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }))
    .use(ip())
    .use(elysiaBase)
    .error('HttpError', HttpError)
    .onError(({ code, error, set }) => {
        switch (code) {
            case 'HttpError': {
                set.status = error.status;
                return {
                    message: error.message,
                };
            }
        }

        return error;
    })
    .use(
        swagger({
            documentation: {
                info: {
                    title: "APL Bok API Documentation",
                    description: "API Documentation for APL Bok",
                    version: "0.0.1",
                },
                // tags: [
                //     {
                //         name: 'User',
                //         description: 'User endpoints',
                //     },
                //     {
                //         name: 'Mentor',
                //         description: 'Mentor Endpoints',
                //     },
                // ]
            },
        })
    )
    .use(ApiRoutes)
    .listen(ENV.PORT);

export type App = typeof app;

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    // db
);

if (!(await isSetup())) {
    // await db
    //     .insert(userTable)
    //     .values({
    //         username: "jakob",
    //         passwordHash: await Bun.password.hash("1234"),
    //         firstName: "Jakob",
    //         lastName: "G2",
    //         permissions: "0",
    //     })
    //     .execute();

    console.log(
        "APL Bok is not setup. Please go to the setup page to set up the application."
    );
    console.log(`🚧 Setup password: ${setupPassword}`);
}

db.select().from(userTable).execute().then(console.log);

console.log("🚀 APL Bok is running!");
