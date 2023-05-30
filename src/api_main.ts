let InitModule: nkruntime.InitModule = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  initializer: nkruntime.Initializer
) => {
  initializer.registerMatchmakerMatched(matchmakerMatched);
  initializer.registerRpc("getServerIp", getServerIp); // getting server ip
  initializer.registerAfterAuthenticateEmail(afterCreate); //For the Player wallet initilization
  initializer.registerRpc("updateWallet", updateWallet); //For the Player wallet update
  initializer.registerRpc("update_characterlevel_wallet", update_characterlevel_wallet);
  initializer.registerRpc("update_lootbox_count",update_lootbox_count);
  //initializer.registerRpc("update_player_stats",update_playerData); //For the player Data Gameover
  logger.info("Custom RPC Registered");
};

const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  matchedUsers: nkruntime.MatchmakerResult[]
): string | void => {
  logger.info('Matchmaking succesful');
  logger.info(`Matched players ${matchedUsers[0].presence.username} & ${matchedUsers[1].presence.username}`);
  return nk.matchCreate('getServerIp')
};

let getServerIp: nkruntime.RpcFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
): string => JSON.stringify({ ip: "127.0.0.1" });

