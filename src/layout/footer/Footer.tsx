import { cn } from "@/lib";
import { FooterProps } from "./types";
import { usePaletteContext } from "@/context";
import { Logo } from "@/components";

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
                "w-full",
                "lg:w-96",
                "border-t",
                "transition",
                "duration-500",
                "z-10",
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
            />
            <div
                className={cn(
                    "flex",
                    "items-center",
                    "gap-2",
                    "duration-500",
                    expanded ? ["opacity-100"] : ["hidden", "opacity-0"]
                )}
            >
                <a
                    href="https://github.com/hgodinho/paletaaa"
                    target="_blank"
                    aria-label="github paletaaa"
                    title="github paletaaa"
                    className={cn("align-self-end", "justify-self-end")}
                >
                    <img
                        src="https://cdn.simpleicons.org/github/181717"
                        height={16}
                        width={16}
                        alt="github logo"
                    />
                </a>
                <a
                    href="https://github.com/users/hgodinho/projects/4"
                    target="_blank"
                    aria-label="backlog paletaaa"
                    title="backlog paletaaa"
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
                </a>
            </div>

            {children}
        </footer>
    );
}
