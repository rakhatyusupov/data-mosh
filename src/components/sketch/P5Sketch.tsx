"use client";
import { useEffect, useRef } from "react";
import p5 from "p5";

interface P5SketchProps {
  lerpFactor: number;
  ballSize: number;
}

const P5Sketch = ({ lerpFactor, ballSize }: P5SketchProps) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const ballPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        const container = sketchRef.current?.parentElement;
        const width = container?.clientWidth || p.windowWidth;
        const height = container?.clientHeight || p.windowHeight;
        p.createCanvas(width, height).parent(sketchRef.current!);
      };

      p.draw = () => {
        p.fill(255, 0, 0);
        p.background(0, 25, 90, 5);
        p.noStroke();

        ballPos.current.x = p.lerp(ballPos.current.x, p.mouseX, lerpFactor);
        ballPos.current.y = p.lerp(ballPos.current.y, p.mouseY, lerpFactor);

        p.ellipse(ballPos.current.x, ballPos.current.y, ballSize);
      };

      p.windowResized = () => {
        const container = sketchRef.current?.parentElement;
        if (container) {
          p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [lerpFactor, ballSize]);

  return <div ref={sketchRef} className="w-full h-full" />;
};

export default P5Sketch;
