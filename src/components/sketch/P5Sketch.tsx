"use client";
import { useEffect, useRef } from "react";
import p5 from "p5";
import { drawCircle } from "@/_lib/drawCircle";
import { drawRect } from "@/_lib/drawRect";
import { initParticles, drawParticles } from "@/_lib/drawParticles";

interface Resolution {
  width: number;
  height: number;
}

interface P5SketchProps {
  activeEffects: string[];
  onExport: (data: string) => void;
  resolution: Resolution;
  clearBackground: boolean;
}

const effectsLibrary: {
  [key: string]: (p: p5, buffer: p5.Graphics, mx: number, my: number) => void;
} = {
  circle: (p, buffer, mx, my) => drawCircle(buffer, mx, my),
  rectangle: (p, buffer, mx, my) => drawRect(buffer, mx, my),
  particles: drawParticles,
};

const P5Sketch = ({
  activeEffects,
  onExport,
  resolution,
  clearBackground,
}: P5SketchProps) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const bufferCanvas = useRef<p5.Graphics | null>(null);
  const mainCanvas = useRef<p5.Element | null>(null);
  const activeEffectsRef = useRef<string[]>([]);

  useEffect(() => {
    activeEffectsRef.current = activeEffects;
  }, [activeEffects]);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(1, 1);
        mainCanvas.current = canvas;
        canvas.parent(sketchRef.current!);
        bufferCanvas.current = p.createGraphics(
          resolution.width,
          resolution.height
        );
        resizeCanvas();
      };

      const resizeCanvas = () => {
        const container = sketchRef.current?.parentElement;
        if (!container || !mainCanvas.current) return;

        const targetAspect = resolution.width / resolution.height;
        const maxWidth = container.clientWidth * 0.8;
        const maxHeight = container.clientHeight * 0.8;

        let canvasWidth = maxWidth;
        let canvasHeight = canvasWidth / targetAspect;

        if (canvasHeight > maxHeight) {
          canvasHeight = maxHeight;
          canvasWidth = canvasHeight * targetAspect;
        }

        p.resizeCanvas(canvasWidth, canvasHeight);
        mainCanvas.current.style("display", "block");
        mainCanvas.current.style("margin", "auto");
      };

      p.draw = () => {
        if (!bufferCanvas.current) return;

        const buffer = bufferCanvas.current;
        const scaleX = resolution.width / p.width;
        const scaleY = resolution.height / p.height;

        const bufferMouseX = p.mouseX * scaleX;
        const bufferMouseY = p.mouseY * scaleY;

        if (clearBackground) {
          buffer.background(0);
        }

        activeEffectsRef.current.forEach((effect) => {
          if (effectsLibrary[effect]) {
            effectsLibrary[effect](p, buffer, bufferMouseX, bufferMouseY);
          }
        });

        p.image(buffer, 0, 0, p.width, p.height);
      };

      p.windowResized = resizeCanvas;

      p.keyPressed = () => {
        if (p.key === "e" && bufferCanvas.current) {
          const data = bufferCanvas.current.elt.toDataURL("image/jpeg", 0.9);
          onExport(data);
        }
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [onExport, resolution]);

  return <div ref={sketchRef} className="w-full h-full" />;
};

export default P5Sketch;
