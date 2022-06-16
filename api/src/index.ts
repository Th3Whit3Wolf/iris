import { initServer } from "./server";
import Logger from "./logger";

(async () => {
  try {
    await initServer();
  } catch (error) {
    Logger.error(`error occurred while initializing service`, { error });
  }
})();
