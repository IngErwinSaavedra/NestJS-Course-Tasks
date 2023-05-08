import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        secretKey: process.env.SECRET_KEY,
    };
});