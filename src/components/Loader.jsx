import React from "react";
import Logo from "../assets/react.svg";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[50vh] animate-fadeIn">
      <img
        src={Logo}
        alt="Loading..."
        className="w-16 h-16 animate-spin-slow drop-shadow-[0_0_10px_rgba(102,72,225,0.6)]"
      />
    </div>
  );
}
