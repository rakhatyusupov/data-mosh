import type p5 from "p5";

export const drawRect = (p: p5) => {
  p.push();
  p.fill(255, 0, 0, 100);
  p.noStroke();
  p.rect(p.mouseX - 25, p.mouseY - 25, 50, 50);
  p.pop();
};
