import { cn } from "@/lib";
import ForceGraph2D, {
    NodeObject,
    LinkObject,
    ForceGraphProps,
    ForceGraphMethods,
} from "react-force-graph-2d";
import useDimensions from "react-cool-dimensions";
import { useGraphContext, usePaletteContext } from "@/context";
import { useEffect, useRef, useState } from "react";
import { Toolbar, ToolsState } from "@/components";

export type Node = NodeObject & {
    id: string;
};

export type Link = LinkObject & {
    source: string;
    target: string;
};

export function ColorGraph() {
    const [tools, setTools] = useState<ToolsState>({
        background: true,
        labels: false,
        magnet: false,
    });

    const { getNodes, getLinks } = useGraphContext();

    const { getBackgroundHex, contrastColor, expandColor } =
        usePaletteContext();

    const { observe, width, height } = useDimensions();

    const options: ForceGraphProps<Node, Link> = {
        // graph
        width,
        height,
        graphData: {
            nodes: getNodes(),
            links: getLinks(),
        },
        minZoom: 2,
        maxZoom: 10,

        // links
        linkDirectionalArrowLength: 4,
        linkDirectionalArrowRelPos: 0.4,

        // nodes
        nodeRelSize: 32,
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
            const bgHex = getBackgroundHex() as string;
            const colorHex = color.data.toString("hex");
            const textColor = contrastColor(
                "#FFF",
                tools.background ? bgHex : "#FFF"
            );

            const pos = { x: x as number, y: y as number };
            const fontSize = 16 / globalScale;
            const radius = options.nodeRelSize as number;

            // label
            if (tools.labels) {
                const label = color.title || id;
                ctx.font = `${fontSize}px Inter`;
                ctx.fillStyle = textColor;
                const labelY = pos.y - radius - 64 / globalScale;
                ctx.fillText(label, pos.x, labelY); // color name
                ctx.fillText(colorHex, pos.x, labelY + 24 / globalScale); // color hex
            }
            // circle
            ctx.lineWidth = 1;
            ctx.strokeStyle =
                id === "background" ? contrastColor("#fff", bgHex) : colorHex;
            ctx.stroke();
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
        // linkCanvasObject: (link, ctx, globalScale) => {
        // console.log({ link, ctx, globalScale });
        // },
        linkCanvasObjectMode: () => "after",
    };

    useEffect(() => {
        const fg = graphRef.current;

        fg?.d3Force("center", null);
        fg?.d3Force("charge")?.strength(tools.magnet ? -100 : 0);
        fg?.d3Force("link")?.distance(100);
    }, [tools]);

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
                <div
                    className={cn("group", "w-full", "absolute", "border-x")}
                    style={{
                        backgroundColor: tools.background
                            ? getBackgroundHex()
                            : "white",
                        borderColor: contrastColor(
                            tools.background ? getBackgroundHex() : "#FFF",
                            "#FFF"
                        ),
                    }}
                >
                    <Toolbar
                        tools={tools}
                        setTools={setTools}
                        className={cn("group-hover:opacity-100", "opacity-0")}
                    />
                    <ForceGraph2D
                        // @ts-ignore
                        ref={graphRef}
                        {...options}
                        {...callbacks}
                    />
                </div>
            </div>
        </>
    );
}
