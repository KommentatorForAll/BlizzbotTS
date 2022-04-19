import { ApplicationCommand, ApplicationCommandDataResolvable, Collection, GuildResolvable } from "discord.js";
import { logger } from "../../logger";
import { DiscordClient } from "../../model/clients/DiscordClient";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/rest/v9/interactions";

export async function handle(client: DiscordClient) {
    logger.info(`Successfully logged in as ${client.user?.username}.`);
    logger.info(`Watching over ${client.guilds.cache.size} guilds.`);

    logger.info("Publishing commands...");
    await updateRegisteredCommands(client).then(() => logger.info("Finished publishing commands."));

    logger.info("Setup successfully");
}

async function updateRegisteredCommands(client: DiscordClient) {
    if (!client.application) {
        logger.error("client has no application");
        throw new Error("client must have an application");
    }
    const registeredCommands = await client.application.commands.fetch(undefined);

    await Promise.all(addOrEditCommands(client, registeredCommands));
    removeUnusedCommands(client, registeredCommands);
}

function addOrEditCommands(
    client: DiscordClient,
    registeredCommands: Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>,
) {
    return client.commands.map(async (cmd) => {
        const jsonCommand = cmd.register();
        const existingCmd = registeredCommands.find((c) => c.name === cmd.name);
        if (!existingCmd) {
            return addCommand(client, jsonCommand as ApplicationCommandDataResolvable);
        } else if (!commandsEqual(existingCmd, jsonCommand)) {
            return editCommand(client, jsonCommand as ApplicationCommandDataResolvable, existingCmd);
        }
    });
}

async function addCommand(
    client: DiscordClient,
    jsonCommand: ApplicationCommandDataResolvable,
): Promise<ApplicationCommand<{ guild: GuildResolvable }> | undefined> {
    logger.debug(`creating new command: ${jsonCommand.name}`);
    return client.application?.commands.create(jsonCommand);
}

async function editCommand(
    client: DiscordClient,
    jsonCommand: ApplicationCommandDataResolvable,
    existingCmd: ApplicationCommand,
): Promise<ApplicationCommand<{ guild: GuildResolvable }> | undefined> {
    logger.debug(`updating command: ${jsonCommand.name}`);
    return client.application?.commands.edit(existingCmd.id, jsonCommand);
}

function removeUnusedCommands(
    client: DiscordClient,
    registeredCommands: Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>,
) {
    for (const cmd of registeredCommands) {
        if (!client.commands.some((c) => c.name === cmd[1].name)) {
            logger.debug(`removing command: ${cmd[1]} with id ${cmd[0]}`);
            client.application?.commands.delete(cmd[0]);
        }
    }
}

function commandsEqual(c1: ApplicationCommand, c2: RESTPostAPIChatInputApplicationCommandsJSONBody): boolean {
    return (
        c1.name === c2.name &&
        c1.description === c2.description &&
        JSON.stringify(c1.options) === JSON.stringify(c2.options)
    );
}
