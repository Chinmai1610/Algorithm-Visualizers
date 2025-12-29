// searching/jumpSearch.js
export async function jumpSearch(arr, target, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0, curr = 0;

  while (curr < n) {
    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;
    curr = Math.min(n - 1, curr + step);
    callbacks.onCompare(curr);
    await sleep(controls.getDelay());
    if (arr[curr] >= target) break;
    prev = curr;
  }

  // linear search in block
  for (let i = prev; i <= curr; i++) {
    while (controls.isPaused()) await sleep(50);
    if (controls.shouldStop && controls.shouldStop()) return;
    callbacks.onCompare(i);
    await sleep(controls.getDelay());
    if (arr[i] === target) {
      callbacks.onFound(i);
      callbacks.onDone && callbacks.onDone();
      return i;
    }
  }

  callbacks.onNotFound && callbacks.onNotFound();
  callbacks.onDone && callbacks.onDone();
  return -1;
}
