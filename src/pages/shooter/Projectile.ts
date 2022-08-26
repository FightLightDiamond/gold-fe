export class Projectile {
  color: string;
  radius: number;
  x: number;
  y: number;
  velocity: any;

  constructor(x: number, y: number, radius: number, color: string, velocity: any) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c)
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}
