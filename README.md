# Stencil Enumerable Property Pollution Regression (MRP)

This repository demonstrates a regression in **Stencil 4.x / Ionic 8.x** where internal component bookkeeping properties (expandos) have become **enumerable** on the DOM element instances.

## The Bug

Internal Stencil properties like `s-p`, `s-rc`, and `__stencil__getHostRef` are now enumerable. When using testing libraries like **Vitest** or **Jest**, these properties are automatically detected by snapshot serializers and matcher output formatters.

This results in:

1. **Broken Matchers:** Matchers like `toHaveTextContent` **fail to find the expected text** on the element because the enumerable expandos interfere with how the testing library reads the element's prototype and content.
2. **Gigantic Error Logs:** Matcher failures now serialize the entire element instance, including the internal **React Fiber tree** (which becomes enumerable as a result of the Stencil property changes).

---

## Comparison Versions

### [GOOD] `ionic-8.5.0-good`

- **Ionic React:** `8.5.0`
- **Result:** Internal Stencil properties are **hidden** (non-enumerable) and `toHaveTextContent` works as expected.

### [BAD] `ionic-8.8.1-bad`

- **Ionic React:** `8.8.1`
- **Result:** Internal Stencil properties are **enumerable** and **`toHaveTextContent` fails.**

---

## How to Reproduce

### 1. Run the "Good" Baseline

```bash
cd ionic-8.5.0-good
npm install
npm test
```

_Observe that the console log shows 0 enumerable Stencil properties and the snapshot is clean._

### 2. Run the "Bad" Regression

```bash
cd ionic-8.8.1-bad
npm install
npm test
```

_Observe the console log showing `s-p`, `s-rc`, etc. and notice the snapshot file contains these properties._

---

## Issue Technical Details

- **Environment:** JSDOM + Vitest/Jest
- **Regression Window:** Introduced between Ionic `8.5.x` and `8.8.x` (likely due to Stencil 4 internals change).
- **Core Problem:** Internal state should be `enumerable: false` to avoid leaking into serializers and generic object iterations.
