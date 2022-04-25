import "dotenv/config";

class DiscordConfig {
    public token: string;
    public devs: string[];

    constructor() {
        this.token = process.env.DISCORD_TOKEN!!;
        this.devs = process.env.DISCORD_DEVS?.toLowerCase().split(",") || [];
    }
}

class TwitchConfig {
    public username: string;
    public password: string;
    public channels: string[];
    public clientId?: string;
    public watchtimeInterval: number;
    public devs: string[];

    constructor() {
        this.username = process.env.TWITCH_USERNAME!!;
        this.password = process.env.TWITCH_PASSWORD!!;
        this.channels = process.env.TWITCH_CHANNELS!.toLowerCase().split(",");
        this.clientId = process.env.TWITCH_CLIENTID;
        this.watchtimeInterval = parseInt(process.env.TWITCH_WATCHTIME_INTERVAL || "30");
        this.devs = process.env.TWITCH_DEVS?.toLowerCase().split(",") || [];
    }
}

class DBConfig {
    public username?: string;
    public password?: string;
    public hostname?: string;
    public database?: string;
    public port: number;
    public path?: string;

    constructor() {
        this.username = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.hostname = process.env.DB_HOSTNAME;
        this.database = process.env.DB_DATABASE;
        this.port = parseInt(process.env.DB_PORT || "0");
        this.path = process.env.DB_PATH;

        if (!((this.username && this.password && this.hostname && this.port && this.database) || this.path)) {
            throw new Error("Db must either be local or remote. Cannot be None.");
        }
    }
}

class Config {
    public loglevel: string;
    public discord?: DiscordConfig;
    public twitch: TwitchConfig;
    public db: DBConfig;
    public prefix: string;

    constructor() {
        this.loglevel = process.env.LOG_LEVEL || "silly";
        this.prefix = process.env.PREFIX!!;
        const useDiscord = ["1", "true"].includes((process.env.USE_DISCORD || "false").toLowerCase());
        if (useDiscord) this.discord = new DiscordConfig();
        this.twitch = new TwitchConfig();
        this.db = new DBConfig();
    }
}

export const config = new Config();
