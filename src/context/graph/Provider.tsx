import { getRandomId, useGraph } from "@/lib";
import { GraphContext } from "./Context";
import { Node, Link } from "./types";
import { parseColor } from "react-aria-components";

export function GraphProvider({ children }: React.PropsWithChildren) {
    const initialColors = {
        a: getRandomId(),
        b: getRandomId(),
    };

    const { graph, ...graphActions } = useGraph<Node, Link>({
        vertices: 0,
        nodes: new Map([
            [
                initialColors.a,
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
            ],
            [
                initialColors.b,
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
        ]),
        adjList: new Map([
            [initialColors.a, new Set<string>([initialColors.b])],
            [initialColors.b, new Set<string>()],
        ] as [string, Set<string>][]),
    });

    return (
        <GraphContext
            value={{
                graph,
                ...graphActions,
            }}
        >
            {children}
        </GraphContext>
    );
}
