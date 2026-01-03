import { useState } from "react";
import "./wheel.css";

const slices = [
  { label: "🥦 +1", value: 1 },
  { label: "🥦 +2", value: 2 },
  { label: "🥦 +5", value: 5 },
  { label: "🥦 +10", value: 10 },
  { label: "🥦 +20", value: 20 },
  { label: "🥦 +50", value: 50 },
];

export default function Wheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [totalBroccolis, setTotalBroccolis] = useState(0);
  const [lastWin, setLastWin] = useState(null);

  const sliceAngle = 360 / slices.length;

  const POINTER_OFFSET = 270; // pointer at top (12 o’clock)

  const getWinningIndex = (rotation) => {
    // Normalize rotation to 0–360
    const normalizedRotation = ((rotation % 360) + 360) % 360;

    // Angle under pointer (12 o’clock = 90°)
    const pointerAngle = (360 - normalizedRotation + 270) % 360;

    return Math.floor(pointerAngle / sliceAngle);
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setLastWin(null);

    const randomIndex = Math.floor(Math.random() * slices.length);
    const extraSpins = 6;

    // Safe offset inside slice to avoid landing on the edge
    const safeOffset = sliceAngle * 0.2 + Math.random() * sliceAngle * 0.6;

    // Calculate final rotation
    const finalRotation =
      rotation +
      extraSpins * 360 +
      (360 - (randomIndex * sliceAngle + safeOffset));

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);

      const winningIndex = getWinningIndex(finalRotation);
      const winValue = slices[winningIndex].value;

      setLastWin(winValue);
      setTotalBroccolis((prev) => prev + winValue);
    }, 4000);
  };

  const reset = () => {
    setTotalBroccolis(0);
    setLastWin(null);
  };

  return (
    <div className="broccoli-container">
      <h1>Wheel of Fortune, no losers all get Broccoli for Free</h1>

      <div className="wheel-wrapper">
        <div className="pointer" />
        <svg
          className="wheel"
          viewBox="-150 -150 300 300"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {slices.map((slice, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            const largeArc = sliceAngle > 180 ? 1 : 0;

            const x1 = Math.cos((Math.PI / 180) * startAngle) * 150;
            const y1 = Math.sin((Math.PI / 180) * startAngle) * 150;

            const x2 = Math.cos((Math.PI / 180) * endAngle) * 150;
            const y2 = Math.sin((Math.PI / 180) * endAngle) * 150;

            return (
              <g key={index}>
                <path
                  d={`M 0 0 L ${x1} ${y1} A 150 150 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={index % 2 ? "#74c69d" : "#95d5b2"}
                />
                <text
                  x={
                    Math.cos((Math.PI / 180) * (startAngle + sliceAngle / 2)) *
                    90
                  }
                  y={
                    Math.sin((Math.PI / 180) * (startAngle + sliceAngle / 2)) *
                    90
                  }
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${startAngle + sliceAngle / 2} 
    ${Math.cos((Math.PI / 180) * (startAngle + sliceAngle / 2)) * 90}
    ${Math.sin((Math.PI / 180) * (startAngle + sliceAngle / 2)) * 90}
  )`}
                  fill="#1b4332"
                  fontWeight="600"
                >
                  {slice.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="controls">
        <button onClick={spinWheel} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin 🥦"}
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="stats">
        <p>Last Spin: {lastWin ? `+${lastWin}` : "-"}</p>
        <h2>Total: {totalBroccolis} 🥦</h2>
      </div>
    </div>
  );
}
