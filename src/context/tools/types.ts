export type Tool<T = undefined> = { active: boolean; data?: T };

export type ToolsState = {
    labels: Tool;
    magnet: Tool;
    background: Tool<string>;
};

export type ToolsType = {
    visible: boolean;
    setVisible: (visible: boolean) => void;

    state: ToolsState;
    toggleLabels: () => void;
    toggleMagnet: () => void;
    toggleBackground: (value?: boolean) => void;
};
