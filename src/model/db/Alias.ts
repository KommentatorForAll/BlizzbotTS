import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Alias extends Model<Alias> {
    @Column({ type: DataType.TEXT })
    declare alias: string;

    @Column({ type: DataType.TEXT })
    declare command: string;
}
