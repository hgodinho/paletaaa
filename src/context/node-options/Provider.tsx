import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Node, useAppContext } from "../app";
import { NodeOptionsContext } from "./Context";

import {
    useClientPoint,
    useFloating,
    useInteractions,
    useMergeRefs,
} from "@floating-ui/react";
import { ForceGraphMethods } from "react-force-graph-2d";
import { NodeOption } from "@/features";
import { usePaletteContext } from "../palette";

export function NodeOptionsProvider({ children }: React.PropsWithChildren) {
    // get app context
    const {
        graphRef,
        graphInstance,
        options,
        setGraphInstance,
        getVertex,
        addDirEdge,
    } = useAppContext();

    const { onColorRemove, onColorDuplicate } = usePaletteContext();

    // selected node state
    const [selected, setSel] = useState<Node["id"]>();

    // connection state
    const [connection, setConn] = useState<Partial<Link>>();

    // get selected node
    const node = useMemo(() => {
        if (!selected) return undefined;
        return getVertex(selected);
    }, [getVertex, selected]);

    // get node position
    const { x, y } = useMemo(() => {
        if (!node || !graphInstance) return { x: 0, y: 0 };
        return graphInstance.graph2ScreenCoords(node.x!, node.y!);
    }, [graphInstance, node]);

    // get floating ui
    const { refs, floatingStyles, context } = useFloating();

    // get client point
    const clientPoint = useClientPoint(context, {
        x: x + options.nodeRelSize! * 2,
        y,
    });

    /**
     * Set connection
     */
    const setConnection = (id: Node["id"]) => {
        if (!connection || typeof connection.source === "undefined") {
            setConn({ source: id });
        } else {
            setConn({ ...connection, target: id });
        }
    };

    /**
     * Reset connection
     */
    const resetConnection = () => {
        setConn(undefined);
    };

    // get reference and floating props
    const { getReferenceProps, getFloatingProps } = useInteractions([
        clientPoint,
    ]);

    /**
     * Fixed ref
     */
    const fixedRef = useCallback(
        (el: (HTMLElement & ForceGraphMethods<Node, Link>) | null) => {
            if (!el) return;
            setGraphInstance(el);
        },
        [setGraphInstance]
    );

    /**
     * Remove node
     * @param id | Node["id"]
     */
    const removeNode = (id: Node["id"]) => {
        onColorRemove(id);
        setSel(undefined);
    };

    /**
     * Duplicate node
     * @param id | Node["id"]
     */
    const duplicateNode = (id: Node["id"]) => {
        onColorDuplicate(id);
        setSel(undefined);
    };

    /**
     * Set selected
     * @param id | Node["id"] | undefined
     */
    const setSelected = useCallback(
        (id: Node["id"] | undefined) => {
            if (!id) {
                setSel(undefined);
                return;
            }
            const node = getVertex(id);
            if (!node?.expanded) {
                setSel((prev) => (prev === id ? undefined : id));
            } else {
                setSel(undefined);
            }
        },
        [getVertex]
    );

    // merge refs
    const ref = useMergeRefs([graphRef, refs.setReference, fixedRef]);

    // add dir edge effect
    useEffect(() => {
        if (!connection) return;
        if (
            typeof connection.source !== "undefined" &&
            typeof connection.target !== "undefined"
        ) {
            addDirEdge(connection as Link);
            setConn(undefined);
            setSelected(undefined);
        }
    }, [addDirEdge, setSelected, connection, selected]);

    return (
        <NodeOptionsContext
            value={{
                ref,
                setSelected,
                floatingRef: refs.setFloating,
                floatingProps: getFloatingProps,
                referenceProps: getReferenceProps,

                removeNode,
                duplicateNode,

                setConnection,
                resetConnection,

                connection,
                node,
                selected,
                floatingStyles,
            }}
        >
            {children}
            <NodeOption />
        </NodeOptionsContext>
    );
}
