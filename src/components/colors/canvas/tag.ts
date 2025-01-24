export function tag(
    render: (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        color: string,
        scale: number,
        proportion: number,
        height: number,
        size: number
    ) => void,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string = "black",
    globalScale: number,
    height: number = 16,
    width: number = 16,
    size: number = 1
) {
    const scale = size / 1.5 / globalScale;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = globalScale * scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.moveTo(0, 0);

    const scaledHeight = height;
    const scaledWidth = width;

    ctx.lineTo(scaledHeight, scaledHeight);
    ctx.lineTo(scaledWidth, scaledHeight);
    ctx.lineTo(scaledWidth, -scaledHeight);
    ctx.lineTo(scaledHeight, -scaledHeight);
    ctx.lineTo(0, 0);
    ctx.stroke();

    render(ctx, scaledHeight, 0, color, globalScale, height, width, size);

    ctx.restore();
}
