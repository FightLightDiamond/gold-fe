// Vụ nổ
export default class Particle {
  color: string;
  radius: number;
  x: number;
  y: number;
  velocity: any;
  alpha: any;
  friction = 0.99

  constructor(x: number, y: number, radius: number, color: string, velocity: any) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.restore()
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c)
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}
