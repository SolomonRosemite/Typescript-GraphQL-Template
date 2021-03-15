const isInProduction = process.env.NODE_ENV === "production";
const useSSL = process.env.useSSL?.trim() === "true" ? true : false;
const port = process.env.PORT || 5000;

enum Collections {
  players = "Users",
}

export { Collections, isInProduction, useSSL, port };
