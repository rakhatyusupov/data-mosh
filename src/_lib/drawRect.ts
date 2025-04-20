import type p5 from "p5";

interface RectData {
  x: number;
  y: number;
  width: number;
  height: number;
  vertices: { x: number; y: number }[];
}

let rectsData: RectData[] = [];

export const drawRect = (
  p: p5,
  mx: number,
  my: number,
  chaosLevel: number,
  textContent?: { h1: string; h2: string; p: string }
) => {
  p.push();
  p.noFill();
  p.stroke(255);
  p.strokeWeight(2);

  // Clear previous data if needed
  if (p.frameCount === 1) {
    rectsData = [];
  }

  const cols = Math.floor(p.map(mx, 0, p.width, 5, 40));
  const rows = Math.floor(p.map(my, 0, p.height, 5, 40));
  const gap = 20;

  const totalWidth = p.width - gap * 2 - gap * (cols - 1);
  const totalHeight = p.height - gap * 2 - gap * (rows - 1);
  const colWidth = totalWidth / cols;
  const rowHeight = totalHeight / rows;

  // Store text items to distribute
  const textItems = [
    { type: "h1", content: textContent?.h1 || "Heading 1", size: 32 },
    { type: "h2", content: textContent?.h2 || "Heading 2", size: 24 },
    { type: "p", content: textContent?.p || "Paragraph", size: 16 },
  ];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = gap + i * (colWidth + gap);
      const y = gap + j * (rowHeight + gap);

      const alpha = p.map(p.dist(x, y, mx, my), 0, p.width / 2, 255, 50);

      // Draw rectangle
      p.rect(x, y, colWidth, rowHeight);

      // Store rectangle data
      const rectData: RectData = {
        x,
        y,
        width: colWidth,
        height: rowHeight,
        vertices: [
          { x, y }, // top-left
          { x: x + colWidth, y }, // top-right
          { x: x + colWidth, y: y + rowHeight }, // bottom-right
          { x, y: y + rowHeight }, // bottom-left
        ],
      };

      if (i === 0 && j === 0) {
        rectsData = []; 
      rectsData.push(rectData);
    }
  }

  if (textContent && rectsData.length > 0) {
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255);
    p.noStroke();

    textItems.forEach((item, index) => {
      if (rectsData.length > index * 5) {
        const randomRectIndex = Math.floor(p.random(rectsData.length));
        const rect = rectsData[randomRectIndex];

        const vertexIndex = Math.floor(p.random(4));
        const anchor = rect.vertices[vertexIndex];

        const chaosX = p.map(chaosLevel, 0, 100, 0, rect.width / 2);
        const chaosY = p.map(chaosLevel, 0, 100, 0, rect.height / 2);
        const textX =
          anchor.x + (vertexIndex % 2 === 0 ? 1 : -1) * p.random(chaosX);
        const textY = anchor.y + (vertexIndex < 2 ? 1 : -1) * p.random(chaosY);

        p.textSize(item.size);
        p.text(item.content, textX, textY);
      }
    });
  }

  p.pop();
};
