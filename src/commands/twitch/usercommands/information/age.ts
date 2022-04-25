import { TwitchCommand } from "../../../../model/domain/commands/TwitchCommand";
import { TwitchClient } from "../../../../model/domain/clients/TwitchClient";
import { ChatUserstate } from "tmi.js";
import { getAccountAge } from "../../../../utils/decapi";
import { durationToLocaleString } from "../../../../utils/time";
import { getTranslation } from "../../../../utils/translations";
import { PermissionLevel } from "../../../../model/domain/PermissionLevel";
import { User } from "../../../../model/domain/User";

class AgeCommand extends TwitchCommand {
    constructor() {
        super("age", PermissionLevel.user);
    }

    async execute(
        client: TwitchClient,
        channel: string,
        user: User,
        userstate: ChatUserstate,
        message: string,
        args: string[],
    ): Promise<void> {
        const author = userstate.username!;
        const mentionedUser = args? args[0]: null;
        const target = mentionedUser || author;
        const username = target.replace("@", "");
        const age = await getAccountAge(username);
        const ageString = await durationToLocaleString(age, channel);
        const accountAgeString = await getTranslation("userage", channel, {username: username, duration: ageString });
        await client.say(channel, `/me ${accountAgeString}`);
    }
}

export default new AgeCommand();
