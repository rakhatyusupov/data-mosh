"use client";
import { useEffect, useRef } from "react";
import p5 from "p5";
import { drawCircle } from "@/_lib/drawCircle";
import { drawRect } from "@/_lib/drawRect";

interface P5SketchProps {
  selectedEffect: string;
  onExport: (data: string) => void;
}

const effectsLibrary: {
  [key: string]: (p: p5, mx: number, my: number) => void;
} = {
  circle: drawCircle,
  rectangle: drawRect,
  none: () => {},
};

const P5Sketch = ({ selectedEffect, onExport }: P5SketchProps) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const bufferCanvas = useRef<p5.Graphics | null>(null);
  const mainCanvas = useRef<p5.Element | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(1, 1);
        mainCanvas.current = canvas;
        canvas.parent(sketchRef.current!);

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
          canvasSize = parentHeight * 0.8;
        } else {
          canvasSize = parentWidth * 0.8;
        }

        p.resizeCanvas(canvasSize, canvasSize);
        mainCanvas.current.style("display", "block");
        mainCanvas.current.style("margin", "auto");
      };

      p.draw = () => {
        if (!bufferCanvas.current) return;

        const buffer = bufferCanvas.current;
        const scaleFactor = 1920 / p.width;

        const bufferMouseX = p.mouseX * scaleFactor;
        const bufferMouseY = p.mouseY * scaleFactor;

        buffer.background(0);

        if (selectedEffect in effectsLibrary) {
          effectsLibrary[selectedEffect](buffer, bufferMouseX, bufferMouseY);
        }

        p.image(buffer, 0, 0, p.width, p.height);
      };

      p.windowResized = () => {
        resizeCanvas();
      };

      p.keyPressed = () => {
        if (p.key === "e" && bufferCanvas.current) {
          const data = bufferCanvas.current.elt.toDataURL("image/jpeg", 0.9);
          onExport(data);
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [selectedEffect, onExport]);

  return <div ref={sketchRef} className="w-full h-full" />;
};

export default P5Sketch;
