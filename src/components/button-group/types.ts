import { VariantProps } from "class-variance-authority";
import { GroupProps } from "react-aria-components";
import { buttonGroupVariants } from "./variants";

export type ButtonGroupContextType = VariantProps<typeof buttonGroupVariants>;

export type ButtonGroupProps = GroupProps &
    ButtonGroupContextType & {
        ref?: React.Ref<HTMLDivElement>;
    };
