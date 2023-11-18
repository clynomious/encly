const Encly = require("./index");
const fs = require("fs");

const card = new Encly.Card().setCharacter(5);

card
  .getOneCardBuffer(857067560)
  .then((data) => {
    fs.writeFileSync("card.png", data.buffer);
  })
  .catch((err) => {
    console.log(err);
  });

// const profile = new Encly.Profile();

// profile
//   .getProfile(857067560)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
