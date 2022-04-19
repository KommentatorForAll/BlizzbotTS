import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class UserWatchtime extends Model {
    @Column({ type: DataType.TEXT })
    declare user: string;

    @Column({ type: DataType.BIGINT })
    declare watchtime: number;

    @Column({ type: DataType.SMALLINT })
    declare year: number;

    @Column({ type: DataType.TINYINT })
    declare month: number;
}
