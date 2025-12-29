/* searchingUI.js */

import { generateByType } from "../utils/arrayGenerator.js";
import { renderBars, colorBar } from "../components/barRenderer.js";
import { sleep } from "../utils/sleep.js";
import { updateStatus, clearStatus } from "../components/statusBar.js";
import { updateComplexity } from "../components/complexityBar.js";
import { updateTip } from "../components/tipsBar.js";
import { getDelay } from "../components/speedController.js";

/*-------------------------------------------
    BUTTON MANAGER
---------------------------------------------*/
function setSearchButtons(mode) {
  const g = document.getElementById("generateSearchBtn");
  const s = document.getElementById("searchBtn");
  const p = document.getElementById("pauseSearchBtn");
  const r = document.getElementById("resetSearchBtn");

  p.textContent = "Pause";

  if (mode === "generate") {
    g.disabled = false; 
    s.disabled = false; 
    p.disabled = false;
    r.disabled = false;
  }
  if (mode === "ready") {
    g.disabled = false;
    s.disabled = false; 
    p.disabled = false; 
    r.disabled = false;
  }
  if (mode === "playing") {
    g.disabled = false;
    s.disabled = false;
    p.disabled = false; 
    r.disabled = false;
  }
  if (mode === "paused") {
    g.disabled = false; 
    s.disabled = false;
    p.disabled = false; 
    r.disabled = false;
  }
  if (mode === "done") {
    g.disabled = false; 
    s.disabled = false; 
    p.disabled = false;
    r.disabled = false;
  }
}

