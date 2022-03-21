const queryForPage = (page) => `{
  characters(page: ${page}, filter: {}) {
    info {
      count
      pages
      next
      prev
    }
    results {
      _id
      name
      avatarSrc
      description
      rank
      village
    }
  }
}
`;

import fetch from "node-fetch";
import fs from "fs/promises";

let results = [];

let counter = 0;
while (true) {
  counter++;
  const response = await fetch("https://narutoql.up.railway.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: queryForPage(counter) }),
  });
  const data = await response.json();
  console.log(data.data.characters.results);
  results = [...results, ...data.data.characters.results];
  if (!data.data.characters.info.next || counter > 15) {
    console.log("Breaking after ", counter, "iterations");
    console.log(results);

    const brokenCharacters = [
      {
        _id: "61bd1dbc918f12c17b9c656c",
        name: "Ahiko",
        avatarSrc: "https://narutoql.s3.amazonaws.com/Ahiko.jpg",
        description:
          "Ahiko was a prisoner from Orochimaru&apos;s Northern Hideout. He and other prisoners were experimented upon with cursed seals.",
        rank: "Unknown",
        village: "",
      },
      {
        _id: "61bd1dbc918f12c17b9c65d8",
        name: "Mifu Shinobu",
        avatarSrc: "https://narutoql.s3.amazonaws.com/gear/ClothingMain.jpg",
        description: "Mifu Shinobu served as a ninja in Hidden Leaf.",
        rank: "Chuunin",
        village: "leaf village",
      },
      {
        _id: "61bd1dbc918f12c17b9c65e7",
        name: "Mousou",
        avatarSrc: "https://narutoql.s3.amazonaws.com/country/ToriMini.gif",
        description:
          "Mousou (Chief Advisor) served the Daimyou of the Bird Country. When Daimyou Oowashi died, he saw to it his son Sagi became the new Daimyou rather than the chief strategist Koumei.",
        rank: "Unknown",
        village: "",
      },
      {
        _id: "61bd1dbc918f12c17b9c65fb",
        name: "Oukei",
        avatarSrc: "https://narutoql.s3.amazonaws.com/Oukei.jpg",
        description:
          "During the first test of the Chuunin Exam, undercover Chuunin Examiners pretended to be students. These individuals knew all the answers to the first test and they were there for the other students to spy on. Oukei was such a Chuunin Examiner. If the students were able to spy and copy the undercover Examiners answers without being caught, they were then able to write down the answers. If the real Genin were caught spying though, they would have two points deducted from their tests. If the Genin got caught five times, they were out of the Exam for good.",
        rank: "Chuunin",
        village: "leaf village",
      },
      {
        _id: "61bd1dbc918f12c17b9c64bb",
        name: "Sarutobi Hiruzen",
        avatarSrc: "https://narutoql.s3.amazonaws.com/guide/hokage.jpg",
        description:
          "The Third Hokage, born Sarutobi Hiruzen, became Hokage again after the Fourth Hokage sacrificed his life to imprison the Kyuubi demon.",
        rank: "Kage",
        village: "leaf village",
      },
      {
        _id: "61bd1dbc918f12c17b9c651c",
        name: "Sasori",
        avatarSrc: "https://narutoql.s3.amazonaws.com/country/SunaMini.gif",
        description:
          "Sasori is a missing-nin from Hidden Sand Village who serves as a member of the Akatsuki Organization. He is very large in size, appearing to squat low to the ground when he slides across it.",
        rank: "Unknown (Probably Jounin)",
        village: "sand village",
      },
      {
        _id: "61bd1dbc918f12c17b9c661b",
        name: "Senju Touka",
        avatarSrc: "https://narutoql.s3.amazonaws.com/Touka.jpg",
        description:
          "Touka was an associate of Hashirama and a member of the Senju Clan. Her expertise was in Genjutsu. When she was 27, she and her clan allied with the Uchiha to help stabilize the borders of the Fire Country. This alliance brought about the formation of Konoha.",
        rank: "Unknown",
        village: "leaf village",
      },
      {
        _id: "61bd1dbc918f12c17b9c6634",
        name: "Sukima",
        avatarSrc: "https://narutoql.s3.amazonaws.com/Sukima.jpg",
        description:
          "Sukima was a Genin who took the Chuunin Exam. He was expelled from the first test after being caught cheating five times.",
        rank: "Genin",
        village: "leaf village",
      },
      {
        _id: "61bd1dbc918f12c17b9c6655",
        name: "Yagura",
        avatarSrc: "https://narutoql.s3.amazonaws.com/country/FireCountry.gif",
        description:
          "Yagura was young man who came to Konoha to study taijutsu under Might Guy. Yagura showed much progress in the week he trained under Guy. When Guy suggested Lee and Yagura spar, the youth hurt the already injured Lee. Yagura was surprised to learn Lee trained with weights and was previously injured. Outside of Guy&apos;s presence he mocked Lee and misled him about Guy&apos;s intentions.",
        rank: "Unknown",
        village: "",
      },
      {
        _id: "61bd1dbc918f12c17b9c64de",
        name: "Yondaime Kazekage (Fourth WindShadow)",
        avatarSrc: "https://narutoql.s3.amazonaws.com/guide/kazekage.jpg",
        description:
          "Yondaime Kazekage served as the head of Hidden Sand Village.",
        rank: "Kage",
        village: "sand village",
      },
    ];
    results = results.filter(
      (result) => !brokenCharacters.find(({ name }) => name === result.name)
    );
    await fs.writeFile("naruto-data.txt", JSON.stringify(results));
    break;
  }
}

console.log(results.length);
