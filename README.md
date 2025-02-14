# crossws windows socket error repro

1. Clone the repository on a Windows machine.
1. Install dependencies by running `pnpm i`.
1. Start the server by running `pnpm start`.
1. Send a websocket upgrade request to the server (e.g., run `new WebSocket('http://localhost:8000');` in the browser console)
1. Observe that the server crashes from trying to read the socket.

This only happens if we return/throw a Response with a body in the `upgrade` hook.

Error log:
```sh
node:events:495
      throw er; // Unhandled 'error' event
      ^

Error: read ECONNRESET
    at TCP.onStreamRead (node:internal/stream_base_commons:217:20)
Emitted 'error' event on Socket instance at:
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -4077,
  code: 'ECONNRESET',
  syscall: 'read'
}

Node.js v18.20.5
 ELIFECYCLE  Command failed with exit code 1.
```