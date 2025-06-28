import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    // Proxy /auth/* requests to http://eldo:9000
    "/auth/*": async req => {
      const url = new URL(req.url);
      url.host = "eldo:9000";
      url.protocol = "http:";
      url.port = "9000";
      url.hostname = "eldo";
      return fetch(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
        redirect: "manual",
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
