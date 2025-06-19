// netlify/functions/getBrewResponse.js
export async function handler(event, context) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const body = JSON.parse(event.body);
  const prompt = body.prompt;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
