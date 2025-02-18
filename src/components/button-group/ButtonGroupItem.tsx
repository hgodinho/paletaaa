import { cn } from "@/lib";
import { Tooltip, TooltipProps } from "@/components";
import { useButtonGroupContext } from "./Context";
type ButtonGroupProps = TooltipProps;

export function ButtonGroupItem({
    children,
    className,
    ...props
}: ButtonGroupProps) {
    const { variant } = useButtonGroupContext();
    return (
        <Tooltip
            placement="bottom"
            offset={9}
            className={(values) =>
                cn(
                    "fill-gray-700",
                    variant === "rounded" && [
                        "first:rounded-l-full",
                        "last:rounded-r-full",
                    ],
                    typeof className === "string"
                        ? className
                        : className?.(values)
                )
            }
            {...props}
        >
            {children}
        </Tooltip>
    );
}
