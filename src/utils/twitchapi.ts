import lodash from "lodash";
import fetch from "node-fetch";

async function isOnline(channel: string): Promise<boolean> {
    const response = await fetch(`https://decapi.me/twitch/uptime/${channel}?offline_msg=offline`);
    const response_text = await response.text();
    return response_text !== "offline";
}

async function getCurrentUsersInChat(channel: string) {
    const chatterInfo = await (await fetch(`http://tmi.twitch.tv/group/user/${channel.slice(1)}/chatters`)).json();
    const currentlyInChatByRole = chatterInfo.chatters;
    return lodash.flatMap(currentlyInChatByRole);
}

export { isOnline, getCurrentUsersInChat };
