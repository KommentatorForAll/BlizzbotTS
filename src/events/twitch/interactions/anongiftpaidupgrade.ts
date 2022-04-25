import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { getTranslation } from "../../../utils/translations";

export async function handle(client: TwitchClient, channel: string, username: string) {
    // message for Action
    logger.info(`${username} extended subscription`);
    const text = await getTranslation("anongiftpaidupgrade", channel, { username: username });
    await client.say(channel, `/me ${text}`);
}
