// sorting/mergeSort.js
export async function mergeSort(arr, callbacks, controls) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function merge(left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return;

      callbacks.onCompare(left + i, mid + 1 + j);
      await sleep(controls.getDelay());

      if (L[i] <= R[j]) {
        callbacks.onOverwrite(k, L[i]);
        arr[k] = L[i];
        i++;
      } else {
        callbacks.onOverwrite(k, R[j]);
        arr[k] = R[j];
        j++;
      }
      k++;
      await sleep(controls.getDelay());
    }
    while (i < n1) {
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return;
      callbacks.onOverwrite(k, L[i]);
      arr[k] = L[i];
      i++; k++;
      await sleep(controls.getDelay());
    }
    while (j < n2) {
      while (controls.isPaused()) await sleep(50);
      if (controls.shouldStop && controls.shouldStop()) return;
      callbacks.onOverwrite(k, R[j]);
      arr[k] = R[j];
      j++; k++;
      await sleep(controls.getDelay());
    }
  }

  async function sort(left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await sort(left, mid);
    await sort(mid + 1, right);
    await merge(left, mid, right);
  }

  await sort(0, arr.length - 1);
  callbacks.onDone();
}
