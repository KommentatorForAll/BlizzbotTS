import { Client } from "tmi.js";
import { logger } from "../../logger";

export class TwitchClient extends Client {
    constructor() {
        super({});
    }

    async startup() {
        logger.info("Logging into Twitch...");
        await this.connect();
    }
}
