import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class DiscordTwitchUserLink extends Model {
    @Column({ type: DataType.TEXT })
    declare discordId: string;

    @Column({ type: DataType.TEXT })
    declare twitchName: string;
}
