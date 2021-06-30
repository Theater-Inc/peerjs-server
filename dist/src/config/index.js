"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = exports.environmentConfig = void 0;
const env_json_1 = __importDefault(require("../../env.json"));
const defaultConfig = {
    host: "::",
    port: 9000,
    expire_timeout: 5000,
    alive_timeout: 60000,
    key: "peerjs",
    path: "/",
    concurrent_limit: 5000,
    allow_discovery: false,
    proxied: false,
    cleanup_out_msgs: 1000,
};
exports.defaultConfig = defaultConfig;
const environmentConfig = {
    THEATER_API_HOST: env_json_1.default.THEATER_API_HOST,
    THEATER_API_PORT: env_json_1.default.THEATER_API_PORT
};
exports.environmentConfig = environmentConfig;
