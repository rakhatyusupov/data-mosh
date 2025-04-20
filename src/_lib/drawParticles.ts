import type p5 from "p5";

interface ParticleSystem {
  particles: any[];
  init: (p: p5, width: number, height: number) => void;
  draw: (
    buffer: p5.Graphics,
    mx: number,
    my: number,
    chaosFactor: number
  ) => void;
}

export const initParticles = (
  p: p5,
  width: number,
  height: number
): ParticleSystem => {
  const particles = Array(100)
    .fill(null)
    .map(() => ({
      x: p.random(width),
      y: p.random(height),
      size: p.random(5, 15),
      speed: p.random(0.5, 2),
      angle: p.random(p.TWO_PI),
    }));

  return {
    particles,
    init: (p: p5, width: number, height: number) => {
      // Reinitialize if needed
    },
    draw: (
      buffer: p5.Graphics,
      mx: number,
      my: number,
      chaosFactor: number
    ) => {
      buffer.push();
      buffer.noStroke();

      for (const particle of particles) {
        // Apply chaos to movement
        const chaosX =
          chaosFactor > 0 ? p.random(-2 * chaosFactor, 2 * chaosFactor) : 0;
        const chaosY =
          chaosFactor > 0 ? p.random(-2 * chaosFactor, 2 * chaosFactor) : 0;

        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed + chaosX;
        particle.y += Math.sin(particle.angle) * particle.speed + chaosY;

        // Wrap around edges
        if (particle.x < 0) particle.x = buffer.width;
        if (particle.x > buffer.width) particle.x = 0;
        if (particle.y < 0) particle.y = buffer.height;
        if (particle.y > buffer.height) particle.y = 0;

        // Draw particle
        const distance = buffer.dist(particle.x, particle.y, mx, my);
        const alpha = buffer.map(distance, 0, buffer.width / 2, 255, 50);
        buffer.fill(255, alpha);
        buffer.circle(particle.x, particle.y, particle.size);
      }

      buffer.pop();
    },
  };
};

export const drawParticles = (
  buffer: p5.Graphics,
  mx: number,
  my: number,
  chaosFactor: number,
  particleSystem?: ParticleSystem
) => {
  if (particleSystem) {
    particleSystem.draw(buffer, mx, my, chaosFactor);
  }
};
