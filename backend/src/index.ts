import { Elysia } from "elysia";
import { env } from "./utils/environment.ts";
import swagger from "@elysiajs/swagger";
import { ApiRoutes } from './api/index.ts';
import { db } from './db/index.ts';

const app = new Elysia().use(swagger()).use(ApiRoutes).listen(env.PORT);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
    db
);
