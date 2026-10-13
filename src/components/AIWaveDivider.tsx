import React, { memo } from "react";

export interface AIWaveDividerProps {
  position?: "top" | "bottom";
  fillColor?: string; // Preceding or following section background color
  height?: number; // Subtle height: 16–18px
  durationSeconds?: number; // 35s per reference
  className?: string;
}

export const AIWaveDivider = memo(function AIWaveDivider({
  position = "top",
  fillColor = position === "top" ? "#F8FAFC" : "#041938",
  height = 18,
  durationSeconds = 35,
  className = "",
}: AIWaveDividerProps) {
  const isTop = position === "top";

  return (
    <div
      className={`fo-ai-advantage__wave fo-ai-advantage__wave--${position} ${className}`}
      aria-hidden="true"
    >
      <div
        className={`fo-ai-advantage__wave-track fo-ai-advantage__wave-track--${position}`}
        style={{
          animationDuration: `${durationSeconds}s`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          height="100"
          preserveAspectRatio="none"
          viewBox="0 0 1000 100"
          className="fo-ai-advantage__wave-svg"
          style={{ height: `${height}px`, fill: fillColor }}
        >
          {/* Layer 1: 33% Opacity Wave (Back) */}
          <path
            className="fo-ai-advantage__wave-layer fo-ai-advantage__wave-layer--back"
            style={{ opacity: 0.33 }}
            d="m527,32.7c203.9-88.3,263.1,34,320.3,0,86.7-51.8,152.7,7.6,152.7,7.6v59.7H0v-59.7S62.1,14.2,94.9,11c32.8-3.3,62.8,12.3,75.8,22.1,23.3,17.3,84,58.2,134.4,62.2s202.5-54.3,221.9-62.6Z"
          />
          {/* Layer 2: 66% Opacity Wave (Middle) */}
          <path
            className="fo-ai-advantage__wave-layer fo-ai-advantage__wave-layer--mid"
            style={{ opacity: 0.66 }}
            d="m266,32.7c45.5,0,77.2,23.2,129.1,39.1,28.6,8.7,150.3,10.1,254-39.1,103.7-49.2,91.7,34.4,149.2,0,86-51,201.7,27.5,201.7,27.5v39.8H0v-36.5s28.2,18.5,92.1,18.5c97.7-.1,132.2-49.3,173.9-49.3Z"
          />
          {/* Layer 3: 100% Solid Wave (Front) */}
          <path
            className="fo-ai-advantage__wave-layer fo-ai-advantage__wave-layer--front"
            d="m233.9,71.1c200,57.5,266-65.5,395.1-19.5,129,46.6,129,43,186.2,27.8,56.8-15.2,52.5-24.3,94.9-31.9,61.3-11.2,89.9,52.5,89.9,52.5H0s9.9-40.9,83.6-48.1,86.8,1.1,150.3,19.2Z"
          />
        </svg>
      </div>
    </div>
  );
});

export default AIWaveDivider;
