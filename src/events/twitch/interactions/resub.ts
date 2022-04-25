import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { SubUserstate } from "tmi.js";
import { getTranslation } from "../../../utils/translations";
import { getTier } from "../../../utils/twitchapi";

export async function handle(
    client: TwitchClient,
    channel: string,
    username: string,
    months: number,
    message: string,
    userstate: SubUserstate,
) {
    const cumulativeMonths = userstate["msg-param-cumulative-months"];
    const hasMessage = message != null;
    const subscriptionTier = getTier(userstate);

    // message for Action
    logger.info(`${username} resub ${cumulativeMonths}. month`);

    const text = await getTranslation("resub", channel, {
        username: username,
        tier: subscriptionTier,
        amount: String(cumulativeMonths),
        message: hasMessage ? message : "",
    });
    await client.say(channel, `/me ${text}`);
}
