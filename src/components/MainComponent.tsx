import React, { useCallback, useEffect, useRef, useState } from "react";

import starIcon from "../assets/images/star.svg";
import walletIcon from "../assets/images/wallet.svg";
import lightningIcon from "../assets/images/lightning.svg";
import fingerIcon from "../assets/images/finger.png";
import RefferalModal from "./ReferralModal";
import LeaderboardModal from "./LeaderboardModal";
import ConnectWalletModal from "./ConnectWalletModal";
import SuccessModal from "./SuccessModal";
import {
  maxEnergy,
  boosterValue,
  samePointDistance,
  controlTapNumber,
} from "../app.config";

type TProps = {
  onTap: (bool: boolean) => void;
  tapState: boolean;
  isBoosterActive: boolean;
};

export type TModal = "leaderboard" | "referral" | "wallet" | "success";

type ClickData = {
  time: number;
  x: number;
  y: number;
};

const MainComponent: React.FC<TProps> = ({
  onTap,
  tapState,
  isBoosterActive,
}) => {
  const lastClickCoordinates = useRef({ x: 0, y: 0 });
  const clickTracker = useRef<ClickData[]>([]);

  const [tapCounter, setTapCounter] = useState(0);
  const [energy, setEnergy] = useState(maxEnergy);
  const [shownModalType, setShownModalType] = useState<TModal | null>(null);
  const [isThrottled, setIsThrottled] = useState(false);

  const onCloseModal = () => {
    setShownModalType(null);
  };

  useEffect(() => {
    // Energy regeneration
    const interval = setInterval(() => {
      if (energy < maxEnergy) {
        setEnergy((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [energy]);

  const handleTap = useCallback(
    (e: React.MouseEvent) => {
      if (energy <= 0) return;

      // Check throttling
      if (isThrottled) {
        return;
      }

      const currentX = e.clientX;
      const currentY = e.clientY;

      const now = Date.now();

      // Initialize click storage if it doesn't exist
      const clicks = clickTracker?.current || [];

      // Keep only clicks from the last second
      while (clicks.length > 0 && now - clicks[0].time > 1000) {
        clicks.shift();
      }

      // If there are more than {samePointDistance} clicks per second at the same point, block
      const samePointClicks = clicks.filter(
        (click) =>
          Math.abs(click.x - currentX) < samePointDistance &&
          Math.abs(click.y - currentY) < samePointDistance
      );

      if (samePointClicks.length >= controlTapNumber) {
        return;
      }

      // Add the current click to storage
      clicks.push({ time: now, x: currentX, y: currentY });

      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), 100); // 0.1 seconds

      // Save click coordinates
      lastClickCoordinates.current = { x: currentX, y: currentY };

      // Decrease energy
      setEnergy((prev) => prev - 1);

      // Increase tap counter
      setTapCounter((prev) => prev + 1 * (isBoosterActive ? boosterValue : 1));

      // Click animation
      const newElementWrapper = document.createElement("div");
      newElementWrapper.className = "tap-visual-item-wrapper";
      newElementWrapper.style.top = `${currentY}px`;
      newElementWrapper.style.left = `${currentX}px`;

      const newElement = document.createElement("span");
      newElement.className = "tap-visual-item";
      newElement.innerText = `+${isBoosterActive ? boosterValue : 1}`;
      newElementWrapper.appendChild(newElement);

      const app = document.querySelector(".app");
      app?.appendChild(newElementWrapper);

      setTimeout(() => app?.removeChild(newElementWrapper), 2000);
    },
    [energy, isBoosterActive, isThrottled]
  );

  return (
    <div className="relative z-10 flex flex-col items-center w-full h-full px-8 py-5">
      <div className="flex justify-between items-end w-full">
        <div
          className="top-icon-wrapper flex justify-center items-center w-12 h-12 "
          onClick={() => setShownModalType("wallet")}
        >
          <img src={walletIcon} alt="wallet" className="w-6 h-6" />
        </div>
        <div
          className="counter-container flex items-center h-9 cursor-pointer"
          onClick={() => setShownModalType("leaderboard")}
        >
          {tapCounter}
          <img src={fingerIcon} alt="finger" className="h-7 w-7" />
        </div>
        <div
          className="top-icon-wrapper flex justify-center items-center w-12 h-12"
          onClick={() => setShownModalType("referral")}
        >
          <img src={starIcon} alt="wallet" className="w-6 h-6" />
        </div>
      </div>
      <div className="energy-bar-container flex flex-col justify-center items-center gap-0.5 mt-2">
        <div className="py-1 px-4 w-full">
          <div className="energy-bar-wrapper">
            <div
              className="energy-bar"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="energy-text flex justify-center items-center gap-1">
          <img src={lightningIcon} alt="lightning" className="w-6 h-6" />
          {energy}/{maxEnergy}
        </div>
      </div>
      {shownModalType === "referral" ? (
        <RefferalModal onClose={onCloseModal} />
      ) : (
        ""
      )}
      {shownModalType === "leaderboard" ? (
        <LeaderboardModal onClose={onCloseModal} myScore={tapCounter} />
      ) : (
        ""
      )}
      {shownModalType === "wallet" ? (
        <ConnectWalletModal setShownModalType={setShownModalType} />
      ) : (
        ""
      )}
      {shownModalType === "success" ? (
        <SuccessModal onClose={onCloseModal} />
      ) : (
        ""
      )}
      <div
        className="clicker-conteiner"
        onClick={handleTap}
        onMouseDown={() => onTap(true)}
        onMouseUp={() => onTap(false)}
        onTouchStart={() => onTap(true)}
        onTouchEnd={() => onTap(false)}
      >
        <div className="clicker-wrapper">
          <img
            src={fingerIcon}
            alt="finger"
            className={`finger-icon${tapState ? " scale-animation" : ""} `}
          />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
