import fluffData from "./json/fluffWords.json" with { type: "json" };
import wordsData from "./json/wordsFull.json" with { type: "json" };

let caseOverview = "";
let keywords = {};
let superKeywords = {};
let badWords = {};
const urlParams = new URLSearchParams(window.location.search);
const caseId = Math.random().toString(36);
const threshold = 250;
let deductionCount = 0;
let judgingScore = 0;
const fluffWords = new Set(fluffData);
let wordsFull = wordsData;
const wordDictionary = new Set(wordsFull);
let invalidCount = 0;
/*
define variables:
score = the variable determining if the judge believes you.
userPrompt 
sentences = the array holding the judges response.
openings = the random openings for the judge
wordsFull = define the array that is a list of words to be fetched later
fluffWords = define the array that is a list of fluff words to be fetched later
*/
let score = 0;
let userPrompt = "";
let sentences = [];
const openings = [
  "The arguments you gave were interesting, but now your client's judgement will be decided.",
  "Humans are fascinating creatures. Unfortunately, they lie. I, however, have found the truth.",
  "Let us begin my verdict.",
  "Fascinating. Some interesting points.",
  "I am a reasoning model of the highest calibre. If your client is lying, I will be able to tell.",
];
//define keywords
if (urlParams.has("case1")) {
  caseOverview = `The Case of the Missing Ear
12/3/26

Police arrived late Tuesday night at the house of Joelle Smith after a neighbor heard a commotion and called at 10:50. They found her bent over the lifeless corpse of her cousin, the body still warm. There were no fingerprints, only tire marks from her car. They immediately arrested her on a charge of manslaughter. You can sense this case is not what it seems.

Joelle has asked for your help in solving her cousin Sam’s “murder.”

According to Joelle: It was late one night, and she was backing her car into her driveway after a long day at work. She got in at roughly 11. However, she heard a large crunch from under her car wheels. She got out of the car and saw a dead body beneath her tires. It was her cousin Sam! Initially, she thought she had crushed him, and she was so scared she couldn’t speak, but when she looked closer, she noticed that one of his ears had been cleanly cut off.

According to the worried neighbor, Ms. Park: I heard a scream come from the house next door, and I immediately called the police. I was friends with the old owner of the house, Mr. Ron Smith, before his passing. Ever since his daughter and that damn cousin moved in, I haven’t really had much to do with them.

Other Clues:

Excerpt from the will of Mr. Ronald E. Smith: “My greatest treasure, that I leave to my beloved nephew, shall be locked for 10 years, until they are of sound maturity to receive it.”

Excerpt from the obituary of Mr. Ronald E. Smith: A much-loved father, husband, uncle, and friend, Mr. Ronald Smith passed away in his house on Thursday, the 12th of March 2016. A hardworking banker, but a jeweler at heart, Mr. Smith will be sorely missed. Details of his death will not be disclosed at this time. The will reading will take place on his estate.

Article of Note: The Ear of Littlegrove (Rockmouth Jewelers, 4/5/84). This magnificent earring has been missing for decades and is one of the most coveted pieces of jewelry in existence. It vanished in the early 60s and is presumably in the collection of a wealthy collector. If any jeweler were to possess it, it would be the crown jewel of their collection.

Attendance List at the Will Reading of Mr. Ronald Smith: 
Mrs. Beatrice Smith — Family; Mr. Felix Carlyle — Family; Ms. Rosa Samuel — Family; Mr. Sam Smith — Family; Mrs. Jasmine Park — Friend; Ms. Joelle Smith — Family; Mr. Charlie Pearl — Friend; Mrs. Rhonda Carlyle — Family; Mr. Steven Rockmouth; Lawyer — Mrs. Abbey Green`;
  keywords = {
    park: false,
    parks: false,
    jasmine: false,
    neighbor: false,
    neighbors: false,
    ronald: false,
    ron: false,
    uncle: false,
    father: false,
    tire: false,
    tires: false,
    auto: false,
    house: false,
    estate: false,
    ear: false,
    ears: false,
    cut: false,
    wound: false,
    injury: false,
    blade: false,
    knife: false,
    weapon: false,
    sharp: false,
    scissors: false,
    years: false,
    ten: false,
    timeline: false,
    time: false,
    date: false,
    night: false,
    late: false,
    early: false,
    before: false,
    already: false,
    minutes: false,
    timing: false,
    schedule: false,
    clock: false,
    pm: false,
    scream: false,
    screamed: false,
    screaming: false,
    commotion: false,
    noise: false,
    sound: false,
    loud: false,
    fight: false,
    arguing: false,
    will: false,
    testament: false,
    inheritance: false,
    read: false,
    reading: false,
    motive: false,
    greed: false,
    valuable: false,
    steal: false,
    stolen: false,
    theft: false,
    robber: false,
    fortune: false,
    12: false,
    3: false,
    26: false,
    2026: false,
    march: false,
    2016: false,
    16: false,
  };

  superKeywords = {
    10: false,
    50: false,
    11: false,
    eleven: false,
    fifty: false,
    arrived: false,
    discrepancy: false,
    contradiction: false,
    sequence: false,
    earing: false,
    earrings: false,
    earring: false,
    jewel: false,
    jewelry: false,
    treasure: false,
    crown: false,
    coveted: false,
    missing: false,
    collection: false,
    heirloom: false,
    cleanly: false,
    sliced: false,
    severed: false,
    mutilated: false,
    postmortem: false,
    surgical: false,
    rockmouth: false,
    steven: false,
    banker: false,
    expert: false,
    appraiser: false,
    jeweler: false,
    attendance: false,
    present: false,
    list: false,
  };

  badWords = {
    beatrice: false,
    felix: false,
    rosa: false,
    charlie: false,
    rhonda: false,
    abbey: false,
    green: false,
    carlyle: false,
    pearl: false,
    samuel: false,
    ghost: false,
    phantom: false,
    spirit: false,
    specter: false,
    zombie: false,
    reincarnation: false,
    curse: false,
    haunting: false,
    haunted: false,
    fake: false,
    phoney: false,
    swear: false,
    promise: false,
    believe: false,
    trust: false,
    honest: false,
    truthful: false,
    logic: false,
    obviously: false,
    clearly: false,
    poison: false,
    poisoned: false,
    venom: false,
    gun: false,
    shot: false,
    shooting: false,
    pistol: false,
    bullet: false,
    stabbed: false,
    stabbing: false,
    suffocated: false,
    strangled: false,
    drowned: false,
    explosion: false,
    fire: false,
    alien: false,
    aliens: false,
    monster: false,
    creature: false,
  };
} else if (urlParams.has("case2")) {
  caseOverview = "";
  keywords = {
    alibi: false,
    laura: false,
    saracovsky: false,
  };

  superKeywords = {
    morning: false,
    newspaper: false,
    janet: false,
  };

  badWords = {
    jose: false,
  };
} else if (urlParams.has("case3")) {
  caseOverview = "";
  keywords = {
    alibi: false,
    laura: false,
    saracovsky: false,
  };

  superKeywords = {
    morning: false,
    newspaper: false,
    janet: false,
  };

  badWords = {
    jose: false,
  };
}

