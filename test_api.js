const BASE_URL = process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3";
const API_KEY = process.env.COINGECKO_API_KEY;

if (!API_KEY) {
  throw new Error("COINGECKO_API_KEY environment variable is missing. The test cannot proceed without a valid API key.");
}

async function test() {
  const endpoint = "coins/bitcoin";
  const url = `${BASE_URL}/${endpoint}`;
  console.log("Testing URL:", url);
  const response = await fetch(url, {
    headers: {
      "x-cg-pro-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });
  console.log("Status:", response.status);
  const body = await response.json();
  if (!response.ok) {
    console.log("Response Body:", JSON.stringify(body, null, 2));
  } else {
    console.log("Success! Received data for:", body.name);
  }
}
test().catch(console.error);
