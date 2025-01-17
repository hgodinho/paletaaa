import { cn } from "@/lib";
import { AddButtonProps } from "./types";
import { Plus } from "lucide-react";
import { Button } from "../button";

export function AddButton({ className, ...props }: AddButtonProps) {
    return (
        <Button
            variant={"square"}
            className={cn(
                "mx-4",
                "mb-2",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
                className
            )}
            {...props}
        >
            <Plus size={16} />
            {"add color"}
        </Button>
    );
}
