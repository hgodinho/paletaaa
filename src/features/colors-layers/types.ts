import { AppType, Node } from "@/context";

export type LayerProps = {
    vertex: Node;
};

export type ColorsLayersContextType = {
    setExpanded: (id: string) => void;
    removeItem: AppType["removeVertex"];
    isExpanded: (id: string) => boolean;
};
