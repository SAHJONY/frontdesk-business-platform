// server.js - Vercel-compatible server entry point
// This file provides the exact server that Vercel expects

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Import the TanStack Start SSR server
import serverModule from './dist/server/server.js';

const server = serverModule.default || serverModule;

// Create HTTP server
const httpServer = createServer(async (req, res) => {
  try {
    // Convert Node.js request to Fetch API Request
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else if (value) {
        headers.set(key, value);
      }
    }

    const request = new Request(`https://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined
    });

    // Call the TanStack Start SSR server
    const response = await server.fetch(request);

    // Convert Fetch Response to Node.js response
    res.statusCode = response.status;
    
    // Copy headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // Send body
    const body = await response.text();
    res.end(body);
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

// Start server on Vercel's provided port or default
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`🚀 Hermes Workspace server running on port ${port}`);
});