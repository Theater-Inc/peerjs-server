export enum Errors {
  INVALID_KEY = "Invalid key provided",
  INVALID_TOKEN = "Invalid token provided",
  INVALID_WS_PARAMETERS = "No id, token, or key supplied to websocket server",
  CONNECTION_LIMIT_EXCEED = "Server has reached its concurrent user limit",
  THEATER_MISSING_SID = "A Theater session id was not provided.",
  THEATER_INVALID_SUBSCRIPTION = "The user's Theater subscription is invalid."
}

export enum MessageType {
  OPEN = "OPEN",
  LEAVE = "LEAVE",
  CANDIDATE = "CANDIDATE",
  OFFER = "OFFER",
  ANSWER = "ANSWER",
  EXPIRE = "EXPIRE",
  HEARTBEAT = "HEARTBEAT",
  ID_TAKEN = "ID-TAKEN",
  ERROR = "ERROR",
  THEATER_MISSING_SID = "THEATER_MISSING_SID",
  THEATER_INVALID_SUBSCRIPTION = "THEATER_INVALID_SUBSCRIPTION"
}
