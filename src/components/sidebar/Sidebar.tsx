import { createRef } from "react";
import { cn } from "@/lib";
import { Trigger, Footer } from "@/components";
import { useOptionsContext, usePaletteContext } from "@/context";
import { SlidersHorizontal, X } from "lucide-react";
import { SidebarProps } from "./types";

export function Sidebar({ className, children, ...props }: SidebarProps) {
    const ref = createRef<HTMLDivElement>();

    const { sidebar, setSidebar, viewport } = useOptionsContext();

    const { contrastColor, getBackgroundHex } = usePaletteContext();

    // const handleKeyDown = useCallback(
    //     (e: React.KeyboardEvent<HTMLDivElement>) => {
    //         console.log({ e });
    //         if (e.key === "Escape") {
    //             setOpen(false);
    //         }
    //     },
    //     [setOpen]
    // );

    return (
        <>
            <aside
                className={cn(
                    "sidebar",
                    "h-full",
                    "flex",
                    "items-start",
                    "justify-start",
                    "absolute",
                    "z-10",
                    "border-r",
                    "bg-white",
                    className
                )}
                style={{
                    height: viewport.height,
                    borderColor: contrastColor(getBackgroundHex(), "#FFF"),
                }}
                {...props}
            >
                <div
                    ref={ref}
                    id={"sidebar"}
                    className={cn(
                        "h-full",
                        "text-black",
                        "*:mx-2",
                        "pt-14",
                        "lg:pt-2",
                        "pb-16",
                        "bg-white",
                        "duration-300",
                        sidebar ? ["w-screen", "lg:w-96"] : ["w-0"]
                    )}
                    aria-expanded={sidebar}
                    aria-roledescription="menu"
                >
                    <div
                        className={cn(
                            "flex",
                            "flex-col",
                            "gap-2",
                            "h-full",
                            !sidebar && "hidden"
                        )}
                    >
                        {children}
                    </div>
                </div>
                <Trigger
                    value={sidebar}
                    onClick={setSidebar}
                    controlledId={"sidebar"}
                    aria-label={"Toggle sidebar"}
                    className={({ defaultClassName, isHovered }) =>
                        cn(
                            defaultClassName,
                            isHovered && [
                                "hover:ml-2",
                                "hover:mt-2",
                                "hover:p-4",
                            ],
                            "left-0",
                            ["ml-2", "mt-2", "lg:mt-3", "lg:ml-3"],
                            sidebar && [
                                "left-full",
                                "lg:left-96",

                                "-ml-12",
                                "mt-2",

                                "lg:mt-3",
                                "lg:ml-3",
                            ]
                        )
                    }
                    ValueTrue={X}
                    ValueFalse={SlidersHorizontal}
                />
            </aside>
            <Footer expanded={sidebar} />
        </>
    );
}
