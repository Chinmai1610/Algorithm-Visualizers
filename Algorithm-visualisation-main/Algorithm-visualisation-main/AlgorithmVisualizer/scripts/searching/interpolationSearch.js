// searching/interpolationSearch.js
export async function interpolationSearch(arr, target, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let low = 0, high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;

    // avoid division by zero
    if (arr[high] === arr[low]) {
      if (arr[low] === target) {
        callbacks.onFound(low);
        callbacks.onDone && callbacks.onDone();
        return low;
      } else break;
    }
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    callbacks.onCompare(pos);
    await sleep(controls.getDelay());
    if (arr[pos] === target) {
      callbacks.onFound(pos);
      callbacks.onDone && callbacks.onDone();
      return pos;
    }
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }

  callbacks.onNotFound && callbacks.onNotFound();
  callbacks.onDone && callbacks.onDone();
  return -1;
}
