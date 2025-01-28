import { cn } from "@/lib";
import ForceGraph2D, {
    NodeObject,
    LinkObject,
    ForceGraphProps,
    ForceGraphMethods,
} from "react-force-graph-2d";
import useDimensions from "react-cool-dimensions";
import { useGraphContext, usePaletteContext } from "@/context";
import { useEffect, useMemo, useRef, useState } from "react";
import { Toolbar, ToolsState, Zoom } from "@/components";

// @ts-expect-error - d3-force-3d
import { forceCollide } from "d3-force-3d";

import canvas from "./canvas";

export type Node = NodeObject & {
    id: string;
};

export type Link = LinkObject & {
    source: string;
    target: string;
};

export function ColorGraph() {
    const [tools, setTools] = useState<ToolsState>({
        labels: true,
        magnet: false,
    });

    const [isHovered, setHovered] = useState(false);

    const [scale, setScale] = useState(1);

    const { getNodes, getLinks } = useGraphContext();

    const {
        getBackgroundHex,
        contrastColor,
        expandColor,
        background,
        validator,
    } = usePaletteContext();

    const { observe, width, height } = useDimensions();

    const options: ForceGraphProps<Node, Link> = useMemo(
        () => ({
            // graph
            width,
            height,
            graphData: {
                nodes: getNodes(),
                links: getLinks(),
            },
            minZoom: 0.5,
            maxZoom: 10,

            // links
            linkDirectionalArrowLength: 4,
            linkDirectionalArrowRelPos: 0.3,

            // nodes
            nodeRelSize: 24,
        }),
        [width, height, getNodes, getLinks]
    );

    const graphRef = useRef<ForceGraphMethods<Node, Link>>(null);

    const callbacks: ForceGraphProps<Node, Link> = {
        // nodes
        nodeColor: (node) => {
            return node.color.data.toString("hex");
        },
        nodeLabel: (node) => {
            return node.color.title || node.id;
        },
        nodeCanvasObject: (
            { x, y, id, color: nodeColor },
            ctx,
            globalScale
        ) => {
            const bgHex = getBackgroundHex() as string;
            const colorHex = nodeColor.data.toString("hex");

            // circle
            ctx.lineWidth = 1;
            ctx.strokeStyle =
                id === background ? contrastColor("#fff", bgHex) : colorHex;
            ctx.stroke();

            // label
            if (tools.labels) {
                const fontSize = 24;
                ctx.font = `${fontSize}px Inter`;
                const titleSize = ctx.measureText(nodeColor.title || id).width;
                const bgSize = ctx.measureText(colorHex).width;

                canvas.label(
                    (ctx, x, y, color) => {
                        const label = nodeColor.title || id;
                        ctx.fillStyle = color;
                        ctx.fillText(label, x, y);
                        ctx.fillText(colorHex, x, y + fontSize + 4);
                    },
                    ctx,
                    x!,
                    y! - options.nodeRelSize!,
                    contrastColor("#FFF", bgHex),
                    globalScale,
                    titleSize > bgSize ? titleSize + 40 : bgSize * 1.5,
                    16
                );
            }
        },
        nodeCanvasObjectMode: () => "after",
        onNodeDragEnd: (node) => {
            if (tools.magnet) {
                node.fx = undefined;
                node.fy = undefined;
            } else {
                node.fx = node.x;
                node.fy = node.y;
            }
        },
        onNodeClick: (node) => expandColor(node.id),

        // links
        linkColor: () => {
            return contrastColor("#FFF", getBackgroundHex());
        },
        linkCanvasObject: (link, ctx, globalScale) => {
            if (!tools.labels) return;

            // @link https://github.com/vasturiano/force-graph/blob/fa802c042ddb86714068b53697bcd9371133c9ef/src/canvas-force-graph.js#L323
            const { source, target } = link;
            if (
                !source ||
                !target ||
                !source.hasOwnProperty("x") ||
                !source.hasOwnProperty("y") ||
                !target.hasOwnProperty("x") ||
                !target.hasOwnProperty("y")
            )
                return;

            const pos = options.linkDirectionalArrowRelPos! as number;
            const radius = options.nodeRelSize!;

            // direction vector
            const vx = (target as Node).x! - (source as Node).x!;
            const vy = (target as Node).y! - (source as Node).y!;

            // length
            const len = Math.sqrt(vx * vx + vy * vy);

            // normalized
            const dx = vx / len;
            const dy = vy / len;

            // available length
            const availableLength = len - 2 * radius;

            // position
            const offset = radius + availableLength * pos;
            // adjusted
            const adjustedX = (source as Node).x! + dx * offset;
            const adjustedY = (source as Node).y! + dy * offset;

            const bgHex = getBackgroundHex() as string;
            const textColor = contrastColor("#FFF", bgHex);

            const sourceHex = (source as Node).color.data.toString("hex");
            const targetHex = (target as Node).color.data.toString("hex");
            const isLevelAA = validator?.isLevelAA(sourceHex, targetHex);
            const isLevelAAA = validator?.isLevelAAA(sourceHex, targetHex);

            canvas.tag(
                (ctx, x, y, color) => {
                    const fontSize = 24;
                    ctx.font = `${fontSize}px Inter`;
                    ctx.fillStyle = color;

                    ctx.fillText("aa", x, y + fontSize / 4);
                    const aaSize = ctx.measureText("aa").width;
                    const aaProps: [
                        x: number,
                        y: number,
                        scale: number,
                        color: string,
                        height: number
                    ] = [x + aaSize, y - 12, 1, color, 24];

                    if (isLevelAA) {
                        canvas.checkMark(ctx, ...aaProps);
                    } else {
                        canvas.x(ctx, ...aaProps);
                    }

                    ctx.fillText("aaa", x + 56, y + fontSize / 4);
                    const aaaSize = ctx.measureText("aaa").width;
                    const aaaPos: [
                        x: number,
                        y: number,
                        scale: number,
                        color: string,
                        height: number
                    ] = [x + aaSize + 32 + aaaSize, y - 12, 1, color, 24];

                    if (isLevelAAA) {
                        canvas.checkMark(ctx, ...aaaPos);
                    } else {
                        canvas.x(ctx, ...aaaPos);
                    }
                },
                ctx,
                adjustedX + 4,
                adjustedY,
                textColor,
                globalScale,
                24,
                164
            );
        },
        linkCanvasObjectMode: () => "after",

        onZoomEnd: (zoom) => {
            if (zoom.k !== scale) {
                setScale(zoom.k);
            }
        },
    };

    const zoom = {
        zoomToFit: () => {
            if (graphRef.current === null) return;
            graphRef.current.zoomToFit(300, 128);
        },
        zoom: (scale: number) => {
            if (graphRef.current === null) return;
            graphRef.current.zoom(scale, 300);
        },
        visible: true,
        min: options.minZoom!,
        max: options.maxZoom!,
        referenceScale: scale,
    };

    useEffect(() => {
        const fg = graphRef.current;
        if (fg === null) return;

        fg.d3Force("center", null);
        fg.d3Force("charge")?.strength(tools.magnet ? 10 : 0);
        fg.d3Force("link")?.distance(112);

        fg.d3Force("collision", forceCollide(options.nodeRelSize));
    }, [tools, options]);

    return (
        <>
            <div
                ref={observe}
                className={cn(
                    "m-auto",
                    "w-full",
                    "h-full",
                    "flex",
                    "justify-end",
                    "items-end",
                    "gap-4",
                    "cursor-move",
                    "border-x"
                )}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    backgroundColor: getBackgroundHex(),
                    borderColor: contrastColor(getBackgroundHex(), "#FFF"),
                }}
            >
                <div className={cn("group", "w-fit", "h-fit", "absolute")}>
                    <Toolbar
                        tools={tools}
                        setTools={setTools}
                        visible={isHovered}
                    />
                    <ForceGraph2D
                        // @ts-expect-error - ref
                        ref={graphRef}
                        {...options}
                        {...callbacks}
                    />
                    <Zoom {...zoom} />
                </div>
            </div>
        </>
    );
}
