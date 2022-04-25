import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class DiscordTwitchUserLink extends Model {
    @Column({ unique: false, type: DataType.TEXT })
    declare discordId: string;

    @Column({ unique: false, type: DataType.TEXT })
    declare twitchName: string;
}
