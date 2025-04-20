import type p5 from "p5";

export const drawGrid = (
  p: p5,
  buffer: p5.Graphics,
  mx: number,
  my: number,
  cols: number,
  rows: number,
  chaosFactor: number
) => {
  buffer.push();
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(2);

  const gap = 20 * (1 + chaosFactor * 0.5); // Make gap responsive to chaos
  const totalWidth = buffer.width - gap * 2 - gap * (cols - 1);
  const totalHeight = buffer.height - gap * 2 - gap * (rows - 1);
  const colWidth = totalWidth / cols;
  const rowHeight = totalHeight / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = gap + i * (colWidth + gap);
      const y = gap + j * (rowHeight + gap);

      // Add some chaos to positions
      const chaosX =
        chaosFactor > 0 ? p.random(-5 * chaosFactor, 5 * chaosFactor) : 0;
      const chaosY =
        chaosFactor > 0 ? p.random(-5 * chaosFactor, 5 * chaosFactor) : 0;

      const alpha = buffer.map(
        buffer.dist(x, y, mx, my),
        0,
        buffer.width / 2,
        255,
        50
      );
      buffer.stroke(255, alpha);

      buffer.rect(x + chaosX, y + chaosY, colWidth, rowHeight);
    }
  }

  buffer.pop();
};
