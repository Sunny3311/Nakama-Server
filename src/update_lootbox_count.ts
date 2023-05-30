let update_lootbox_count: nkruntime.RpcFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string // {\"pack_name","rpc_id":"update_lootbox_count"}
  ) => {
	let user_id = ctx.userId;
	let parsedPayload : {pack_name: string}=JSON.parse(payload);
	let pack_name : string = parsedPayload["pack_name"];

	let lootbox_count_status = {status :true};

	if ( pack_name == "deities_pack")
	{
	let deities_pack_Change = -1;
	let changeset = { deities_pack: deities_pack_Change };
	let metadata = { result:'deities_pack_Change_Success'};
	let result: nkruntime.WalletUpdateResult;
	try {
     result = nk.walletUpdate(user_id, changeset, metadata, true);
     } catch (error) {
     lootbox_count_status.status = false;
     }
	}
	else if(pack_name == "mega_pack")
	{
    let mega_pack_Change = -1;
	let changeset = { mega_pack: mega_pack_Change };
	let metadata = { result:'mega_pack_Change_Success'};
	let result: nkruntime.WalletUpdateResult;
	try {
     result = nk.walletUpdate(user_id, changeset, metadata, true);
     } catch (error) {
     lootbox_count_status.status = false;
     }
	}
	else if (pack_name == "ultimate_pack")
	{
     let ultimate_pack_Change = -1;
	 let changeset = { ultimate_pack: ultimate_pack_Change };
	 let metadata = {result:'ultimate_pack_Change_Success'};
	 let result: nkruntime.WalletUpdateResult;
	 try {
     result = nk.walletUpdate(user_id, changeset, metadata, true);
     } catch (error) {
     lootbox_count_status.status = false;
     }
	}

	return JSON.stringify(lootbox_count_status);
};