function sentencePush(
  list1,
  key1,
  sentence,
  targetBool,
  list2,
  key2,
  targetBool2,
  elseValue,
) {
  if (key2 == null) {
    if (list1[key1] === targetBool) {
      sentences.push(sentence);
    } else {
      sentences.push(elseValue);
    }
  } else {
    if (list1[key1] === targetBool && list2[key2] === targetBool2) {
      sentences.push(sentence);
    } else {
      sentences.push(elseValue);
    }
  }
}

function keywordCheck(list, pointCount, textArray) {
  for (const word in list) {
    if (textArray.includes(word)) {
      if (list[word] === false) {
        judgingScore += pointCount;
        list[word] = true;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("caseFilesPopup").showModal();
  document.getElementById("popupTitle").textContent = "Case No. " + caseId;
  document.getElementById("popupText").textContent = caseOverview;
  document
    .getElementById("defenseButton")
    .addEventListener("click", (event) => {
      userPrompt = document.getElementById("defenseEnter").value;
      if (!userPrompt.trim()) return;
      document.getElementById("defenseEnter").value = "";
      const defenseButton = event.target;
      defenseButton.disabled = true;
      //convert userPrompt to lowercase and then strip of punctuation
      userPrompt = userPrompt.toLowerCase();
      userPrompt = userPrompt.replace(
        /[\.,-\/#!$%\^&\*;:{}="'\-_`~()@\+\?><\[\]\+]/g,
        "",
      );

      //split into words
      let textArray = userPrompt.split(" ");

      //filter textArray (the split user prompt)
      textArray = textArray.filter(function (el) {
        return !fluffWords.has(el);
      });

      //check for keywords and turn to true
      keywordCheck(keywords, 12, textArray);
      keywordCheck(badWords, -6, textArray);
      keywordCheck(superKeywords, 32, textArray);

      const filteredArray = textArray.filter(
        (item) => !wordDictionary.has(item),
      );
      console.log(filteredArray);
      //convert textArray back into user prompt
      userPrompt = textArray.join(" ");
      sentences.push(openings[Math.floor(Math.random() * openings.length)]);
      if (urlParams.has("case1")) {
        sentencePush(
          superKeywords,
          "discrepancy",
          "The timeline mismatch... It does seem strange.",
          true,
          null,
          null,
          null,
          "The timeline parameters seem sound.",
        );
        sentencePush(
          superKeywords,
          "treasure",
          "The legendary earring angle holds weight.",
          true,
          null,
          null,
          null,
          "You haven't established a clear motive.",
        );
      } else if (urlParams.has("case2")) {
        sentencePush(
          keywords,
          "alibi",
          "His alibi... It does seem strange.",
          true,
          null,
          null,
          null,
          "His alibi seems sound.",
        );
      } else if (urlParams.has("case3")) {
        sentencePush(
          keywords,
          "alibi",
          "His alibi... It does seem strange.",
          true,
          null,
          null,
          null,
          "His alibi seems sound.",
        );
      } else {
        console.log("ERROR: NO CASES SELECTED");
      }

      deductionCount = filteredArray.length * 3;

      judgingScore = judgingScore - deductionCount;

      if (judgingScore >= threshold) {
        console.log("DEBUG: You win.");
        document.body.style.backgroundImage = "url('sprite/judgePass.png')";
      } else {
        console.log("DEBUG: You lose.");
        document.body.style.backgroundImage = "url('sprite/judgeAngry.png')";
      }
      //the judge final response
      console.log(sentences.join(" "));
      console.log(wordDictionary);
      console.log(judgingScore);
    });
});
