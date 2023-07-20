// Import modules
const createCard = require('../utils/createCard.js');
const axios = require('axios');
const { EnkaNetwork } = require('enkanetwork');
const enka = new EnkaNetwork({ language: 'EN' });

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
          formData.append('image', card.toString('base64'));

          // Make a POST request to imgbb API
          const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            params: {
              key: 'ea0f2bfaa7c07130266ca23b11e0dcf3'
            }
          });

          return {
            name: character.name,
            url: imgbbResponse.data.data.url
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
