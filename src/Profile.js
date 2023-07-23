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
}

module.exports = Profile;