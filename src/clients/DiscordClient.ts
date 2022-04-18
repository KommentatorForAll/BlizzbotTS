import {Client} from "discord.js";
import {config} from "../config";
import {logger} from "../logger";

export class DiscordClient extends Client {
	constructor() {
		super({
			intents: []
		});
	}

	async startup(): Promise<void> {
		if (config.discord) {
			logger.info("Logging in Discord...")
			await this.login(config.discord.token);
		} else {
			logger.info("Skipping Discord login, Discord module is disabled in config")
		}
	}
}