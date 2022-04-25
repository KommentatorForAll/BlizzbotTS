import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { getTranslation } from "../../../utils/translations";

export async function handle(
    client: TwitchClient,
    channel: string,
    username: string,
    viewers: number,
    autohost: boolean,
) {
    // message for Action
    const text = await getTranslation("hosted", channel, { username: username, amount: String(viewers) });
    await client.say(channel, `/me ${text}`);
    logger.info(`${username} ${autohost ? "auto" : ""}hosted ${viewers} viewer!`);
}
