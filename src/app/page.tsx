"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Controls } from "@/components/Controls";

const P5Sketch = dynamic(() => import("@/components/sketch/P5Sketch"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      Loading sketch...
    </div>
  ),
});

export default function Home() {
  const [lerpFactor, setLerpFactor] = useState(0.1);
  const [ballSize, setBallSize] = useState(50);

  const handleReset = () => {
    setLerpFactor(0.1);
    setBallSize(50);
  };

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row">
      {/* Canvas Container - Takes remaining space */}
      <div className="flex-1 relative h-[80vh] lg:h-auto">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            width: "calc(100vmin - 100px)",
            height: "calc(100vmin - 100px)",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <P5Sketch lerpFactor={lerpFactor} ballSize={ballSize} />
        </div>
      </div>

      {/* Controls Panel - Fixed on mobile, sidebar on desktop */}
      <div className="lg:w-80 lg:h-screen lg:border-l lg:overflow-auto fixed lg:static bottom-0 left-0 right-0 border-t bg-background z-10">
        <Controls
          onLerpChange={setLerpFactor}
          onSizeChange={setBallSize}
          onReset={handleReset}
        />
      </div>
    </main>
  );
}
