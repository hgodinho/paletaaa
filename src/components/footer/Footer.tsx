import { cn } from "@/lib";
import { FooterProps } from "./types";
import { usePaletteContext } from "@/context";
import { Logo } from "../logo";

export function Footer({
    className,
    children,
    expanded,
    ...props
}: FooterProps) {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    return (
        <footer
            className={cn(
                "fixed",
                "bottom-0",
                "p-4",
                "flex",
                "items-center",
                "gap-2",
                "justify-between",
                "w-96",
                "border-t",
                "transition",
                "duration-500",
                expanded ? ["border-gray-400"] : ["border-transparent"],
                className
            )}
            {...props}
        >
            <Logo
                variant={
                    expanded
                        ? "black"
                        : contrastColor(getBackgroundHex(), "#FFF")
                }
                size={"small"}
                className={cn("z-10")}
            />
            <div
                className={cn(
                    "flex",
                    "items-center",
                    "gap-2",
                    // "transition-opacity",
                    "duration-500",
                    expanded ? "opacity-100" : "opacity-0"
                )}
            >
                <a
                    href="https://github.com/hgodinho"
                    target="_blank"
                    aria-label="github hgodinho"
                    title="github hgodinho"
                    className={cn("align-self-end", "justify-self-end")}
                >
                    <img
                        src="https://cdn.simpleicons.org/github/181717"
                        height={16}
                        width={16}
                        alt="github"
                    />
                </a>
                <span
                    className={cn(
                        "text-xs",
                        "px-1",
                        "rounded-full",
                        "font-bold"
                    )}
                    style={{
                        backgroundColor: getBackgroundHex(),
                        color: contrastColor(getBackgroundHex(), "#FFF"),
                    }}
                >
                    {import.meta.env.VITE_NEW_RELEASE_VERSION || "dev"}
                </span>
            </div>

            {children}
        </footer>
    );
}
