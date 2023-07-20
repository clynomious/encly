
# Encly

Create Enka Network Card with Canvas


## Installation

```bash
  npm install encly

```
    
## Usage/Examples

```javascript
const Encly = require('encly')

const card = new Encly.Card();

card.getCard(id).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});
```


## Result/Example

```json
[
  {
    "name": "Barbara",
    "url": "https://i.ibb.co/BwnH9rt/d3032d2c54c2.png"
  },
  {
    "name": "Nahida",
    "url": "https://i.ibb.co/gVHxkGB/b0ab56b302fd.png"
  },
  {
    "name": "Klee",
    "url": "https://i.ibb.co/R04whYN/0ed856e97ab1.png"
  },
  {
    "name": "Qiqi",
    "url": "https://i.ibb.co/41v0pVL/32272b229da2.png"
  },
  {
    "name": "Yaoyao",
    "url": "https://i.ibb.co/z8qDKBj/3a2c212ac543.png"
  },
  {
    "name": "Diona",
    "url": "https://i.ibb.co/pbchtKm/472752c34523.png"
  },
  {
    "name": "Sayu",
    "url": "https://i.ibb.co/rdTMVVf/50e5f72ccea7.png"
  },
  {
    "name": "Dori",
    "url": "https://i.ibb.co/jhKh2KQ/c5fa1b1366be.png"
  }
]

```