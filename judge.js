//ideas for grammer
//no direct word repeats (excluding some)

import fluffData from "./json/fluffWords.json" with { type: "json" };
import wordsData from "./json/wordsFull.json" with { type: "json" };

const threshold = 30;
let deductionCount = 0;
let judgingScore = 0;
const fluffWords = new Set(fluffData);
let wordsFull = wordsData;
const wordDictionary = new Set(wordsFull);
let invalidCount = 0;
// Now your existing logic will work immediately without any fetch/wait!
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
const keywords = {
  alibi: false,
  laura: false,
  saracovsky: false,
};

const superKeywords = {
  morning: false,
  newspaper: false,
  janet: false,
};

const badWords = {
  jose: false,
};

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

function keywordCheck(list, pointCount) {
  for (const word in list) {
    if (textArray.includes(word)) {
      if (list[word] === false) {
        judgingScore += pointCount;
        list[word] = true;
      }
    }
  }
}

do {
  userPrompt = document.getElementById("defenseEnter").value;
  document.getElementById("defenseEnter").value = "";
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
  keywordCheck(keywords, 12);
  keywordCheck(badWords, -6);
  keywordCheck(superKeywords, 32);

  const filteredArray = textArray.filter((item) => !wordDictionary.has(item));
  console.log(filteredArray);
  //convert textArray back into user prompt
  userPrompt = textArray.join(" ");

  //push the opening sentence to sentences array
  sentences.push(openings[Math.floor(Math.random() * openings.length)]);

  //further sentences:

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
} while (userPrompt != "");
