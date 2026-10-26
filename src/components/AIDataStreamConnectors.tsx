import React, { memo } from "react";

export interface AIDataStreamConnectorsProps {
  className?: string;
}

export const AIDataStreamConnectors = memo(function AIDataStreamConnectors({
  className = "",
}: AIDataStreamConnectorsProps) {
  // Path A: From Invoice Port A (0, 155) across 60px gap to Active Stage Inflow (60, 26)
  const pathA = "M 0 155 C 27 155, 33 26, 60 26";
  // Path B: Base rail geometry
  const pathB = "M 0 285 C 28 285, 32 119, 60 119";
  // Path B Feedback: From Active Intelligence Stage (60, 119) back toward Invoice Context (0, 285)
  const pathBFeedback = "M 60 119 C 32 119, 28 285, 0 285";

  return (
    <div
      className={`fo-ai-advantage__connectors ${className}`}
      aria-hidden="true"
    >
      <svg
        className="fo-ai-advantage__connectors-svg"
        viewBox="0 0 60 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Connector A Gradient: Electric Cyan to Vivid Blue */}
          <linearGradient id="fo-stream-grad-a" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05C7F2" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#0055FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#05C7F2" stopOpacity="0.85" />
          </linearGradient>

          {/* Connector B Gradient: Indigo to Magenta-Pink */}
          <linearGradient id="fo-stream-grad-b" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0055FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#05C7F2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E22991" stopOpacity="0.95" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="fo-connector-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* CONNECTOR A: CONTEXT STREAM */}
        <g className="fo-ai-connector-group fo-ai-connector--a">
          {/* Base Rail */}
          <path
            d={pathA}
            className="fo-ai-connector-rail"
            stroke="rgba(5, 199, 242, 0.22)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          {/* Luminous Core Stream */}
          <path
            d={pathA}
            className="fo-ai-connector-beam"
            stroke="url(#fo-stream-grad-a)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#fo-connector-glow)"
          />
          {/* Traveling Pulse Particle A */}
          <circle
            className="fo-ai-pulse-dot fo-ai-pulse-dot--a"
            r="4.5"
            fill="#05C7F2"
            filter="url(#fo-connector-glow)"
          >
            <animateMotion
              path={pathA}
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            className="fo-ai-pulse-halo fo-ai-pulse-halo--a"
            r="8"
            fill="none"
            stroke="#05C7F2"
            strokeWidth="1"
            opacity="0.5"
          >
            <animateMotion
              path={pathA}
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* CONNECTOR B: ACTIVE INSIGHT STREAM */}
        <g className="fo-ai-connector-group fo-ai-connector--b">
          {/* Base Rail */}
          <path
            d={pathB}
            className="fo-ai-connector-rail"
            stroke="rgba(226, 41, 145, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            fill="none"
          />
          {/* Luminous Active Stream */}
          <path
            d={pathB}
            className="fo-ai-connector-beam"
            stroke="url(#fo-stream-grad-b)"
            strokeWidth="2.8"
            fill="none"
            filter="url(#fo-connector-glow)"
          />
          {/* Traveling Pulse Particle B (Feedback Loop: Stage -> Invoice) */}
          <circle
            className="fo-ai-pulse-dot fo-ai-pulse-dot--b"
            r="5"
            fill="#E22991"
            filter="url(#fo-connector-glow)"
          >
            <animateMotion
              path={pathBFeedback}
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            className="fo-ai-pulse-halo fo-ai-pulse-halo--b"
            r="9"
            fill="none"
            stroke="#E22991"
            strokeWidth="1.2"
            opacity="0.6"
          >
            <animateMotion
              path={pathBFeedback}
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
});

export default AIDataStreamConnectors;
