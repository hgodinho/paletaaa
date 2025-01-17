import { cn } from "@/lib";
import { Toolbar } from "../toolbar";
import { useEditableContext } from "./Context";

export function EditToolbar() {
    const { edit } = useEditableContext();
    return (
        <Toolbar
            className={cn(
                "absolute",
                "sticky",
                "-mb-14",
                edit ? "block" : "hidden"
                // "bottom-0",
                // "right-0",
                // "p-4",
                // "gap-4"
            )}
        />
    );
}
