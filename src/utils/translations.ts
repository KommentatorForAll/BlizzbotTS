import { ChannelConfiguration } from "../model/db/ChannelConfiguration";
import * as fs from "fs";

function loadTranslations(): Map<string, Record<string, string>> {
    const files = fs.readdirSync("locales");
    const locales = new Map<string, Record<string, string>>();
    files.forEach((f) => locales.set(f.replace(".json", ""), JSON.parse(fs.readFileSync(`locales/${f}`, "utf-8"))));
    return locales;
}

export async function getTranslation(
    name: string,
    channel: string,
    replacements: Record<string, string | number>,
): Promise<string> {
    const locale = (await ChannelConfiguration.findOne({ where: { channel: channel.replace("#", "") } }))!.locale;
    const dictionary = locales.get(locale) || locales.get("en")!;
    let result = dictionary[name];
    Object.entries(replacements).forEach(([k, v]) => {
        result = result.replace(`[${k}]`, `${v}`);
    });
    return result;
}

const locales = loadTranslations();
