const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-c4e9K5SZmKZX7bv6MJLQjXdU";
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
  if (response.status !== 200) {
    console.log("Response Body:", JSON.stringify(body, null, 2));
  } else {
    console.log("Success! Received data for:", body.name);
  }
}
test().catch(console.error);
