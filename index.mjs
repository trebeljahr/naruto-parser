import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { data } from "./naruto-data.mjs";
// import { URL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadImage(url) {
  try {
    console.log(new URL(url).pathname);
    const response = await axios({
      url,
      responseType: "stream",
    });
    response.data.pipe(
      fs.createWriteStream(path.join(__dirname, "imgs", new URL(url).pathname))
    );
  } catch (err) {
    console.log(err);
    console.log(err.data);
    throw err;
  }
}

const downloads = data.map(async (character) => {
  return downloadImage(character.avatarSrc);
});

const results = await Promise.allSettled(downloads);

const brokenCharacters = data.reduce((agg, character, index) => {
  console.log(results[index]);
  if (results[index].status === "rejected") {
    return [...agg, character];
  }
  return agg;
}, []);
console.log(brokenCharacters);
