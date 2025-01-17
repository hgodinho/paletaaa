import type {
    ToolbarToggleGroupSingleProps,
    ToolbarToggleGroupMultipleProps,
    ToolbarButtonProps,
    ToolbarLinkProps,
} from "@radix-ui/react-toolbar";

export type Group =
    | ToolbarToggleGroupSingleProps
    | ToolbarToggleGroupMultipleProps;

export type Single = ToolbarButtonProps | ToolbarLinkProps;

export type ToolbarProps<T> = T & {
    tools: Map<string, Group | Single>;
};
