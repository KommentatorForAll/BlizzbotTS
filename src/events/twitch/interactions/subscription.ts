import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { SubMethod, SubUserstate } from "tmi.js";
import { getTier } from "../../../utils/twitchapi";
import { getTranslation } from "../../../utils/translations";

export async function handle(
    client: TwitchClient,
    channel: string,
    username: string,
    method: SubMethod,
    message: string,
    userstate: SubUserstate,
) {
    const tier = getTier(userstate);

    // message for Action
    logger.info(`${username} subscription`);
    const text = await getTranslation("subscription", channel, { tier: tier, username: username });
    await client.say(channel, `/me ${text}`);
}
