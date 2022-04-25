import { config } from "../config";
import { UserWatchtime } from "../model/db/UserWatchtime";
import { getCurrentUsersInChat, isOnline } from "./twitchapi";
import { logger } from "../logger";

async function fetchCurrentWatchers() {
    const start = process.hrtime();

    logger.debug("updating watchtimes");
    for (const channel of config.twitch.channels) {
        if (await isOnline(channel)) {
            logger.debug(`channel ${channel} is online`);
            const currentlyInChat = await getCurrentUsersInChat(channel);
            await ensureUsers(currentlyInChat, channel);
            await updateUsers(currentlyInChat, channel);
        }
    }
    const end = process.hrtime(start);
    logger.debug(`took ${end[0] * 1000 + end[1] / 1000000}ms to update userwatchtime`);
}

async function ensureUsers(currentlyInChat: string[], channel: string) {
    const today = new Date();
    const existingUsers = (
        await UserWatchtime.findAll({ where: { channel: channel, year: today.getFullYear(), month: today.getMonth() } })
    ).map((u) => u.user);
    const newUsers = currentlyInChat.filter((u) => !existingUsers.includes(u));
    const savedUsers = await UserWatchtime.bulkCreate(
        newUsers.map((user) => {
            return {
                user: user,
                year: today.getFullYear(),
                month: today.getMonth(),
                watchtime: 0,
                channel: channel,
            };
        }),
        { ignoreDuplicates: true },
    );
    logger.debug(`saved ${savedUsers.length} new Users for channel ${channel}`);
}

async function updateUsers(currentlyInChat: string[], channel: string) {
    const today = new Date();
    await UserWatchtime.increment(
        { watchtime: config.twitch.watchtimeInterval },
        {
            where: {
                user: currentlyInChat,
                year: today.getFullYear(),
                month: today.getMonth(),
                channel: channel,
            },
        },
    );
}

export { fetchCurrentWatchers };
