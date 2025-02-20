import { cn } from "@/lib";
import ForceGraph2D, {
    NodeObject,
    LinkObject,
    ForceGraphProps,
} from "react-force-graph-2d";

import { useAppContext, usePaletteContext, useToolsContext } from "@/context";
import { useEffect } from "react";
import { Toolbar, Zoom } from "@/features";

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
    const { state, zoom, setVisible } = useToolsContext();

    const {
        scale,
        graph,
        options,
        graphRef,
        viewport: { width, height },
        setScale,
        updateStorage,
    } = useAppContext();

    const {
        validator,
        background,
        expandColor,
        contrastColor,
        getBackgroundHex,
    } = usePaletteContext();

    const callbacks: ForceGraphProps<Node, Link> = {
        // nodes
        nodeColor: (node) => {
            return node.color.data.toString("hex");
        },
        nodeLabel: (node) => {
            return node.color.title || node.id;
        },
        nodeCanvasObject: (
            { x, y, id, val, color: nodeColor },
            ctx,
            globalScale
        ) => {
            if (!options) return;
            const bgHex = getBackgroundHex() as string;
            const colorHex = nodeColor.data.toString("hex");

            // circle
            ctx.lineWidth = 1 / globalScale;
            ctx.strokeStyle =
                id === background ? contrastColor("#fff", bgHex) : colorHex;
            ctx.stroke();

            // label
            if (state.labels.active) {
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
                    y! - Math.sqrt(Math.max(0, val)) * options.nodeRelSize!,
                    contrastColor("#FFF", bgHex),
                    globalScale,
                    titleSize > bgSize ? titleSize + 40 : bgSize * 1.5,
                    16
                );
            }
        },
        nodeCanvasObjectMode: () => "after",
        onNodeDragEnd: (node) => {
            if (state.magnet.active) {
                node.fx = undefined;
                node.fy = undefined;
            } else {
                node.fx = node.x;
                node.fy = node.y;
            }
            updateStorage();
        },
        onNodeClick: (node) => expandColor(node.id),

        // links
        linkColor: () => {
            return contrastColor("#FFF", getBackgroundHex());
        },
        linkCanvasObject: (link, ctx, globalScale) => {
            if (!state.labels.active) return;
            if (!options) return;

            // @link https://github.com/vasturiano/force-graph/blob/fa802c042ddb86714068b53697bcd9371133c9ef/src/canvas-force-graph.js#L323
            // const { source, target } = link;
            const source = link.source as Node;
            const target = link.target as Node;
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

            // direction vector
            const vx = (target as Node).x! - (source as Node).x!;
            const vy = (target as Node).y! - (source as Node).y!;

            // length
            const len = Math.sqrt(vx * vx + vy * vy);

            // normalized
            const dx = vx / len;
            const dy = vy / len;

            const sourceRadius = options.nodeRelSize! * Math.sqrt(source.val!);
            const targetRadius = options.nodeRelSize! * Math.sqrt(target.val!);

            // available length
            const availableLength = len - (sourceRadius + targetRadius);

            // position
            const offset = sourceRadius + availableLength * pos;

            // adjusted
            const adjustedX = source.x! + dx * offset;
            const adjustedY = source.y! + dy * offset;

            const bgHex = getBackgroundHex() as string;
            const textColor = contrastColor("#FFF", bgHex);

            const sourceHex = source.color.data.toString("hex");
            const targetHex = target.color.data.toString("hex");
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
        linkLineDash: (link) => {
            const source = link.source as Node;
            const target = link.target as Node;
            if (
                source.color &&
                target.color &&
                !validator?.isLevelAAA(
                    source.color.data.toString("hex"),
                    target.color.data.toString("hex")
                )
            ) {
                return [2, 2];
            }

            return null;
        },

        onZoomEnd: (zoom) => {
            if (zoom.k !== scale) {
                setScale(zoom.k);
            }
        },
    };

    useEffect(() => {
        const fg = graphRef?.current;
        if (!fg) return;
        if (!options) return;

        fg.d3Force("center", null);

        fg.d3Force("charge")?.strength((node: Node) => {
            if (state.magnet.active) {
                node.fx = undefined;
                node.fy = undefined;
                return -options.nodeRelSize! * 10;
            } else {
                return 0;
            }
        });

        fg.d3Force("link")?.distance((link: LinkObject<Node>) => {
            const source = link.source as Node;
            const target = link.target as Node;

            if (
                !validator?.isLevelAAA(
                    source.color?.data.toString("hex"),
                    target.color?.data.toString("hex")
                )
            ) {
                return options.nodeRelSize! * 6;
            } else {
                return options.nodeRelSize! * 4;
            }
        });

        fg.d3Force("collision", forceCollide(options.nodeRelSize));
    }, [state, options, validator, width, height, graphRef]);

    useEffect(() => {
        updateStorage();
    }, [graph, updateStorage]);

    return (
        <div
            className={cn(
                "graph",
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
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{
                height,
                backgroundColor: getBackgroundHex(),
                borderColor: contrastColor(getBackgroundHex(), "#FFF"),
            }}
        >
            <div className={cn("group", "relative")}>
                <Toolbar />
                <ForceGraph2D
                    // @ts-expect-error - ref
                    ref={graphRef}
                    {...options}
                    {...callbacks}
                />
                <Zoom {...zoom} />
            </div>
        </div>
    );
}
