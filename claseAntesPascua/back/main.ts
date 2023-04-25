import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  console.info("endpoint: ", url.pathname);
  console.info("method: ", req.method);

  switch (req.method) {
    case "GET": {
      // check if header has token
      switch (url.pathname) {
        case "/test": {
          // return lastJson var in JSON  format
          return new Response(JSON.stringify({test: "test"}), {
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        }
        default:
          // not allowed
          return new Response("Invalid route", { status: 404 });
      }
    }
    default:
      return new Response("Invalid method", { status: 405 });
  }
}

// serve on port 8080
serve(handler, { port: 8080 });