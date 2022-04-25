import lodash from "lodash";
import fetch from "node-fetch";
import { SubUserstate } from "tmi.js";
import type { ChatterInfo } from "../typings/Chatters";

async function isOnline(channel: string): Promise<boolean> {
    const response = await fetch(`https://decapi.me/twitch/uptime/${channel}?offline_msg=offline`);
    const response_text = await response.text();
    return response_text !== "offline";
}

async function getCurrentUsersInChat(channel: string): Promise<string[]> {
    const chatterInfo = (await (
        await fetch(`http://tmi.twitch.tv/group/user/${channel.replace("#", "")}/chatters`)
    ).json()) as ChatterInfo;
    const currentlyInChatByRole = chatterInfo.chatters;
    return lodash.flatMap(currentlyInChatByRole);
}

async function disableFollowerChat(channel: string, minutes: number) {
    //TODO
}

function getTier(userstate: SubUserstate): string {
    const tierList: Record<string, string> = { 1000: "Tier 1", 2000: "Tier 2", 3000: "Tier 3", Prime: "Twitch Prime" };
    const tiers = userstate["msg-param-sub-plan"];
    return tierList[tiers!];
}

export { isOnline, getCurrentUsersInChat, disableFollowerChat, getTier };
