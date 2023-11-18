const Canvas = require("canvas");
const fs = require("fs");
const {
  genshinStats,
  applyText,
  applyTextWithIcon,
  compositeImagesWithMask,
  truncateText,
  talentColor,
  createRoundedRectangle,
  artifactCard,
  addPercentageIfPercentStat,
  drawText,
} = require("./function");

async function createCard(chardata, splashart) {
  // Create a canvas
  const canvas = Canvas.createCanvas(2605, 997);
  const ctx = canvas.getContext("2d");

  // Draw background image
  const idchar = chardata.id;
  const bg = `https://raw.githubusercontent.com/FajarCly/encly-bg/main/${chardata.element}.png`;
  const mask = `${__dirname}/../assets/background/MASK.png`;
  await compositeImagesWithMask(idchar, bg, splashart, mask);
  const bgImage = await Canvas.loadImage(`${idchar}_bg.png`);
  const bgshadow = await Canvas.loadImage(
    `${__dirname}/../assets/background/SHADOW.png`
  );
  ctx.drawImage(bgImage, 0, 0);
  //delete bgImage
  fs.unlinkSync(`${idchar}_bg.png`);
  ctx.drawImage(bgshadow, 0, 540);

  // Draw weapon
  const weapon = chardata.weapon;
  const weaponIcon = await Canvas.loadImage(weapon.icon);
  const star = await Canvas.loadImage(
    `${__dirname}/../assets/stars/${weapon.rarity}_stars_light.png`
  );
  const mainStats = await applyTextWithIcon(
    weapon.mainStat.statValue,
    32,
    `${__dirname}/../assets/icon/ATTACK.png`,
    40,
    "rgba(0, 0, 0, 0.5)",
    "white",
    10
  );
  const mainImage = await Canvas.loadImage(mainStats);
  const bgweapon = await Canvas.loadImage(
    createRoundedRectangle(712, 261, 34, "rgba(0, 0, 0, 0.5)")
  );
  ctx.drawImage(bgweapon, 42, 42);
  ctx.drawImage(weaponIcon, 55, 77, 191, 191);
  ctx.drawImage(star, 55, 256, 191, 23);
  drawText(ctx, truncateText(weapon.name, 25), 36, "white", 250, 108);
  drawText(ctx, `LVL ${weapon.level}/90`, 32, "white", 250, 162);
  drawText(ctx, "R" + weapon.improvement, 32, "#ff8900", 465, 168);
  ctx.drawImage(mainImage, 250, 188);
  if (weapon.subStat) {
    let statvalue = 0;
    if (weapon.subStat.appendPropId === "FIGHT_PROP_ELEMENT_MASTERY") {
      statvalue = weapon.subStat.statValue;
    } else {
      statvalue = weapon.subStat.statValue + "%";
    }
    const subStats = await applyTextWithIcon(
      statvalue,
      32,
      `${__dirname}/../assets/icon/${weapon.subStat.appendPropId.replace(
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
  const bgstats = await Canvas.loadImage(
    createRoundedRectangle(712, 628, 34, "rgba(0, 0, 0, 0.5)")
  );
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
  for (let i = 0; i < charStats.length; i++) {
    const icon = await Canvas.loadImage(
      `${__dirname}/../assets/icon/${charStats[i].icon}`
    );
    ctx.drawImage(icon, 82, 400 + (i * ynya - 37), 40, 50);
    ctx.textAlign = "left";
    drawText(ctx, charStats[i].id, 32, "white", 135, 400 + i * ynya);
    ctx.textAlign = "right";
    drawText(ctx, charStats[i].value, 32, "white", 710, 400 + i * ynya);
  }

  // Draw talent
  const tdata = chardata;
  const talent = await Canvas.loadImage(`${__dirname}/../assets/bg-talent.png`);
  const talentIcons = [];
  const talentLevelImages = [];

  for (let i = 0; i < 3; i++) {
    const talentIcon = await Canvas.loadImage(tdata.skills[i].icon);
    const talentLevel = applyText(
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
    `${__dirname}/../assets/stars/${cname.rarity}_stars_frame.png`
  );
  const bglevel = applyText(
    `Level ${cname.level}/90`,
    32,
    "rgba(0, 0, 0, 0.5)",
    "white",
    10
  );
  const bgfriend = await applyTextWithIcon(
    cname.friendshipLevel,
    32,
    `${__dirname}/../assets/icon/FRIENDS.png`,
    30,
    "rgba(0, 0, 0, 0.5)",
    "white",
    10
  );
  const bgfriendImage = await Canvas.loadImage(bgfriend);
  const bglevelImage = await Canvas.loadImage(bglevel);
  const bgname = await Canvas.loadImage(
    createRoundedRectangle(461, 57, 10, "rgba(0, 0, 0, 0.5)")
  );
  ctx.drawImage(rarity, 1235, 815);
  ctx.drawImage(bgname, 1072, 847);
  ctx.textAlign = "center";
  drawText(ctx, cname.name, 36, "white", 1302, 887);
  ctx.drawImage(bglevelImage, 1135, 910);
  ctx.drawImage(bgfriendImage, 1365, 910);

  // Draw constellation
  const constdata = chardata;
  for (let i = 0; i < constdata.constellation.length; i++) {
    let constbg;
    let consticon;
    if (constdata.constellation[i].unlocked === true) {
      constbg = await Canvas.loadImage(
        `${__dirname}/../assets/const/open/OPEN_CONST_${constdata.element}.png`
      );
      consticon = await Canvas.loadImage(constdata.constellation[i].icon);
    } else {
      constbg = await Canvas.loadImage(
        `${__dirname}/../assets/const/closed/CLOSE_CONST_${constdata.element}.png`
      );
      consticon = await Canvas.loadImage(
        `${__dirname}/../assets/const/closed/CLOSED.png`
      );
    }
    ctx.drawImage(constbg, 1715, 125 + i * 125, 112, 119);
    ctx.drawImage(consticon, 1736, 150 + i * 125, 70, 70);
  }

  // Draw Artifact
  async function drawArtifact(ctx, artdata, position) {
    const articon = await artdata.icon;
    await artifactCard(artdata.id, artbg, articon, maskarte);
    const artefak = await Canvas.loadImage(`${artdata.id}_arte.png`);
    const mainicon = await Canvas.loadImage(
      `${__dirname}/../assets/icon/${artdata.mainStats.mainPropId.replace(
        "FIGHT_PROP_",
        ""
      )}.png`
    );
    const rarity = await Canvas.loadImage(
      `${__dirname}/../assets/stars/Star${artdata.rarity}.png`
    );

    const y = position * 186 + 42; // Vertical position based on the index

    ctx.drawImage(artefak, 1850, y);
    fs.unlinkSync(`${artdata.id}_arte.png`);
    ctx.drawImage(mainicon, 2032, y + 18, 40, 50);
    ctx.textAlign = "right";
    let statvalue = 0;
    const noPercent = [
      "FIGHT_PROP_ELEMENT_MASTERY",
      "FIGHT_PROP_HP",
      "FIGHT_PROP_ATTACK",
    ];
    const isNoPercent = noPercent.includes(artdata.mainStats.mainPropId);
    if (isNoPercent) {
      statvalue = artdata.mainStats.statValue;
    } else {
      statvalue = artdata.mainStats.statValue + "%";
    }
    drawText(ctx, statvalue, 48, "white", 2080, y + 118);
    ctx.drawImage(rarity, 1870, y + 117, 170, 52);
    drawText(ctx, "+" + artdata.level, 24, "white", 2080, y + 153);

    if (artdata.subStats) {
      for (let i = 0; i < artdata.subStats.length; i++) {
        const subicon = await Canvas.loadImage(
          `${__dirname}/../assets/icon/${artdata.subStats[
            i
          ].appendPropId.replace("FIGHT_PROP_", "")}.png`
        );
        const row = Math.floor(i / 2); // Calculate row based on current index
        const col = i % 2; // Calculate column based on current index
        const offsetX = 2130;
        const offsetY = y + 26;
        const spacingX = 170;
        const spacingY = 70;
        const iconWidth = 40;
        const iconHeight = 50;
        const posX = offsetX + col * (iconWidth + spacingX);
        const posY = offsetY + row * spacingY;

        ctx.drawImage(subicon, posX, posY, iconWidth, iconHeight);
        ctx.textAlign = "left";
        const statValue = artdata.subStats[i].statValue;
        const appendPropId = artdata.subStats[i].appendPropId;
        drawText(
          ctx,
          "+" + addPercentageIfPercentStat(statValue, appendPropId),
          36,
          "white",
          posX + 50,
          posY + 40
        );
      }
    }
  }

  const artdata = chardata.reluquary;
  const artbg = `${__dirname}/../assets/arte/bg-arte.png`;
  const maskarte = `${__dirname}/../assets/arte/mask.png`;

  const artPositions = ["Flower", "Feather", "Sands", "Goblet", "Circlet"];
  for (let i = 0; i < artPositions.length; i++) {
    const artType = artPositions[i];
    const artItem = artdata.find((item) => item.type === artType);
    if (artItem) {
      await drawArtifact(ctx, artItem, i);
    } else {
      const notStats = await Canvas.loadImage(
        createRoundedRectangle(712, 170, 34, "rgba(0, 0, 0, 0.2)")
      );
      ctx.drawImage(notStats, 1850, i * 186 + 42);
    }
  }

  return canvas.toBuffer();
}

module.exports = createCard;
