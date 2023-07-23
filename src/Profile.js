const { EnkaNetwork } = require("enkanetwork");
const enka = new EnkaNetwork({ language: "EN" });

class Profile {
    async getProfile(uid) {
        try {
            const chardata = await enka.fetchUser(uid);
            return chardata.player;
        } catch (error) {
            console.error("Error while fetching character data:", error.message);
            return [];
        }
    }

    async getCharacters(uid) {
        try {
          const chardata = await enka.fetchUser(uid);
          return chardata.characters.map((character, index) => {
            return { name: character.name, id: index + 1 };
          });
        } catch (error) {
          console.error("Error while fetching character data:", error.message);
          throw error;
        }
      }
}

module.exports = Profile;