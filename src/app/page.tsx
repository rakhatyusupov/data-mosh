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
  const [selectedEffect, setSelectedEffect] = useState("none");

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row">
      {/* Canvas Container */}
      <div className="flex-1 w-full h-screen flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-[90vh] max-h-[90vh]">
          <P5Sketch
            lerpFactor={lerpFactor}
            ballSize={ballSize}
            selectedEffect={selectedEffect}
          />
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:w-80 lg:h-screen lg:border-l fixed lg:static bottom-0 left-0 right-0 border-t bg-background z-10">
        <Controls
          onLerpChange={setLerpFactor}
          onSizeChange={setBallSize}
          onEffectChange={setSelectedEffect}
          onReset={() => {
            setLerpFactor(0.1);
            setBallSize(50);
            setSelectedEffect("none");
          }}
        />
      </div>
    </main>
  );
}
