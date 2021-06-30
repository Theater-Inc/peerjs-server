"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.Errors = void 0;
var Errors;
(function (Errors) {
    Errors["INVALID_KEY"] = "Invalid key provided";
    Errors["INVALID_TOKEN"] = "Invalid token provided";
    Errors["INVALID_WS_PARAMETERS"] = "No id, token, or key supplied to websocket server";
    Errors["CONNECTION_LIMIT_EXCEED"] = "Server has reached its concurrent user limit";
    Errors["THEATER_MISSING_SID"] = "A Theater session id was not provided.";
    Errors["THEATER_INVALID_SUBSCRIPTION"] = "The user's Theater subscription is invalid.";
})(Errors = exports.Errors || (exports.Errors = {}));
var MessageType;
(function (MessageType) {
    MessageType["OPEN"] = "OPEN";
    MessageType["LEAVE"] = "LEAVE";
    MessageType["CANDIDATE"] = "CANDIDATE";
    MessageType["OFFER"] = "OFFER";
    MessageType["ANSWER"] = "ANSWER";
    MessageType["EXPIRE"] = "EXPIRE";
    MessageType["HEARTBEAT"] = "HEARTBEAT";
    MessageType["ID_TAKEN"] = "ID-TAKEN";
    MessageType["ERROR"] = "ERROR";
    MessageType["THEATER_MISSING_SID"] = "THEATER_MISSING_SID";
    MessageType["THEATER_INVALID_SUBSCRIPTION"] = "THEATER_INVALID_SUBSCRIPTION";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
