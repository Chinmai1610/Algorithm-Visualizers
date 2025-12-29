// sorting/bubbleSort.js
// Exports an async function that runs bubble sort and calls callbacks
export async function bubbleSort(arr, callbacks, controls) {
  const n = arr.length;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // pause handling
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return;

      callbacks.onCompare(j, j + 1);
      await sleep(controls.getDelay());

      if (arr[j] > arr[j + 1]) {
        callbacks.onSwap(j, j + 1);
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        await sleep(controls.getDelay());
      }
    }
  }
  callbacks.onDone();
}
