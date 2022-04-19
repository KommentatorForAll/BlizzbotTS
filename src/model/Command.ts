import { CommandInteraction } from "discord.js";
import { DiscordClient } from "./clients/DiscordClient";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/rest/v9/interactions";

export abstract class Command {
    constructor(public readonly name: string) {}

    abstract execute(client: DiscordClient, interaction: CommandInteraction): Promise<void>;
    abstract register(): RESTPostAPIChatInputApplicationCommandsJSONBody;
}
