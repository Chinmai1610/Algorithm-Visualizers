// searching/searchingController.js
import { renderBars, updateBarHeight, colorBar, resetBars } from '../components/barRenderer.js';
import { showStatus } from '../components/statusBar.js';
import { showComplexity } from '../components/complexityBar.js';
import { showTip } from '../components/tipsBar.js';
import { getDelay } from '../components/speedController.js';

import { linearSearch } from './linearSearch.js';
import { binarySearch } from './binarySearch.js';
import { jumpSearch } from './jumpSearch.js';
import { interpolationSearch } from './interpolationSearch.js';
import { exponentialSearch } from './exponentialSearch.js';

export class SearchingController {
  constructor(containerEl, options = {}) {
    this.containerEl = containerEl;
    this.array = [];
    this.currentAlgorithm = 'linear';
    this.isRunning = false;
    this.isPaused = false;
    this.shouldStop = false;
    this.speedKey = 'medium';
    this.controls = {
      isPaused: () => this.isPaused,
      shouldStop: () => this.shouldStop,
      getDelay: () => getDelay(this.speedKey)
    };
    this.callbacks = this._createCallbacks();
    this.algorithms = {
      linear: linearSearch,
      binary: binarySearch,
      jump: jumpSearch,
      interpolation: interpolationSearch,
      exponential: exponentialSearch
    };
    this.complexities = {
      linear: { time: 'O(n)', space: 'O(1)' },
      binary: { time: 'O(log n)', space: 'O(1)' },
      jump: { time: 'O(√n)', space: 'O(1)' },
      interpolation: { time: 'O(log log n) avg', space: 'O(1)' },
      exponential: { time: 'O(log n)', space: 'O(1)' }
    };

    if (options.onFinish) this.onFinish = options.onFinish;
  }

  _createCallbacks() {
    return {
      onCompare: (i) => {
        showStatus(`Checking index ${i} → ${this.array[i]}`);
        colorBar(this.containerEl, i, 'orange');
      },
      onFound: (idx) => {
        showStatus(`Found at index ${idx}`);
        colorBar(this.containerEl, idx, 'green');
      },
      onNotFound: () => {
        showStatus('Value not found');
        // flash all red briefly
        for (let k = 0; k < this.array.length; k++) colorBar(this.containerEl, k, 'red');
      },
      onDone: () => {
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
      const tips = {
        linear: 'Work on unsorted arrays; scans one by one.',
        binary: 'Requires sorted array.',
        jump: 'Good compromise for block search in sorted arrays.',
        interpolation: 'Best for uniformly distributed data.',
        exponential: 'Expands search window then binary search.'
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
    if (type === 'custom' && customValues.length) {
      this.array = customValues.slice();
    } else {
      this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 96) + 5);
      if (type === 'reverse') this.array.sort((a,b) => b - a);
    }
    resetBars(this.containerEl, this.array);
    showStatus('Array generated');
  }

  async search(target) {
    if (this.isRunning) {
      this.isPaused = false;
      return;
    }
    this.isRunning = true;
    this.isPaused = false;
    this.shouldStop = false;

    const algo = this.algorithms[this.currentAlgorithm];
    if (!algo) return;

    try {
      await algo(this.array.slice(), Number(target), this.callbacks, this.controls);
    } catch (err) {
      console.error('Search error', err);
    } finally {
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
    resetBars(this.containerEl, this.array);
    showStatus('Reset');
  }
}
