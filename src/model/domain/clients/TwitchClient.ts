import { Client } from "tmi.js";
import { logger } from "../../../logger";
import { config } from "../../../config";
import { loadTwitchCommands, loadTwitchEvents } from "../../../loader";
import { TwitchCommand } from "../commands/TwitchCommand";
import { Collection } from "discord.js";

export class TwitchClient extends Client {
    public commands: Collection<string, TwitchCommand>;
    constructor() {
        super({
            channels: Array.from(config.twitch.channels),
            identity: {
                username: config.twitch.username,
                password: config.twitch.password,
            },
            connection: {
                maxReconnectAttempts: 5,
                secure: true,
            },
            options: {
                clientId: config.twitch.clientId,
            },
        });
        loadTwitchEvents(this).then(() => logger.info("successfully loaded Twitch events"));
        this.commands = new Collection<string, TwitchCommand>();
        loadTwitchCommands(this.commands).then(() => logger.info("successfully loaded Twitch events"));
    }

    async startup() {
        logger.info("Signing into Twitch...");
        await this.connect();
    }

    // @ts-ignore
    override async say(channel: string, message: string) {
        logger.info(`${channel}: ${message}`);
    }
}
