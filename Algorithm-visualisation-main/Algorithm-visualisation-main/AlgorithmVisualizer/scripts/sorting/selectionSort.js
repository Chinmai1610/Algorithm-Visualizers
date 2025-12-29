// sorting/selectionSort.js
export async function selectionSort(arr, callbacks, controls) {
  const n = arr.length;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return;

      callbacks.onCompare(minIdx, j);
      await sleep(controls.getDelay());
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      callbacks.onSwap(i, minIdx);
      const tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;
      await sleep(controls.getDelay());
    }
  }
  callbacks.onDone();
}
