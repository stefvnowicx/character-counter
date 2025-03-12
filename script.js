// Global variables
let limit = null;
let textarea, totalCharacters, wordCount, sentenceCount, progressBoxes;
let body, changeBgBtn, limitCharacters, modalBtn, modalInput, textLimitDisplay, modal;

const prepareDOMElements = () => {
   textarea = document.querySelector("textarea");
   totalCharacters = document.querySelector("#total-characters");
   wordCount = document.querySelector("#word-count");
   sentenceCount = document.querySelector("#sentence-count");
   progressBoxes = document.querySelector("#progress-boxes");

   body = document.querySelector("body");
   changeBgBtn = document.querySelector(".change-bg");

   limitCharacters = document.querySelector("#limit");
   modalBtn = document.querySelector(".modal-btn");
   modalInput = document.querySelector(".modal-input");
   textLimitDisplay = document.querySelector(".text-limit");
   modal = document.querySelector(".modal");
};

const prepareDOMEvents = () => {
   textarea.addEventListener("input", (e) => {
      updateCharactersCount(e.target.value);
      updateWordCount(e.target.value);
      updateSentences(e.target.value);
      addDensityBox(e.target.value);
   });

   changeBgBtn.addEventListener("click", toggleBg);
   limitCharacters.addEventListener("click", toggleModal);
   modalBtn.addEventListener("click", setTextLimit);

   window.addEventListener("DOMContentLoaded", () => {
      textarea.value = "";
   });
};

// Update character count
const updateCharactersCount = (text) => {
   totalCharacters.textContent = text.length;
};

// Update word count
const updateWordCount = (text) => {
   wordCount.textContent = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
};

// Update sentence count
const updateSentences = (text) => {
   sentenceCount.textContent =
      text.trim().length > 0
         ? text
              .trim()
              .split(/[.!?]+/)
              .filter(Boolean).length
         : 0;
};

// Calculate letter frequency
const countLetterFrequency = (text) => {
   const letterCountMap = {};
   let totalLetters = 0;

   for (const char of text.toUpperCase()) {
      if (/[A-Z]/.test(char)) {
         letterCountMap[char] = (letterCountMap[char] || 0) + 1;
         totalLetters++;
      }
   }
   return { letterCountMap, totalLetters };
};

// Generate letter frequency progress bars
const addDensityBox = (text) => {
   progressBoxes.innerHTML = "";

   if (text.length === 0) return;

   const { letterCountMap, totalLetters } = countLetterFrequency(text);

   if (totalLetters === 0) return;

   Object.entries(letterCountMap).forEach(([letter, count]) => {
      const percent = ((count / totalLetters) * 100).toFixed(1);
      const box = document.createElement("div");

      box.classList.add("progress-box", "flex", "justify-around", "w-full");
      box.innerHTML = `
         <p>${letter}</p>
         <progress class="w-2/3 md:w-3/4 lg:w-4/5 rounded-lg bg-zinc-700" max="100" value="${Math.round(percent)}"></progress>
         <p>${count} (${percent}%)</p>
      `;
      progressBoxes.appendChild(box);
   });
};

// Toggle background theme
const toggleBg = () => {
   const isDarkMode = body.classList.contains("bg-zinc-900");

   body.classList.toggle("bg-zinc-900", !isDarkMode);
   body.classList.toggle("bg-white", isDarkMode);

   const textElements = document.querySelectorAll(".text-zinc-50, .text-zinc-900");
   textElements.forEach((text) => {
      text.classList.toggle("text-zinc-50", !isDarkMode);
      text.classList.toggle("text-zinc-900", isDarkMode);
   });

   textarea.classList.toggle("bg-zinc-700", !isDarkMode);
   textarea.classList.toggle("border-zinc-600", !isDarkMode);
   textarea.classList.toggle("bg-zinc-300", isDarkMode);
   textarea.classList.toggle("border-zinc-200", isDarkMode);
   textarea.classList.toggle("text-white", !isDarkMode);
   textarea.classList.toggle("text-zinc-900", isDarkMode);
};

// Toggle modal visibility
const toggleModal = () => {
   modal.classList.toggle("hidden");
   modal.classList.toggle("flex");
   modal.classList.toggle("fixed");
};

// Update text limit from modal input
const setTextLimit = () => {
   limitCharacters.checked = false;

   const inputLimit = Number(modalInput.value);
   if (!inputLimit || inputLimit <= 0) return;

   limit = inputLimit;
   textarea.maxLength = limit;
   textLimitDisplay.textContent = `Limit characters: ${limit}`;
   toggleModal();
};

// Initialize
prepareDOMElements();
prepareDOMEvents();
