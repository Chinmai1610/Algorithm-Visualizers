const TIPS = {
  bubble: "Bubble sort compares and swaps adjacent values.",
  selection: "Selection sort selects the smallest element each pass.",
  insertion: "Insertion sort builds the sorted list one element at a time.",
  merge: "Merge sort divides, sorts, and merges.",
  quick: "Quick sort partitions the array around a pivot.",

  linear: "Linear search checks each element one by one.",
  binary: "Binary search divides the array into halves.",
  jump: "Jump search jumps in fixed steps, then linearly scans.",
  interpolation: "Interpolation search predicts where the value may be.",
  exponential: "Exponential search expands bounds exponentially."
};

export function updateTip(algo) {
  const bar = document.getElementById("tipsBar");
  if (bar) bar.textContent = "Tip: " + (TIPS[algo] || "");
}
