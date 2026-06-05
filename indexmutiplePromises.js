const fs = require("fs/promises");
const superagent = require("superagent");

async function getDogPicture() {
  try {
    const data = await fs.readFile(`${__dirname}/dog.txt`, "utf-8");
    console.log(`Breed:${data}`);
    const resPro1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const resPro2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const resPro3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const all = await Promise.all([resPro1, resPro2, resPro3]);
    const imgs = all.map((el) => {
      return el.body.message;
    });
    console.log(imgs);
    await fs.writeFile(`${__dirname}/dogImagePath.txt`, imgs.join("\n"));
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
