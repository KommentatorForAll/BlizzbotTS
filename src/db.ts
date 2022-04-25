import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { config } from "./config";
import { BlacklistEntry } from "./model/db/BlacklistEntry";
import * as fs from "fs";
import { logger } from "./logger";
import { URIWhitelistEntry } from "./model/db/URIWhitelistEntry";
import { ChannelConfiguration } from "./model/db/ChannelConfiguration";

export class DB {
    private sequelize: Sequelize;
    public wordBlacklist: WordBlacklist;
    public uriWhitelist: URIWhitelist;

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
        this.uriWhitelist = new URIWhitelist();
    }

    async startup(): Promise<void> {
        logger.info("Starting database");
        logger.info("loading database models");
        this.sequelize.addModels(await getAllModels());
        await this.sequelize.sync({ alter: true });
        logger.info("Testing database connection");
        await this.sequelize.authenticate();
        logger.info("Initializing database caches");
        await Promise.all([this.wordBlacklist.init(), this.uriWhitelist.init()]);
        logger.info("ensuring channel configurations");
        await this.ensureChannelConfigurations();
        logger.info("Successfully started database");
    }

    private async ensureChannelConfigurations() {
        config.twitch.channels.forEach((channel) => {
            ChannelConfiguration.findCreateFind({ where: { channel: channel.replace("#", "") } });
        });
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
        this.list = this.list.filter((e) => e !== entry);
        entry.destroy();
    }
}

class URIWhitelist {
    private list!: URIWhitelistEntry[];

    async init() {
        if (this.list) {
            throw new Error("Can only be initialized once");
        }
        this.list = await URIWhitelistEntry.findAll();
    }

    getAll() {
        return this.list;
    }

    add(entry: URIWhitelistEntry) {
        this.list.push(entry);
        entry.save();
    }

    remove(entry: URIWhitelistEntry) {
        this.list.filter((e) => e !== entry);
        entry.destroy();
    }
}
