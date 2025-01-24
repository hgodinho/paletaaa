import { useGraph } from "@/lib";
import { GraphContext } from "./Context";
import { Node, Link } from "./types";

export function GraphProvider({ children }: React.PropsWithChildren) {
    const { graph, ...graphActions } = useGraph<Node, Link>();
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
