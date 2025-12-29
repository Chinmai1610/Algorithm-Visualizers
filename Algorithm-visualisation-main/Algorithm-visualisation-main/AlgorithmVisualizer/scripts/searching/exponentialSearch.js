// searching/exponentialSearch.js
export async function exponentialSearch(arr, target, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  if (arr.length === 0) {
    callbacks.onNotFound && callbacks.onNotFound();
    callbacks.onDone && callbacks.onDone();
    return -1;
  }

  let bound = 1;
  while (bound < arr.length && arr[bound] < target) {
    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;
    callbacks.onCompare(bound);
    await sleep(controls.getDelay());
    bound *= 2;
  }

  const left = Math.floor(bound / 2);
  const right = Math.min(bound, arr.length - 1);

  // binary search in range [left, right]
  let l = left, r = right;
  while (l <= r) {
    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;

    const mid = Math.floor((l + r) / 2);
    callbacks.onCompare(mid);
    await sleep(controls.getDelay());
    if (arr[mid] === target) {
      callbacks.onFound(mid);
      callbacks.onDone && callbacks.onDone();
      return mid;
    } else if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  callbacks.onNotFound && callbacks.onNotFound();
  callbacks.onDone && callbacks.onDone();
  return -1;
}
