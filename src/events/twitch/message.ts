import { TwitchClient } from "../../model/domain/clients/TwitchClient";
import { ChatUserstate, SubMethod } from "tmi.js";
import { logger, twitchMessageLogger } from "../../logger";
import { userByTwitch } from "../../model/domain/User";
import { PermissionLevel } from "../../model/domain/PermissionLevel";
import { containsBadWords, containsNotAllowedLink, hasUnallowedAction } from "../../utils/contentChecker";

export async function handle(
    client: TwitchClient,
    channel: string,
    context: ChatUserstate,
    content: string,
    self: boolean,
) {
    if (channel.startsWith("#")) {
        twitchMessageLogger.log(
            `[${new Date().toLocaleTimeString()}]${context["display-name"]}: ${content}`,
            channel.slice(1),
        );
    }
    if (self) return;
    const user = await userByTwitch(context.username!, context);
    if (user.permission < PermissionLevel.mod) {
        await checkMessage(client, channel.slice(1), context, content);
    } else {
        if (content === "emit cheer") {
            logger.debug("sb emitted cheer");
            client.emit("cheer", "commentatorforall", { bits: "100" }, "");
        } else if (content === "emit sub") {
            logger.debug(client.listenerCount("subscription"));
            // @ts-ignore
            client.emit("subscription", "commentatorforall", "hello world", "Prime" as SubMethod, "heyy", {
                "msg-param-sub-plan": "1000",
            });
        }
    }
}

async function checkMessage(client: TwitchClient, channel: string, context: ChatUserstate, content: string) {
    if (await containsNotAllowedLink(content, channel)) {
        logger.debug("message does contain not allowed link");
        return client.deletemessage(channel, context.id!);
    }
    if (await hasUnallowedAction(context, channel)) {
        logger.debug("message does contain not allowed action");
        return client.deletemessage(channel, context.id!);
    }
    if (await containsBadWords(content, channel)) {
        logger.debug("message does contain a bad word");
        return client.deletemessage(channel, context.id!);
    }
}
