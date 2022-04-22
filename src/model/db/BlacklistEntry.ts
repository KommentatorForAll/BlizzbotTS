import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class BlacklistEntry extends Model {

    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare word: string;

    @PrimaryKey
    @Column({type: DataType.TEXT})
    declare channel: string;
}
