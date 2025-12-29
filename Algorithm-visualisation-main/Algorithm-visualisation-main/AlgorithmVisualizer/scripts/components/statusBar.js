export function updateStatus(text) {
  const bar = document.getElementById("statusBar");
  if (bar) bar.textContent = text;
}

export function clearStatus() {
  const bar = document.getElementById("statusBar");
  if (bar) bar.textContent = "Ready";
}
