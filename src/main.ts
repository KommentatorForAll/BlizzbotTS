import { DiscordClient } from "./model/domain/clients/DiscordClient";
import { TwitchClient } from "./model/domain/clients/TwitchClient";
import { DB } from "./db";

const discordClient = new DiscordClient();
const twitchClient = new TwitchClient();
const db = new DB();
await Promise.all([discordClient.startup(), twitchClient.startup(), db.startup()]);

export { discordClient, twitchClient, db };
