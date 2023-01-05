export class LissajousCurves {
  width: number;
  height: number;
  phaseDifference: number;
  points: [number, number][];
  phases: string[];

  frequencyRatio: number;
  deltaPhaseDifference: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.points = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 5],
      [5, 6],
    ];
    this.phases = ["0", "π/2", "3π/4", "π"];

    this.phaseDifference = 0.1;
    this.deltaPhaseDifference = 0.01;
    this.frequencyRatio = 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.phaseDifference >= Math.PI) {
      this.frequencyRatio = (this.frequencyRatio + 1) % this.points.length;
      this.deltaPhaseDifference *= -1;
    } else if (this.phaseDifference <= 0) {
      this.deltaPhaseDifference *= -1;
    }

    this.phaseDifference += this.deltaPhaseDifference;

    var a = this.points[this.frequencyRatio][0];
    var b = this.points[this.frequencyRatio][1];

    var A = this.width / 2 - 50;
    var B = this.height / 2 - 50;

    var t = 0;
    var x = A * Math.sin(a * t + this.phaseDifference);
    var y = B * Math.sin(b * t);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#3F3";
    ctx.strokeStyle = "#3F3";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.width / 2 + x, this.height / 2 + y);
    for (var i = 0; i < 1000; i++) {
      t += 0.01;
      x = A * Math.sin(a * t + this.phaseDifference);
      y = B * Math.sin(b * t);

      ctx.lineTo(this.width / 2 + x, this.height / 2 + y);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.shadowBlur = 0;
    ctx.font = "25px pixel";
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";
    var text = `Freq ratio: ${a}:${b}, Phase: ${
      this.phases[
        Math.round((this.phaseDifference / Math.PI) * (this.phases.length - 1))
      ]
    }`;
    ctx.fillText(text, 10, this.height - 30);
  }
}
