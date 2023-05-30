/*//Update Player Data at Gameover 
let updateplayerdata: nkruntime.RpcFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string // { PLayer stats - player stats Attribute : Value to update}","rpc_id":"updateplayerdata" }
)=> {
  let user_id = ctx.userId;

  let parsedPayload: { playerstat: string; value: number } = JSON.parse(payload); // Parsing the payload sent from the user
  let playerstat: string = parsedPayload["playerstat"]; // Player stats Attribute to be update
  let value: number = parsedPayload["value"]; // the value to update

  let status = { status: true, valueChange: 0 };

   let objectIds: nkruntime.StorageReadRequest[] = [
    {
      collection: "statistics",
      key: "playerStats",
      userId: user_id,
    },
  ];
  let results: nkruntime.StorageObject[] = [];
  results = nk.storageRead(objectIds);
  results.forEach((o) => {
    let storagestats = o.value;

    let valueChange = -storagePlayerstats[playerstat][value]["value"];
    status.valueChange = valueChange;
    let changeset = { value: valueChange };
    let metadata = {
      Update_player_attribute: String(playerstat) + "  " + String(value),
    }; // logging  

    // set the artifact as unlocked
    let newStorageArtifact: nkruntime.StorageWriteRequest[] = [
      {
        // new object to update the players Attribute
        collection: "statistics",
        key: "playerStats",
        userId: user_id,
        value: playerStatsInventory,
      },
    ];
    nk.storageWrite(newStorageArtifact); // update storage to set new update values
  });
  return JSON.stringify(status);
};

*/