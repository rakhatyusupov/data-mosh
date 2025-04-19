import type p5 from "p5";
import { globalColors } from "../components/ColorPaletteCreator"; // Import the global palette

export const drawCircle = (p: p5, mx: number, my: number) => {
  p.push();

  // 1. Get all color values from the global palette
  const paletteColors = Object.values(globalColors);

  // 2. Pick a random color from the palette
  const randomColor = p.random(paletteColors);

  // 3. Apply the random fill (with transparency)
  p.fill(randomColor + "88"); // Adds alpha (e.g., "#FF000088" = semi-transparent red)
  p.noStroke();
  p.ellipse(mx, my, 1000);

  p.pop();
};
