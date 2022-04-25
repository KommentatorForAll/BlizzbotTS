import { TwitchClient } from "../clients/TwitchClient";
import { ChatUserstate } from "tmi.js";
import { PermissionLevel } from "../PermissionLevel";
import { User } from "../User";

export abstract class TwitchCommand {
    protected constructor(public readonly name: string, public readonly minimumPermission: PermissionLevel) {}

    abstract execute(
        client: TwitchClient,
        channel: string,
        user: User,
        userstate: ChatUserstate,
        message: string,
        args: string[],
    ): Promise<void>;
}
