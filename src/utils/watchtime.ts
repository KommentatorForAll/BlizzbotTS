import { config } from "../config";
import { UserWatchtime } from "../model/db/UserWatchtime";
import { literal } from "sequelize";
import { getCurrentUsersInChat, isOnline } from "./twitchapi";
import { logger } from "../logger";

async function fetchCurrentWatchers() {
    logger.debug("updating watchtimes");
    for (const channel of config.twitch.channels) {
        if (await isOnline(channel)) {
            logger.debug(`channel ${channel} is online`);
            const currentlyInChat = await getCurrentUsersInChat(channel);
            await ensureUsers(currentlyInChat);
            await updateUsers(currentlyInChat);
        }
    }
}

async function ensureUsers(currentlyInChat: unknown[]) {
    const today = new Date();
    await UserWatchtime.bulkCreate(
        currentlyInChat.map((user) => {
            return {
                user: user,
                year: today.getFullYear(),
                month: today.getMonth(),
                watchtime: 0,
            };
        }),
        { ignoreDuplicates: true },
    );
}

async function updateUsers(currentlyInChat: unknown[]) {
    const today = new Date();
    await UserWatchtime.update(
        { watchtime: literal(`watchtime + ${config.twitch.watchtimeInterval}`) },
        {
            where: {
                user: currentlyInChat,
                year: today.getFullYear(),
                month: today.getMonth(),
            },
        },
    );
}

export { fetchCurrentWatchers };
