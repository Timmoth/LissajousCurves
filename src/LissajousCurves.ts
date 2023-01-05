export class LissajousCurves {
  width: number;
  height: number;
  phaseDifference: number;
  points: [number, number][];
  phases: string[];

  frequencyRatio: number;
  deltaPhaseDifference: number;
  A: number;
  B: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.A = this.width / 2 - 50;
    this.B = this.height / 2 - 50;
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

    ctx.lineWidth = 4;

    var d = 0.02;
    for (var i = d; i < 2 * Math.PI + d; i += d) {
      this.drawLineSegment(ctx, i - d, i, a, b);
    }

    ctx.shadowBlur = 0;
    ctx.font = "25px pixel";
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "top";
    var text = `Freq ratio: ${a}:${b}, Phase: ${
      this.phases[
        Math.round((this.phaseDifference / Math.PI) * (this.phases.length - 1))
      ]
    }`;
    ctx.fillText(text, 10, this.height - 30);
  }

  drawLineSegment(
    ctx: CanvasRenderingContext2D,
    start: number,
    end: number,
    a: number,
    b: number
  ) {
    var x = this.A * Math.sin(a * start + this.phaseDifference);
    var y = this.B * Math.sin(b * start);
    ctx.strokeStyle = "hsl(" + (start / (2 * Math.PI)) * 360 + ",100%,50%)";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "hsl(" + (start / (2 * Math.PI)) * 360 + ",100%,50%)";

    ctx.beginPath();
    ctx.moveTo(this.width / 2 + x, this.height / 2 + y);
    for (var t = start + 0.01; t <= end + 0.01; t += 0.01) {
      x = this.A * Math.sin(a * t + this.phaseDifference);
      y = this.B * Math.sin(b * t);
      ctx.lineTo(this.width / 2 + x, this.height / 2 + y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}
