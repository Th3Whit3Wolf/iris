import express, { Request, Response, NextFunction } from "express";
import { Query, Send, ParamsDictionary } from "express-serve-static-core";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import Logger from "./logger";
import knex from "./knex";
import { Websocket } from "./websocket";
import { apiRules, errorHandler, requestLogger } from "./middleware";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const healthCheck = (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ hello: "world" });

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export interface TypedRequest<Q extends Query, P extends ParamsDictionary, B>
  extends Express.Request {
  body?: B;
  query?: Q;
  params?: P;
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

/**
 * This is used for managing all of the user's sockets
 */

export interface Client extends Socket {
  team?: string;
}

class ClientManager {
  clients: Client[] = [];

  addClient(client: Socket) {
    this.clients.push(client);
  }
}

class SocketService {
  public clients: Map<string, Socket> = new Map();
}

const clientManager = new ClientManager();

export const initServer = async () => {
  const app = express();
  // log request
  app.use(requestLogger);

  // define API Rules
  app.use(apiRules);

  // Healthcheck
  app.get("/health-check", healthCheck);

  // load routes
  //app.use('/api/v1', Router);

  // handle errors
  app.use(errorHandler);

  app.get("/", (request: Request, response: Response) => {
    response.status(200).send("App root route running");
  });

  app.get("/authors", (request: Request, response: Response) => {
    knex("app_authors").then((data) => {
      if (data.length === 0) {
        response.status(404).send("No authors found");
      } else {
        response.status(200).send(data);
      }
    });
  });

  app.get(
    "/data/:table_name",
    async (
      request: TypedRequest<
        {
          id: string;
          server_id: string;
          team_id: string;
        },
        { table_name: string },
        undefined
      >,
      response: Response
    ) => {
      if (request?.params?.table_name) {
        const builder = knex(request.params.table_name);

        if (request?.query?.id) {
          builder.where("id", request.query.id);
        }
        if (request?.query?.server_id) {
          builder.where("server_id", request.query.server_id);
        }
        if (request?.query?.team_id) {
          builder.where("team_id", request.query.team_id);
        }
        try {
          const data = await builder;
          response.status(200).json({ data });
        } catch (error) {
          response.status(404).json({ error });
        }
      } else {
        response.status(400).json({ error: "No table name provided" });
      }
    }
  );

  app.post("/data/:table_name", (request: Request, response: Response) => {
    knex(request.params.table_name)
      .insert(request.body)
      .then(() => {
        response.status(201).send(`${request.params.table_name} created`);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  });

  app.patch(
    "/data/:table_name",
    async (
      request: TypedRequest<
        {
          id: string;
          server_id: string;
          team_id: string;
        },
        { table_name: string },
        undefined
      >,
      response: Response
    ) => {
      if (request?.query?.id && request?.params?.table_name) {
        console.log(request.body);
        try {
          const data = knex(request.params.table_name)
            .where("id", request.query.id)
            .update(request.body);
          response
            .status(202)
            .json({ ...data, status: `${request.params.table_name} updated` });
        } catch (error) {
          response.status(404).json({ error });
        }
      } else {
        response.status(400).send("No id specified");
      }
    }
  );

  app.delete(
    "/data/:table_name",
    async (
      request: TypedRequest<
        {
          id: string;
          server_id: string;
          team_id: string;
        },
        { table_name: string },
        undefined
      >,
      response: Response
    ) => {
      if (
        request?.params?.table_name &&
        ["signal", "save"].includes(request.params.table_name) &&
        request?.query?.id
      ) {
        try {
          const data = knex(request.params.table_name)
            .where("id", request?.query?.id)
            .del();
          response.status(204);
        } catch (error) {
          response.status(404).json({ error });
        }
      } else {
        response
          .status(400)
          .send("No id specified, or table name is not valid");
      }
    }
  );

  const httpServer = createServer(app);
  //const io = Websocket.getInstance(httpServer);
  const io = new Server();
  io.on("connection", (socket) => {
    clientManager.addClient(socket);
    console.log(`user ${socket.id} connected`);
    socket.on("disconnect", () => {
      console.log(`user ${socket.id} disconnected`);
    });

    socket.on("updateTeam", (update: any) => {
      const user = clientManager.clients.filter(
        (client) => client.id === socket.id
      );
      if (user.length > 0) {
        user[0].team = update.team;
        console.log(`user ${socket.id} updated team to ${update.team}`);
      } else {
        console.log(`user ${socket.id} not found`);
      }
    });

    socket.on("updateTx", (update) => {
      console.log(`sending updateTX and update Signals to clients`);
      clientManager.clients.forEach((client) => {
        client.emit("updateSignals", update);
        client.emit("updateTxClient", update);
        //anytime in transmitter apply is pressed update the signals
        //anytime in antenna baseball or hpa is turned on update the signals
      });
    });

    socket.on("updateRx", (update) => {
      console.log(`sending updateRX to clients`);
      clientManager.clients.forEach((client) => {
        client.emit("updateRxClient", update);
      });
    });

    socket.on("updateSpecA", (update) => {
      console.log(`sending updateSpecA to clients`);
      clientManager.clients.forEach((client) => {
        if (client.id !== socket.id) {
          client.emit("updateSpecA", update);
        }
      });
    });

    socket.on("updateAntenna", (update) => {
      console.log(`sending updateAntenna to clients`);
      clientManager.clients.forEach((client) => {
        client.emit("updateAntennaClient", update);
      });
    });
  });

  httpServer.listen(PORT, () =>
    Logger.info(`Server is running on port: ${PORT}`)
  );
};
