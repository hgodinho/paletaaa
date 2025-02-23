import { AppType, Node, PaletteContextCallback } from "@/context";

export type LayerProps = {
    vertex: Node;
};

export type ColorsLayersContextType = {
    setExpanded: (id: string) => void;
    removeItem: AppType["removeVertex"];
    duplicateItem: PaletteContextCallback["onColorDuplicate"];
    isExpanded: (id: string) => boolean;
};
