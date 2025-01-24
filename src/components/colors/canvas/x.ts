export function x(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    globalScale: number,
    color: string = "black",
    size: number = 16
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = (2 * size) / 16; // Scale line width based on the size
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Translate to the position and apply scaling for the size
    const scale = size / 24; // Scale factor based on the original SVG size
    ctx.translate(x, y);
    ctx.scale(scale * globalScale, scale * globalScale);

    // Draw the x path
    ctx.beginPath();

    ctx.moveTo(20, 6);
    ctx.lineTo(9, 17);
    ctx.stroke();
    ctx.moveTo(9, 6);
    ctx.lineTo(20, 17);
    ctx.stroke();

    ctx.restore();
}
