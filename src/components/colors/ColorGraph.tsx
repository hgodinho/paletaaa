import { cn } from "@/lib";
import ForceGraph2D, {
    NodeObject,
    LinkObject,
    ForceGraphProps,
    ForceGraphMethods,
} from "react-force-graph-2d";
import useDimensions from "react-cool-dimensions";
import { usePaletteContext } from "@/context";
import { useEffect, useRef } from "react";

export type Node = NodeObject & {
    id: string;
};

export type Link = LinkObject & {
    source: string;
    target: string;
};

export function ColorGraph() {
    const { getNodes, getNode, getLinks, contrastColor } = usePaletteContext();

    const { observe, width, height } = useDimensions();

    const options: ForceGraphProps<Node, Link> = {
        // graph
        width,
        height,
        graphData: {
            nodes: getNodes(),
            links: getLinks(),
        },

        // links
        linkDirectionalArrowLength: 4,
        linkDirectionalArrowRelPos: 0.25,

        // nodes
    };

    const graphRef = useRef<ForceGraphMethods<Node, Link>>(null);

    const callbacks: ForceGraphProps<Node, Link> = {
        // nodes
        nodeColor: (node) => {
            return node.color.data.toString("hex");
        },
        nodeLabel: (node) => {
            return node.color.title || node.id;
        },
        nodeCanvasObject: ({ x, y, id, color }, ctx, globalScale) => {
            const backgroundColor =
                getNode("background")?.color.data.toString("hex");

            // console.log({ ctx, globalScale })

            // label
            const pos = { x: x as number, y: y as number };
            const label = color.title || id;
            const fontSize = 16 / globalScale;
            ctx.font = `${fontSize}px Inter`;
            ctx.fillStyle = contrastColor("#fff", backgroundColor as string);
            ctx.fillText(label, pos.x, pos.y - 8 * globalScale);
            ctx.fillText(
                color.data.toString("hex"),
                pos.x,
                pos.y - 8 * globalScale + 6
            );

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 8 * 2, 0, 2 * Math.PI, false);
            ctx.fillStyle =
                (id === "background"
                    ? backgroundColor
                    : color.data.toString("hex")) || "#000";
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle =
                id === "background"
                    ? contrastColor("#fff", backgroundColor as string)
                    : color.data.toString("hex");
            ctx.stroke();
        },
        onNodeDragEnd: (node) => {
            node.fx = node.x;
            node.fy = node.y;
        },

        // links
        linkColor: () => {
            return contrastColor(
                "#FFF",
                getNode("background")?.color.data.toString("hex") || "#fff"
            );
        },
        linkCanvasObject: (link, ctx, globalScale) => {
            console.log({ link, ctx, globalScale })
        },
        linkCanvasObjectMode: () => "after"
    };

    useEffect(() => {
        const fg = graphRef.current;

        fg?.d3Force("center", null);
        fg?.d3Force("charge", null);
        // fg?.d3Force("charge")?.strength(-5);

        fg?.d3Force("link")?.distance(100);
    }, []);

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
                    "cursor-move"
                )}
            >
                <div className={cn("absolute")}>
                    <ForceGraph2D
                        // @ts-ignore
                        ref={graphRef}
                        {...options} {...callbacks} />
                </div>
            </div>
        </>
    );
}
