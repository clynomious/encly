const { createCanvas, loadImage } = require('canvas');
const Jimp = require('jimp');
const fs = require('fs');

  // Caching frequently used images
  let cachedImages = {};
  async function loadImageAsync(path) {
    if (!cachedImages[path]) {
      cachedImages[path] = await loadImage(path);
    }
    return cachedImages[path];
  }

  function getDmgBonus(data) {
    let id 
    let value
    let icon
      if (data.FIGHT_PROP_PHYSICAL_ADD_HURT !== 0) {
        id = 'Physical DMG Bonus'
        icon = 'PHYSICAL_ADD_HURT.png'
        value = (data.FIGHT_PROP_PHYSICAL_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_FIRE_ADD_HURT !== 0) {
        id = 'Pyro DMG Bonus'
        icon = 'PYRO.png'
        value = (data.FIGHT_PROP_FIRE_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_ELEC_ADD_HURT !== 0) {
        id = 'Electro DMG Bonus'
        icon = 'ELECTRO.png'
        value = (data.FIGHT_PROP_ELEC_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_WATER_ADD_HURT !== 0) {
        id = 'Hydro DMG Bonus',
        icon = 'HYDRO.png'
        value = (data.FIGHT_PROP_WATER_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_GRASS_ADD_HURT !== 0) {
        id = 'Dendro DMG Bonus',
        icon = 'DENDRO.png'
        value = (data.FIGHT_PROP_GRASS_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_WIND_ADD_HURT !== 0) {
        id = 'Anemo DMG Bonus',
        icon = 'ANEMO.png'
        value = (data.FIGHT_PROP_WIND_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_ROCK_ADD_HURT !== 0) {
        id = 'Geo DMG Bonus',
        icon = 'GEO.png'
        value = (data.FIGHT_PROP_ROCK_ADD_HURT * 100).toFixed(1) + '%'
      } else if (data.FIGHT_PROP_ICE_ADD_HURT !== 0) {
        id = 'Cryo DMG Bonus',
        icon = 'CRYO.png'
        value = (data.FIGHT_PROP_ICE_ADD_HURT * 100).toFixed(1) + '%'
      } 
      return {
        id,
        icon,
        value
      }
  }
  
  async function genshinStats(stat) {
    const data = stat.stats
    let idBonus = '';
    let iconBonus = '';
    let valueBonus = '';
  
    const dmgBonus = getDmgBonus(data);
    if (dmgBonus) {
      idBonus = dmgBonus.id;
      iconBonus = dmgBonus.icon;
      valueBonus = dmgBonus.value;
    }
  
    const result = [
      {
        id: 'HP',
        icon: 'HP.png',
        value: Number(data.FIGHT_PROP_CUR_HP.toFixed(0))
      },
      {
        id: 'ATK',
        icon: 'ATTACK.png',
        value: Number(data.FIGHT_PROP_CUR_ATTACK.toFixed(0))
      },
      {
        id: 'DEF',
        icon: 'DEFENSE.png',
        value: Number(data.FIGHT_PROP_CUR_DEFENSE.toFixed(0))
      },
      {
        id: 'Elemental Mastery',
        icon: 'ELEMENT_MASTERY.png',
        value: Number(data.FIGHT_PROP_ELEMENT_MASTERY.toFixed(0))
      },
      {
        id: 'Crit Rate',
        icon: 'CRITICAL.png',
        value: (data.FIGHT_PROP_CRITICAL * 100).toFixed(1) + '%'
      },
      {
        id: 'Crit DMG',
        icon: 'CRITICAL_HURT.png',
        value: (data.FIGHT_PROP_CRITICAL_HURT * 100).toFixed(1) + '%'
      }
    ];
  
    if (data.FIGHT_PROP_HEAL_ADD !== 0) {
      result.push(
        {
          id: 'Healing Bonus',
          icon: 'HEAL.png',
          value: (data.FIGHT_PROP_HEAL_ADD * 100).toFixed(1) + '%'
        }
      )
      }
  
    if (idBonus && valueBonus && iconBonus) {
      result.push(
        {
          id: idBonus,
          icon: iconBonus,
          value: valueBonus
        }
      );
    }
  
    result.push(
      {
        id: 'Energy Recharge',
        icon: 'CHARGE_EFFICIENCY.png',
        value: (data.FIGHT_PROP_CHARGE_EFFICIENCY * 100).toFixed(1) + '%'
      }
    );
    return result;
  }

  function applyText(text, fontSize, backgroundColor, textColor, radius) {  
    // Create a canvas with dimensions based on the text length
    const canvas = createCanvas(0, 0);
    const ctx = canvas.getContext('2d');
  
    // Set text properties
    ctx.font = `${fontSize}px HYWenHei 85W`;
  
    // Measure the text width
    const textMetrics = ctx.measureText(text);
  
    // Set canvas dimensions based on text length
    const canvasWidth = textMetrics.width + 20; 
    const canvasHeight = fontSize + 20;
  
    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Set canvas background with rounded corners effect
    const cornerRadius = radius;
    ctx.fillStyle = backgroundColor;
  
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0); // Top-left corner
    ctx.lineTo(canvasWidth - cornerRadius, 0);
    ctx.arcTo(canvasWidth, 0, canvasWidth, cornerRadius, cornerRadius); // Top-right corner
    ctx.lineTo(canvasWidth, canvasHeight - cornerRadius);
    ctx.arcTo(canvasWidth, canvasHeight, canvasWidth - cornerRadius, canvasHeight, cornerRadius); // Bottom-right corner
    ctx.lineTo(cornerRadius, canvasHeight);
    ctx.arcTo(0, canvasHeight, 0, canvasHeight - cornerRadius, cornerRadius); // Bottom-left corner
    ctx.lineTo(0, cornerRadius);
    ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius); // Top-left corner
    ctx.closePath();
    ctx.fill();
  
    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px HYWenHei 85W`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add text shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
      
    // Write the text on the canvas
    ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
  
    return canvas.toBuffer();
  }

  async function applyTextWithIcon(text, fontSize, iconFile, iconSize, backgroundColor, textColor, radius) {
    // Create a canvas with dimensions based on the text length
    const canvas = createCanvas(0, 0); 
    const ctx = canvas.getContext('2d');
  
    // Set text properties
    ctx.font = `${fontSize}px HYWenHei 85W`;
  
    // Measure the text width
    const textMetrics = ctx.measureText(text);
  
    // Set canvas dimensions based on text length
    const canvasWidth = textMetrics.width + iconSize + 50;
    const canvasHeight = Math.max(fontSize, iconSize) + 20;
  
    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Set canvas background with rounded corners effect
    const cornerRadius = radius;
    ctx.fillStyle = backgroundColor;
  
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0); // Top-left corner
    ctx.lineTo(canvasWidth - cornerRadius, 0);
    ctx.arcTo(canvasWidth, 0, canvasWidth, cornerRadius, cornerRadius); // Top-right corner
    ctx.lineTo(canvasWidth, canvasHeight - cornerRadius);
    ctx.arcTo(canvasWidth, canvasHeight, canvasWidth - cornerRadius, canvasHeight, cornerRadius); // Bottom-right corner
    ctx.lineTo(cornerRadius, canvasHeight);
    ctx.arcTo(0, canvasHeight, 0, canvasHeight - cornerRadius, cornerRadius); // Bottom-left corner
    ctx.lineTo(0, cornerRadius);
    ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius); // Top-left corner
    ctx.closePath();
    ctx.fill();
  
    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px HYWenHei 85W`;
    ctx.textBaseline = 'middle';

    // Add text shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Add Icon
    const icon = await loadImage(iconFile);
    const iconX = 20;
    const iconY = canvasHeight / 2 - iconSize / 2 - 5;
    ctx.drawImage(icon,  iconX, iconY, iconSize, iconSize + 8);
  
    // Write the text on the canvas
    const textX = iconX + iconSize + 10;
    ctx.fillText(text, textX, canvasHeight / 2);
  
    return canvas.toDataURL();
  }
  
  async function compositeImagesWithMask(idchar, baseImagePath, overlayImagePath, maskImagePath) {
    try {
      const baseImage = await Jimp.read(baseImagePath);
      const overlayImage = await Jimp.read(overlayImagePath);
      const maskImage = await Jimp.read(maskImagePath);
  
      overlayImage.contain(baseImage.getWidth(), baseImage.getHeight());
  
      overlayImage.mask(maskImage, 0, 0);
     
      baseImage.composite(overlayImage, 0, 0);
  

    const image = await baseImage.getBufferAsync(Jimp.AUTO);
    fs.writeFileSync(`${idchar}_bg.png`, image);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }

  function talentColor(boost) {
    if (boost === true) {
      return "rgba(0, 224, 255, 0.5)";
    } else {
      return "rgba(0, 0, 0, 0.5)";
    }
  }

  async function fetchSplashData() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Jelosus2/enkanetwork.js/master/src/utils/characters.json"
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching splash data:', error.message);
      throw error;
    }
  }

  
  module.exports = {
    loadImageAsync,
    genshinStats,
    applyText,
    applyTextWithIcon,
    compositeImagesWithMask,
    truncateText,
    talentColor,
    fetchSplashData
  }