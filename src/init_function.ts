//call at Authentications e-mail success
const afterCreate: nkruntime.AfterHookFunction<
  nkruntime.Session,
  nkruntime.AuthenticateEmailRequest
> = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  data: nkruntime.Session,
  req: nkruntime.AuthenticateEmailRequest
) {
  if (data.created) {
    let user_id = ctx.userId;
    logger.info("Player wallet Initilization");
    //Player wallet
    let changeset = {
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
      deities_pack:1,
      mega_pack:1,
      ultimate_pack:1
    };
    let metadata = {
      gameResult: "Initilization",
    };
    try {
      var result = nk.walletUpdate(user_id, changeset, metadata, false);
    } catch (error) {
      logger.info("error");
    }

    //Player Artifacts
    logger.info("Player Artifacts Initilization");
    let artifactsInventory ='{"playerAvatar":[{"gems":2,"imageId":"avatar1","imageName":"imageName1","isUnlocked":false},{"gems":3,"imageId":"avatar2","imageName":"imageName2","isUnlocked":false},{"gems":2,"imageId":"avatar3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"avatar4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"avatar5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"avatar6","imageName":"imageName6","isUnlocked":false},{"gems":1,"imageId":"avatar7","imageName":"imageName7","isUnlocked":false}],"playerBanner":[{"gems":1,"imageId":"banner1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"banner2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"banner3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"banner4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"banner5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"banner6","imageName":"imageName6","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"Anim_Banner6","imageName":"imageName6","isUnlocked":false}],"playerFrame":[{"gems":1,"imageId":"frame1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"frame2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"frame3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"frame4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"frame5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"frame6","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"frame7","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"frame8","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame1","imageName":"imageName1","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame2","imageName":"imageName2","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame3","imageName":"imageName3","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame4","imageName":"imageName4","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame5","imageName":"imageName5","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame6","imageName":"imageName6","isUnlocked":false},{"gems":1,"imageId":"Anim_Frame7","imageName":"imageName7","isUnlocked":false}]}';
    let equippedArtifacts = '{"avatar": 0,"banner": 0,"frame": 0}';
    let playerArtifacts: nkruntime.StorageWriteRequest[] = [
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
    } catch (error) {
      logger.info("error");
    }


    //Player character_stats and level ,Character Access
    logger.info("Player Character_stats");
    let character_level = '{"rage":[{"level1":{"coins":20,"level":1,"no_of_cards_rage":20},"level2":{"coins":40,"level":2,"no_of_cards_rage":40},"level3":{"coins":60,"level":3,"no_of_cards_rage":60}}],"death":[{"level1":{"coins":30,"level":1,"no_of_cards_death":20},"level2":{"coins":40,"level":2,"no_of_cards_death":40},"level3":{"coins":60,"level":3,"no_of_cards_death":60}}],"calixta":[{"level1":{"coins":30,"level":1,"no_of_cards_calixta":20},"level2":{"coins":40,"level":2,"no_of_cards_calixta":40},"level3":{"coins":60,"level":3,"no_of_cards_calixta":60}}]}';
    let current_character_level= '{"rage_level": 1,"death_level": 1,"calixta_level": 1}';
    let character_access = '{"rage_isUnlocked":false,"death_isUnlocked":true,"calixta_isUnlocked":false,"q2_isUnlocked":false,"looper_isUnlocked":true,"stanz_isUnlocked":true,"kiddu_isUnlocked":false,"respirator_isUnlocked":false}';
    let character_inventory: nkruntime.StorageWriteRequest[] = [
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
    } catch (error) {
      logger.info("error");
    }


    //Player Stats
    logger.info("Player Stats Initilization");
    let playerStatsInventory ='{"kills":0,"deaths":0,"kd_ratio":0,"winloss_ratio":0,"mvp":0,"consecutive_wins":0}';
    let playerexperience='{"player_rank":0,"player_level":0,"player_xp_current":0,"player_xp_total":0,"rank_xp":0}';
    let playerData: nkruntime.StorageWriteRequest[] = [
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
    } catch (error) {
      logger.info("error");
    }


    // player Skins management
    logger.info("Player heroes skins Initilization");
    let rage_skins1 = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let death_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let calixta_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let q2_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let looper_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let stanz_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let respirator_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let kiddu_skins = '{"stock":true,"common1":false,"rare1":false,"epic1":false,"legendary1":false}';
    let skins_inventory: nkruntime.StorageWriteRequest[] = [   
    
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
    } catch (error) {
      logger.info("error");
    }
   } 
   else
   return; // if account is not new return
};
