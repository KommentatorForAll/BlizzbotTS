import { existsSync, mkdirSync } from "fs";
import { createLogger, format as _format, Logger, transports as _transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "./config";

if (!existsSync("./logs")) mkdirSync("./logs");
export const logger = createLogger({
    level: config.loglevel,
    format: _format.prettyPrint({
        colorize: true,
    }),
    transports: [
        new DailyRotateFile({
            createSymlink: true,
            dirname: "logs/",
            zippedArchive: true,
            json: false,
            symlinkName: "latest.log",
            filename: "%DATE%-debug.log",
            level: "unused",
            format: _format.combine(_format.timestamp(),_format.uncolorize(), _format.simple()),
            maxFiles: "14d",
        }),
        new DailyRotateFile({
            createSymlink: true,
            dirname: "logs/",
            zippedArchive: true,
            json: false,
            filename: "%DATE%.log",
            level: "info",
            format: _format.combine(_format.timestamp(),_format.uncolorize(), _format.simple()),
            maxFiles: "14d",
        }),
        new _transports.Console({
            format: _format.combine(
                _format.colorize({
                    level: true,
                    message: false,
                    colors: {
                        info: "green",
                        warn: "yellow",
                        error: "red",
                    },
                }),
                _format.cli(),
            ),
        }),
    ],
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        command: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
        stdin: 7,
        unused: 8,
    },
});

class TwitchMessageLogger {
    private loggers: Map<string, Logger>;

    constructor() {
        this.loggers = new Map<string, Logger>();
        config.twitch.channels.forEach((channel) => {
            this.loggers.set(
                channel,
                createLogger({
                    transports: [
                        new DailyRotateFile({
                            createSymlink: true,
                            dirname: `logs/channelLogs/${channel}/`,
                            zippedArchive: false,
                            json: false,
                            symlinkName: "latest.log",
                            filename: "%DATE%.log",
                            level: "debug",
                            format: _format.combine(
                                _format.timestamp(),
                                _format.printf((info: { message: any }) => info.message),
                            ),
                            maxFiles: "14d",
                        }),
                    ],
                }),
            );
        });
    }

    log(message: string, channel: string) {
        const channelLogger = this.loggers.get(channel);
        if (!channelLogger) {
            throw new Error("channel not present in config");
        }
        channelLogger.info(message);
    }
}

export const twitchMessageLogger = new TwitchMessageLogger();
