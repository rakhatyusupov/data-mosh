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

interface Resolution {
  width: number;
  height: number;
}

export default function Home() {
  const [lerpFactor, setLerpFactor] = useState(0.1);
  const [ballSize, setBallSize] = useState(50);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [resolution, setResolution] = useState<Resolution>({
    width: 1920,
    height: 1920,
  });
  const [clearBackground, setClearBackground] = useState(true);
  const [chaosLevel, setChaosLevel] = useState(50);
  const [gridResolution, setGridResolution] = useState({
    cols: 10,
    rows: 10,
  });
  // Added textContent state
  const [textContent, setTextContent] = useState({
    h1: "Heading 1",
    h2: "Heading 2",
    p: "Paragraph text goes here...",
  });

  const handleExport = (data: string) => {
    const link = document.createElement("a");
    link.download = "data-mosh-export.jpg";
    link.href = data;
    link.click();
  };

  return (
    <main className="h-screen w-full flex flex-col lg:flex-row">
      <div className="flex-1 w-full h-screen flex items-center justify-start ">
        <div className="parent relative w-full h-full flex items-center justify-center overflow-hidden">
          <P5Sketch
            lerpFactor={lerpFactor}
            ballSize={ballSize}
            activeEffects={activeEffects}
            onExport={handleExport}
            resolution={resolution}
            clearBackground={clearBackground}
            chaosLevel={chaosLevel}
            gridResolution={gridResolution} // Added missing prop
            textContent={textContent} // Pass textContent to P5Sketch
          />
        </div>
      </div>

      <div className="lg:w-80 lg:h-screen lg:border-l lg:static bottom-0 left-0 right-0 border-t bg-background z-10">
        <Controls
          activeEffects={activeEffects}
          onLerpChange={setLerpFactor}
          onSizeChange={setBallSize}
          onEffectChange={setActiveEffects}
          onExport={() => {
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
          }}
          onResolutionChange={setResolution}
          onClearBackgroundChange={setClearBackground}
          onChaosLevelChange={setChaosLevel}
          onGridResolutionChange={setGridResolution}
          onTextContentChange={setTextContent} // Pass setter to Controls
        />
      </div>
    </main>
  );
}
