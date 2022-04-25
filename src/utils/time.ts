import { Duration } from "luxon";
import { getTranslation } from "./translations";

export async function durationToLocaleString(duration: Duration, channel: string): Promise<string> {
    const values = duration.shiftTo("years", "months", "days", "hours", "minutes", "seconds").toObject();
    return await getTranslation("duration", channel, values as Record<string, number>);
}
