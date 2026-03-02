# 🔍 Algorithm Visualizer

An interactive, web-based tool designed to demystify Data Structures and Algorithms (DSA). This project provides a step-by-step visual representation of how sorting and searching algorithms manipulate data in real-time.

## 🎯 Project Objectives

* **Interactive Learning:** Move away from "black box" code by watching the logic unfold.
* **Visual Intuition:** Use color-coded animations to distinguish between comparisons, swaps, and sorted states.
* **Complexity Insight:** Display real-time time complexity ($O(n)$, $O(n^2)$, etc.) to help students prepare for interviews.
* **Zero Setup:** A lightweight, browser-based tool with no backend dependencies.

---

## 📸 Project Gallery

### 🏠 Main Menu

The entry point allows users to toggle between the **Sorting** and **Searching** suites.
<img width="928" height="769" alt="Screenshot 2026-03-02 194735" src="https://github.com/user-attachments/assets/3fd39f84-7b96-4bec-8495-aa2e752a958a" />


### 📊 Sorting Algorithms

Visualizing **Bubble Sort**. Watch as the largest elements "bubble" to the top through adjacent swaps.

Color-->Meaning-->Context

Blue 🔵-->Default/Unsorted-->Elements that haven't been finalized yet.

Purple/Orange 🟣-->Comparison-->Elements currently being compared against each other.

Red 🔴-->Swapping-->Elements actively changing positions in the array.

Green 🟢-->Sorted/Found-->Elements in their final position or a search target that was found.

<img width="1858" height="779" alt="Screenshot 2026-03-02 194825" src="https://github.com/user-attachments/assets/e75dd68b-2d5a-4718-a248-7b75ec820075" />

<img width="1920" height="1008" alt="Screenshot 2026-03-02 195039" src="https://github.com/user-attachments/assets/18f458ad-64ae-4beb-b2e2-b5bb1ca0f476" />

<img width="1920" height="1008" alt="Screenshot 2026-03-02 195028" src="https://github.com/user-attachments/assets/6b53a4b2-238b-4d5b-b37f-e277702a9ba1" />



### 🔎 Searching Algorithms

Visualizing **Linear Search**. The algorithm checks each element sequentially until the target is found.


---
<img width="1920" height="1008" alt="Screenshot 2026-03-02 195028" src="https://github.com/user-attachments/assets/f79ae78b-4105-438c-8e5f-e1e2ee72f863" />

<img width="1920" height="1008" alt="Screenshot 2026-03-02 195204" src="https://github.com/user-attachments/assets/3b587d94-871d-4156-b275-309b71f82a81" />


## 🧠 Algorithms Included

### 🔁 Sorting Suite

* **Bubble Sort:** Simple adjacent swaps.
* **Selection Sort:** Finding the minimum in the unsorted part.
* **Insertion Sort:** Building a sorted array one element at a time.
* **Merge Sort & Quick Sort:** Efficient "Divide and Conquer" strategies.

### 🔎 Searching Suite

* **Linear Search:** Sequential scanning ($O(n)$).
* **Binary Search:** Logarithmic search on sorted data ($O(\log n)$).
* **Advanced:** Jump Search, Interpolation Search, and Exponential Search.

---

## 🛠 Technologies Used

* **HTML5:** Semantic structure for the UI.
* **CSS3:** Responsive layouts and bar-chart styling.
* **JavaScript (ES6):** Core logic, asynchronous animations (using `Promises` and `async/await`), and DOM manipulation.

---

## 🚀 How to Run the Project

### ✅ Method 1: Live Demo (Hugging Face)

You can access the live version of this project directly on Hugging Face Spaces:
👉 **[Algorithm Visualizer Live](https://www.google.com/search?q=https://huggingface.co/spaces/Chinmai1610/Algorithm-Visualizer)**

### ✅ Method 2: Local Run

1. **Clone the Repo:**
```bash
git clone https://github.com/Chinmai1610/Algorithm-Visualizer.git

```


2. **Open Index:** Simply double-click the `index.html` file in your browser.

---

## 📂 Project Structure

```text
├── index.html          # Main landing page
├── style.css           # UI styling and bar animations
├── script.js           # Main logic & algorithm implementations
└── README.md           # Project documentation

```
