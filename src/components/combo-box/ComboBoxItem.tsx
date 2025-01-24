import { ListBoxItem } from "react-aria-components";
import { ComboBoxItemProps } from "./types";
import { cn } from "@/lib";

export function ComboBoxItem({ className, ...props }: ComboBoxItemProps) {
    return (
        <ListBoxItem
            className={cn(
                "p-1",
                "flex",
                "gap-2",
                "items-center",
                String(className)
            )}
            {...props}
        />
    );
}
