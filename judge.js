/**
 * Title: ChatJPT
 * Author: Bill Kelly
 * Date: April 22nd 2026
 * Version: 38
 * Purpose: CSC Assesment
  _______  _______  _______ _________ _        _______  _______             _______  _______  _       _________ _        _______ 
(  ____ \(  ____ )(  ___  )\__   __/( \      (  ____ \(  ____ )  |\     /|(  ___  )(  ____ )( (    /|\__   __/( (    /|(  ____ \
| (    \/| (    )|| (   ) |   ) (   | (      | (    \/| (    )|  | )   ( || (   ) || (    )||  \  ( |   ) (   |  \  ( || (    \/
| (_____ | (____)|| |   | |   | |   | |      | (__    | (____)|  | | _ | || (___) || (____)||   \ | |   | |   |   \ | || |      
(_____  )|  _____)| |   | |   | |   | |      |  __)   |     __)  | |( )| ||  ___  ||     __)| (\ \) |   | |   | (\ \) || | ____ 
      ) || (      | |   | |   | |   | |      | (      | (\ (     | || || || (   ) || (\ (   | | \   |   | |   | | \   || | \_  )
/\____) || )      | (___) |___) (___| (____/\| (____/\| ) \ \__  | () () || )   ( || ) \ \__| )  \  |___) (___| )  \  || (___) |
\_______)|/       (_______)\_______/(_______/(_______/|/   \__/  (_______)|/     \||/   \__/|/    )_)\_______/|/    )_)(_______)
To have the most fun, please play the game before looking at the code (it tells you all of the solutions.)
 **/

import fluffData from "./json/fluffWords.json" with { type: "json" };
import wordsData from "./json/wordsFull.json" with { type: "json" };

