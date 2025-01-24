export function checkMark(
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

    // Draw the check-mark path
    ctx.beginPath();
    ctx.moveTo(24, 6);
    ctx.lineTo(13, 17);
    ctx.lineTo(9, 12);
    ctx.stroke();

    ctx.restore();
}
