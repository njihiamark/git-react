import React from "react";

type Props = {
  children: React.ReactNode,
  onClick?: () => void,
  clickable?: boolean,
};

function Card({children, onClick= () => {}, clickable=false }:Props) {
    return (
      <div className={clickable ? "bg-white py-4 px-8 shadow rounded-lg mb-4 flex items-center cursor-pointer" : "bg-white py-4 px-8 shadow rounded-lg mb-4 flex items-center"} onClick={onClick}>
        {children}
      </div>
    );
  }
  
  export default Card;