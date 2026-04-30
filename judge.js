import fluffData from "./json/fluffWords.json" with { type: "json" };
import wordsData from "./json/wordsFull.json" with { type: "json" };

var fluffWords = fluffData;
var wordsFull = wordsData;
const wordDictionary = new Set(wordsFull);
var invalidCount = 0

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
let userPrompt = prompt("Please enter your name:");
let sentences = [];
let openings = [
  "The arguments you gave were interesting, but now your judgement will be decided.",
  "Humans are fascinating creatures. Unfortunately, they lie. I, however, have found the truth.",
  "Let us begin my verdict.",
  "Fascinating. Some interesting points.",
  "I am a reasoning model of the highest calibre. If you are lying, I will be able to tell.",
];
//define keywords
const keywords = {
  alibi: false,
  murder: false,
};

//convert userPrompt to lowercase and then strip of punctuation
userPrompt = userPrompt.toLowerCase();
userPrompt = userPrompt.replace(
  /[\.,-\/#!$%\^&\*;:{}="'\-_`~()@\+\?><\[\]\+]/g,
  "",
);

document.addEventListener("DOMContentLoaded", function() {
  let button = document.getElementById('redButton')

  button.style.left = 50
  button.style.top = 50
});

//split into words
let textArray = userPrompt.split(" ");          

//filter textArray (the split user prompt)
textArray = textArray.filter(function (el) {
  return !fluffWords.includes(el);
});

for (var i = 0; i < textArray.length; i++); {
  if (wordDictionary.has(textArray[i]))
    invalidCount += 1
    console.log(invalidCount)
}

//convert textArray back into user prompt
userPrompt = textArray.join(" ");

//check for keywords and turn to true
for (const word in keywords) {
  if (userPrompt.includes(word)) {
    keywords[word] = true;
  }
}

//push the opening sentence to sentences array
sentences.push(openings[Math.floor(Math.random() * openings.length)]);

//further sentences:
if (keywords.alibi == true && keywords.murder == false)
  sentences.push("Hello my name is joe bartolo joe");
else if (keywords.murder == true)
  sentences.push("I see you pointed out the murder.");
else sentences.push("Hello my name is joe bartolo john");

//the judge final response
console.log(sentences.join(" "));
console.log(wordDictionary);
