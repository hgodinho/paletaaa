import { HTMLAttributes } from "react";

export type ToolsState = {
    background: boolean;
    labels: boolean;
    magnet: boolean;
};

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
    tools: ToolsState;
    setTools: (tools: ToolsState) => void;
};
