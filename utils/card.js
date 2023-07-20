const Canvas = require("canvas");
const fetch = require("node-fetch");
const fs = require("fs");
const {
  genshinStats,
  applyText,
  applyTextWithIcon,
  compositeImagesWithMask,
  truncateText,
  talentColor,
} = require("./function");

async function Card(chardata) {
  const splashData = await fetch(
    "https://raw.githubusercontent.com/Jelosus2/enkanetwork.js/master/src/utils/characters.json"
  );
  const getSplash = await splashData.json();

  // Create a canvas
  const canvas = Canvas.createCanvas(1860, 997);
  const ctx = canvas.getContext("2d");

  // Font setup
  Canvas.registerFont("./assets/font/genshin.ttf", { family: "HYWenHei-85W" });

  // Draw background image
  const idchar = chardata.id;
  const splash = getSplash[idchar].gachaIcon;
  const bg = `./assets/background/${chardata.element}.png`;
  const gacha = `https://enka.network/ui/${splash}.png`;
  const mask = `./assets/background/MASK.png`;
  const bgshadow = await Canvas.loadImage(`./assets/background/SHADOW.png`);
  await compositeImagesWithMask(idchar, bg, gacha, mask);
  const bgImage = await Canvas.loadImage(`${idchar}_bg.png`);
  ctx.drawImage(bgImage, 0, 0);
  //delete bgImage
  fs.unlinkSync(`${idchar}_bg.png`);
  ctx.drawImage(bgshadow, 0, 540);

  // Draw weapon
  const weapon = chardata.weapon;
  const bgweapon = await Canvas.loadImage("./assets/bg-weapon.png");
  const weaponIcon = await Canvas.loadImage(weapon.icon);
  const star = await Canvas.loadImage(
    `./assets/stars/${weapon.rarity}_stars_light.png`
  );
  const mainStats = await applyTextWithIcon(
    weapon.mainStat.statValue,
    32,
    "./assets/icon/ATTACK.png",
    40,
    "rgba(0, 0, 0, 0.5)",
    "white",
    10
  );
  const mainImage = await Canvas.loadImage(mainStats);
  ctx.drawImage(bgweapon, 42, 42, 712, 261);
  ctx.drawImage(weaponIcon, 55, 77, 191, 191);
  ctx.drawImage(star, 55, 256, 191, 23);
  ctx.font = "36px HYWenHei 85W";
  ctx.fillStyle = "white";
  ctx.fillText(truncateText(weapon.name, 25), 250, 108);
  ctx.font = "32px HYWenHei 85W";
  ctx.fillStyle = "white";
  ctx.fillText(`LVL ${weapon.level}/90`, 250, 162);
  ctx.fillStyle = "#ff8900";
  ctx.fillText(weapon.improvement, 465, 163);
  ctx.drawImage(mainImage, 250, 188);
  if (weapon.subStat) {
    const subStats = await applyTextWithIcon(
      weapon.subStat.statValue + "%",
      32,
      `./assets/icon/${weapon.subStat.appendPropId.replace(
        "FIGHT_PROP_",
        ""
      )}.png`,
      40,
      "rgba(0, 0, 0, 0.5)",
      "white",
      10
    );
    const subImage = await Canvas.loadImage(subStats);
    ctx.drawImage(subImage, 440, 188);
  }

  // Draw stats
  const bgstats = await Canvas.loadImage("./assets/bg-stats.png");
  ctx.drawImage(bgstats, 42, 327, 712, 628);
  const charStats = await genshinStats(chardata);
  let ynya = 0;
  if (charStats.length === 9) {
    ynya = 63;
  } else if (charStats.length === 8) {
    ynya = 73;
  } else if (charStats.length === 7) {
    ynya = 83;
  }
  ctx.font = "32px HYWenHei 85W";
  ctx.fillStyle = "white";
  for (let i = 0; i < charStats.length; i++) {
    const icon = await Canvas.loadImage(`./assets/icon/${charStats[i].icon}`);
    ctx.drawImage(icon, 82, 400 + (i * ynya - 37), 40, 50);
    ctx.textAlign = "left";
    ctx.fillText(charStats[i].id, 135, 400 + i * ynya);
    ctx.textAlign = "right";
    ctx.fillText(charStats[i].value, 710, 400 + i * ynya);
  }

  // Draw talent
  const tdata = chardata;
  const talent = await Canvas.loadImage("./assets/bg-talent.png");
  const talentIcons = [];
  const talentLevelImages = [];

  for (let i = 0; i < 3; i++) {
    const talentIcon = await Canvas.loadImage(tdata.skills[i].icon);
    const talentLevel = await applyText(
      tdata.skills[i].level,
      32,
      talentColor(tdata.skills[i].isBoosted),
      "white",
      20
    );
    const talentLevelImage = await Canvas.loadImage(talentLevel);
    talentIcons.push(talentIcon);
    talentLevelImages.push(talentLevelImage);
  }

  ctx.drawImage(talent, 774, 327, 142, 440);
  ctx.drawImage(talentIcons[0], 800, 327, 90, 90);
  ctx.drawImage(talentIcons[1], 800, 487, 90, 90);
  ctx.drawImage(talentIcons[2], 800, 647, 90, 90);
  ctx.drawImage(talentLevelImages[0], 825, 410);
  ctx.drawImage(talentLevelImages[1], 825, 567);
  ctx.drawImage(talentLevelImages[2], 825, 724);

  // Draw Name
  const cname = chardata;
  const rarity = await Canvas.loadImage(
    `./assets/stars/${cname.rarity}_stars_frame.png`
  );
  const bglevel = await applyText(
    `Level ${cname.level}/90`,
    32,
    "rgba(0, 0, 0, 0.5)",
    "white",
    10
  );
  const bgfriend = await applyTextWithIcon(
    cname.friendshipLevel,
    32,
    "./assets/icon/FRIENDS.png",
    30,
    "rgba(0, 0, 0, 0.5)",
    "white",
    10
  );
  const bgfriendImage = await Canvas.loadImage(bgfriend);
  const bgname = await Canvas.loadImage("./assets/bg-name.png");
  const bglevelImage = await Canvas.loadImage(bglevel);
  ctx.drawImage(rarity, 1235, 815);
  ctx.drawImage(bgname, 1072, 847);
  ctx.font = "36px HYWenHei 85W";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(cname.name, 1302, 887);
  ctx.drawImage(bglevelImage, 1135, 910);
  ctx.drawImage(bgfriendImage, 1365, 910);

  // Draw constellation
  const constdata = chardata;
  for (let i = 0; i < constdata.constellation.length; i++) {
    let constbg;
    let consticon;
    if (constdata.constellation[i].unlocked === true) {
      constbg = await Canvas.loadImage(
        `./assets/const/open/OPEN_CONST_${constdata.element}.png`
      );
      consticon = await Canvas.loadImage(constdata.constellation[i].icon);
    } else {
      constbg = await Canvas.loadImage(
        `./assets/const/closed/CLOSE_CONST_${constdata.element}.png`
      );
      consticon = await Canvas.loadImage(`./assets/const/closed/CLOSED.png`);
    }
    ctx.drawImage(constbg, 1705, 125 + i * 125, 112, 119);
    ctx.drawImage(consticon, 1726, 150 + i * 125, 70, 70);
  }

  return canvas.toBuffer();
}

module.exports = Card;
