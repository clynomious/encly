const createCard = require('../utils/createCard.js')
const axios = require('axios');
const { EnkaNetwork } = require("enkanetwork");
const enka = new EnkaNetwork({ language: "EN" });

module.exports = class Card {
  async getCard(uid) {
    const chardata = await enka.fetchUser(uid);
    let result = []
    for (let i = 0; i < chardata.characters.length; i++) {
      const card = await createCard(chardata.characters[i]);
      // Prepare the data for imgbb API request
      const formData = new FormData();
      formData.append('image', card.toString('base64'));
  
      // Make a POST request to imgbb API
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          key: 'ea0f2bfaa7c07130266ca23b11e0dcf3'
        }
      });
      result.push({
        name: chardata.characters[i].name,
        url: response.data.data.url
      })
    }
    return result
  }
  }