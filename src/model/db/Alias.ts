import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Alias extends Model<Alias> {
    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare alias: string;

    @Column({ type: DataType.TEXT })
    declare command: string;

    @PrimaryKey
    @Column({type: DataType.TEXT})
    declare channel: string;
}
