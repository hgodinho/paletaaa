import { cn } from "@/lib";
import { ValidLineProps } from "./types";
import { Check, CheckCheck, X } from "lucide-react";
import { useMemo } from "react";

export function ValidLine({ name, compliance, color }: ValidLineProps) {
    const Icon = useMemo(() => {
        let totalCompliance = 0;
        if (
            compliance["16pt"].valid &&
            !compliance["22pt"].valid &&
            !compliance.large.valid
        ) {
            totalCompliance = 1;
        }
        if (
            compliance["16pt"].valid &&
            compliance["22pt"].valid &&
            !compliance.large.valid
        ) {
            totalCompliance = 2;
        }
        if (
            compliance["16pt"].valid &&
            compliance["22pt"].valid &&
            compliance.large.valid
        ) {
            totalCompliance = 3;
        }

        if (totalCompliance <= 1) {
            return <X size={32} />;
        }
        if (totalCompliance === 2) {
            return <Check size={32} />;
        }
        if (totalCompliance === 3) {
            return <CheckCheck size={32} />;
        }
    }, [compliance]);

    return (
        <div
            className={cn("flex", "flex-row", "items-center", "gap-4  ")}
            style={{
                color: color.toString("hex"),
            }}
        >
            <p className={cn("font-bold", "mb-1", "text-2xl")}>
                {name}
            </p>
            {Icon}
        </div>
    );
}
