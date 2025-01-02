import { useContext } from "react";
import { PaletteContext } from "./Context";

export function usePaletteContext() {
    return useContext(PaletteContext);
}
