import React, { useEffect, useState } from "react";
import CommonModalComponent from "./CommonModalComponent";

import db from "../bd.json";
import TopIcon from "../assets/images/top_icon.svg";
import Finger from "../assets/images/finger.png";

type LeaderboardProps = {
  onClose: () => void;
  myScore: number;
};

type TLeaderboardData = {
  username: string;
  score: number;
};

const LeaderboardModal: React.FC<LeaderboardProps> = ({ onClose, myScore }) => {
  const [leaderboardData, setLeaderboardData] = useState<TLeaderboardData[]>(
    []
  );

  useEffect(() => {
    const tempLeaderboard = [
      ...db?.leaderboard,
      { username: "You", score: myScore },
    ];
    const sortedLeaderboard = tempLeaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboardData(sortedLeaderboard);
  }, [myScore]);

  return (
    <CommonModalComponent onClose={onClose} title="Leaderboard">
      <div className="flex flex-col gap-1.5">
        {leaderboardData.map((item, index) => (
          <div
            className={
              index < 3 ? "gradient-border-wrapper" : "leadrboard-item"
            }
          >
            <div key={index} className="flex items-center gap-3 px-3 py-1.5">
              <div className="relative font-helvetica-neue-pro font-black text-center py-1 px-4">
                {index + 1}
                {index < 3 && (
                  <img
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    src={TopIcon}
                    alt="top-icon"
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="text-lg font-medium">{item.username}</div>
                <div className="font-helvetica-neue-pro font-black leading-1em flex items-center gap-1">
                  {item.score}
                  <img src={Finger} alt="finger" height={22} width={22} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CommonModalComponent>
  );
};

export default LeaderboardModal;
