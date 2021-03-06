import { DiscordClient } from "./model/domain/clients/DiscordClient";
import { TwitchClient } from "./model/domain/clients/TwitchClient";
import { Events } from "tmi.js";
import * as fs from "fs";
import fsReaddirRecursive from "fs-readdir-recursive";
import { DiscordCommand } from "./model/domain/commands/DiscordCommand";
import { Button } from "./model/domain/Button";
import { Collection } from "discord.js";
import { TwitchCommand } from "./model/domain/commands/TwitchCommand";

async function loadDiscordEvents(client: DiscordClient) {
    const files = fs.readdirSync("./dist/events/discord");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { handle } = await import(`./events/discord/${file}`);
        client.on(file.split(".")[0], handle.bind(null, client));
    }
}

async function loadDiscordCommands(commandCollection: Collection<string, DiscordCommand>): Promise<void> {
    const files = fs.readdirSync("./dist/commands/discord");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { default: cmd } = await import(`./commands/discord/${file}`);
        commandCollection.set(cmd.name, cmd);
    }
}

async function loadDiscordButtons(buttonCollection: Collection<string, Button>): Promise<void> {
    const files = fs.readdirSync("./dist/buttons/discord");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { default: cmd } = await import(`./buttons/discord/${file}`);
        buttonCollection.set(cmd.name, cmd);
    }
}

async function loadTwitchEvents(client: TwitchClient) {
    const files = fsReaddirRecursive("./dist/events/twitch");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { handle } = await import(`./events/twitch/${file}`);
        client.on(file.split(/[/\\]/g).slice(-1)[0].split(".")[0] as keyof Events, handle.bind(null, client));
    }
}

async function loadTwitchCommands(commandCollection: Collection<string, TwitchCommand>) {
    const files = fsReaddirRecursive("./dist/commands/twitch");
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const { default: cmd } = await import(`./commands/twitch/${file}`);
        commandCollection.set(cmd.name, cmd);
    }
}

export { loadDiscordCommands, loadDiscordEvents, loadDiscordButtons, loadTwitchCommands, loadTwitchEvents };