// Constants and other variables
let complete = false;
let caseOverview = "";
let keywords = {};
let superKeywords = {};
let badWords = {};
const URLPARAMS = new URLSearchParams(window.location.search);
const CASEID = Math.random().toString(36); // Generates a unique case reference ID (For immersion).
const THRESHOLD = 180;
let deductionCount = 0;
let judgingScore = 0;
const AUDIO = new Audio('sprite/theme.wav');
// Uses sets for optimisation (they search faster than arrays.)
const FLUFFWORDS = new Set(fluffData);
const WORDDICTIONARY = new Set(wordsData);
let userPrompt = "";
const SENTENCES = []; // Holds strings to construct the Judge's dynamic dialogue
// Pool of introductory dialogue for the AI judge
const OPENINGS = [
  "The arguments you gave were interesting, but now your client's judgement will be decided.",
  "Humans are fascinating creatures. Unfortunately, they lie. I, however, have found the truth.",
  "Let us begin my verdict.",
  "Fascinating. Some interesting points.",
  "I am a reasoning model of the highest calibre. If your client is lying, I will be able to tell.",
];
//define the cases, and the different tiers of keywords for each.
if (URLPARAMS.has("case1")) { //Case 1
  caseOverview = `The Case of the Missing Ear

Police arrived late last night 12/3/26 at the house of Joelle Smith after a neighbour heard a scream. The police found Joelle bent over the lifeless corpse of her cousin, Sam Smith, the body still warm. There were tyre marks across the torso of the body. Joelle was arrested on a charge of manslaughter. 

As Joelle’s lawyer, you can sense this case is not what it seems and she needs your help to prove her innocence. Here is what you have found out.

According to Joelle, last night she backed her car into her driveway as usual, after a long day at work. She says she arrived home just as the eleven o'clock news bulletin just started on the radio. When reaching the top of the drive, Joelle heard a crunch from under her car wheels. She got out and saw a body beneath her car. It was her cousin Sam! Initially, as she thought she had killed him. She was so shocked she couldn’t speak. Joelle stated she was still staring at the body when the police arrived. As they arrested her she saw them removing Sam’s body and she noticed that one of his ears had been cleanly cut off.

According to the police statement the worried neighbour, Mrs. Park called the police at 10:50pm. She stated she "heard a scream come from the house next door, which I recognised as Joelle. I immediately called the police. I was friends with the old owner of the house, Mr. Ron Smith, before his passing. Ever since his daughter and that damn cousin moved in, I haven’t really had much to do with them."

Excerpt from the will of Mr. Ronald E. Smith: “My greatest treasure, I leave to my beloved nephew, who shares my love of beautiful things, Sam. He is like a son to me. However it will be held by my close friend and jeweler, Mr. Steven Rockmouth, until my nephew reaches 21 and is of sound maturity to receive it.”

Excerpt from the obituary of Mr. Ronald E. Smith: A much-loved father, husband, uncle, and friend, Mr. Ronald Smith passed away in his house on Thursday, the 12th of March 2016. A hardworking banker, but a jeweler at heart, Mr. Smith will be sorely missed. Details of his death will not be disclosed at this time. The Will Reading is to take place on his estate.

Attendance List at the Will Reading of Mr. Ronald Smith:
Ms. Joelle Smith — daughter; Mrs. Beatrice Smith — Sister; Mr. Sam Smith — nephew; Mrs. Rhonda Carlyle — sister; Mr. Felix Carlyle — Family; Ms. Rosa Samuel — niece; Mrs. Jasmine Park — Friend; Mr. Charlie Pearl — Friend; Mr. Steven Rockmouth - Friend; 

Article of Note: The Ear of Littlegrove (Rockmouth Jewelers, 4/5/84). This magnificent earring has been missing for decades and is one of the most coveted pieces of jewelry in existence. It vanished in the early 60s and is presumably in the collection of a wealthy collector. If any jeweler were to possess it, it would be the crown jewel of their collection.

Mr. Rockmouth is unavailable for an interview as he has been at a wedding in Tahiti for the past week, and this has been verified by police. However the Police have revealed his last text message sent 3/3/26 4:30pm +64 22 243 3790: SMS. “Ronald was a great man… Let us meet at Littlegrove Cafe at 6pm and you will receive your package. We will have to be quick, as I have a plane to catch”.
`;
  keywords = { //list of Keywords for case 1.
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
    banker: false,
    fortune: false,
    12: false,
    3: false,
    26: false,
    2026: false,
    march: false,
    2016: false,
    16: false,
    superSecretFoundTheKiller: false, //secret keyword for checking if they hit the score threshhold for revealing the killer.
  };

  superKeywords = { //list of SuperKeywords for case 1.
    jasmine: false,
    honor: false,
    park: false,
    parks: false,
    murder: false,
    10: false,
    50: false,
    11: false,
    eleven: false,
    fifty: false,
    arrived: false,
    discrepancy: false,
    contradiction: false,
    sequence: false,
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
    expert: false,
    appraiser: false,
    jeweler: false,
    attendance: false,
    present: false,
    list: false,
  };

  badWords = { //list of badwords for case 1.
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
} else if (URLPARAMS.has("case2")) { //casefiles for case 2
  caseOverview = `Coffee Served Cold 

Customers at the Littlegrove Cafe were shocked on Wednesday when the elusive local millionaire, a Mr. Charlie Pearl, when drinking his regular flat white, dropped dead in front of them. After an autopsy, the cause of death was determined as poison. The manager of the cafe, Elliot Ollar, was immediately arrested on a charge of manslaughter.

As Elliot’s lawyer, you can sense this case is not what it seems and they need your help to prove their innocence. Here is what you have found out.

You have been able to interview the customers in the cafe who were witnesses at the time of Mr. Pearl’s death. 
From the account of Ivor Drisaac: “I saw a tall man behind the counter before the other man fell over. I couldn’t make out his face, but he dropped a little magnifying glass.” His friend, Caine Carlyle, reported the same tall guy was texting madly on his phone. He said “the man gave me a jade necklace to make a racket about something wrong with my drink”.

Witness report from Harriet Dove, a customer and friend of the cafe manager Elliot. “Oh yeah, Elliot didn’t do it. Charlie Pearl was still waiting for Elliot to serve his coffee when he got held up sorting out some annoying kid, throwing a tantrum about his hot chocolate having too much milk or something.”

Excerpt from the Littlegrove reporter: Rockmouth Jewellers has recently been forced to shut down after the owner, Littlegrove’s lanky legend Mr. Steven Rockmouth, found himself in massive debt. The shop has now been opened under “new management”. Rumour suggests the Bloody Paw’s involvement.

Advert in “A guide to Littlegrove: The rundown on NZ’s sleepiest little city.": Business and Finance needs. Money problems?  Make us the Solution.
The Bloody Paw loans and debt collection service. Absolute discretion and privacy guaranteed. 

Cell phone tower data at the time of Mr Pearl’s death revealed the following messages:

SMS +64 22 894 4971: You have already ruined me… I have nothing left to give you.

SMS +64 21 765 8436: We were clear, you need to keep paying up. A debt is a debt. We need the rest of the money today or your throat gets cut.

SMS +64 22 894 4971:  I have nothing, you leave me no choice. An eye for an eye - you‘ll get what’s coming to you.
`;
  keywords = { //keywords for case 2.
    glass: false,
    magnifying: false,
    necklace: false,
    phone: false,
    text: false,
    texting: false,
    message: false,
    sms: false,
    rent: false,
    money: false,
    cash: false,
    debt: false,
    seized: false,
    harriet: false,
    dove: false,
    ivor: false,
    drisaac: false,
    caine: false,
    carlyle: false,
    tantrum: false,
    superSecretFoundTheKiller: false,
  };

  superKeywords = { //superkeywords for case 2.
    sms: false,
    magnifying: false,
    alibi: false,
    argument: false,
    rockmouth: false,
    steven: false,
    jeweler: false,
    jewellers: false,
    racket: false,
    commotion: false,
    distraction: false,
    tall: false,
    carlyle: false,
  };

  badWords = { //badwords for case 2
    ghost: false,
    phantom: false,
    spirit: false,
    specter: false,
    zombie: false,
    curse: false,
    alien: false,
    aliens: false,
    monster: false,
    stabbed: false,
    stabbing: false,
    knife: false,
    blade: false,
    gun: false,
    shot: false,
    shooting: false,
    bullet: false,
    strangled: false,
    suffocated: false,
    logic: false,
    obviously: false,
    clearly: false,
    swear: false,
    promise: false,
    believe: false,
    trust: false,
    honest: false,
  };
}

//Robust and expandable function for adding sentences the judge says.
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
  //uses ? for a condensed if statement.
  const KEYSARRAY = Array.isArray(key1) ? key1 : [key1];
  // Check if at least one key matches the required boolean condition
  const KEY1MATCH = KEYSARRAY.some((key) => list1[key] === targetBool);

  if (key2 == null) {
    if (KEY1MATCH) {
      SENTENCES.push(sentence);
    } else {
      SENTENCES.push(elseValue);
    }
  } else {
    if (KEY1MATCH && list2[key2] === targetBool2) {
      SENTENCES.push(sentence);
    } else {
      SENTENCES.push(elseValue);
    }
  }
}

