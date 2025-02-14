import crossws from "crossws/adapters/node";
import http from "node:http";

const ws = crossws({
  hooks: {
    upgrade: () => {
      return new Response("Bad Request", { status: 400 });
    },
  },
});

const server = http.createServer();

server.on("upgrade", (req, socket, head) => {
  ws.handleUpgrade(req, socket, head);
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
