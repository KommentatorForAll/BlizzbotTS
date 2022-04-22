import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class DiscordTwitchUserLink extends Model {
    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare discordId: string;

    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare twitchName: string;
}
