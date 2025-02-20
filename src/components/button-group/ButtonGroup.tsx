import { Group } from "react-aria-components";
import { ButtonGroupProps } from "./types";
import { ButtonGroupContext } from "./Context";
import { buttonGroupVariants } from "./variants";

export function ButtonGroup({
    className,
    children,
    dir = "row",
    variant = "default",
    ...props
}: ButtonGroupProps) {
    return (
        <ButtonGroupContext value={{ dir, variant }}>
            <Group
                className={buttonGroupVariants({
                    className,
                    dir,
                    variant,
                })}
                {...props}
            >
                {children}
            </Group>
        </ButtonGroupContext>
    );
}
