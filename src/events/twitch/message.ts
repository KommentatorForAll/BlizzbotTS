import { TwitchClient } from "../../model/domain/clients/TwitchClient";
import { ChatUserstate } from "tmi.js";
import { logger, twitchMessageLogger } from "../../logger";
import { userByTwitch } from "../../model/domain/User";
import { PermissionLevel } from "../../model/domain/PermissionLevel";
import { containsNotAllowedLink } from "../../utils/contentChecker";

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
    const user = await userByTwitch(context.username!, context);
    logger.debug(user.permission);
    if (user.permission < PermissionLevel.mod) {
        logger.debug("checking message for link");
        await checkMessage(client, channel.slice(1), context, content);
    }
}

async function checkMessage(client: TwitchClient, channel: string, context: ChatUserstate, content: string) {
    if (await containsNotAllowedLink(content, channel)) {
        logger.debug("message does contain not allowed link");
        await client.deletemessage(channel, context.id!);
    }
}
