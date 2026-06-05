const fs = require("fs");
const superagent = require("superagent");

//create promise for both read and write files
function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("i could not find that file");
      resolve(data);
    });
  });
}

function writeFilePromise(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("cannot find file to write");
      resolve("success");
    });
  });
}

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise(`${__dirname}/dogImagePath.txt`, res.body.message);
  })
  .then((res) => {
    console.log("dog img written inside file");
  })
  .catch((err) => {
    console.log(err);
  });

// function writeFilePromise() {}

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   console.log(`Breed:${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile(`${__dirname}/dogImagePath.txt`, res.body.message, (err) => {
//         console.log("image path written in file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
// console.log("1");

//callbacks
//  superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       fs.writeFile(`${__dirname}/dogImagePath.txt`, res.body.message, (err) => {
//         console.log("image path written in file");
//       });
//     });
