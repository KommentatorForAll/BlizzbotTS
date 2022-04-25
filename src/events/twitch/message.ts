import { TwitchClient } from "../../model/domain/clients/TwitchClient";
import { ChatUserstate } from "tmi.js";
import { logger, twitchMessageLogger } from "../../logger";
import { User, userByTwitch } from "../../model/domain/User";
import { PermissionLevel } from "../../model/domain/PermissionLevel";
import { containsBadWords, containsNotAllowedLink, hasUnallowedAction } from "../../utils/contentChecker";
import { config } from "../../config";

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
    }
    await handleCommands(client, channel, user, context, content);
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

async function handleCommands(client: TwitchClient, channel: string, user: User, context: ChatUserstate, content: string) {
    if (!content.startsWith(config.prefix)) return;

    let args = content.split(" ");
    const commandName = args.shift()
    if (!commandName) return;

    const command = client.commands.get(commandName.replace(config.prefix, ""));
    if (!command) return;
    if (user.permission < command.minimumPermission) return;

    await command.execute(client, channel, user, context, content, args);
}
