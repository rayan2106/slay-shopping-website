import {jwtVerify} from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifytoken(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        console.log("jwt-error:", err.message)
        return null;
    }
}