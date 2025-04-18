import p5 from "p5";

class Particle {
  p: p5;
  pos: p5.Vector;
  vel: p5.Vector;
  col: p5.Color;
  size: number;
  maxSize: number;
  growing: boolean;

  constructor(p: p5, buffer: p5.Graphics) {
    this.p = p;
    this.pos = p.createVector(p.random(buffer.width), p.random(buffer.height));
    this.vel = p5.Vector.random2D().mult(p.random(0.5, 2));
    this.col = p.random(this.getColors());
    this.size = p.random(1, 5);
    this.maxSize = p.random(5, 15);
    this.growing = true;
  }

  private getColors(): p5.Color[] {
    return [
      this.p.color(64, 91, 149), // #405B95
      this.p.color(247, 195, 43), // #F7C32B
      this.p.color(240, 129, 40), // #F08128
      this.p.color(233, 62, 80), // #E93E50
      this.p.color(74, 74, 74), // #4A4A4A
      this.p.color(153, 153, 153), // #999999
      this.p.color(222, 188, 160), // #DEBCA0
      this.p.color(218, 228, 218), // #DAE4DA
      this.p.color(202, 89, 133), // #CA5985
      this.p.color(160, 176, 58), // #A0B03A
      this.p.color(98, 95, 112), // #625F70
      this.p.color(219, 221, 220), // #DBDDDC
    ];
  }

  update(buffer: p5.Graphics) {
    this.pos.add(this.vel);

    if (this.growing) {
      this.size += 0.1;
      if (this.size >= this.maxSize) this.growing = false;
    } else {
      this.size -= 0.1;
      if (this.size <= 1) this.growing = true;
    }

    if (
      this.pos.x < 0 ||
      this.pos.x > buffer.width ||
      this.pos.y < 0 ||
      this.pos.y > buffer.height
    ) {
      this.pos = this.p.createVector(
        this.p.random(buffer.width),
        this.p.random(buffer.height)
      );
      this.vel = p5.Vector.random2D().mult(this.p.random(0.5, 2));
    }
  }

  display(buffer: p5.Graphics) {
    buffer.noStroke();
    buffer.fill(this.col);
    buffer.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

class ParticleBuffer {
  p: p5;
  pg: p5.Graphics;
  particles: Particle[];

  constructor(p: p5, pg: p5.Graphics) {
    this.p = p;
    this.pg = pg;
    this.particles = Array.from({ length: 500 }, () => new Particle(p, pg));
  }

  update() {
    this.particles.forEach((particle) => particle.update(this.pg));
  }

  display() {
    //this.pg.background(this.p.color(247, 248, 242));
    this.particles.forEach((particle) => particle.display(this.pg));
  }
}

let particleBuffer: ParticleBuffer | null = null;

export const drawParticles = (p: p5, buffer: p5.Graphics) => {
  if (!particleBuffer) {
    particleBuffer = new ParticleBuffer(p, buffer);
  }
  particleBuffer.update();
  particleBuffer.display();
};
