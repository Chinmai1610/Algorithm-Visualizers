export function renderBars(container, array) {
  container.innerHTML = "";

  const count = array.length;
  const maxVal = Math.max(...array);

  const barWidth = Math.max(20, Math.floor(800 / count));

  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "flex-end";
  container.style.gap = "6px";

  array.forEach(value => {
    const bar = document.createElement("div");
    bar.className = "bar";

    const height = (value / maxVal) * 300;

    bar.style.height = height + "px";
    bar.style.width = barWidth + "px";
    bar.style.background = "#3b82f6";
    bar.style.position = "relative";
    bar.style.transition = "0.25s ease";

    // NUMBER INSIDE BAR
    const label = document.createElement("span");
    label.textContent = value;
    label.style.position = "absolute";
    label.style.bottom = "-22px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    label.style.color = "black";
    label.style.fontWeight = "700";
    label.style.fontSize = "14px";
    label.style.pointerEvents = "none";

    bar.appendChild(label);
    container.appendChild(bar);
  });
}

export function updateBarHeight(container, index, newValue) {
  const bars = container.querySelectorAll(".bar");
  const maxVal = Math.max(
    ...[...bars].map(b => parseInt(b.style.height))
  );

  const newHeight = (newValue / maxVal) * 300;
  bars[index].style.height = newHeight + "px";

  bars[index].querySelector("span").textContent = newValue;
}

export function colorBar(container, index, color) {
  const bars = container.querySelectorAll(".bar");
  bars[index].style.background = color;
}
