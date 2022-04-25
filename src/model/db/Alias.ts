import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Alias extends Model<Alias> {
    @Column({ unique: false, type: DataType.TEXT })
    declare alias: string;

    @Column({ unique: false, type: DataType.TEXT })
    declare command: string;

    @Column({ unique: false, type: DataType.TEXT })
    declare channel: string;
}
