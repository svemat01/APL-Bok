import { cleanEnv, port, str } from 'envalid';

export const ENV = cleanEnv(process.env, {
    PORT: port({default: 3000}),
    COOKIE_SECRET: str({default: 'SampleSecret'}),
});