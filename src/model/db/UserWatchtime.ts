import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class UserWatchtime extends Model {
    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare user: string;

    @PrimaryKey
    @Column({ type: DataType.BIGINT })
    declare watchtime: number;

    @PrimaryKey
    @Column({ type: DataType.SMALLINT })
    declare year: number;

    @PrimaryKey
    @Column({ type: DataType.TINYINT })
    declare month: number;

    @PrimaryKey
    @Column({type: DataType.TEXT})
    declare channel: string;
}
