import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { config } from "./config";
import { BlacklistEntry } from "./model/db/BlacklistEntry";
import * as fs from "fs";
import { logger } from "./logger";

export class DB {
    private sequelize: Sequelize;
    public wordBlacklist: WordBlacklist;

    constructor() {
        const settings = config.db;
        this.sequelize = settings.path
            ? new Sequelize({
                  dialect: "sqlite",
                  storage: settings.path,
                  logging: false,
              } as SequelizeOptions)
            : new Sequelize(settings.database!, settings.username!, settings.password, {
                  host: settings.hostname!,
                  port: settings.port,
                  dialect: "postgres",
                  logging: false,
              } as SequelizeOptions);
        this.wordBlacklist = new WordBlacklist();
    }

    async startup(): Promise<void> {
        logger.info("Starting database");
        logger.info("loading database models");
        this.sequelize.addModels(await getAllModels());
        await this.sequelize.sync({ alter: true });
        logger.info("Testing database connection");
        await this.sequelize.authenticate();
        logger.info("Initializing blacklist");
        await this.wordBlacklist.init();
        logger.info("Successfully started database");
    }
}

async function getAllModels(): Promise<any[]> {
    return await Promise.all(
        fs
            .readdirSync("./dist/model/db")
            .filter((f) => f.endsWith(".js"))
            .map(async (file) => (await import(`./model/db/${file}`))[file.split(".")[0]]),
    );
}

class WordBlacklist {
    private list!: BlacklistEntry[];

    async init() {
        if (this.list) {
            throw new Error("Can only be initialized once");
        }
        this.list = await BlacklistEntry.findAll();
    }

    getAll() {
        return this.list;
    }

    add(entry: BlacklistEntry) {
        this.list.push(entry);
        entry.save();
    }

    remove(entry: BlacklistEntry) {
        this.list.filter((e) => e !== entry);
        entry.destroy();
    }
}
