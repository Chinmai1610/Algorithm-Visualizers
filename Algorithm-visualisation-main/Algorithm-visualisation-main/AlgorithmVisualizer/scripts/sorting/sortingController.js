// sorting/sortingController.js
import { renderBars, updateBarHeight, colorBar, resetBars } from '../components/barRenderer.js';
import { showStatus } from '../components/statusBar.js';
import { showComplexity } from '../components/complexityBar.js';
import { showTip } from '../components/tipsBar.js';
import { getDelay } from '../components/speedController.js';

import { bubbleSort } from './bubbleSort.js';
import { selectionSort } from './selectionSort.js';
import { insertionSort } from './insertionSort.js';
import { mergeSort } from './mergeSort.js';
import { quickSort } from './quickSort.js';

export class SortingController {
  constructor(containerEl, options = {}) {
    this.containerEl = containerEl;
    this.array = [];
    this.currentAlgorithm = 'bubble';
    this.isRunning = false;
    this.isPaused = false;
    this.shouldStop = false;
    this.speedKey = 'medium'; // 'fullslow' | 'medium' | 'slow'
    this.controls = {
      isPaused: () => this.isPaused,
      shouldStop: () => this.shouldStop,
      getDelay: () => getDelay(this.speedKey)
    };
    this.callbacks = this._createCallbacks();
    this.algorithms = {
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort
    };
    this.complexities = {
      bubble: { time: 'O(n²)', space: 'O(1)' },
      selection: { time: 'O(n²)', space: 'O(1)' },
      insertion: { time: 'O(n²)', space: 'O(1)' },
      merge: { time: 'O(n log n)', space: 'O(n)' },
      quick: { time: 'O(n log n) avg, O(n²) worst', space: 'O(log n)' }
    };

    // provide options hooks
    if (options.onRender) this.onRender = options.onRender;
    if (options.onFinish) this.onFinish = options.onFinish;
  }

  _createCallbacks() {
    return {
      onCompare: (i, j) => {
        showStatus(`Comparing: ${this.array[i]} and ${this.array[j]}`);
        colorBar(this.containerEl, i, 'orange');
        colorBar(this.containerEl, j, 'orange');
      },
      onSwap: (i, j) => {
        showStatus(`Swapping: ${this.array[i]} and ${this.array[j]}`);
        colorBar(this.containerEl, i, 'red');
        colorBar(this.containerEl, j, 'red');
        // swap in local array state so UI renderer shows correct heights
        const tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
        updateBarHeight(this.containerEl, i, this.array[i]);
        updateBarHeight(this.containerEl, j, this.array[j]);
      },
      onOverwrite: (idx, value) => {
        showStatus(`Writing: index ${idx} = ${value}`);
        this.array[idx] = value;
        colorBar(this.containerEl, idx, 'red');
        updateBarHeight(this.containerEl, idx, value);
      },
      onDone: () => {
        showStatus('Completed');
        for (let k = 0; k < this.array.length; k++) colorBar(this.containerEl, k, 'green');
        this.isRunning = false;
        if (this.onFinish) this.onFinish();
      }
    };
  }

  setAlgorithm(name) {
    if (this.algorithms[name]) {
      this.currentAlgorithm = name;
      const c = this.complexities[name];
      showComplexity(`Time: ${c.time}  |  Space: ${c.space}`);
      // one-line tips mapping
      const tips = {
        bubble: 'Simple, stable; poor for large inputs.',
        selection: 'Selects min each pass; not stable.',
        insertion: 'Good for nearly-sorted arrays.',
        merge: 'Stable and predictable; uses extra memory.',
        quick: 'Fast on average; pivot choice matters.'
      };
      showTip(tips[name]);
    } else {
      console.warn('Unknown algorithm', name);
    }
  }

  setSpeed(key) {
    this.speedKey = key;
  }

  generateArray(type = 'random', size = 30, customValues = []) {
    // produce array of ints 5..100
    if (type === 'custom' && customValues.length) {
      this.array = customValues.slice();
    } else {
      this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 96) + 5);
      if (type === 'reverse') this.array.sort((a,b) => b - a);
    }
    resetBars(this.containerEl, this.array); // draws bars default blue
    showStatus('Array generated');
  }

  async play() {
    if (this.isRunning) {
      this.isPaused = false;
      return;
    }
    this.isRunning = true;
    this.isPaused = false;
    this.shouldStop = false;

    const algo = this.algorithms[this.currentAlgorithm];
    if (!algo) {
      console.error('Algorithm not found:', this.currentAlgorithm);
      return;
    }
    showStatus(`Running ${this.currentAlgorithm}...`);

    // call algorithm with callbacks and controls
    try {
      await algo(this.array.slice(), this.callbacks, this.controls);
      // note: algorithms update UI via callbacks; local this.array already kept in callbacks
    } catch (err) {
      console.error('Sorting error', err);
      this.isRunning = false;
    }
  }

  pause() {
    if (!this.isRunning) return;
    this.isPaused = true;
    showStatus('Paused');
  }

  reset() {
    this.isPaused = false;
    this.shouldStop = true;
    this.isRunning = false;
    showStatus('Reset');
    resetBars(this.containerEl, this.array);
  }
}
