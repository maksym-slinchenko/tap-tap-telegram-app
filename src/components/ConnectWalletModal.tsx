import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import WalletIcon from "../assets/images/wallet-grad.svg";
import { TModal } from "./MainComponent";

type TProps = {
  setShownModalType: (type: TModal | null) => void;
};

const ConnectWalletModal: React.FC<TProps> = ({ setShownModalType }) => {
  const [wallet, setWallet] = useState<string>("");

  const closeOnBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if ((e.target as HTMLDivElement).classList.contains("modal-container")) {
      setShownModalType(null);
    }
  };

  return (
    <div
      className="modal-container fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-48 z-50"
      onClick={closeOnBackgroundClick}
    >
      <button
        onClick={() => setShownModalType(null)}
        className="absolute top-4 right-4 text-3xl text-white  focus:outline-none"
      >
        &times;
      </button>
      <div className="flex flex-col items-center gap-7.5 w-full text-center">
        <div className="flex flex-col items-center gap-3 w-full">
          <img src={WalletIcon} alt="wallet icon" width={32} height={32} />
          <div className="flex flex-col gap-2">
            <p className="font-helvetica-neue-pro text-xl font-black leading-1.1em">
              Connect Wallet
            </p>
            <p className="w-50 font-medium">
              Submit your wallet and receive reward
            </p>
          </div>
          <input
            className="modal-input"
            type="text"
            placeholder="Enter your wallet"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
        <ButtonComponent
          label="connect"
          additionalClasses="!w-48"
          onClick={() => setShownModalType("success")}
        />
      </div>
    </div>
  );
};

export default ConnectWalletModal;
