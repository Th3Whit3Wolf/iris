import { Server, Socket } from "socket.io";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"],
};

class Websocket extends Server {
  private static io: Websocket;

  constructor(httpServer: any) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer: any | undefined): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer);
    }

    return Websocket.io;
  }
}

interface SocketInterface {
  handleConnection(socket: Socket): void;
  middlewareImplementation?(socket: Socket, next: any): void;
}

// class UpdateSocket implements SocketInterface {
//   handleConnection(socket: Socket) {
//     console.log("=====   CONNECTED A CLIENT   =====");
//     console.log(`===== SOCKET ID ${socket.id} =====`);
//   }

//   middlewareImplementation(socket: Socket, next: any) {
//     //Implement your middleware for orders here
//     return next();
//   }
// }

export { type SocketInterface, Websocket };
