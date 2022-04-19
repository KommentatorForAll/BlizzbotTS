import { Client } from "discord.js";
import { config } from "../../config";
import { logger } from "../../logger";
import { loadDiscordCommands, loadDiscordEvents } from "../../loader";
import { Command } from "../Command";

export class DiscordClient extends Client {
    public commands: Command[];

    constructor() {
        super({
            intents: [],
        });
        loadDiscordEvents(this).then(() => logger.info("Successfully loaded Discord events"));
        this.commands = [];
        loadDiscordCommands(this).then((result) => {
            this.commands.push(...result);
            logger.info("Successfully loaded Discord commands");
        });
    }

    async startup(): Promise<void> {
        if (config.discord) {
            logger.info("Signing into Discord...");
            await this.login(config.discord.token);
        } else {
            logger.info("Skipping Discord login, Discord module is disabled in config");
        }
    }
}
