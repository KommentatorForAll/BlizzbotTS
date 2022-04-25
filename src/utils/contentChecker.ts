import { db } from "../main";
import { URIMatchExtend } from "../model/domain/URIMatchExtend";
import { ChatUserstate } from "tmi.js";
import { ChannelConfiguration } from "../model/db/ChannelConfiguration";
import lodash from "lodash";

export async function isWhitelisted(link: string, channel: string): Promise<boolean> {
    let url: URL;
    try {
        url = new URL(link);
    } catch (err: any) {
        url = new URL(`https://${link}`);
    }
    const channelWhiteList = db.uriWhitelist.getAll().filter((e) => e.channel === channel);

    const domainAllowed = channelWhiteList.filter((e) => e.extend === URIMatchExtend.domain);
    if (domainAllowed.some((domain) => url.hostname.endsWith(`.${domain.uri}`) || url.hostname === domain.uri)) {
        return true;
    }

    const subDomainAllowed = channelWhiteList.filter((e) => e.extend === URIMatchExtend.subdomain);
    if (subDomainAllowed.some((domain) => url.hostname === domain.uri)) {
        return true;
    }
    return channelWhiteList.some((uri) => uri.uri === link);
}

export async function containsNotAllowedLink(content: string, channel: string): Promise<boolean> {
    const regex =
        /((smtp|s?ftp|https?|mailto|proxy|callto|smb|ssh|steam|javascript):\/\/)?(.{2,255}\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
    const linksOfMessage = content.match(regex);
    if (!linksOfMessage) return false;
    for (const link of linksOfMessage) {
        if (!(await isWhitelisted(link, channel))) return true;
    }
    return false;
}

export async function hasUnallowedAction(context: ChatUserstate, channel: string): Promise<boolean> {
    const config = (await ChannelConfiguration.findOne({ where: { channel: channel.replace("#", "") } }))!;
    return !(config.allowActions || context["message-type"] == "action");
}

export async function containsBadWords(content: string, channel: string): Promise<boolean> {
    const badWordDTOs = db.wordBlacklist.getAll().filter((w) => w.channel === channel);
    const badWords = badWordDTOs.map((b) => b.word);
    const contentWords = content.toLowerCase().split("");
    return lodash.intersection(badWords, contentWords).length > 0;
}
