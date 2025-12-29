// searching/binarySearch.js
export async function binarySearch(arr, target, callbacks, controls) {
  // binary requires sorted array - caller (UI) should sort or warn user
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;
    const mid = Math.floor((left + right) / 2);
    callbacks.onCompare(mid);
    await sleep(controls.getDelay());
    if (arr[mid] === target) {
      callbacks.onFound(mid);
      callbacks.onDone && callbacks.onDone();
      return mid;
    }
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  callbacks.onNotFound && callbacks.onNotFound();
  callbacks.onDone && callbacks.onDone();
  return -1;
}
