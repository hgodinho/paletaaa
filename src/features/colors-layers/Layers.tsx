import { useAppContext } from "@/context";
import { Layer } from "./Layer";

export function Layers() {
    const { getVertices } = useAppContext();

    return getVertices().map((vertex) => {
        return <Layer key={vertex.id} vertex={vertex} />;
    });
}
