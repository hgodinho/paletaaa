import { useCallback, useState } from "react";

import { parseColor } from "react-aria-components";
import LZString from "lz-string";

import { getRandomId, useGraph, useViewPortSize } from "@/lib";
import { AppContext } from "./Context";
import { Node, Link } from "./types";

export function AppProvider({ children }: React.PropsWithChildren) {
    const { graph, ...graphActions } = useGraph<Node, Link>(
        (() => {
            const graphStr = localStorage.getItem("graph");

            if (graphStr) {
                try {
                    const graph = JSON.parse(
                        LZString.decompressFromEncodedURIComponent(graphStr)
                    );
                    if (!graph.vertices) {
                        throw new Error("Empty graph");
                    }
                    return graph;
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    const initialColors = {
                        a: getRandomId(),
                        b: getRandomId(),
                    };
                    return {
                        vertices: 2,
                        nodes: [
                            {
                                id: initialColors.a,
                                expanded: true,
                                color: {
                                    data: parseColor(
                                        `hsl(${Math.random() * 360}, ${
                                            Math.random() * 100
                                        }%, ${Math.random() * 100}%)`
                                    ),
                                    title: "background",
                                    id: initialColors.a,
                                },
                                x: 0,
                                y: -50,
                                val: 1.5,
                            },
                            {
                                id: initialColors.b,
                                expanded: false,
                                color: {
                                    data: parseColor(
                                        `hsl(${Math.random() * 360}, ${
                                            Math.random() * 100
                                        }%, ${Math.random() * 100}%)`
                                    ),
                                    title: "foreground",
                                    id: initialColors.b,
                                },
                                x: 0,
                                y: 50,
                                val: 1,
                            },
                        ],
                        edges: [
                            {
                                source: initialColors.a,
                                targets: [initialColors.b],
                            },
                        ],
                    };
                }
            }
        })()
    );

    const toJSON = useCallback(
        () =>
            graphActions.toJSON((node) => {
                return {
                    ...node,
                    expanded: false,
                    val: 1,
                    fx: node.x,
                    fy: node.y,
                    color: {
                        ...node.color,
                        data: node.color.data.toString("hex"),
                    },
                };
            }),
        [graphActions]
    );

    // const fromJSON: GraphType["fromJSON"] = useCallback(
    //     (data) =>
    //         graphActions.fromJSON(data, (node) => {
    //             return {
    //                 ...node,
    //                 x: node.fx,
    //                 y: node.fy,
    //                 color: {
    //                     ...node.color,
    //                     data: parseColor(node.color.data),
    //                 },
    //             };
    //         }),
    //     [graphActions]
    // );

    const updateStorage = () => {
        const jsonGraph = toJSON();
        localStorage.setItem(
            "graph",
            LZString.compressToEncodedURIComponent(JSON.stringify(jsonGraph))
        );
    };

    // useEffect(() => {
    //     const jsonGraph = toJSON();
    //     localStorage.setItem(
    //         "graph",
    //         LZString.compressToEncodedURIComponent(JSON.stringify(jsonGraph))
    //     );
    // }, [graph, toJSON]);

    const { windowDimensions } = useViewPortSize();

    const [sidebar, setSidebar] = useState<boolean>(
        windowDimensions.isMobile ? false : true
    );

    return (
        <AppContext
            value={{
                graph,
                updateStorage,

                sidebar,
                setSidebar,
                viewport: windowDimensions,

                ...graphActions,
            }}
        >
            {children}
        </AppContext>
    );
}
