import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";

@Table
export class UserWatchtime extends Model {
    @Unique(false)
    @Column({ type: DataType.TEXT })
    declare user: string;

    @Column({ type: DataType.BIGINT })
    declare watchtime: number;

    @Unique(false)
    @Column({ type: DataType.SMALLINT })
    declare year: number;

    @Unique(false)
    @Column({ type: DataType.TINYINT })
    declare month: number;

    @Unique(false)
    @Column({ type: DataType.TEXT })
    declare channel: string;
}
