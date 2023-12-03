import { ApiRoutes } from "$api/index.ts";
import { db } from "$db/index.ts";
import Elysia from "elysia";
import { elysiaBase } from "./setup.ts";
import { ENV } from "$utils/environment.ts";
import swagger from '@elysiajs/swagger';

const app = new Elysia().use(swagger({
    documentation: {
        info: {
            title: 'APL Bok API Documentation',
            description: 'API Documentation for APL Bok',
            version: '0.0.1',
        },
        // tags: [
        //     {
        //         name: 'Student',
        //         description: 'Student endpoints',
        //     },
        //     {
        //         name: 'Mentor',
        //         description: 'Mentor Endpoints',
        //     },
        // ]
    }
})).use(elysiaBase).use(ApiRoutes).listen(ENV.PORT);

type App = typeof app;


console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
    // db
);
