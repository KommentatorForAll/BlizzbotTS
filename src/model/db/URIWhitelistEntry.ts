import { Column, DataType, Model, Table } from "sequelize-typescript";
import { URIMatchExtend } from "../domain/URIMatchExtend";

@Table
export class URIWhitelistEntry extends Model {
    @Column({ type: DataType.TEXT })
    declare uri: string;

    @Column({ type: DataType.TEXT })
    declare channel: string;

    @Column({ type: DataType.TINYINT })
    declare extend: URIMatchExtend;
}
