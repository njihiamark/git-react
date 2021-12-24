import React from "react";

type Props = {
  children: React.ReactNode;
};

function Card({children}:Props) {
    return (
      <div className="bg-white py-4 px-8 shadow rounded-lg mb-4">
        {children}
      </div>
    );
  }
  
  export default Card;