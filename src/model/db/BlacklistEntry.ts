import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class BlacklistEntry extends Model {
    @Column({ type: DataType.TEXT })
    declare word: string;
}
