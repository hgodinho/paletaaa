import { useAppContext } from "@/context";
import { Layer } from "./Layer";

export function Layers() {
    const { bfsAll } = useAppContext();

    return bfsAll((vertex) => {
        return <Layer key={vertex.id} vertex={vertex} />;
    });
}
