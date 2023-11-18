const createCard = require('../utils/createCard.js');
const axios = require('axios');
const { EnkaNetwork } = require('enkanetwork');
const enka = new EnkaNetwork({ language: 'EN' });
var FormData = require('form-data');
const { fetchSplashData } = require('../utils/function.js');

class Card {
  constructor() {
    this.character = 1;
    this.splash = null; //'https://telegra.ph/file/5844684b7ce7e4cb0a8e3.jpg'
  }
  
  setCharacter(value) {
    this.character = value - 1;
    return this;
  }
  
  setSplash(value) {
    this.splash = value;
    return this;
  }
  
  async getCard(uid) {
    try {
      const chardata = await enka.fetchUser(uid);
      const getSplash = await fetchSplashData();

      const result = await Promise.all(
        chardata.characters.map(async (character) => {
          const splash = getSplash[character.id].gachaIcon;
          const gacha = `https://enka.network/ui/${splash}.png`;
          const card = await createCard(character, gacha);

          const formData = new FormData();
          formData.append('file', card, `${character.name}.jpg`);

          const teleResponse = await axios.post('https://telegra.ph/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          return {
            name: character.name,
            url: 'https://telegra.ph' + teleResponse.data[0].src
          };
        })
      );

      return result;
    } catch (error) {
      console.error('Error while fetching character data:', error.message);
      return [];
    }
  }

  async getCardBuffer(uid) {
    try {
      const chardata = await enka.fetchUser(uid);
      const getSplash = await fetchSplashData();

      const result = await Promise.all(
        chardata.characters.map(async (character) => {
          const splash = getSplash[character.id].gachaIcon;
          const gacha = `https://enka.network/ui/${splash}.png`;
          const card = await createCard(character, gacha);

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

  async getOneCard(uid) {
    try {
      const chardata = await enka.fetchUser(uid);
      const getSplash = await fetchSplashData();

      const splash = getSplash[chardata.characters[this.character].id].gachaIcon;
      let gacha = `https://enka.network/ui/${splash}.png`;
      
      if(this.splash) {
        gacha = this.splash;
      } else {
        gacha = `https://enka.network/ui/${splash}.png`;
      }

      const card = await createCard(chardata.characters[this.character], gacha);

      const formData = new FormData();
      formData.append('file', card, `${chardata.characters[this.character].name}.jpg`);

      const imgbbResponse = await axios.post('https://telegra.ph/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return {
        name: chardata.characters[this.character].name,
        url: 'https://telegra.ph' + imgbbResponse.data[0].src
      };
    } catch (error) {
      console.error('Error while fetching character data:', error.message);
      return [];
    }
  }

  async getOneCardBuffer(uid) {
    try {
      const chardata = await enka.fetchUser(uid);
      const getSplash = await fetchSplashData();

      const splash = getSplash[chardata.characters[this.character].id].gachaIcon;
      let gacha = `https://enka.network/ui/${splash}.png`;
      
      if(this.splash) {
        gacha = this.splash;
      } else {
        gacha = `https://enka.network/ui/${splash}.png`;
      }

      const card = await createCard(chardata.characters[this.character], gacha);

      return {
        name: chardata.characters[this.character].name,
        buffer: card
      };
    } catch (error) {
      console.error('Error while fetching character data:', error);
      return [];
    }
  }
}

module.exports = Card;