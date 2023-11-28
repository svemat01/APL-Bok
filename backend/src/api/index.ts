import Elysia from "elysia";

export const ApiRoutes = new Elysia({prefix: '/api'}).get("/", () => {
    return "Hello World!";
})
