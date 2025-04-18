import type p5 from "p5";

export const drawCircle = (p: p5, mx: number, my: number) => {
  p.push();
  p.fill(0, 255, 0, 100);
  p.noStroke();
  p.ellipse(mx, my, 1000);
  p.pop();
};
