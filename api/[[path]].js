// api/[[path]].js - Vercel serverless function for TanStack Start SSR
// This provides a Vercel-compatible entry point

// Import the TanStack Start SSR server
import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    // Create a Request object from Vercel's req
    const request = new Request(`https://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined
    });

    // Call the TanStack Start SSR server
    const response = await server.fetch(request);

    // Convert response to Vercel format
    res.status(response.status);
    
    // Copy headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // Send body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).send('Internal Server Error');
  }
}