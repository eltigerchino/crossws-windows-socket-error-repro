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

server.on('upgrade', async (req, socket, head) => {
  await ws.handleUpgrade(req, socket, head);
  // socket.destroy(); // without this line, the server will crash on Windows
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
