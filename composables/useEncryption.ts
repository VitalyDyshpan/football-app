import type { JWTPayload } from "jose";
import { jwtVerify, SignJWT } from "jose";

export const useEncryption = () => {
	const runtimeConfig = useRuntimeConfig();
	const secretKey: string | undefined = runtimeConfig.public.appSecretKey;
	const encodedKey: Uint8Array = new TextEncoder().encode(secretKey);

	async function encrypt<T>(payload: JWTPayload & T | undefined): Promise<string> {
		return new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.sign(encodedKey);
	}

	async function decrypt<T>(data: string | undefined): Promise<T & JWTPayload | undefined> {
		if (!data) return;
		try {
			const { payload } = await jwtVerify<T>(data, encodedKey, {
				algorithms: ["HS256"],
			});
			return payload;
		} catch (error) {
			console.log(error);
		}
	}
	return {
		encrypt,
		decrypt
	};
};