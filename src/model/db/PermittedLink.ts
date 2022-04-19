import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class PermittedLink extends Model {
    @Column({ type: DataType.TEXT })
    declare link: string;

    @Column({ type: DataType.TEXT })
    declare channel: string;
}
