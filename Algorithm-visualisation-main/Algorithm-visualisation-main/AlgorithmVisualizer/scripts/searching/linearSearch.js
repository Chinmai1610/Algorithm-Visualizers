// searching/linearSearch.js
export async function linearSearch(arr, target, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < arr.length; i++) {
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
