# Encly

Create Enka Network Card with Canvas. This project is inspired by [EnkaCard](https://github.com/DEViantUA/EnkaCard/tree/EnkaCard2) because I'm not proficient in Python, so I created its JavaScript version.

## Installation

```bash
npm install encly
```

## Usage/Examples

```javascript
const Encly = require("encly");

const data = new Encly.Profile();

// get profile data
data
  .getProfile(uid)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const card = new Encly.Card();

// get link
card
  .getCard(id)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// for buffer result
card
  .getCardBuffer(id)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//get one card link
const card = new Encly.Card()
  .setCharacter(2) //set 1-8 in order of the character you have
  .setSplash("https://telegra.ph/file/f4f88905a8c0479818b9d.jpg"); //if you need custom splash art

card
  .getOneCard(857067560)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//for buffer result
card
  .getOneCardBuffer(857067560)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Result/Example

- getCard()

```json
[
  {
    "name": "Barbara",
    "url": "https://telegra.ph/file/6d60f9d148549ce91aeb3.png"
  },
  {
    "name": "Nahida",
    "url": "https://telegra.ph/file/403b204e677e9660f9dac.png"
  },
  {
    "name": "Klee",
    "url": "https://telegra.ph/file/57d5f480836b8641c12a2.png"
  },
  {
    "name": "Qiqi",
    "url": "https://telegra.ph/file/674ee9a5b3f8e320707bc.png"
  },
  {
    "name": "Yaoyao",
    "url": "https://telegra.ph/file/5fa31d7c2e67a9e680201.png"
  },
  {
    "name": "Diona",
    "url": "https://telegra.ph/file/c07d1863f8a33f525c1f3.png"
  },
  {
    "name": "Sayu",
    "url": "https://telegra.ph/file/0f2bf762a0d31360179d7.png"
  },
  {
    "name": "Dori",
    "url": "https://telegra.ph/file/66cb08d8a1ede22f55729.png"
  }
]
```

- getCardBuffer()

```json
[
  {
    "name": "Barbara",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Nahida",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Klee",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Qiqi",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Yaoyao",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Diona",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Sayu",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  },
  {
    "name": "Dori",
    "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
  }
]
```

- getOneCard()

```json
{
  "name": "Nahida",
  "url": "https://telegra.ph/file/f664db2e59c4aac66c9d3.png"
}
```

- getOneCardBuffer()

```json
{
  "name": "Nahida",
  "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 44 00 00 03 e5 08 06 00 00 00 f2 80 5e e7 00 00 00 06 62 4b 47 44 00 ff 00 ff 00 ff a0 bd a7 ...>"
}
```

- getProfile()

```json
{
  "nickname": "Cly",
  "signature": "Malas",
  "level": 58,
  "worldLevel": 8,
  "nameCard": {
    "id": 210119,
    "name": "Yelan: Throw",
    "icon": "https://enka.network/ui/UI_NameCardIcon_Yelan.png",
    "banner": "https://enka.network/ui/UI_NameCardPic_Yelan_P.png",
    "navbar": "https://enka.network/ui/UI_NameCardPic_Yelan_Alpha.png"
  },
  "achievements": 741,
  "abyssFloor": 12,
  "abyssLevel": 3,
  "charactersPreview": [
    {
      "id": 10000014,
      "name": "Barbara",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Barbara.png",
      "level": 80
    },
    {
      "id": 10000073,
      "name": "Nahida",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Nahida.png",
      "level": 90
    },
    {
      "id": 10000029,
      "name": "Klee",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Klee.png",
      "level": 90
    },
    {
      "id": 10000035,
      "name": "Qiqi",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Qiqi.png",
      "level": 1
    },
    {
      "id": 10000077,
      "name": "Yaoyao",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Yaoyao.png",
      "level": 59
    },
    {
      "id": 10000039,
      "name": "Diona",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Diona.png",
      "level": 40
    },
    {
      "id": 10000053,
      "name": "Sayu",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Sayu.png",
      "level": 20
    },
    {
      "id": 10000068,
      "name": "Dori",
      "icon": "https://enka.network/ui/UI_AvatarIcon_Dori.png",
      "level": 1
    }
  ],
  "nameCardsPreview": [],
  "profilePicture": {
    "id": 10000029,
    "name": "Klee",
    "icon": "https://enka.network/ui/UI_AvatarIcon_Klee.png"
  }
}
```

## Credit:

- Assets are taken from the repository [EnkaCard](https://github.com/DEViantUA/EnkaCard/tree/EnkaCard2).
