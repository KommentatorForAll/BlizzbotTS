import { Client } from "tmi.js";
import { logger } from "../../logger";

export class TwitchClient extends Client {
    constructor() {
        super({});
    }

    async startup() {
        logger.info("Signing into Twitch...");
        await this.connect();
    }
}
