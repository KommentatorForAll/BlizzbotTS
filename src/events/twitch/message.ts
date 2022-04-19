import { TwitchClient } from "../../model/domain/clients/TwitchClient";
import { ChatUserstate } from "tmi.js";
import { logger, twitchMessageLogger } from "../../logger";

export async function handle(
    client: TwitchClient,
    channel: string,
    context: ChatUserstate,
    content: string,
    self: boolean,
) {
    logger.debug(channel);
    if (channel.startsWith("#")) {
        twitchMessageLogger.log(
            `[${new Date().toLocaleTimeString()}]${context["display-name"]}: ${content}`,
            channel.slice(1),
        );
    }
    if (self) return;
}
