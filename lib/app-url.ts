export const APP_BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://app.thinkingsoundlab.com"
		: "https://dev.app.thinkingsoundlab.com";

export const APP_AUTH_URL = `${APP_BASE_URL}/auth`;

export const APP_SIGN_IN_URL = APP_AUTH_URL;
export const APP_SIGN_UP_URL = APP_AUTH_URL;

export function getAppAuthUrl(prompt?: string) {
	const url = new URL("/auth", APP_BASE_URL);

	if (prompt?.trim()) {
		url.searchParams.set("prompt", prompt.trim());
	}

	return url.toString();
}