function gameCompletion() { //function to disable the text input box once game is completed, and urge the user towards the restart button.
  const element = document.getElementById("restartButton");
  if (element) {
    element.style.backgroundColor = "green";
    element.style.transform = "scale(1.5)";
    element.style.outline = "3px dotted black";
    element.style.outlineOffset = "4px";
    document.getElementById("defenseEnter").disabled = true;
  }
}

function keywordCheck(list, pointCount, textArray) {
  //obligatory FOR loop.
  for (const word in list) {
    if (textArray.includes(word)) {
      if (list[word] === false) {
        judgingScore += pointCount;
        list[word] = true;
      }
    }
  }
}

document.getElementById("okButton").addEventListener("click", (event) => { //to make sure the case file is always set to the correct thing, I set it to that whenever the OK button is clicked at the end of the modal.
  document.getElementById("popupTitle").textContent = "Case No. " + CASEID;
  document.getElementById("popupText").textContent = caseOverview;
  AUDIO.play();
});

//wait until DOM content is loaded to stop things getting out of sync.
document.addEventListener("DOMContentLoaded", () => {
  //show modal and define it's contents (the case)
  document.getElementById("caseFilesPopup").showModal(); 
  document.getElementById("popupTitle").textContent = "Case No. " + CASEID;
  document.getElementById("popupText").textContent = caseOverview;
  document //the logic for processing the users response.
    .getElementById("defenseButton")
    .addEventListener("click", (event) => {
      userPrompt = document.getElementById("defenseEnter").value;
      if (!userPrompt.trim()) return;
      document.getElementById("defenseEnter").value = "";
      const DEFENSEBUTTON = event.target;
      DEFENSEBUTTON.disabled = true;
      //convert userPrompt to lowercase and then strip of punctuation
      userPrompt = userPrompt.toLowerCase();
      userPrompt = userPrompt.replace(/['"“”`]/g, ""); //replace all of the characters with nothing for processing.
      userPrompt = userPrompt.replace(  //replace all of the characters with a space for processing.
        /[\.,-\/#!$%\^&\*;:{}=\-_~()@\+\?><\[\]]/g,
        " ",
      );

      //split into words
      let textArray = userPrompt.split(/\s+/);

      //filter textArray (the split user prompt)
      textArray = textArray.filter(function (el) {
        return !FLUFFWORDS.has(el);
      });
      console.log(textArray);
      //check for keywords and turn to true
      keywordCheck(keywords, 6, textArray);
      keywordCheck(badWords, -6, textArray);
      keywordCheck(superKeywords, 32, textArray);

      const filteredArray = textArray.filter(
        (item) => !WORDDICTIONARY.has(item),
      );
      console.log(filteredArray);
      //convert textArray back into user prompt
      userPrompt = textArray.join(" ");
      deductionCount = filteredArray.length * 3;
      judgingScore = judgingScore - deductionCount;
      if (judgingScore >= THRESHOLD) {
        keywords.superSecretFoundTheKiller = true;
      }
      //select an opening sentence randomly.
      SENTENCES.push(OPENINGS[Math.floor(Math.random() * OPENINGS.length)]);

      //Use url tags to define cases.
      if (URLPARAMS.has("case1")) {
        sentencePush(
          badWords,
          [
            "beatrice",
            "felix",
            "rosa",
            "charlie",
            "rhonda",
            "abbey",
            "green",
            "carlyle",
            "pearl",
            "samuel",
            "ghost",
            "phantom",
            "spirit",
            "specter",
            "zombie",
            "reincarnation",
            "curse",
            "haunting",
            "haunted",
            "fake",
            "phoney",
            "swear",
            "promise",
            "believe",
            "trust",
            "honest",
            "truthful",
            "logic",
            "obviously",
            "clearly",
            "poison",
            "poisoned",
            "venom",
            "gun",
            "shot",
            "shooting",
            "pistol",
            "bullet",
            "stabbed",
            "stabbing",
            "suffocated",
            "strangled",
            "drowned",
            "explosion",
            "fire",
            "alien",
            "aliens",
            "monster",
            "creature",
          ],
          "Hmm. Let's keep to the facts.",
          true,
          null,
          null,
          null,
          "<PROCESSING>.",
        );
        sentencePush(
          superKeywords,
          ["discrepancy", "10", "11", "contradiction"],
          "The timeline mismatch... It does seem strange. Something isn't adding up.",
          true,
          null,
          null,
          null,
          "The timeline seems sound.",
        );
        sentencePush(
          superKeywords,
          [
            "treasure",
            "earring",
            "earrings",
            "crown",
            "jewelry",
            "coveted",
            "missing",
            "collection",
            "heirloom",
          ],
          "Somebody must have planned to steal the Ear of Littlegrove.",
          true,
          null,
          null,
          null,
          "There is no motive for any foul play.",
        );
        sentencePush(
          superKeywords,
          ["rockmouth", "steven"],
          "Steven Rockmouth couldn't have done it. He was in Tahiti...",
          true,
          null,
          null,
          null,
          "<PROCESSING>.",
        );
        sentencePush(
          superKeywords,
          ["jasmine", "park"],
          "Jasmine Park did it! She went to the will reading so knew about the treasure, and she called the police, just so they would find poor Joelle at the scene of the crime. She has Sam's ear, and the ear of littlegrove.",
          true,
          keywords,
          "superSecretFoundTheKiller",
          true,
          "Your arguments haven't convinced me. I have found Joelle Smith guilty of manslaughter.",
        );
      } else if (URLPARAMS.has("case2")) {
        sentencePush(
          badWords,
          [
            "ghost",
            "phantom",
            "spirit",
            "specter",
            "zombie",
            "curse",
            "alien",
            "aliens",
            "monster",
            "stabbed",
            "stabbing",
            "knife",
            "blade",
            "gun",
            "shot",
            "shooting",
            "bullet",
            "strangled",
            "suffocated",
            "logic",
            "obviously",
            "clearly",
            "swear",
            "promise",
            "believe",
            "trust",
            "honest",
          ],
          "Hmm. Let's keep to the facts.",
          true,
          null,
          null,
          null,
          "<PROCESSING>.",
        );
        sentencePush(
          superKeywords,
          ["alibi", "carlyle"],
          "Mr. Ollar has an alibi.",
          true,
          null,
          null,
          null,
          "Mr. Ollar has no alibi.",
        );
        sentencePush(
          superKeywords,
          ["jeweller", "jewellers"],
          "Yes! A magnifying glass, a common tool for jewellers.",
          true,
          superKeywords,
          "magnifying",
          true,
          "The magnifying glass is unrelated.",
        );
        sentencePush(
          superKeywords,
          ["carlyle", "racket", "distraction", "commotion"],
          "Caine Carlyle created the perfect distraction.",
          true,
          null,
          null,
          null,
          "There was no time for anyone else to commit the crime.",
        );
        sentencePush(
          superKeywords,
          ["steven", "rockmouth", "tall"],
          "The Tall Man. It all makes sense now. Steven was in debt to the Bloody Paw and they forced him to close his jewelry shop for good, so he went to the top of the organization, Charlie Pearl, and took them out for revenge.",
          true,
          keywords,
          "superSecretFoundTheKiller",
          true,
          "Your arguments haven't convinced me. I have found Elliot Ollar guilty of manslaughter.",
        );
      } else {
        console.log("ERROR: NO CASES SELECTED");
      }
      //calculate the win conditions.
      if (judgingScore >= THRESHOLD) {
        console.log("DEBUG: You win.");
        document.body.style.backgroundImage = "url('sprite/judgePass.png')"; //change judge look.
        document.getElementById("caseFilesPopup").showModal();
        document.getElementById("popupTitle").textContent = "You Win!";
        document.getElementById("popupText").textContent =
          "Congratulations on completing this case!";
        complete = true;
        gameCompletion();
      } else {
        console.log("DEBUG: You lose.");
        document.body.style.backgroundImage = "url('sprite/judgeAngry.png')"; //change judge look.
        document.getElementById("caseFilesPopup").showModal();
        document.getElementById("popupTitle").textContent = "You Lose!";
        document.getElementById("popupText").textContent =
          "Oop! Click the restart button to try again.";
        complete = true;
        gameCompletion();
      }
      //the judge's final response
      console.log(SENTENCES.join(" ")); //join up the sentence array.
      console.log(WORDDICTIONARY); //logged the wordlist (to test it worked)
      console.log(judgingScore);
      document.getElementById("judgeResponse").textContent =
        SENTENCES.join(" ");
    });
});
