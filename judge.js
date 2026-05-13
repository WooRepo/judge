import fluffData from "./json/fluffWords.json" with { type: "json" };
import wordsData from "./json/wordsFull.json" with { type: "json" };

const threshold = 67;
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
let userPrompt = prompt("Please enter your prompt:");
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
  murder: false,
};

const superKeywords = {
  morning: false,
  newspaper: false,
};

const badWords = {
  
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
keywordCheck(keywords, 3) 
keywordCheck(badWords, -6) 
keywordCheck(superKeywords, 9) 

const filteredArray = textArray.filter((item) => !wordDictionary.has(item));
console.log(filteredArray);
//convert textArray back into user prompt
userPrompt = textArray.join(" ");

//push the opening sentence to sentences array
sentences.push(openings[Math.floor(Math.random() * openings.length)]);

//further sentences:
if (keywords.alibi == true && keywords.murder == false)
  sentences.push("His alibi?");
else if (keywords.murder == true)
  sentences.push("I see you pointed out the murder.");
else if (keywords.murder == true && keywords.alibi == true)
  sentences.push("I see you pointed out both the murder and the alibi.");
else sentences.push("I don't understand what you are saying.");

deductionCount = filteredArray.length * 3;

judgingScore = judgingScore - deductionCount;
//the judge final response
console.log(sentences.join(" "));
console.log(wordDictionary);
console.log(judgingScore);
