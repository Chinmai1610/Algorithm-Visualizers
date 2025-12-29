// sorting/insertionSort.js
export async function insertionSort(arr, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;

    callbacks.onCompare(j, i);
    await sleep(controls.getDelay());

    while (j >= 0 && arr[j] > key) {
      callbacks.onCompare(j, j + 1);
      callbacks.onOverwrite(j + 1, arr[j]); // shifting
      arr[j + 1] = arr[j];
      await sleep(controls.getDelay());
      j = j - 1;
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return;
    }
    callbacks.onOverwrite(j + 1, key);
    arr[j + 1] = key;
    await sleep(controls.getDelay());
  }
  callbacks.onDone();
}
