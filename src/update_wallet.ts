
//Update Player Wallet as Custom registerRpc
let updateWallet: nkruntime.RpcFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string // {\"artifact\": \"playerBanner\", \"index\": 3, \"coinsToRemove\" : 10}","rpc_id":"updatewallet"}
) => {
  let user_id = ctx.userId; // Unique ID of the user

  let parsedPayload: { artifact: string; index: number } = JSON.parse(payload); // Parsing the payload sent from the user
  let artifact: string = parsedPayload["artifact"]; // the name of the artifact to be unlocked
  let index: number = parsedPayload["index"]; // the index inside the artifact that has been unlocked

  let status = { status: true, gemChange: 0 };

  let objectIds: nkruntime.StorageReadRequest[] = [
    {
      collection: "inventory",
      key: "playerArtifacts",
      userId: user_id,
    },
  ];

  let results: nkruntime.StorageObject[] = [];
  results = nk.storageRead(objectIds);
  results.forEach((o) => {
    let storageArtifact = o.value;

    let gemChange = -storageArtifact[artifact][index]["gems"];
    status.gemChange = gemChange;
    let changeset = { gems: gemChange };
    let metadata = {
      Unlock_Item: String(artifact) + " at index: " + String(index),
    }; // logging what the player unlocked

    let result: nkruntime.WalletUpdateResult;
    result = nk.walletUpdate(user_id, changeset, metadata, true); //update the wallet

    storageArtifact[artifact][index]["isUnlocked"] = true; // set the artifact as unlocked
    let newStorageArtifact: nkruntime.StorageWriteRequest[] = [
      {
        // new object to update the player's artifact
        collection: "inventory",
        key: "playerArtifacts",
        userId: user_id,
        value: storageArtifact,
      },
    ];
    nk.storageWrite(newStorageArtifact); // update storage to set new updated index values
  });
  return JSON.stringify(status);
};