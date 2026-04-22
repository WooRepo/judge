/*
define variables:
score = the variable determining if the judge believes you.
sentences = the array holding the judges response.
openings = the random openings for the judge
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

//define a list of fluff words to remove
const fluffWords = [
  "a",
  "about",
  "above",
  "across",
  "after",
  "afterwards",
  "again",
  "against",
  "all",
  "almost",
  "alone",
  "along",
  "already",
  "also",
  "although",
  "always",
  "am",
  "among",
  "amongst",
  "amoungst",
  "an",
  "and",
  "another",
  "any",
  "anyhow",
  "anyone",
  "anything",
  "anyway",
  "anywhere",
  "are",
  "around",
  "as",
  "at",
  "be",
  "became",
  "because",
  "been",
  "before",
  "beforehand",
  "behind",
  "being",
  "below",
  "beside",
  "besides",
  "between",
  "beyond",
  "both",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "dare",
  "despite",
  "did",
  "do",
  "does",
  "done",
  "down",
  "during",
  "each",
  "eg",
  "either",
  "else",
  "elsewhere",
  "enough",
  "etc",
  "even",
  "ever",
  "every",
  "everyone",
  "everything",
  "everywhere",
  "except",
  "few",
  "first",
  "for",
  "former",
  "formerly",
  "from",
  "further",
  "furthermore",
  "had",
  "has",
  "have",
  "he",
  "hence",
  "her",
  "here",
  "hereabouts",
  "hereafter",
  "hereby",
  "herein",
  "hereinafter",
  "heretofore",
  "hereunder",
  "hereupon",
  "herewith",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "however",
  "i",
  "ie",
  "if",
  "in",
  "indeed",
  "inside",
  "instead",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "last",
  "latter",
  "latterly",
  "least",
  "less",
  "lot",
  "lots",
  "many",
  "may",
  "me",
  "meanwhile",
  "might",
  "mine",
  "more",
  "moreover",
  "most",
  "mostly",
  "much",
  "must",
  "my",
  "myself",
  "namely",
  "near",
  "need",
  "neither",
  "never",
  "nevertheless",
  "next",
  "no",
  "nobody",
  "none",
  "noone",
  "nor",
  "not",
  "nothing",
  "now",
  "nowhere",
  "of",
  "off",
  "often",
  "oftentimes",
  "on",
  "once",
  "one",
  "only",
  "onto",
  "or",
  "other",
  "others",
  "otherwise",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "outside",
  "over",
  "per",
  "perhaps",
  "rather",
  "re",
  "same",
  "second",
  "several",
  "shall",
  "she",
  "should",
  "since",
  "so",
  "some",
  "somehow",
  "someone",
  "something",
  "sometime",
  "sometimes",
  "somewhat",
  "somewhere",
  "still",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "thence",
  "there",
  "thereabouts",
  "thereafter",
  "thereby",
  "therefore",
  "therein",
  "thereof",
  "thereon",
  "thereupon",
  "these",
  "they",
  "third",
  "this",
  "those",
  "though",
  "through",
  "throughout",
  "thru",
  "thus",
  "to",
  "together",
  "too",
  "top",
  "toward",
  "towards",
  "um",
  "under",
  "until",
  "up",
  "upon",
  "us",
  "used",
  "very",
  "via",
  "was",
  "we",
  "well",
  "were",
  "what",
  "whatever",
  "when",
  "whence",
  "whenever",
  "where",
  "whereafter",
  "whereas",
  "whereby",
  "wherein",
  "whereupon",
  "wherever",
  "whether",
  "which",
  "while",
  "whither",
  "who",
  "whoever",
  "whole",
  "whom",
  "whose",
  "why",
  "whyever",
  "will",
  "with",
  "within",
  "without",
  "would",
  "yes",
  "yet",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

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

//convert userPrompt to lowercase and then strip of punctuation
userPrompt = userPrompt.toLowerCase();
userPrompt = userPrompt.replace(
  /[\.,-\/#!$%\^&\*;:{}="'\-_`~()@\+\?><\[\]\+]/g,
  "",
);

console.log(file.wordsFull);

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
