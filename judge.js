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
var fluffWords = [];
var wordsFull = [];
//define keywords
const keywords = {
  alibi: false,
  murder: false,
};

//function to fetch full word list
function fetchWordData() {
  fetch("./json/wordsFull.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => (wordsFull = data))
    .catch((error) => console.error("Failed to fetch data:", error));
}

//fetch the list.
fetchWordData();

//function to fetch a list of fluff words
function fetchFluffData() {
  fetch("./json/fluffWords.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => (fluffWords = data))
    .catch((error) => console.error("Failed to fetch data:", error));
}

//fetch the list
fetchFluffData();

const wordDictionary = new Set(wordsFull);
//convert userPrompt to lowercase and then strip of punctuation
userPrompt = userPrompt.toLowerCase();
userPrompt = userPrompt.replace(
  /[\.,-\/#!$%\^&\*;:{}="'\-_`~()@\+\?><\[\]\+]/g,
  "",
);

//split into words
textArray = userPrompt.split(" ");

//filter textArray (the split user prompt)
textArray = textArray.filter(function (el) {
  return !fluffWords.includes(el);
});

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
