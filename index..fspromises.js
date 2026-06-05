const fs = require("fs/promises");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, "utf-8")
  .then((data) => {
    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return fs.writeFile(`${__dirname}/dogImagePath.txt`, res.body.message);
  })
  .then(() => {
    console.log("a new dog image path written in file");
  })
  .catch((err) => {
    console.log(err);
  });
