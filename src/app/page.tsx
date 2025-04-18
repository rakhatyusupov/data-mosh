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

  const handleExport = (data: string) => {
    const link = document.createElement("a");
    link.download = "data-mosh-export.jpg";
    link.href = data;
    link.click();
  };

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row">
      {/* Canvas Container */}
      <div className="flex-1 w-full h-screen flex items-center justify-start ">
        <div className="relative w-full h-full flex items-center justify-center">
          <P5Sketch
            lerpFactor={lerpFactor}
            ballSize={ballSize}
            selectedEffect={selectedEffect}
            onExport={handleExport}
          />
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:w-80 lg:h-screen lg:border-l fixed lg:static bottom-0 left-0 right-0 border-t bg-background z-10">
        <Controls
          onLerpChange={setLerpFactor}
          onSizeChange={setBallSize}
          onEffectChange={setSelectedEffect}
          onExport={() => {
            // Trigger export via keyboard event
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
          }}
        />
      </div>
    </main>
  );
}
