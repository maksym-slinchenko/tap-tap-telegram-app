import React from "react";
import ButtonComponent from "./ButtonComponent";
import CheckIcon from "../assets/images/check-grad.svg";

type TProps = {
  onClose: () => void;
};

const SuccessModal: React.FC<TProps> = ({ onClose }) => {
  const closeOnBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if ((e.target as HTMLDivElement).classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop absolute top-0 left-0 w-full h-full bg-black bg-opacity-45 z-40"
      onClick={closeOnBackgroundClick}
    >
      <div className="modal-container fixed top-full -translate-y-full inset-0 flex items-center justify-center px-4 pt-9 pb-12 z-50 h-fit rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-white  focus:outline-none"
        >
          &times;
        </button>
        <div className="flex flex-col items-center gap-5 w-full text-center">
          <div className="flex flex-col items-center gap-4 w-full">
            <img src={CheckIcon} alt="wallet icon" width={43} height={43} />
            <div className="flex flex-col gap-2">
              <p className="font-helvetica-neue-pro text-xl font-black leading-1.1em">
                Successfully
              </p>
              <p className="font-medium">Wallet Submitted</p>
            </div>
          </div>
          <ButtonComponent
            onClick={onClose}
            label="continue"
            additionalClasses="!w-48"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
