import { PermissionLevel } from "./PermissionLevel";
import { discordPermissionsFor, twitchPermissionsFor } from "../../utils/permissions";
import { DiscordTwitchUserLink } from "../db/DiscordTwitchUserLink";
import { ChatUserstate } from "tmi.js";

export interface User {
    readonly permission: PermissionLevel;
    readonly twitchName?: string;
    readonly discordName?: string;
}

class _User implements User {
    constructor(
        public readonly permission: PermissionLevel,
        public readonly twitchName?: string,
        public readonly discordName?: string,
    ) {}
}

export async function userByDiscord(id: string): Promise<User> {
    const permission = discordPermissionsFor(id);
    const userLink = await DiscordTwitchUserLink.findOne({ where: { discordName: id } });

    return new _User(permission, userLink?.twitchName, id);
}

export async function userByTwitch(name: string, context: ChatUserstate): Promise<User> {
    const permission = twitchPermissionsFor(name, context);
    const userLink = await DiscordTwitchUserLink.findOne({ where: { twitchName: name } });

    return new _User(permission, name, userLink?.discordId);
}
