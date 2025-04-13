"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";
import { drawCircle } from "@/_lib/drawCircle";
import { drawRect } from "@/_lib/drawRect";

interface P5SketchProps {
  lerpFactor: number;
  ballSize: number;
  selectedEffect: string;
}

const effectsLibrary: { [key: string]: (p: p5) => void } = {
  circle: drawCircle,
  rectangle: drawRect,
  none: () => {},
};

const P5Sketch = ({ lerpFactor, ballSize, selectedEffect }: P5SketchProps) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const ballPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(600, 600);
        canvas.parent(sketchRef.current!);
      };

      p.draw = () => {
        p.background(0);
        p.fill(255);

        ballPos.current.x = p.lerp(ballPos.current.x, p.mouseX, lerpFactor);
        ballPos.current.y = p.lerp(ballPos.current.y, p.mouseY, lerpFactor);
        p.ellipse(ballPos.current.x, ballPos.current.y, ballSize);

        if (selectedEffect in effectsLibrary) {
          effectsLibrary[selectedEffect](p);
        }
      };

      p.windowResized = () => {
        const container = sketchRef.current?.parentElement;
        if (container) {
          const scale = Math.min(
            container.clientWidth / 1920,
            container.clientHeight / 1920
          );
          p.resizeCanvas(1920, 1920);
          p.selectCanvas(canvas).style("transform", `scale(${scale})`);
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [lerpFactor, ballSize, selectedEffect]);

  return <div ref={sketchRef} className="w-full h-full" />;
};

export default P5Sketch;
