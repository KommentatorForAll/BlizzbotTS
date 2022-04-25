import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { SubMethod, SubUserstate } from "tmi.js";
import { getTier } from "../../../utils/twitchapi";
import { getTranslation } from "../../../utils/translations";

export async function handle(
    client: TwitchClient,
    channel: string,
    username: string,
    streakMonths: number,
    recipient: string,
    methods: SubMethod,
    userstate: SubUserstate,
) {
    const tier = getTier(userstate);
    // message for Action
    logger.info(`${username} gifted ${recipient} a subscription.`);
    const text = await getTranslation("subgift", channel, { username: username, recipient: recipient, tier: tier });
    await client.say(channel, `/me ${text}`);
}
