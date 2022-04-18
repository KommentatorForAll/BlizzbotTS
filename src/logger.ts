import { existsSync, mkdirSync } from "fs";
import { format as _format, transports as _transports, createLogger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {config} from "./config";

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
			filename: "%DATE%.log",
			level: "unused",
			format: _format.combine(_format.uncolorize(), _format.simple()),
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
