import { PermissionLevel } from "../model/domain/PermissionLevel";
import { ChatUserstate } from "tmi.js";
import { config } from "../config";

export function discordPermissionsFor(id: string): PermissionLevel {
    throw new Error("Not Implemented");
}

export function twitchPermissionsFor(user: string, context: ChatUserstate): PermissionLevel {
    if (config.twitch.devs.includes(user)) return PermissionLevel.dev;
    if (context.badges) {
        if (context.badges["broadcaster"]) return PermissionLevel.owner;
        if (context.badges["vip"]) return PermissionLevel.vip;
    }
    if (context.mod) return PermissionLevel.mod;
    if (context.subscriber) return PermissionLevel.sub;
    return PermissionLevel.user;
}
