import { serve } from "std/http/server.ts";

// const responseFilename = "peutit.json"
// const data = "Hello world\n"
// await Deno.writeTextFile(responseFilename, data)

// Routes
const username_route = new URLPattern({ pathname: "/username/:name" });

// A simple http server
const handler = (request: Request): Response => {
  const match = username_route.exec(request.url);

  if (match) {
    const name = match.pathname.groups.name;
    return new Response(`Username ${name}`);
  }

  return new Response("Not found (try /username/yourusername)");

  // const response = await fetch("https://api.github.com/users/PeuTit", {
  //   headers: {
  //     accept: "application/json",
  //   },
  // });
  //
  // return new Response(response.body, {
  //   status: response.status,
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
};

serve(handler);
