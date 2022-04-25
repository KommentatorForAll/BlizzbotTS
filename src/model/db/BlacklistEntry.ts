import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class BlacklistEntry extends Model {
    @Column({ unique: false, type: DataType.TEXT })
    declare word: string;

    @Column({ unique: false, type: DataType.TEXT })
    declare channel: string;
}
