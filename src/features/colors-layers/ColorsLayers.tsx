import { Plus } from "lucide-react";

import { cn } from "@/lib";
import { Button, Scroll } from "@/components";
import { useAppContext, usePaletteContext } from "@/context";

import { ColorsLayersContext } from "./Context";
import { Layers } from "./Layers";

export function ColorsLayers() {
    const { sidebar, getVertex, updateVertex } = useAppContext();

    const setExpanded = (expandedId: string) => {
        const node = getVertex(expandedId);
        if (node) {
            updateVertex({
                ...node,
                expanded: !node.expanded,
                val: node.expanded ? 1 : 1.5,
            });
        }
    };

    const isExpanded = (id: string) => {
        return getVertex(id)?.expanded || false;
    };

    const { onColorAdd, onColorRemove } = usePaletteContext();

    return (
        <ColorsLayersContext
            value={{
                setExpanded,
                isExpanded,
                removeItem: onColorRemove,
            }}
        >
            <Button
                variant={"square"}
                className={cn(
                    "flex",
                    "items-center",
                    "justify-center",
                    "gap-2",
                    "text-sm",
                    "h-9",
                    !sidebar && "hidden"
                )}
                onPress={onColorAdd}
            >
                <Plus size={16} />
                {"add color"}
            </Button>
            <Scroll className={cn("accordion", !sidebar && "hidden")}>
                <Layers />
            </Scroll>
        </ColorsLayersContext>
    );
}
