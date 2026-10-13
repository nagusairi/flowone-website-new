# Animated Multilayer Wave Divider Reference
## Source: Premium Addons (Elementor AI Abilities Page)

This document contains the exact SVG, CSS keyframe animation, and design specification for the animated multi-layer wave divider found on [Premium Addons](https://premiumaddons.com/elementor-mcp-and-ai-abilities/).

---

## 1. Technical Overview

- **Pattern:** 3-layer translucent SVG wave divider.
- **Animation technique:** Pure CSS GPU-accelerated horizontal translation (`translateX` + `scale(4)`). Zero JavaScript runtime overhead.
- **Duration & Timing:** 35 seconds, `alternate` direction, `linear` easing, infinite loop.
- **Blending principle:** The SVG `fill` color must match the background of the **preceding (top) section**, creating an organic carving effect into the bottom section.

---

## 2. Raw SVG Vector

```html
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="1000" 
  height="100" 
  preserveAspectRatio="none" 
  viewBox="0 0 1000 100"
>
  <defs>
    <style>
      .wave-layer-back { opacity: 0.33; }
      .wave-layer-mid { opacity: 0.66; }
      .wave-layer-back, .wave-layer-mid { isolation: isolate; }
    </style>
  </defs>
  <!-- Layer 1: 33% Opacity Wave (Back) -->
  <path 
    class="wave-layer-back" 
    d="m527,32.7c203.9-88.3,263.1,34,320.3,0,86.7-51.8,152.7,7.6,152.7,7.6v59.7H0v-59.7S62.1,14.2,94.9,11c32.8-3.3,62.8,12.3,75.8,22.1,23.3,17.3,84,58.2,134.4,62.2s202.5-54.3,221.9-62.6Z"
  />
  <!-- Layer 2: 66% Opacity Wave (Middle) -->
  <path 
    class="wave-layer-mid" 
    d="m266,32.7c45.5,0,77.2,23.2,129.1,39.1,28.6,8.7,150.3,10.1,254-39.1,103.7-49.2,91.7,34.4,149.2,0,86-51,201.7,27.5,201.7,27.5v39.8H0v-36.5s28.2,18.5,92.1,18.5c97.7-.1,132.2-49.3,173.9-49.3Z"
  />
  <!-- Layer 3: 100% Solid Wave (Front) -->
  <path 
    d="m233.9,71.1c200,57.5,266-65.5,395.1-19.5,129,46.6,129,43,186.2,27.8,56.8-15.2,52.5-24.3,94.9-31.9,61.3-11.2,89.9,52.5,89.9,52.5H0s9.9-40.9,83.6-48.1,86.8,1.1,150.3,19.2Z"
  />
</svg>
```

---

## 3. CSS Styles & Keyframes

```css
.animated-wave-divider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
  z-index: 2;
}

.animated-wave-divider__track {
  width: 100%;
  transform-origin: 100% 50%;
  transform: scale(4) rotateX(180deg);
  animation: waveDividerSlide 35s linear infinite alternate;
}

.animated-wave-divider__track svg {
  display: block;
  width: 100%;
  height: 18px; /* Sleek height */
  fill: #FFFFFF; /* Match previous section background */
}

@keyframes waveDividerSlide {
  0% {
    transform: rotateX(180deg) scale(4) translateX(0);
  }
  100% {
    transform: rotateX(180deg) scale(4) translateX(calc(100% - 100% / 4));
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated-wave-divider__track {
    animation: none !important;
  }
}
```

---

## 4. Ready-to-Use React Component

```tsx
import React, { memo } from "react";

interface AnimatedWaveDividerProps {
  fillColor?: string; // Color of preceding section (e.g. #FAFBFD or #FFFFFF)
  height?: number; // e.g. 18px
  durationSeconds?: number; // e.g. 35
}

export const AnimatedWaveDivider = memo(function AnimatedWaveDivider({
  fillColor = "#FFFFFF",
  height = 18,
  durationSeconds = 35,
}: AnimatedWaveDividerProps) {
  return (
    <div className="animated-wave-divider" aria-hidden="true">
      <div
        className="animated-wave-divider__track"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          height="100"
          preserveAspectRatio="none"
          viewBox="0 0 1000 100"
          style={{ height: `${height}px`, fill: fillColor }}
        >
          <path
            style={{ opacity: 0.33 }}
            d="m527,32.7c203.9-88.3,263.1,34,320.3,0,86.7-51.8,152.7,7.6,152.7,7.6v59.7H0v-59.7S62.1,14.2,94.9,11c32.8-3.3,62.8,12.3,75.8,22.1,23.3,17.3,84,58.2,134.4,62.2s202.5-54.3,221.9-62.6Z"
          />
          <path
            style={{ opacity: 0.66 }}
            d="m266,32.7c45.5,0,77.2,23.2,129.1,39.1,28.6,8.7,150.3,10.1,254-39.1,103.7-49.2,91.7,34.4,149.2,0,86-51,201.7,27.5,201.7,27.5v39.8H0v-36.5s28.2,18.5,92.1,18.5c97.7-.1,132.2-49.3,173.9-49.3Z"
          />
          <path
            d="m233.9,71.1c200,57.5,266-65.5,395.1-19.5,129,46.6,129,43,186.2,27.8,56.8-15.2,52.5-24.3,94.9-31.9,61.3-11.2,89.9,52.5,89.9,52.5H0s9.9-40.9,83.6-48.1,86.8,1.1,150.3,19.2Z"
          />
        </svg>
      </div>
    </div>
  );
});

export default AnimatedWaveDivider;
```
