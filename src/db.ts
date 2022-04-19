import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { config } from "./config";

export class DB {
    private sequelize: Sequelize;

    constructor() {
        const settings = config.db;
        this.sequelize = settings.path
            ? new Sequelize({ dialect: "sqlite", storage: settings.path } as SequelizeOptions)
            : new Sequelize(settings.database!, settings.username!, settings.password, {
                  host: settings.hostname!,
                  port: settings.port,
                  dialect: "postgres",
              } as SequelizeOptions);
    }

    async startup(): Promise<void> {
        await this.sequelize.authenticate();
    }
}
