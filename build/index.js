"use strict";
var InitModule = function (ctx, logger, nk, initializer) {
    initializer.registerMatchmakerMatched(matchmakerMatched);
    initializer.registerRpc("getServerIp", getServerIp); // getting server ip
    initializer.registerAfterAuthenticateEmail(afterCreate); //For the Player wallet initilization
    initializer.registerRpc("updateWallet", updateWallet); //For the Player wallet update
    initializer.registerRpc("update_characterlevel_wallet", update_characterlevel_wallet); //Character level upgrade 
    initializer.registerRpc("update_lootbox_count", update_lootbox_count); //lootbox count
    //initializer.registerRpc("update_player_stats",update_playerData); //For the player Data Gameover
    initializer.registerRpc("gemtocoin_exchange", gemtocoin_exchange); //Converting Gems to Coin 
    initializer.registerRpc("iap_updatewallet", iap_updatewallet); //Updating Gems when iap_success
    logger.info("Custom RPC Registered");
};
var matchmakerMatched = function (ctx, logger, nk, matchedUsers) {
    logger.info('Matchmaking succesful');
    logger.info("Matched players ".concat(matchedUsers[0].presence.username, " & ").concat(matchedUsers[1].presence.username));
    return nk.matchCreate('getServerIp');
};
var getServerIp = function (ctx, logger, nk) { return JSON.stringify({ ip: "127.0.0.1" }); };
//call at Authentications e-mail success
var afterCreate = function (ctx, logger, nk, data, req) {
    if (data.created) {
        var user_id = ctx.userId;
        logger.info("Player wallet Initilization");
        //Player wallet
        var changeset = {
            coins: 100,
            gems: 50,
            no_of_cards_rage: 100,
            no_of_cards_death: 150,
            no_of_cards_calixta: 100,
            no_of_cards_q2: 100,
            no_of_cards_looper: 150,
            no_of_cards_stanz: 150,
            no_of_cards_kiddu: 100,
            no_of_cards_respirator: 200,
            deities_pack: 1,
            mega_pack: 1,
            ultimate_pack: 1
        };
        var metadata = {
            gameResult: "Initilization",
        };
        try {
            var result = nk.walletUpdate(user_id, changeset, metadata, false);
        }
        catch (error) {
            logger.info("error");
        }
        //Player Artifacts
        logger.info("Player Artifacts Initilization");
        var artifactsInventory = '{"playerAvatar":[{"gems":2,"imageId":"avatar1","imageName":"imageName1","isUnlocked":false},{"gems":3,"imageId":"avatar2","imageName":"imageName2","isUnlocked":false},{"gems":2,"imageId":"avatar3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"avatar4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"avatar5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"avatar6","imageName":"imageName6","isUnlocked":false},{"gems":1,"imageId":"avatar7","imageName":"imageName7","isUnlocked":false}],"playerBanner":[{"gems":1,"imageId":"banner1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"banner2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"banner3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"banner4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"banner5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"banner6","imageName":"imageName6","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner6","imageName":"imageName6","isUnlocked":false}],"playerFrame":[{"gems":1,"imageId":"frame1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"frame2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"frame3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"frame4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"frame5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"frame6","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"frame7","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"frame8","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame6","imageName":"imageName6","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame7","imageName":"imageName7","isUnlocked":false}]}';
        var equippedArtifacts = '{"avatar": 0,"banner": 0,"frame": 0}';
        var playerArtifacts = [
            {
                collection: "inventory",
                key: "playerArtifacts",
                userId: user_id,
                value: JSON.parse(artifactsInventory),
            },
            {
                collection: "inventory",
                key: "equippedArtifacts",
                userId: user_id,
                value: JSON.parse(equippedArtifacts),
            },
        ];
        try {
            nk.storageWrite(playerArtifacts);
        }
        catch (error) {
            logger.info("error");
        }
        //Player character_stats and level ,Character Access
        logger.info("Player Character_stats");
        var character_level = '"{\"rage\":[{\"coins\":20,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"death\":[{\"coins\":30,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"calixta\":[{\"coins\":30,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"looper\":[{\"coins\":20,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"q2\":[{\"coins\":30,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"respirator\":[{\"coins\":30,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"stanz\":[{\"coins\":30,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}],\"kiddu\":[{\"coins\":30,\"level\":1,\"cards\":20},{\"coins\":40,\"level\":2,\"cards\":40},{\"coins\":60,\"level\":3,\"cards\":60}]}"';
        var current_character_level = '"{\"calixta\":1,\"death\":1,\"looper\":3,\"rage\":1,\"q2\":1,\"kiddu\":1,\"respirator\":3,\"capt_stanz\":1}"';
        var character_access = '{"rage_isUnlocked":false,"death_isUnlocked":true,"calixta_isUnlocked":false,"q2_isUnlocked":false,"looper_isUnlocked":true,"stanz_isUnlocked":true,"kiddu_isUnlocked":false,"respirator_isUnlocked":false}';
        var character_inventory = [
            {
                collection: "character_inventory",
                key: "character_level",
                userId: user_id,
                value: JSON.parse(character_level),
            },
            {
                collection: "character_inventory",
                key: "current_character_level",
                userId: user_id,
                value: JSON.parse(current_character_level),
            },
            {
                collection: "character_inventory",
                key: "character_access",
                userId: user_id,
                value: JSON.parse(character_access),
            },
        ];
        try {
            nk.storageWrite(character_inventory);
        }
        catch (error) {
            logger.info("error");
        }
        //Player Stats
        logger.info("Player Stats Initilization");
        var playerStatsInventory = '{"kills":0,"deaths":0,"kd_ratio":0,"winloss_ratio":0,"mvp":0,"consecutive_wins":0}';
        var playerexperience = '{"player_rank":0,"player_level":0,"player_xp_current":0,"player_xp_total":0,"rank_xp":0}';
        var playerData = [
            {
                collection: "playerData",
                key: "player_stats",
                userId: user_id,
                value: JSON.parse(playerStatsInventory),
            },
            {
                collection: "playerData",
                key: "player_experience",
                userId: user_id,
                value: JSON.parse(playerexperience),
            },
        ];
        try {
            nk.storageWrite(playerData);
        }
        catch (error) {
            logger.info("error");
        }
        // player Skins management
        logger.info("Player heroes skins Initilization");
        var rage_skins1 = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var death_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var calixta_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var q2_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var looper_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var stanz_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var respirator_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var kiddu_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
        var skins_inventory = [
            {
                collection: "skins_inventory",
                key: "rage_skins",
                userId: user_id,
                value: JSON.parse(rage_skins1),
            },
            {
                collection: "skins_inventory",
                key: "death_skins",
                userId: user_id,
                value: JSON.parse(death_skins),
            },
            {
                collection: "skins_inventory",
                key: "calixta_skins",
                userId: user_id,
                value: JSON.parse(calixta_skins),
            },
            {
                collection: "skins_inventory",
                key: "q2_skins",
                userId: user_id,
                value: JSON.parse(q2_skins),
            },
            {
                collection: "skins_inventory",
                key: "looper_skins",
                userId: user_id,
                value: JSON.parse(looper_skins),
            },
            {
                collection: "skins_inventory",
                key: "stanz_skins",
                userId: user_id,
                value: JSON.parse(stanz_skins),
            },
            {
                collection: "skins_inventory",
                key: "respirator_skins",
                userId: user_id,
                value: JSON.parse(respirator_skins),
            },
            {
                collection: "skins_inventory",
                key: "kiddu_skins",
                userId: user_id,
                value: JSON.parse(kiddu_skins),
            },
        ];
        try {
            nk.storageWrite(skins_inventory);
        }
        catch (error) {
            logger.info("error");
        }
        //player purchase records
        logger.info("Player purchase Records");
        var purchase_iap = '{}';
        var purchase_data = [
            {
                collection: "purchase_data",
                key: "purchase_iap",
                userId: user_id,
                value: JSON.parse(purchase_iap),
            },
        ];
        try {
            nk.storageWrite(playerData);
        }
        catch (error) {
            logger.info("error");
        }
    }
    else
        return; // if account is not new return
};
//Update Player Wallet as Custom registerRpc
var updateWallet = function (ctx, logger, nk, payload // {\"artifact\": \"playerBanner\", \"index\": 3, \"coinsToRemove\" : 10}","rpc_id":"updatewallet"}
) {
    var user_id = ctx.userId; // Unique ID of the user
    var parsedPayload = JSON.parse(payload); // Parsing the payload sent from the user
    var artifact = parsedPayload["artifact"]; // the name of the artifact to be unlocked
    var index = parsedPayload["index"]; // the index inside the artifact that has been unlocked
    var status = { status: true, gemChange: 0 };
    var objectIds = [
        {
            collection: "inventory",
            key: "playerArtifacts",
            userId: user_id,
        },
    ];
    var results = [];
    results = nk.storageRead(objectIds);
    results.forEach(function (o) {
        var storageArtifact = o.value;
        var gemChange = -storageArtifact[artifact][index]["gems"];
        status.gemChange = gemChange;
        var changeset = { gems: gemChange };
        var metadata = {
            Unlock_Item: String(artifact) + " at index: " + String(index),
        }; // logging what the player unlocked
        var result;
        result = nk.walletUpdate(user_id, changeset, metadata, true); //update the wallet
        storageArtifact[artifact][index]["isUnlocked"] = true; // set the artifact as unlocked
        var newStorageArtifact = [
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
function returnCharacterCards(hero) {
    switch (hero) {
        case "calixta":
            return "no_of_cards_calixta";
        case "death":
            return "no_of_cards_death";
        case "rage":
            return "no_of_cards_rage";
        case "looper":
            return "no_of_cards_looper";
        default:
            return "";
    }
}
var update_characterlevel_wallet = function (ctx, logger, nk, payload // "{\"hero\":\"%s\"}" ,"rpc_id":"update_characterlevel_wallet"}
) {
    var _a;
    var user_id = ctx.userId; // Unique ID of the user
    var parsedPayload = JSON.parse(payload);
    var hero = parsedPayload["hero"].toLowerCase();
    var current_character_levels;
    var current_character_level;
    var character_level;
    var objectIds = [
        {
            collection: "character_inventory",
            key: "current_character_level",
            userId: user_id,
        },
        {
            collection: "character_inventory",
            key: "character_level",
            userId: user_id,
        },
    ];
    var results = []; // store result of storage read here
    try {
        // get the results from the storage read
        results = nk.storageRead(objectIds);
        // check the keys to the corresponding result index
        if (results[0].key == "current_character_level") {
            current_character_levels = results[0].value;
            current_character_level = current_character_levels[hero];
            character_level = results[1].value[hero];
        }
        else {
            current_character_levels = results[1].value;
            current_character_level = current_character_levels[hero];
            character_level = results[0].value[hero];
        }
        // assign a var to hold the current character level value.
        var character_level_values = character_level[current_character_level - 1];
        // create the change set to update the database.
        var changeset = (_a = {
                //updating coins and cards.
                coins: -character_level_values.coins
            },
            _a[returnCharacterCards(hero)] = -character_level_values.cards,
            _a);
        logger.info(JSON.stringify(changeset));
        if (current_character_level == character_level.length) {
            // check if the current character is at max level.
            return JSON.stringify({ status: "Max" });
        }
        else {
            // if character is not max level then upgrade 
            current_character_levels[hero] += 1; // upgrade the level
            var walletUpdate = [
                {
                    userId: user_id,
                    changeset: changeset,
                },
            ];
            var characterLevelUpdate = [
                {
                    collection: "character_inventory",
                    key: "current_character_level",
                    userId: user_id,
                    value: current_character_levels,
                },
            ];
            var walletUpdateResult = void 0;
            logger.info(JSON.stringify(walletUpdate));
            try {
                walletUpdateResult = nk.walletsUpdate(walletUpdate); // update the wallet
                nk.storageWrite(characterLevelUpdate); // write the updated character level data
                logger.info(JSON.stringify({ status: "upgraded ".concat(hero) }));
                return JSON.stringify({ status: "upgraded" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
    }
    catch (error) {
        logger.error(JSON.stringify(error.message));
        return JSON.stringify({ error: error.message });
    }
};
var update_lootbox_count = function (ctx, logger, nk, payload // {\"pack_name","rpc_id":"update_lootbox_count"}
) {
    var user_id = ctx.userId;
    var parsedPayload = JSON.parse(payload);
    var pack_name = parsedPayload["pack_name"];
    var lootbox_count_status = { status: true };
    if (pack_name == "deities_pack") {
        var deities_pack_Change = -1;
        var changeset = { deities_pack: deities_pack_Change };
        var metadata = { result: 'deities_pack_Change_Success' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
        }
        catch (error) {
            lootbox_count_status.status = false;
        }
    }
    else if (pack_name == "mega_pack") {
        var mega_pack_Change = -1;
        var changeset = { mega_pack: mega_pack_Change };
        var metadata = { result: 'mega_pack_Change_Success' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
        }
        catch (error) {
            lootbox_count_status.status = false;
        }
    }
    else if (pack_name == "ultimate_pack") {
        var ultimate_pack_Change = -1;
        var changeset = { ultimate_pack: ultimate_pack_Change };
        var metadata = { result: 'ultimate_pack_Change_Success' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
        }
        catch (error) {
            lootbox_count_status.status = false;
        }
    }
    return JSON.stringify(lootbox_count_status);
};
var gemtocoin_exchange = function (ctx, logger, nk, payload // {\"exhange_packname\": }","rpc_id":"exchange_packname"}
) {
    var user_id = ctx.userId;
    var parsedPayload = JSON.parse(payload);
    var exchange_packname = parsedPayload["exchange_packname"];
    if (exchange_packname == "coinconvert_pack1") {
        var coinchange = +150;
        var gemchange = -20;
        var changeset = { gems: gemchange, coins: coinchange };
        var metadata = { result: 'success_Exchange' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "success_Exchange" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    else if (exchange_packname == "coinconvert_pack2") {
        var coinchange = +400;
        var gemchange = -50;
        var changeset = { gems: gemchange, coins: coinchange };
        var metadata = { result: 'success_Exchange' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "success_Exchange" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    else if (exchange_packname == "coinconvert_pack3") {
        var coinchange = +1200;
        var gemchange = -140;
        var changeset = { gems: gemchange, coins: coinchange };
        var metadata = { result: 'success_Exchange' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "success_Exchange" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    else if (exchange_packname == "coinconvert_pack4") {
        var coinchange = +2600;
        var gemchange = -280;
        var changeset = { gems: gemchange, coins: coinchange };
        var metadata = { result: 'success_Exchange' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "success_Exchange" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    else if (exchange_packname == "mega_pack_buy") {
        var mega_pack_buy = +1;
        var gemchange = -30;
        var changeset = { gems: gemchange, mega_pack: mega_pack_buy };
        var metadata = { result: 'mega_pack_buy' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "mega_pack_buy" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    else if (exchange_packname == "ultimate_pack_buy") {
        var ultimate_pack_buy = +1;
        var gemchange = -80;
        var changeset = { gems: gemchange, mega_pack: ultimate_pack_buy };
        var metadata = { result: 'ultimate_pack_buy' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "ultimate_pack_buy" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    else if (exchange_packname == "deities_pack_buy") {
        var deities_pack_buy = +1;
        var gemchange = -15;
        var changeset = { gems: gemchange, mega_pack: deities_pack_buy };
        var metadata = { result: 'deities_pack_buy' };
        var result = void 0;
        try {
            result = nk.walletUpdate(user_id, changeset, metadata, true);
            return JSON.stringify({ status: "deities_pack_buy" });
        }
        catch (error) {
            logger.error(JSON.stringify(error.message));
            return JSON.stringify({ error: error.message });
        }
    }
    return JSON.stringify({ status: "Exchange unsuccessful" });
};
var iap_updatewallet = function (ctx, logger, nk, payload // {\"item_id\":,\"boolSuccess:\" }","Item_id":"BoolSuccess"}
) {
    var user_id = ctx.userId;
    var parsedPayload = JSON.parse(payload);
    var item_id = parsedPayload["item_id"];
    var boolSuccess = parsedPayload["boolSuccess"];
    if (boolSuccess) {
        if (item_id == "gem_30") {
            var gemchange = +30;
            var changeset = { gems: gemchange };
            var metadata = { result: 'iap_gemchange_30' };
            var result = void 0;
            try {
                result = nk.walletUpdate(user_id, changeset, metadata, true);
                return JSON.stringify({ status: "Purchase_Success" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
        else if (item_id == "gem_80") {
            var gemChange = +80;
            var changeset = { gems: gemChange };
            var metadata = { result: 'iap_gemchange_80' };
            var result = void 0;
            try {
                result = nk.walletUpdate(user_id, changeset, metadata, true);
                return JSON.stringify({ status: "Purchase_Success" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
        else if (item_id == "gem_170") {
            var gemChange = +170;
            var changeset = { gems: gemChange };
            var metadata = { result: 'iap_gemchange_170' };
            var result = void 0;
            try {
                result = nk.walletUpdate(user_id, changeset, metadata, true);
                return JSON.stringify({ status: "Purchase_Success" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
        else if (item_id == "gem_360") {
            var gemChange = +360;
            var changeset = { gems: gemChange };
            var metadata = { result: 'iap_gemchange_360' };
            var result = void 0;
            try {
                result = nk.walletUpdate(user_id, changeset, metadata, true);
                return JSON.stringify({ status: "Purchase_Success" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
        else if (item_id == "gem_950") {
            var gemChange = +950;
            var changeset = { gems: gemChange };
            var metadata = { result: 'iap_gemchange_950' };
            var result = void 0;
            try {
                result = nk.walletUpdate(user_id, changeset, metadata, true);
                return JSON.stringify({ status: "Purchase_Success" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
        else if (item_id == "gems_2000") {
            var gemChange = +2000;
            var changeset = { gems: gemChange };
            var metadata = { result: 'iap_gemchange_2000' };
            var result = void 0;
            try {
                result = nk.walletUpdate(user_id, changeset, metadata, true);
                return JSON.stringify({ status: "Purchase_Success" });
            }
            catch (error) {
                logger.error(JSON.stringify(error.message));
                return JSON.stringify({ error: error.message });
            }
        }
    }
    return JSON.stringify({ status: "Exchange unsuccessful" });
};
