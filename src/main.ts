import {DiscordClient} from "./clients/DiscordClient";
import {TwitchClient} from "./clients/TwitchClient";

const discordClient = new DiscordClient();
const twitchClient = new TwitchClient();
await Promise.all(
	[
		discordClient.startup(),
		twitchClient.startup(),
	]
);

export { discordClient, twitchClient}