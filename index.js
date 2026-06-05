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
  } catch (error) {
    console.log(error);
  }
}
getDogPicture();
