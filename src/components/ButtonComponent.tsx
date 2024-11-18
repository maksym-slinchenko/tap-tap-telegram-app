import React from "react";

type TProps = {
  label: string;
  onClick?: any;
  additionalClasses?: string;
};

const ButtonComponent: React.FC<TProps> = ({
  label,
  onClick = () => {},
  additionalClasses,
}) => {
  return (
    <button
      onClick={onClick}
      className={`font-helvetica-neue-pro w-full bg-gradient-yellow text-blue-800 font-black text-sm leading-1em rounded-xl text-center uppercase pt-5 pb-3 hovered-btn ${additionalClasses}`}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
