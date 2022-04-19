import { DiscordClient } from "./model/clients/DiscordClient";
import { TwitchClient } from "./model/clients/TwitchClient";
import { Events } from "tmi.js";
import * as fs from "fs";
import { Command } from "./model/Command";

async function loadDiscordEvents(client: DiscordClient) {
    const files = fs.readdirSync("./dist/events/discord");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { handle } = await import(`./events/discord/${file}`);
        client.on(file.split(".")[0], handle.bind(null, client));
    }
}

async function loadDiscordCommands(client: DiscordClient): Promise<Command[]> {
    const files = fs.readdirSync("./dist/commands/discord");
    const commands: Command[] = [];
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { default: cmd } = await import(`./commands/discord/${file}`);
        commands.push(cmd);
    }
    return commands;
}

async function loadTwitchEvents(client: TwitchClient) {
    const files = fs.readdirSync("./dist/events/twitch");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { handle } = await import(`./events/twitch/${file}`);
        client.on(file.split(".")[0] as keyof Events, handle.bind(null, client));
    }
}

async function loadTwitchCommands(client: TwitchClient) {}

export { loadDiscordCommands, loadDiscordEvents, loadTwitchCommands, loadTwitchEvents };
