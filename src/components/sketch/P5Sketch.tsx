"use client";
import { useEffect, useRef } from "react";
import p5 from "p5";
import { drawCircle } from "@/_lib/drawCircle";
import { drawRect } from "@/_lib/drawRect";

interface P5SketchProps {
  lerpFactor: number;
  ballSize: number;
  selectedEffect: string;
  onExport: (data: string) => void;
}

const effectsLibrary: { [key: string]: (p: p5) => void } = {
  circle: drawCircle,
  rectangle: drawRect,
  none: () => {},
};

const P5Sketch = ({
  lerpFactor,
  ballSize,
  selectedEffect,
  onExport,
}: P5SketchProps) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const ballPos = useRef({ x: 0, y: 0 });
  const bufferCanvas = useRef<p5.Graphics | null>(null);
  const mainCanvas = useRef<p5.Element | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        // Create main display canvas
        const canvas = p.createCanvas(1, 1); // Temporary size
        mainCanvas.current = canvas;
        canvas.parent(sketchRef.current!);

        // Create high-res buffer canvas
        bufferCanvas.current = p.createGraphics(1920, 1920);

        resizeCanvas();
      };

      const resizeCanvas = () => {
        const container = sketchRef.current?.parentElement;
        if (!container || !mainCanvas.current) return;

        const parentWidth = container.clientWidth;
        const parentHeight = container.clientHeight;

        let canvasSize;
        if (parentWidth >= parentHeight) {
          canvasSize = parentHeight * 0.8; // 80% of height for desktop
        } else {
          canvasSize = parentWidth * 0.8; // 80% of width for mobile
        }

        p.resizeCanvas(canvasSize, canvasSize);
        mainCanvas.current.style("display", "block");
        mainCanvas.current.style("margin", "auto");
      };

      p.draw = () => {
        if (!bufferCanvas.current) return;

        const buffer = bufferCanvas.current;

        // Draw to buffer canvas
        buffer.background(0);
        buffer.fill(255);

        // Main ball sketch
        ballPos.current.x = p.lerp(
          ballPos.current.x,
          p.mouseX * (1920 / p.width),
          lerpFactor
        );
        ballPos.current.y = p.lerp(
          ballPos.current.y,
          p.mouseY * (1920 / p.height),
          lerpFactor
        );
        buffer.ellipse(
          ballPos.current.x,
          ballPos.current.y,
          ballSize * (1920 / p.width)
        );

        // Apply selected effect
        if (selectedEffect in effectsLibrary) {
          effectsLibrary[selectedEffect](buffer);
        }

        // Display buffer on main canvas
        p.image(buffer, 0, 0, p.width, p.height);
      };

      p.windowResized = () => {
        resizeCanvas();
      };

      p.keyPressed = () => {
        if (p.key === "e" && bufferCanvas.current) {
          const data = bufferCanvas.current.elt.toDataURL("image/jpeg");
          onExport(data);
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [lerpFactor, ballSize, selectedEffect, onExport]);

  return <div ref={sketchRef} className="w-full h-full" />;
};

export default P5Sketch;
