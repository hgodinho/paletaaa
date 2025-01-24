import { HTMLAttributes } from "react";

export type ToolsState = {
    labels: boolean;
    magnet: boolean;
};

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
    tools: ToolsState;
    visible?: boolean;
    setTools: (tools: ToolsState) => void;
};
