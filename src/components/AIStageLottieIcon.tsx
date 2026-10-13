import React, { memo, useEffect, useRef, useState } from "react";
import { loadLottie } from "../utils/lottieLoader";

export interface AIStageLottieIconProps {
  isActive: boolean;
  stageIndex?: number;
  size?: number; // default 26px
  className?: string;
}

export const AIStageLottieIcon = memo(function AIStageLottieIcon({
  isActive,
  stageIndex = 0,
  size = 26,
  className = "",
}: AIStageLottieIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    loadLottie().then((lottie) => {
      if (isCancelled || !lottie || !container) return;

      try {
        // Destroy existing animation if any
        if (animInstanceRef.current) {
          animInstanceRef.current.destroy();
        }

        const anim = lottie.loadAnimation({
          container: container,
          renderer: "svg",
          loop: true,
          autoplay: isActive && !prefersReducedMotion,
          path: "/assets/lottie/ai-loader.json",
        });

        animInstanceRef.current = anim;
        setIsLoaded(true);

        if (prefersReducedMotion) {
          anim.goToAndStop(15, true); // Freeze at a pleasant frame showing the star
        } else if (!isActive) {
          anim.pause();
        }
      } catch (err) {
        console.warn("Lottie initialization failed, using fallback:", err);
      }
    });

    return () => {
      isCancelled = true;
      if (animInstanceRef.current) {
        animInstanceRef.current.destroy();
        animInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Control playback based on active state without destroying/recreating the animation
  useEffect(() => {
    const anim = animInstanceRef.current;
    if (!anim) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      anim.pause();
      return;
    }

    if (isActive) {
      anim.play();
    } else {
      anim.pause();
    }
  }, [isActive]);

  return (
    <div
      className={`fo-ai-advantage__lottie ${isActive ? "is-active" : "is-subdued"} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
      aria-hidden="true"
    >
      {/* Lottie Animation Mount Point */}
      <div
        ref={containerRef}
        className="fo-ai-advantage__lottie-anim"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Fallback SVG sparkling star if Lottie is still loading or unavailable */}
      {!isLoaded && (
        <svg
          className="fo-ai-advantage__lottie-fallback"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
            fill="url(#fo-lottie-spark-grad)"
          />
          <defs>
            <linearGradient
              id="fo-lottie-spark-grad"
              x1="2"
              y1="2"
              x2="22"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#05C7F2" />
              <stop offset="0.5" stopColor="#0528F2" />
              <stop offset="1" stopColor="#E22991" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
});

export default AIStageLottieIcon;
