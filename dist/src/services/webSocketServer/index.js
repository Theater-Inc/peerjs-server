"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const events_1 = __importDefault(require("events"));
const url_1 = __importDefault(require("url"));
const ws_1 = __importDefault(require("ws"));
const enums_1 = require("../../enums");
const client_1 = require("../../models/client");
const TheaterAPI_1 = __importDefault(require("../TheaterAPI"));
const WS_PATH = 'peerjs';
class WebSocketServer extends events_1.default {
    constructor({ server, realm, config }) {
        super();
        this.setMaxListeners(0);
        this.realm = realm;
        this.config = config;
        const path = this.config.path;
        this.path = `${path}${path.endsWith('/') ? "" : "/"}${WS_PATH}`;
        this.socketServer = new ws_1.default.Server({ path: this.path, server });
        this.socketServer.on("connection", (socket, req) => this._onSocketConnection(socket, req));
        this.socketServer.on("error", (error) => this._onSocketError(error));
    }
    _onSocketConnection(socket, req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { query = {} } = url_1.default.parse((_a = req.url) !== null && _a !== void 0 ? _a : '', true);
            const { sid, id, token, key } = query;
            if (!sid) {
                return this._sendTheaterErrorAndClose(socket, enums_1.MessageType.THEATER_MISSING_SID, enums_1.Errors.THEATER_MISSING_SID);
            }
            const theaterAPI = new TheaterAPI_1.default(sid);
            const subsciptionIsValid = yield theaterAPI.isSubscriptionValid();
            if (!subsciptionIsValid) {
                return this._sendTheaterErrorAndClose(socket, enums_1.MessageType.THEATER_INVALID_SUBSCRIPTION, enums_1.Errors.THEATER_INVALID_SUBSCRIPTION);
            }
            if (!id || !token || !key) {
                return this._sendErrorAndClose(socket, enums_1.Errors.INVALID_WS_PARAMETERS);
            }
            if (key !== this.config.key) {
                return this._sendErrorAndClose(socket, enums_1.Errors.INVALID_KEY);
            }
            const client = this.realm.getClientById(id);
            if (client) {
                if (token !== client.getToken()) {
                    // ID-taken, invalid token
                    socket.send(JSON.stringify({
                        type: enums_1.MessageType.ID_TAKEN,
                        payload: { msg: "ID is taken" }
                    }));
                    return socket.close();
                }
                return this._configureWS(socket, client);
            }
            this._registerClient({ socket, id, token });
        });
    }
    _onSocketError(error) {
        // handle error
        this.emit("error", error);
    }
    _registerClient({ socket, id, token }) {
        // Check concurrent limit
        const clientsCount = this.realm.getClientsIds().length;
        if (clientsCount >= this.config.concurrent_limit) {
            return this._sendErrorAndClose(socket, enums_1.Errors.CONNECTION_LIMIT_EXCEED);
        }
        const newClient = new client_1.Client({ id, token });
        this.realm.setClient(newClient, id);
        socket.send(JSON.stringify({ type: enums_1.MessageType.OPEN }));
        this._configureWS(socket, newClient);
    }
    _configureWS(socket, client) {
        client.setSocket(socket);
        // Cleanup after a socket closes.
        socket.on("close", () => {
            if (client.getSocket() === socket) {
                this.realm.removeClientById(client.getId());
                this.emit("close", client);
            }
        });
        // Handle messages from peers.
        socket.on("message", (data) => {
            try {
                const message = JSON.parse(data);
                message.src = client.getId();
                this.emit("message", client, message);
            }
            catch (e) {
                this.emit("error", e);
            }
        });
        this.emit("connection", client);
    }
    _sendErrorAndClose(socket, msg) {
        socket.send(JSON.stringify({
            type: enums_1.MessageType.ERROR,
            payload: { msg }
        }));
        socket.close();
    }
    _sendTheaterErrorAndClose(socket, type, msg) {
        socket.send(JSON.stringify({
            type: type,
            payload: { msg }
        }));
        socket.close();
    }
}
exports.WebSocketServer = WebSocketServer;
