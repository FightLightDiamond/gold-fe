import { io } from "socket.io-client";
const socket = io("http://localhost:3333", {
  reconnection: true,
  reconnectionDelay: 500,
});
// let connected = false;
// const RETRY_INTERVAL = 10000;

// socket.on("disconnect", function () {
//   connected = false;
//   console.log("disconnected");
//   retryConnectOnFailure(RETRY_INTERVAL);
// });
//
// socket.on("connect", function () {
//   connected = true;
//   console.log("connect");
// });
//
// const retryConnectOnFailure = (retryInMilliseconds: number) => {
//   setTimeout(function () {
//     if (!connected) {
//       // $.get("/ping", function (data) {
//       //   connected = true;
//       //   window.location.href = unescape(window.location.pathname);
//       // });
//       retryConnectOnFailure(retryInMilliseconds);
//     }
//   }, retryInMilliseconds);
// };
//
// retryConnectOnFailure(RETRY_INTERVAL);

// const token = ""

// const socket = io("http://localhost:3000", {
//   query: { token },
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         Authorization: `${token}`
//       }
//     }
//   }
// });

// const chatSocket = io("http://localhost:3001/chat", {
//   path: '/websockets',
//   query: { token },
//   // extraHeaders: {
//   //   Authorization: `${token}`
//   // },
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         Authorization: `${token}`
//       }
//     }
//   }
//   // transports: ['polling', 'websocket']
// });

export { socket };
