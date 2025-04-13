import type p5 from "p5";

export const drawCircle = (p: p5) => {
  p.push();
  p.fill(0, 255, 0, 100);
  p.noStroke();
  p.ellipse(p.mouseX, p.mouseY, 50);
  p.pop();
};
