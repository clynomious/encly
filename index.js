const Canvas = require("canvas");

// Font setup
Canvas.registerFont(`${__dirname}/assets/font/genshin.ttf`, {
  family: "HYWenHei 85W",
});

module.exports.Card = require("./src/Card.js");
module.exports.Profile = require("./src/Profile.js");
