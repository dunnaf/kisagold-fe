# Global Loading System Documentation

Complete guide for the Kisagold loading system - optimized, minimal, and easy to use.

---

## 🚀 Quick Start

The loading system is **already working**! It automatically appears when navigating between pages.

### Test It Now

```bash
npm run dev
# Navigate between pages → Loading appears automatically
```

### Try the Demo

Visit `http://localhost:5173/loading-demo` to see interactive examples.

---

## 📋 What's Included

### Core Features

✅ Full-screen loading overlay  
✅ Animated progress bar  
✅ Logo with fade-in effect  
✅ 1-second minimum display time  
✅ Automatic page navigation loading  
✅ Manual control for custom scenarios  
✅ Clean, optimized design

### Visual Design

- **Background**: Static gold/beige gradient (#EBDFCC, #F5EFE3)
- **Logo**: Kisagold logo with simple fade-in
- **Progress Bar**: Smooth animated fill with percentage
- **Animations**: Minimal (logo fade-in + progress transition)

### Performance

- **File Size**: 4KB (optimized)
- **Animations**: 2 (minimal CPU usage)
- **DOM Elements**: 4 (lightweight)
- **Display Time**: 1 second minimum (smooth UX)

---

## 💻 Usage

### 1. Automatic Loading (Already Active)

No code needed - loading appears automatically when navigating:

```javascript
// User clicks navigation link → Loading shows → Page loads → Loading hides
// That's it! Nothing to implement.
```

### 2. Manual Control in Components

#### Simple Show/Hide

```vue
<script setup>
import { showLoading, hideLoading } from "@/utils/loading";

const handleAction = async () => {
  showLoading(2000); // Show for 2 seconds max
  await someOperation();
  hideLoading();
};
</script>
```

#### Wrap Async Functions

```vue
<script setup>
import { withLoading } from "@/utils/loading";

const loadData = async () => {
  const data = await withLoading(async () => {
    return await fetchData();
  });
  // Loading shows for minimum 1 second, even if fetchData is instant
};
</script>
```

#### Manual Progress Control

```vue
<script setup>
import { showLoading, updateProgress, hideLoading } from "@/utils/loading";

const multiStepProcess = async () => {
  showLoading(5000);

  await step1();
  updateProgress(25);

  await step2();
  updateProgress(50);

  await step3();
  updateProgress(75);

  await step4();
  hideLoading();
};
</script>
```

### 3. Using the Composable

```vue
<script setup>
import { useLoading } from "@/composables/useLoading";

const { isLoading, progress, startLoading, finishLoading } = useLoading();

const load = async () => {
  startLoading(2000);
  await fetchData();
  finishLoading();
};

// Watch loading state
watch(isLoading, (loading) => {
  console.log("Loading:", loading);
});
</script>
```

---

## 🔌 API Integration Examples

### Simple API Call

```javascript
import { withLoading } from "@/utils/loading";

async function fetchProducts() {
  return await withLoading(async () => {
    const response = await axios.get("/api/products");
    return response.data;
  });
}
```

### Form Submission

```javascript
import { showLoading, hideLoading } from "@/utils/loading";

async function submitForm(formData) {
  showLoading(2000);
  try {
    await api.submit(formData);
    hideLoading();
    // Success
  } catch (error) {
    hideLoading();
    // Error
  }
}
```

### Multiple API Calls

```javascript
import { withLoading } from "@/utils/loading";

async function loadPageData() {
  return await withLoading(
    async () => {
      const [products, categories, settings] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/categories"),
        axios.get("/api/settings"),
      ]);
      return { products, categories, settings };
    },
    { duration: 3000 },
  );
}
```

### File Upload with Progress

```javascript
import { showLoading, updateProgress, hideLoading } from "@/utils/loading";

async function uploadFile(file) {
  showLoading(5000);
  try {
    updateProgress(10);
    const formData = new FormData();
    formData.append("file", file);

    updateProgress(25);
    const response = await axios.post("/api/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 50) / progressEvent.total,
        );
        updateProgress(25 + percent); // 25-75%
      },
    });

    updateProgress(90);
    hideLoading();
    return response.data;
  } catch (error) {
    hideLoading();
    throw error;
  }
}
```

### Axios Interceptor (Global)

```javascript
import axios from "axios";
import { showLoading, hideLoading } from "@/utils/loading";

// Add to main.js or api service
axios.interceptors.request.use(
  (config) => {
    if (!config.hideLoading) {
      showLoading(2000);
    }
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  },
);
```

---

## 🎨 Customization

### Change Loading Duration

Edit `src/router/index.js` (line 62):

```javascript
startLoading(3000); // Change to 3 seconds
```

### Change Minimum Display Time

Edit `src/router/index.js` (line 71):

```javascript
const minDisplayTime = 1500; // Change to 1.5 seconds
```

Or per call:

```javascript
await withLoading(async () => await fetchData(), { minDisplayTime: 1500 });
```

### Change Colors

Edit `src/components/common/GlobalLoading.vue`:

```css
/* Background gradient */
.loading-gradient {
  background: linear-gradient(135deg, #YourColor1 0%, #YourColor2 100%);
}

/* Progress bar */
.progress-fill {
  background: linear-gradient(90deg, #YourColor 0%, #YourColor 100%);
}

/* Text */
.progress-text {
  @apply text-[#YourColor];
}
```

### Change Logo

Edit `src/components/common/GlobalLoading.vue` (line 34):

```javascript
const logoSrc = computed(() => "/images/your-logo.png");
```

### Disable Auto-Loading

Comment out navigation guards in `src/router/index.js`:

```javascript
// router.beforeEach(...)
// router.afterEach(...)
```

---

## 📚 API Reference

### Utility Functions

#### `showLoading(duration?)`

Show loading screen with progress animation.

- **duration** (number, optional): Progress animation duration in ms (default: 2000)

```javascript
showLoading(3000); // 3 second duration
```

#### `hideLoading(delay?)`

Hide loading screen with fade out.

- **delay** (number, optional): Delay before hiding in ms (default: 300)

```javascript
hideLoading(500); // Hide after 500ms
```

#### `withLoading(asyncFn, options?)`

Wrap async function with loading animation.

- **asyncFn** (Function): Async function to execute
- **options.duration** (number): Progress duration (default: 2000)
- **options.delay** (number): Hide delay (default: 300)
- **options.minDisplayTime** (number): Minimum display time (default: 1000)

```javascript
const data = await withLoading(async () => await fetchData(), {
  duration: 3000,
  minDisplayTime: 1500,
});
```

#### `updateProgress(value)`

Manually set progress value.

- **value** (number): Progress percentage (0-100)

```javascript
updateProgress(50); // Set to 50%
```

#### `cancelLoading()`

Stop loading immediately without animation.

```javascript
cancelLoading();
```

### Composable

#### `useLoading()`

Returns reactive loading state and control functions.

```javascript
const {
  isLoading, // Ref<boolean> - Loading state
  progress, // Ref<number> - Progress (0-100)
  startLoading, // (duration: number) => void
  finishLoading, // (delay: number) => void
  stopLoading, // () => void
  setProgress, // (value: number) => void
} = useLoading();
```

---

## 📁 File Structure

```
src/
├── components/
│   └── common/
│       └── GlobalLoading.vue       # Main component (127 lines, 4KB)
├── composables/
│   └── useLoading.js               # State management (89 lines)
├── utils/
│   └── loading.js                  # Utility functions (125 lines)
├── router/
│   └── index.js                    # Navigation guards (modified)
├── views/
│   └── LoadingDemoPage.vue         # Demo page (/loading-demo)
└── App.vue                         # GlobalLoading imported here
```

---

## 🎯 Features Summary

### Current Design (Optimized)

- Static gradient background (no animation)
- Logo with simple fade-in (0.5s, once)
- Progress bar with smooth transition (0.3s)
- Progress percentage display
- Clean, minimal, professional

### Removed for Optimization

- ❌ Gradient shift animation
- ❌ Pattern movement
- ❌ Logo floating/pulse
- ❌ Glow effects
- ❌ Progress shimmer
- ❌ 3 decorative circles
- ❌ Loading text

### Performance

- **52% smaller** than original (7.2KB → 4KB)
- **82% fewer animations** (11 → 2)
- **60% fewer DOM elements** (10 → 4)
- Minimal CPU usage
- Better battery life

---

## 🐛 Troubleshooting

### Loading doesn't appear on navigation

**Check:**

1. GlobalLoading component is in App.vue
2. Router guards are active in router/index.js
3. Routes have different paths (not just hash/query changes)

### Loading flashes too quickly

**Solution:** The 1-second minimum is already implemented. If you want longer:

```javascript
// In router/index.js, change minDisplayTime
const minDisplayTime = 2000; // 2 seconds
```

### Loading stays visible

**Cause:** Error occurred before `hideLoading()` was called.

**Solution:** Always use try-catch:

```javascript
try {
  showLoading();
  await operation();
  hideLoading();
} catch (error) {
  hideLoading(); // Always cleanup
  throw error;
}
```

### Progress bar is choppy

**Solution:** Adjust update interval in `useLoading.js`:

```javascript
// Change from 50ms to 100ms (line 26)
progressInterval.value = setInterval(() => {
  // ...
}, 100);
```

---

## ✅ Best Practices

### 1. Use `withLoading` for API calls

```javascript
// ✅ Good
const data = await withLoading(() => fetchData());

// ❌ Avoid
showLoading();
const data = await fetchData();
hideLoading();
```

### 2. Always cleanup in catch blocks

```javascript
// ✅ Good
try {
  showLoading();
  await operation();
  hideLoading();
} catch (error) {
  hideLoading();
}

// ❌ Bad
showLoading();
await operation();
hideLoading();
```

### 3. Don't show loading for instant operations

```javascript
// ❌ Bad - showing loading for instant operation
showLoading();
const value = localStorage.getItem("key");
hideLoading();

// ✅ Good - only use for async operations
const data = await withLoading(() => fetchData());
```

### 4. Use appropriate durations

```javascript
// Fast operation (< 1s expected)
showLoading(1500);

// Normal operation (1-3s expected)
showLoading(2000);

// Slow operation (3-5s expected)
showLoading(5000);
```

---

## 🎉 You're Done!

The loading system is ready to use. Key points:

✅ **Automatic** - Shows on page navigation  
✅ **Manual** - Use utilities for custom loading  
✅ **Optimized** - Minimal animations, fast performance  
✅ **Consistent** - 1-second minimum display time  
✅ **Easy** - Simple API, well documented

Need help? Check the demo at `/loading-demo` or refer to the examples above.

---

**Last Updated:** Feb 12, 2026  
**Version:** 2.0 (Optimized)
