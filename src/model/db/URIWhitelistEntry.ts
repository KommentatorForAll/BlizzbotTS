import { Column, DataType, Model, Table } from "sequelize-typescript";
import { URIMatchExtend } from "../domain/URIMatchExtend";

@Table
export class URIWhitelistEntry extends Model {
    @Column({ unique: false, type: DataType.TEXT })
    declare uri: string;

    @Column({ unique: false, type: DataType.TEXT })
    declare channel: string;

    @Column({ unique: false, type: DataType.TINYINT })
    declare extend: URIMatchExtend;
}
