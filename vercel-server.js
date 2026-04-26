// vercel-server.js - Vercel-specific server entry point for TanStack Start SSR
// This file provides the exact entry point that Vercel expects

// Import the TanStack Start SSR server
import server from './dist/server/server.js';

// Export the handler that Vercel expects
export default async function handler(request, response) {
  try {
    // Convert Vercel's request to TanStack Start SSR format
    const result = await server.fetch(request);
    
    // Convert TanStack Start SSR response to Vercel format
    response.status(result.status);
    
    // Copy headers
    for (const [key, value] of result.headers.entries()) {
      response.setHeader(key, value);
    }
    
    // Send body
    const body = await result.text();
    response.send(body);
  } catch (error) {
    console.error('Vercel server error:', error);
    response.status(500).send('Internal Server Error');
  }
}