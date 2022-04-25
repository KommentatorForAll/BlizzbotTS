import { DiscordClient } from "./model/domain/clients/DiscordClient";
import { TwitchClient } from "./model/domain/clients/TwitchClient";
import { DB } from "./db";
import { logger } from "./logger";
import * as repl from "repl";
import { config } from "./config";

async function shutdown(info: number | unknown | Error) {
    logger.error("Shutting down unexpectedly...");
    logger.error(`Shutting down with info: ${info instanceof Error ? info.message : info}`);
    if (info instanceof Error) {
        logger.debug(info.stack);
    }
    discordClient.destroy();
    await twitchClient.disconnect();
    //ctx.db.shutdown()
}
const discordClient = new DiscordClient();
const twitchClient = new TwitchClient();
const db = new DB();
await Promise.all([discordClient.startup(), twitchClient.startup(), db.startup()]);

process.on("unhandledRejection", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("uncaughtException", shutdown);

const shell = repl.start("> ");
shell.context.db = db;
shell.context.discordClient = discordClient;
shell.context.twitchClient = twitchClient;
shell.context.config = config;
shell.context.logger = logger;

export { discordClient, twitchClient, db };
