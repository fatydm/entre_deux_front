"use client";

"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#d6d3cd] ">
      <div className="flex items-center justify-between">
        <Image
          src="/assets/logoLong.png" 
          alt="Logo L'EntreDeux"
          width={120}
          height={10}
          priority
        />
      </div>
    </header>
  );
}
