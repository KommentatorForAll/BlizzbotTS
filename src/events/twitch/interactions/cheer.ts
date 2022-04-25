import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { Userstate } from "tmi.js";
import { logger } from "../../../logger";
import { getTranslation } from "../../../utils/translations";

export async function handle(client: TwitchClient, channel: string, userstate: Userstate) {
    // message for Action
    logger.info(`${userstate.username} cheered ${userstate.bits} bits`);
    logger.debug("hello world");
    const text = await getTranslation("cheer", channel, { username: userstate.username, amount: userstate.bits });
    await client.say(channel, `/me ${text}`);
}
