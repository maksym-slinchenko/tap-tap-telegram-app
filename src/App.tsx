import { useEffect, useState } from "react";
import MainComponent from "./components/MainComponent";
import WaterPlane from "./components/WaterPlane";
import WavySphereAnimation from "./components/WavySphere";
import CoinComponent from "./components/CoinComponent";
import {
  activeBoosterTime,
  inactiveBoosterTime,
  firstRandomBoosterActivInterval,
} from "./app.config";

const [start, end] = firstRandomBoosterActivInterval;
const firstRandomActivationTime = Math.random() * (end - start) + start;

function App() {
  const [tapState, setTapState] = useState(false);
  const [isBoosterActive, setIsBoosterActive] = useState(false);
  const [positionLeft, setPositionLeft] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startInactiveTimeout = (startTime: number) => {
      timeoutId = setTimeout(() => {
        setIsBoosterActive(true);
        setPositionLeft(Math.floor(Math.random() * 80)); // Random integer between 0 and 90
        startActiveTimeout();
      }, startTime);
    };

    const startActiveTimeout = () => {
      timeoutId = setTimeout(() => {
        setIsBoosterActive(false);
        startInactiveTimeout(inactiveBoosterTime);
      }, activeBoosterTime);
    };

    startInactiveTimeout(firstRandomActivationTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="app">
      <MainComponent
        onTap={(state) => setTapState(state)}
        tapState={tapState}
        isBoosterActive={isBoosterActive}
      />
      <WavySphereAnimation onTap={tapState} />
      <WaterPlane />
      <CoinComponent
        isVisible={isBoosterActive}
        positionLeft={positionLeft}
        activeTime={activeBoosterTime}
      />
    </div>
  );
}

export default App;
