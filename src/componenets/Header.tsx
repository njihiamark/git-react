import React from "react";

type Props = {
  children: React.ReactNode;
};

function Header({children}:Props) {
    return (
      <div className="bg-white p-4 shadow mb-4 font-semibold">
        {children}
      </div>
    );
  }
  
  export default Header;