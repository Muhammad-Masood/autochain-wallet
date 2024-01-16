import Image from "next/image";
import { useState } from "react";
import Home from "./components/Home";

export default function page() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <Home/>
          </div>
      </div>
    </>
  );
}
