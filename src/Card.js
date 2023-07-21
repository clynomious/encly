// Import modules
const createCard = require('../utils/createCard.js');
const axios = require('axios');
const { EnkaNetwork } = require('enkanetwork');
const enka = new EnkaNetwork({ language: 'EN' });
var FormData = require('form-data');

class Card {
  async getCard(uid) {
    try {
      // Fetch character data from the API
      const chardata = await enka.fetchUser(uid);

      // Process character data and upload images to imgbb
      const result = await Promise.all(
        chardata.characters.map(async (character) => {
          const card = await createCard(character);

          // Prepare the data for imgbb API request
          const formData = new FormData();
          formData.append('file', card, `${character.name}.jpg`);

          // Make a POST request to imgbb API
          const imgbbResponse = await axios.post('https://telegra.ph/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          return {
            name: character.name,
            url: 'https://telegra.ph' + imgbbResponse.data[0].src
          };
        })
      );

      return result;
    } catch (error) {
      console.error('Error while fetching character data:', error.message);
      return [];
    }
  },

  async getCardBuffer(uid) {
    try {
      // Fetch character data from the API
      const chardata = await enka.fetchUser(uid);

      // Process character data and upload images to imgbb
      const result = await Promise.all(
        chardata.characters.map(async (character) => {
          const card = await createCard(character);

          return {
            name: character.name,
            buffer: card
          };
        })
      );

      return result;
    } catch (error) {
      console.error('Error while fetching character data:', error.message);
      return [];
    }
  }

  
}

module.exports = Card;
