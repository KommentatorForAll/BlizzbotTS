import { DiscordClient } from "./model/clients/DiscordClient";
import { TwitchClient } from "./model/clients/TwitchClient";

const discordClient = new DiscordClient();
const twitchClient = new TwitchClient();
await Promise.all([discordClient.startup(), twitchClient.startup()]);

export { discordClient, twitchClient };
