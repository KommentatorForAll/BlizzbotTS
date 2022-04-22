import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { URIMatchExtend } from "../domain/URIMatchExtend";

@Table
export class URIWhitelistEntry extends Model {
    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare uri: string;

    @PrimaryKey
    @Column({ type: DataType.TEXT })
    declare channel: string;

    @PrimaryKey
    @Column({ type: DataType.TINYINT })
    declare extend: URIMatchExtend;
}
