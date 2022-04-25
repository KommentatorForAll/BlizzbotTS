import { Client } from "tmi.js";
import { logger } from "../../../logger";
import { config } from "../../../config";
import { loadTwitchEvents } from "../../../loader";

export class TwitchClient extends Client {
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
