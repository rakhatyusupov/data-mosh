import type p5 from "p5";

export const drawRect = (p: p5, mx: number, my: number) => {
  p.push();
  p.noFill();
  p.stroke(255);
  p.strokeWeight(2);
  const cols = Math.floor(p.map(mx, 0, p.width, 5, 40));
  const rows = Math.floor(p.map(my, 0, p.height, 5, 40));
  const gap = 20;

  const totalWidth = p.width - gap * 2 - gap * (cols - 1);
  const totalHeight = p.height - gap * 2 - gap * (rows - 1);
  const colWidth = totalWidth / cols;
  const rowHeight = totalHeight / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = gap + i * (colWidth + gap);
      const y = gap + j * (rowHeight + gap);

      const alpha = p.map(p.dist(x, y, mx, my), 0, p.width / 2, 255, 50);

      p.rect(x, y, colWidth, rowHeight);
    }
  }

  p.pop();
};
