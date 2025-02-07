import { MenuContext } from "./Context";
import { cn } from "@/lib";
import { Button, MenuItems, Scroll } from "@/components";
import { useAppContext, useOptionsContext, usePaletteContext } from "@/context";
import { Plus } from "lucide-react";

export function Menu() {
    const { sidebar } = useOptionsContext();

    const { graph, getVertex, updateVertex, removeVertex } = useAppContext();

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

    const removeItem = (id: string) => removeVertex(id);

    const { onColorAdd } = usePaletteContext();
    return (
        <MenuContext
            value={{
                items: graph.nodes,
                setExpanded,
                removeItem,
            }}
        >
            <Button
                variant={"square"}
                className={cn(
                    "flex",
                    "items-center",
                    "justify-center",
                    "gap-2",
                    !sidebar && "hidden"
                )}
                onPress={onColorAdd}
            >
                <Plus size={16} />
                {"add color"}
            </Button>
            <Scroll className={cn("accordion", !sidebar && "hidden")}>
                <MenuItems />
            </Scroll>
        </MenuContext>
    );
}
