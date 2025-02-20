export function label(
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
    width: number = 16,
    height: number = 16,
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

    const scaledHeight = height;
    const scaledWidth = width;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-scaledHeight, -scaledHeight);
    ctx.lineTo(-scaledHeight, -scaledHeight * 5);
    ctx.lineTo(-scaledWidth, -scaledHeight * 5);
    ctx.lineTo(-scaledWidth, -scaledHeight);
    ctx.lineTo(-scaledHeight, -scaledHeight);
    ctx.stroke();

    render(
        ctx,
        -scaledWidth + 10,
        -scaledHeight * 4 + 10,
        color,
        globalScale,
        width,
        height,
        size
    );

    ctx.restore();
}
