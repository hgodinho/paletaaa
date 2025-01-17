import {
    ColorField as Primitive,
    ColorFieldProps as PrimitiveType,
} from "react-aria-components";

import { Label, Input, InputProps } from "@/components";
import { usePickerContext } from "./Context";
import { cn } from "@/lib";

export type ColorFieldProps = PrimitiveType & {
    label?: string;
} & InputProps;

export function ColorField({ label, size, ...props }: ColorFieldProps) {
    const { fieldProps } = usePickerContext();

    return (
        <Primitive {...fieldProps} {...props}>
            {label && (
                <Label size={size} title={label} className={cn("mb-2")} />
            )}
            <Input size={size} aria-label={label} />
        </Primitive>
    );
}
