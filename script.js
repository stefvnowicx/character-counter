const textarea = document.querySelector("textarea");
// counters
const totalCharacters = document.querySelector("#total-characters");
const wordCount = document.querySelector("#word-count");
const sentenceCount = document.querySelector("#sentence-count");

const progressBoxes = document.querySelector("#progress-boxes");

const handleTextarea = (e) => {
   updateCharactersCount(e);
   updateWordCount(e);
   updateSentences(e);
   addDensityBox(e);
};

const updateCharactersCount = (e) => {
   totalCharacters.textContent = e.target.value.length;
};

const updateWordCount = (e) => {
   const text = e.target.value.trim();
   wordCount.textContent = text.length > 0 ? text.split(/\s+/).filter(Boolean).length : 0;
};

const updateSentences = (e) => {
   const text = e.target.value.trim();
   sentenceCount.textContent = text.length > 0 ? text.split(/[.!?]+/).filter(Boolean).length : 0;
};

// Now, this function will just calculate the letter frequency and total letters count
const countLetterFrequency = (text) => {
   let letterCountMap = {};
   let totalLetters = 0;
   
   for (let char of text) {
      if (/[a-zA-Z]/.test(char)) {
         char = char.toUpperCase();
         letterCountMap[char] = (letterCountMap[char] || 0) + 1;
         totalLetters++;
      }
   }
   
   return { letterCountMap, totalLetters };
};

const addDensityBox = (e) => {
   const text = e.target.value.trim();

   if (text.length === 0) {
      progressBoxes.innerHTML = ""; 
      return;
   }

  
   const { letterCountMap, totalLetters } = countLetterFrequency(text);

   if (totalLetters === 0) {
      progressBoxes.innerHTML = ""; 
      return;
   }

   progressBoxes.innerHTML = ""; 

   
   for (const [letter, count] of Object.entries(letterCountMap)) {
      const letterPercent = (count / totalLetters) * 100;
      const percentToDisplay = letterPercent.toFixed(1);

      const newLetterCount = document.createElement("div");
      newLetterCount.innerHTML = `<div class="progress-box flex justify-around w-full">
            <p>${letter}</p>
            <progress class="w-2/3 md:w-3/4 lg:w-4/5 rounded-lg bg-zinc-700" max="100" value="${Math.round(letterPercent)}"></progress>
            <p>${count} (${percentToDisplay}%)</p>
        </div>`;
      progressBoxes.appendChild(newLetterCount);
   }
};

textarea.addEventListener("input", handleTextarea);
