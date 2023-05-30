let update_characterlevel_wallet: nkruntime.RpcFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string // "{\"hero\":\"%s\"}" ,"rpc_id":"update_characterlevel_wallet"}
) => {
	let user_id = ctx.userId; // Unique ID of the user

    let parsedPayload: { hero: string } = JSON.parse(payload);
	let hero: string = parsedPayload["hero"];

    //logger.debug(hero);

    let status ={status: false,coinChange: 0 };



    let objectIds: nkruntime.StorageReadRequest[] = [
    {
      collection: "character_inventory",
      key: "current_character_level",
      userId: user_id,
    },
  ];

};