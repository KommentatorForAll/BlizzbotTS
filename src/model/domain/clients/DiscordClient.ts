import { Client, Collection } from "discord.js";
import { config } from "../../../config";
import { logger } from "../../../logger";
import { loadDiscordButtons, loadDiscordCommands, loadDiscordEvents } from "../../../loader";
import { Command } from "../Command";
import { Button } from "../Button";

export class DiscordClient extends Client {
    public commands: Collection<string, Command>;
    public buttons: Collection<string, Button>;

    constructor() {
        super({
            intents: [],
        });
        loadDiscordEvents(this).then(() => logger.info("Successfully loaded Discord events"));
        this.commands = new Collection<string, Command>();
        loadDiscordCommands(this.commands).then(() => {
            logger.info("Successfully loaded Discord commands");
        });

        this.buttons = new Collection<string, Button>();
        loadDiscordButtons(this.buttons).then(() => {
            logger.info("Successfully loaded Discord buttons");
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
