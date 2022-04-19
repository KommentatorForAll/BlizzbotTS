import { ButtonInteraction, CommandInteraction, Interaction } from "discord.js";
import { logger } from "../../logger";
import { DiscordClient } from "../../model/domain/clients/DiscordClient";

export async function handle(client: DiscordClient, interaction: Interaction) {
    try {
        if (interaction.isCommand()) {
            await handleCommandInteractions(client, interaction);
        } else if (interaction.isButton()) {
            await handleButtonInteractions(client, interaction);
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(`unhandled error occurred on interaction: ${err.name}`);
            logger.error(err.message);
            logger.error(err.stack);
        } else {
            logger.error(`unknown error occurred ${err}`);
        }
    }
}

async function handleCommandInteractions(client: DiscordClient, interaction: CommandInteraction) {
    const command = client.commands.get(interaction.commandName);
    if (command) {
        await command.execute(client, interaction);
    } else {
        logger.error(`error resolving command ${interaction.commandName}`);
        await interaction.reply("An error occurred. Please contact a developer");
    }
}

async function handleButtonInteractions(client: DiscordClient, interaction: ButtonInteraction) {
    const args = interaction.customId.split(".");
    const buttonName = args.shift() || "";
    const clickedButton = client.buttons.get(buttonName);
    if (clickedButton) {
        await clickedButton.execute(client, interaction, args);
    } else {
        logger.error(`error resolving clicked button ${buttonName}`);
        await interaction.reply("An error occurred. Please contact a developer");
    }
}
