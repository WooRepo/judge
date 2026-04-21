let userName = prompt("Please enter your name:");
let namePerson = userName.toLowerCase();
let sentences = [];
let openings = [
  "The arguments you gave were interesting, but now your judgement will be decided.",
  "Humans are fascinating creatures. Unfortunately, they lie. I, however, have found the truth.",
  "Let us begin my verdict.",
  "Fascinating. Some interesting points.",
];
const fluffWords = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "I",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
];

const negativeWords = ["um", "er", "and"];

console.log("You said:", namePerson);

const keywords = {
  alibi: false,
  murder: false,
};

for (const word in keywords) {
  if (namePerson.includes(word)) {
    keywords[word] = true;
  }
}

sentences[0] = openings[Math.floor(Math.random() * openings.length)];

setInterval(() => {
  for (const key in keywords) {
    console.log(keywords);
  }
}, 1000);

if (keywords.murder == true) {
  console.log("I see you pointed out the murder.");
}

console.log(sentences.join(" "));
// make it so each set of sentences is chosen with an if.
//make it so that different sentences give different score.
