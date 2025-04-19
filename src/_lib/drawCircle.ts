import type p5 from "p5";
import { globalColors } from "../components/ColorPaletteCreator"; // Import the global palette

export const drawCircle = (p: p5, mx: number, my: number) => {
  p.push();

  const paletteColors = Object.values(globalColors);

  const randomColor = p.random(paletteColors);

  p.fill(randomColor);
  p.noStroke();
  p.ellipse(mx, my, 1000);

  p.pop();
};
