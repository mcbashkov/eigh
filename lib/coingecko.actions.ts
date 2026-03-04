"use server";

import qs from "query-string";

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const BASE_URL = process.env.COINGECKO_BASE_URL;
  const API_KEY = process.env.COINGECKO_API_KEY;

  if (!BASE_URL) throw new Error("Could not get base url");
  if (!API_KEY) throw new Error("Could not get api key");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
  const normalizedEndpoint = endpoint.replace(/^\/+|\/+$/g, "");

  const url = qs.stringifyUrl(
    {
      url: `${normalizedBaseUrl}/${normalizedEndpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "x-cg-pro-api-key": API_KEY,
        "Content-Type": "application/json",
      } as Record<string, string>,
      next: { revalidate },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out after 10 seconds");
    }
    throw error;
  }

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}
