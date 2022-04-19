import { TwitchClient } from "../../model/domain/clients/TwitchClient";
import { logger } from "../../logger";
import { fetchCurrentWatchers } from "../../utils/watchtime";
import { config } from "../../config";

export async function handle(client: TwitchClient) {
    logger.info("successfully connected to twitch");
    setInterval(fetchCurrentWatchers, config.twitch.watchtimeInterval * 1000);
}