/*-------------------------------------------
    MAIN SEARCH UI FUNCTION
---------------------------------------------*/
export function wireSearchingUI(containerSelector) {
  const container = document.querySelector(containerSelector);

  const generateBtn = document.getElementById("generateSearchBtn");
  const searchBtn = document.getElementById("searchBtn");
  const pauseBtn = document.getElementById("pauseSearchBtn");
  const resetBtn = document.getElementById("resetSearchBtn");

  const sizeInput = document.getElementById("searchArraySize");
  const customInput = document.getElementById("customSearchArrayInput");
  const typeRadios = document.getElementsByName("searchArrayType");
  const speedRadios = document.getElementsByName("searchSpeed");
  const algoSelect = document.getElementById("searchAlgorithmSelect");
  const searchValueInput = document.getElementById("searchValue");

  let array = [];
  let originalArray = [];
  let paused = false;
  let searching = false;

  /*-------------------------------------------
       CUSTOM INPUT TOGGLE
  ---------------------------------------------*/
  function toggleCustom() {
    customInput.style.display =
      [...typeRadios].find(r => r.checked).value === "custom"
        ? "inline-block"
        : "none";
  }
  typeRadios.forEach(r => r.addEventListener("change", toggleCustom));
  toggleCustom();

  function getSpeed() {
    return [...speedRadios].find(r => r.checked).value;
  }

  async function waitPaused() {
    while (paused) await sleep(50);
  }

  /*-------------------------------------------
       GENERATE ARRAY
  ---------------------------------------------*/
  generateBtn.addEventListener("click", () => {
    const mode = [...typeRadios].find(r => r.checked).value;

    array = generateByType(mode, Number(sizeInput.value), customInput.value);
    originalArray = [...array];

    renderBars(container, array);

    updateComplexity(algoSelect.value);
    updateTip(algoSelect.value);
    clearStatus();

    setSearchButtons("ready");
  });

  /*-------------------------------------------
       PAUSE BUTTON
  ---------------------------------------------*/
  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    pauseBtn.textContent = paused ? "Resume" : "Pause";
    setSearchButtons(paused ? "paused" : "playing");
  });

  /*-------------------------------------------
       SEARCH BUTTON
  ---------------------------------------------*/
  searchBtn.addEventListener("click", async () => {
    if (searching) return;

    searching = true;
    paused = false;
    setSearchButtons("playing");

    const delay = getDelay(getSpeed());
    const target = Number(searchValueInput.value);
    const algo = algoSelect.value;

    clearStatus();

    // ⭐ Create VIRTUAL SORTED array (REAL array remains unsorted visually)
    let virtualSorted = [...array].sort((a, b) => a - b);

    if (algo === "linear") await linear(target, delay);
    if (algo === "binary") await binary(target, delay, virtualSorted);
    if (algo === "jump") await jump(target, delay, virtualSorted);
    if (algo === "interpolation") await interpolation(target, delay, virtualSorted);
    if (algo === "exponential") await exponentialSearch(target, delay, virtualSorted);

    searching = false;
    setSearchButtons("done");
  });

  /*-------------------------------------------
       LINEAR SEARCH
  ---------------------------------------------*/
  async function linear(target, delay) {
    for (let i = 0; i < array.length; i++) {
      await waitPaused();

      updateStatus(`Checking index ${i}`);
      colorBar(container, i, "orange");
      await sleep(delay);

      if (array[i] === target) {
        colorBar(container, i, "green");
        updateStatus(`Found at index ${i}`);
        return;
      }
      colorBar(container, i, "blue");
    }
    updateStatus("Not Found");
  }

  /*-------------------------------------------
       BINARY SEARCH (VIRTUAL ARRAY)
  ---------------------------------------------*/
  async function binary(target, delay, v) {
    let left = 0, right = v.length - 1;

    while (left <= right) {
      await waitPaused();

      let mid = Math.floor((left + right) / 2);
      updateStatus(`Checking virtual mid ${mid}`);

      let visualIndex = array.indexOf(v[mid]);
      colorBar(container, visualIndex, "orange");
      await sleep(delay);

      if (v[mid] === target) {
        colorBar(container, visualIndex, "green");
        updateStatus(`Found at index ${visualIndex}`);
        return;
      }

      colorBar(container, visualIndex, "blue");

      if (v[mid] < target) left = mid + 1;
      else right = mid - 1;
    }

    updateStatus("Not Found");
  }

  /*-------------------------------------------
       JUMP SEARCH (VIRTUAL ARRAY)
  ---------------------------------------------*/
  async function jump(target, delay, v) {
    let step = Math.floor(Math.sqrt(v.length));
    let prev = 0;

    while (prev < v.length && v[Math.min(step, v.length) - 1] < target) {
      await waitPaused();
      let idx = Math.min(step, v.length) - 1;

      let visualIdx = array.indexOf(v[idx]);
      updateStatus(`Jump checking virtual index ${idx}`);

      colorBar(container, visualIdx, "orange");
      await sleep(delay);
      colorBar(container, visualIdx, "blue");

      prev = step;
      step += Math.floor(Math.sqrt(v.length));
    }

    for (let i = prev; i < Math.min(step, v.length); i++) {
      await waitPaused();

      let visualIdx = array.indexOf(v[i]);
      updateStatus(`Checking virtual index ${i}`);

      colorBar(container, visualIdx, "orange");
      await sleep(delay);

      if (v[i] === target) {
        colorBar(container, visualIdx, "green");
        updateStatus(`Found at index ${visualIdx}`);
        return;
      }
      colorBar(container, visualIdx, "blue");
    }

    updateStatus("Not Found");
  }

  /*-------------------------------------------
       INTERPOLATION SEARCH (VIRTUAL ARRAY)
  ---------------------------------------------*/
  async function interpolation(target, delay, v) {
    let low = 0, high = v.length - 1;

    while (low <= high && target >= v[low] && target <= v[high]) {
      await waitPaused();

      let pos = low + Math.floor(((target - v[low]) * (high - low)) / (v[high] - v[low]));
      let visualIdx = array.indexOf(v[pos]);

      updateStatus(`Checking virtual position ${pos}`);
      colorBar(container, visualIdx, "orange");
      await sleep(delay);

      if (v[pos] === target) {
        colorBar(container, visualIdx, "green");
        updateStatus(`Found at index ${visualIdx}`);
        return;
      }

      colorBar(container, visualIdx, "blue");

      if (v[pos] < target) low = pos + 1;
      else high = pos - 1;
    }

    updateStatus("Not Found");
  }

  /*-------------------------------------------
       EXPONENTIAL SEARCH (VIRTUAL ARRAY)
  ---------------------------------------------*/
  async function exponentialSearch(target, delay, v) {
    if (v[0] === target) {
      let originalIndex = array.indexOf(target);
      colorBar(container, originalIndex, "green");
      updateStatus(`Found at index ${originalIndex}`);
      return;
    }

    let bound = 1;
    while (bound < v.length && v[bound] < target) {
      await waitPaused();

      let visualIdx = array.indexOf(v[bound]);
      updateStatus(`Checking virtual bound ${bound}`);

      colorBar(container, visualIdx, "orange");
      await sleep(delay);
      colorBar(container, visualIdx, "blue");

      bound *= 2;
    }

    let left = Math.floor(bound / 2);
    let right = Math.min(bound, v.length - 1);

    while (left <= right) {
      await waitPaused();

      let mid = Math.floor((left + right) / 2);
      let visualIdx = array.indexOf(v[mid]);

      updateStatus(`Checking virtual mid ${mid}`);
      colorBar(container, visualIdx, "orange");
      await sleep(delay);

      if (v[mid] === target) {
        colorBar(container, visualIdx, "green");
        updateStatus(`Found at index ${visualIdx}`);
        return;
      }

      colorBar(container, visualIdx, "blue");

      if (v[mid] < target) left = mid + 1;
      else right = mid - 1;
    }

    updateStatus("Not Found");
  }

  /*-------------------------------------------
       RESET BUTTON
  ---------------------------------------------*/
  resetBtn.addEventListener("click", () => {
    array = [...originalArray];
    renderBars(container, array);
    clearStatus();
    setSearchButtons("ready");
  });

  setSearchButtons("generate");
}
