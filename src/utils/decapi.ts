import fetch from "node-fetch";
import { DateTime, Duration } from "luxon";

async function isOnline(channel: string): Promise<boolean> {
    const response = await fetch(`https://decapi.me/twitch/uptime/${channel}?offline_msg=offline`);
    const response_text = await response.text();
    return response_text !== "offline";
}

/**
 * returns the age in ms
 * @param user
 */
async function getAccountAge(user: string): Promise<Duration> {
    return DateTime.now().diff(await getAccountCreationDate(user));
}

async function getAccountCreationDate(user: string): Promise<DateTime> {
    const resp = await fetch(`https://decapi.me/twitch/creation/${user}?format=U&tz=UTC`);
    return DateTime.fromSeconds(parseInt(await resp.text()));
}

export { isOnline, getAccountAge, getAccountCreationDate };
