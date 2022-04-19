import { ButtonInteraction } from "discord.js";
import { DiscordClient } from "../../model/domain/clients/DiscordClient";
import { Button } from "../../model/domain/Button";

class ExampleButton extends Button {
    constructor() {
        super("exampleButton");
    }

    async execute(client: DiscordClient, interaction: ButtonInteraction, args: string[]): Promise<void> {
        await interaction.reply(`you selected the following options: ${args}`);
    }
}

export default new ExampleButton();
