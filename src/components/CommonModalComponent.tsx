import React from "react";

interface TProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}
const CommonModalComponent: React.FC<TProps> = ({
  title,
  onClose,
  children,
}) => {
  return (
    <div className="modal-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 h-full w-full">
        <div className="relative w-full mb-5 px-5">
          <h2 className="text-white font-helvetica-neue-pro font-black text-center text-22">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-1/2 right-0 -translate-y-1/2  text-3xl text-white  focus:outline-none"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CommonModalComponent;
