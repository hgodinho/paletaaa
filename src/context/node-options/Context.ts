import { createContext, useContext } from "react";
import { NodeOptionsType } from "./types";

export const NodeOptionsDefault: NodeOptionsType = {
    ref: null,
    floatingRef: null,
    floatingStyles: {},
    selected: undefined,
    referenceProps: () => ({}),
    floatingProps: () => ({}),
    setSelected: () => {},
    removeNode: () => {},
    duplicateNode: () => {},
    setConnection: () => {},
    resetConnection: () => {},
};

export const NodeOptionsContext =
    createContext<NodeOptionsType>(NodeOptionsDefault);

export function useNodeOptionsContext() {
    return useContext(NodeOptionsContext);
}
