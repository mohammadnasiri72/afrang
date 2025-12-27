## Gemini API Key

- **Add key:** Copy `.env.local.example` to `.env.local` and set `GEMINI_API_KEY` to your Gemini (Google) API key.
- **Keep secret:** Do not commit `.env.local` to your repository. Add it to `.gitignore` if it's not already ignored.
- **Server-side only:** Use the key only from server-side code (API routes, server components). Do not expose the key in client bundles.

Example `.env.local` (project root):

```
GEMINI_API_KEY=sk-xxxx...
GEMINI_MODEL=gemini-1.0
```

Quick usage (server-side Node / Next.js API route):

```js
// pages/api/gemini.js or app/api/gemini/route.js (server)
export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });

  const response = await fetch('https://api.example.com/gemini/v1', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: process.env.GEMINI_MODEL || 'gemini-1.0', /* ... */ }),
  });

  const data = await response.json();
  return res.status(200).json(data);
}
```

Replace the API endpoint above with the official Gemini endpoint you are using.
