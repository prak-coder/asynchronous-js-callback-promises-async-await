const fs = require("fs/promises");
const superagent = require("superagent");

async function getDogPicture() {
  try {
    const data = await fs.readFile(`${__dirname}/dog.txt`, "utf-8");
    console.log(`Breed:${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    console.log(res.body.message);
    await fs.writeFile(`${__dirname}/dogImagePath.txt`, res.body.message);
    console.log("image path written in file");
    return "2.second log";
  } catch (error) {
    console.log(error);
  }
}

//iife
(async () => {
  try {
    console.log("1.getting dog pic");
    const x = await getDogPicture();
    console.log(x);
    console.log("3.done getting doc pics");
  } catch (error) {
    console.log(error);
  }
})();
