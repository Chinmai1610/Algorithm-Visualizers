const COMPLEXITY = {
  bubble: "O(n²)",
  selection: "O(n²)",
  insertion: "O(n²)",
  merge: "O(n log n)",
  quick: "O(n log n)",

  linear: "O(n)",
  binary: "O(log n)",
  jump: "O(√n)",
  interpolation: "O(log log n)",
  exponential: "O(log n)"
};

export function updateComplexity(algo) {
  const bar = document.getElementById("complexityBar");
  if (bar) bar.textContent = "Time Complexity: " + (COMPLEXITY[algo] || "");
}
