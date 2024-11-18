import React, { useEffect, useState } from "react";
import CommonModalComponent from "./CommonModalComponent";
import db from "../bd.json";

import ButtonComponent from "./ButtonComponent";

type TProps = {
  onClose: () => void;
};

interface IRefData {
  refLink: string;
  refCount: number;
}

const ReferralModal: React.FC<TProps> = ({ onClose }) => {
  const [refData, setRefData] = useState<IRefData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const copyToClipboard = () => {
    if (!refData?.refLink) return;
    navigator.clipboard.writeText(refData?.refLink);
    setAlertVisible(true); // Show alert
    setTimeout(() => {
      setAlertVisible(false); // Hide alert after 2 seconds
    }, 1000);
  };

  useEffect(() => {
    const refLink = db?.ref_link;
    const refCount = db?.ref_count;
    setRefData({ refLink, refCount });
  }, []);

  return (
    <>
      <CommonModalComponent onClose={onClose} title="Invite">
        {/* Bonus and Referral Count */}
        <div className="bg-white bg-opacity-10 rounded-xl py-3 px-7 flex justify-around items-center text-center text-white mb-7">
          <div className="flex flex-col gap-1.5 w-1/2">
            <p className="text-xs font-bold leading-1.3em uppercase">
              YOUR BONUS
            </p>
            <p className="text-3xl font-black text-gradient leading-1.3em">
              25%
            </p>
          </div>
          <div className="w-1 h-10 bg-white"></div>
          <div className="flex flex-col gap-1.5 w-1/2">
            <p className="text-xs font-bold leading-1.3em uppercase">
              REFERRAL COUNT
            </p>
            <p className="text-3xl font-black text-gradient leading-1.3em">
              {refData?.refCount}
            </p>
          </div>
        </div>
        {/* Invitation and Rewards Text */}
        <div className="flex flex-col gap-4 mb-7">
          <div>
            <p className="font-helvetica-neue-pro text-xl font-black leading-1.1em">
              Invite friend
            </p>
            <p className="text-base">Friends via the referral link</p>
          </div>
          <div>
            <p className="font-helvetica-neue-pro text-xl font-black leading-1.1em">
              Get rewards
            </p>
            <p className="text-base">Receive 10% of your friends' staking</p>
          </div>
        </div>
        {/* Referral Link */}
        <div className="mb-4">
          <label className="text-base font-bold leading-1.4em mb-1.5">
            Your link:
          </label>
          <div className="relative flex justify-between items-center gap-1 rounded-xl border-solid border-white border py-3 ps-3 pe-3.5">
            {alertVisible && (
              <div className="absolute -top-1 right-0 -translate-y-full bg-black text-white py-2 px-4 rounded-lg shadow-lg text-center z-50">
                Copied!
              </div>
            )}

            <div className="text-sm">{refData?.refLink}</div>
            <button onClick={copyToClipboard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 2H15V4H6V17H4V2ZM8 6H20V22H8V6ZM10 8V20H18V8H10Z"
                  fill="url(#paint0_linear_4866_1260)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4866_1260"
                    x1="13.1111"
                    y1="15.8889"
                    x2="13.1111"
                    y2="4.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FED215" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>{" "}
            </button>
          </div>
        </div>
        {/* Invite Now Button */}
        <ButtonComponent label="INVITE NOW" />
      </CommonModalComponent>
    </>
  );
};

export default ReferralModal;
