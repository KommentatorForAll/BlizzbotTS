import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class ChannelConfiguration extends Model<ChannelConfiguration> {
    @Column({ unique: false, type: DataType.BOOLEAN, defaultValue: true })
    declare allowActions: boolean;

    @Column({ unique: false, type: DataType.TEXT, defaultValue: "en" })
    declare locale: string;

    @Column({ unique: false, type: DataType.INTEGER, defaultValue: 10 })
    declare showRaidsWithAtLeast: number;

    @Column({ unique: false, type: DataType.INTEGER, defaultValue: 60 })
    declare disableFollowerChatForRaidsWithAtLeast: number;

    @Column({ unique: false, type: DataType.INTEGER, defaultValue: 5 })
    declare disableFollowerChatForNMinutes: number;

    @Column({ unique: false, type: DataType.TEXT })
    declare channel: string;
}
