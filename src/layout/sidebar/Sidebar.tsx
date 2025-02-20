import { createRef } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib";
import { Trigger } from "@/components";
import { useAppContext, usePaletteContext } from "@/context";
import { SidebarProps } from "./types";
import { Footer } from "@/layout";

export function Sidebar({ className, children, ...props }: SidebarProps) {
    const ref = createRef<HTMLDivElement>();

    const { sidebar, setSidebar, viewport } = useAppContext();

    const { contrastColor, getBackgroundHex } = usePaletteContext();

    return (
        <>
            <aside
                className={cn(
                    "sidebar",
                    "h-full",
                    "w-fit",
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
                aria-expanded={sidebar}
                aria-roledescription="sidebar"
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
                    onPress={(e) => {
                        setSidebar(!sidebar);
                        (e.target as HTMLButtonElement).blur();
                    }}
                    controlledId={"sidebar"}
                    aria-label={sidebar ? "close sidebar" : "open sidebar"}
                    className={({ defaultClassName }) =>
                        cn(
                            "absolute",
                            defaultClassName,
                            "left-0",
                            ["ml-2", "mt-2"],

                            sidebar && [
                                "left-full",
                                "lg:left-96",

                                "-ml-12",
                                "mt-2",

                                "lg:mt-2",
                                "lg:ml-2",
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
