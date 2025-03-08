const textarea = document.querySelector("textarea");
// counters
const totalCharacters = document.querySelector("#total-characters");
const wordCount = document.querySelector("#word-count");
const sentenceCount = document.querySelector("#sentence-count");
// letter count
const progressBoxes = document.querySelector("#progress-boxes");

let characters;
let words;

const handleTextarea = (e) => {
   updateCharactersCount(e);
   updateWordCount(e);
   updateSentences(e);
};

const updateCharactersCount = (e) => {
   characters = e.target.value.length;
   totalCharacters.textContent = characters;
};

const updateWordCount = (e) => {
   words = e.target.value.trim();
   if (words.length > 0) {
      words = words.split(/\s+/).filter(Boolean);
      wordCount.textContent = words.length;
   } else {
      wordCount.textContent = 0;
   }
};

const updateSentences = (e) => {
    words = e.target.value.trim();
   if (words.length > 0) {
      sentences = words.split(/[.!?]+/).filter(Boolean);
      sentenceCount.textContent = sentences.length;
   } else {
      sentenceCount.textContent = 0;
   }
};

textarea.addEventListener("input", handleTextarea);
