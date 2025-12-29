// sorting/quickSort.js
export async function quickSort(arr, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return i;

      callbacks.onCompare(j, high);
      await sleep(controls.getDelay());
      if (arr[j] < pivot) {
        i++;
        callbacks.onSwap(i, j);
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        await sleep(controls.getDelay());
      }
    }
    callbacks.onSwap(i + 1, high);
    const tmp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tmp;
    await sleep(controls.getDelay());
    return i + 1;
  }

  async function sort(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      if (controls.shouldStop && controls.shouldStop()) return;
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  }

  await sort(0, arr.length - 1);
  callbacks.onDone();
}
