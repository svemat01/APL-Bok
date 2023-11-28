import { cleanEnv, port } from 'envalid';

export const env = cleanEnv(process.env, {
    PORT: port({default: 3000})
});