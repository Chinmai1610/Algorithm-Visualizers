import { generateByType } from "../utils/arrayGenerator.js";
import { renderBars, updateBarHeight, colorBar } from "../components/barRenderer.js";
import { sleep } from "../utils/sleep.js";
import { updateStatus, clearStatus } from "../components/statusBar.js";
import { updateComplexity } from "../components/complexityBar.js";
import { updateTip } from "../components/tipsBar.js";
import { getDelay } from "../components/speedController.js";

/* BUTTON MANAGER */
function setSortButtons(mode) {
  const g = document.getElementById("generateBtn");
  const p = document.getElementById("playBtn");
  const pa = document.getElementById("pauseBtn");
  const r = document.getElementById("resetBtn");

  pa.textContent = "Pause";

  if (mode === "generate") {
    g.disabled = false; p.disabled = false; pa.disabled = false; r.disabled = false;
  }
  if (mode === "ready") {
    g.disabled = false; p.disabled = false; pa.disabled = false; r.disabled = false;
  }
  if (mode === "playing") {
    g.disabled = false; p.disabled = false; pa.disabled = false; r.disabled = false;
  }
  if (mode === "paused") {
    g.disabled = false; p.disabled = false; pa.disabled = false; r.disabled = false;
  }
  if (mode === "done") {
    g.disabled = false; p.disabled = false; pa.disabled = false; r.disabled = false;
  }
}

export function wireSortingUI(containerSelector) {
  const container = document.querySelector(containerSelector);

  const generateBtn = document.getElementById("generateBtn");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  const sizeInput = document.getElementById("arraySize");
  const customInput = document.getElementById("customArrayInput");
  const typeRadios = document.getElementsByName("arrayType");
  const speedRadios = document.getElementsByName("speed");
  const algoSelect = document.getElementById("algorithmSelect");

  let array = [];
  let originalArray = [];
  let paused = false;
  let playing = false;

  /* CUSTOM VISIBILITY */
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

  /* GENERATE */
  generateBtn.addEventListener("click", () => {
    const mode = [...typeRadios].find(r => r.checked).value;

    array = generateByType(mode, Number(sizeInput.value), customInput.value);
    originalArray = [...array];

    renderBars(container, array);
    updateComplexity(algoSelect.value);
    updateTip(algoSelect.value);
    clearStatus();

    setSortButtons("ready");
  });

  /* PLAY */
  playBtn.addEventListener("click", async () => {
    playing = true;
    paused = false;

    setSortButtons("playing");

    const delay = getDelay(getSpeed());

    for (let i = 0; i < array.length - 1 && playing; i++) {
      for (let j = 0; j < array.length - i - 1 && playing; j++) {

        while (paused) await sleep(50);

        updateStatus(`Comparing ${array[j]} & ${array[j+1]}`);
        colorBar(container, j, "orange");
        colorBar(container, j+1, "orange");
        await sleep(delay);

        if (array[j] > array[j+1]) {
          updateStatus(`Swapping ${array[j]} & ${array[j+1]}`);
          [array[j], array[j+1]] = [array[j+1], array[j]];
          updateBarHeight(container, j, array[j]);
          updateBarHeight(container, j+1, array[j+1]);
          colorBar(container, j, "red");
          colorBar(container, j+1, "red");
          await sleep(delay);
        }

        colorBar(container, j, "blue");
        colorBar(container, j+1, "blue");
      }
      colorBar(container, array.length - i - 1, "green");
    }

    updateStatus("Sorting Completed");

    playing = false;
    setSortButtons("done");
  });

  /* PAUSE */
  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    pauseBtn.textContent = paused ? "Resume" : "Pause";

    setSortButtons(paused ? "paused" : "playing");
  });

  /* RESET */
  resetBtn.addEventListener("click", () => {
    array = [...originalArray];
    renderBars(container, array);
    clearStatus();
    setSortButtons("ready");
  });

  setSortButtons("generate");
}
