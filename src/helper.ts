const AUTH_TOKEN = process.env.AUTH_TOKEN || "";
const COOKIE_NAME = process.env.COOKIE_NAME || "";

export async function makeApiRequest<TReq = unknown, TRes = unknown>(
  url: string,
  method: string = "GET",
  data?: TReq,
  customHeaders: Record<string, string> = {},
): Promise<TRes | null> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: `${COOKIE_NAME}=${AUTH_TOKEN}`,
      ...customHeaders,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.status === 204 || response.status === 205) {
      return null;
    }

    const text = await response.text();
    return text ? (JSON.parse(text) as TRes) : null;
  } catch (error) {
    console.error("Error making API request:", error);
    return null;
  }
}
