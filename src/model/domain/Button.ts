import { DiscordClient } from "./clients/DiscordClient";
import { ButtonInteraction } from "discord.js";

export abstract class Button {
    protected constructor(public readonly name: string) {}

    abstract execute(client: DiscordClient, interaction: ButtonInteraction, args: string[]): Promise<void>;
}
