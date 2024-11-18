import React, { useEffect } from "react";

interface AnimatedPlusTapProps {
  x: number;
  y: number;
  value: number;
  onComplete: () => void;
}

const AnimatedPlusTap: React.FC<AnimatedPlusTapProps> = ({
  x,
  y,
  value,
  onComplete,
}) => {
  useEffect(() => {
    // Timer for removal after animation completion
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // time should match the duration of the animation in CSS

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="tap-visual-item-wrapper"
      style={{
        top: y,
        left: x,
      }}
    >
      <span className="tap-visual-item">+{value}</span>
    </div>
  );
};

export default AnimatedPlusTap;
