import { DiscordCommand } from "../../model/domain/commands/DiscordCommand";
import { DiscordClient } from "../../model/domain/clients/DiscordClient";
import { CommandInteraction } from "discord.js";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/rest/v9/interactions";
import { SlashCommandBuilder } from "@discordjs/builders";

class Ping extends DiscordCommand {
    constructor() {
        super("ping");
    }

    async execute(client: DiscordClient, interaction: CommandInteraction): Promise<void> {
        const botPing: number = Math.round(interaction.client.ws.ping);
        await interaction.reply(`Pong! (Bot ping: ${botPing}ms)`);
    }

    register(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName("ping")
            .setDescription("sends the bot ping")
            .toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody;
    }
}

export default new Ping();
