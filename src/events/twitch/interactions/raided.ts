import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { ChannelConfiguration } from "../../../model/db/ChannelConfiguration";
import { disableFollowerChat } from "../../../utils/twitchapi";
import { getTranslation } from "../../../utils/translations";

export async function handle(client: TwitchClient, channel: string, username: string, viewers: number) {
    // message for Action
    logger.info(`${username} raid ${viewers} viewer!`);
    const config = (await ChannelConfiguration.findOne({ where: { channel: channel.replace("#", "") } }))!;
    if (viewers < config.showRaidsWithAtLeast) return;

    const text = await getTranslation("raided", channel, { username: username, amount: String(viewers) });
    await client.say(channel, `/me ${text}`);
    if (viewers >= config.disableFollowerChatForRaidsWithAtLeast)
        await disableFollowerChat(channel, config.disableFollowerChatForNMinutes);
}
