import { logger } from "../../../logger";
import { TwitchClient } from "../../../model/domain/clients/TwitchClient";
import { SubMethod, SubUserstate } from "tmi.js";
import { getTranslation } from "../../../utils/translations";

export async function handle(
    client: TwitchClient,
    channel: string,
    username: string,
    numbOfSubs: number,
    recipient: string,
    methods: SubMethod,
    userstate: SubUserstate,
) {
    const text = await getTranslation("submysterygift", channel, { username: username, amount: String(numbOfSubs) });
    await client.say(channel, `/me ${text}`);
    // message for Action
    logger.info(`${username} gifted ${recipient} a subscription.${numbOfSubs} Sub`);
}
