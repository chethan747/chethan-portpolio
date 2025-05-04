const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

function Particle(x, y, dx, dy, size, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.size = size;
  this.color = color;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx *= -1;
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy *= -1;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 8000;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 1;
    const dy = (Math.random() - 0.5) * 1;
    const color = "rgba(255,255,255,0.7)";
    particlesArray.push(new Particle(x, y, dx, dy, size, color));
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => p.update());
}

initParticles();
animateParticles();