import { cn } from "@/lib";
import { Logo } from "@/components";

export function Header() {
    return (
        <header
            className={cn(
                "sticky",
                "p-3",
                "top-0",
                "bg-white",
                "z-10",
                "gap-2",
                "flex",
                "justify-between",
                "items-center",
                "mb-4"
            )}
        >
            <Logo variant={"light"} />
            <a href="https://github.com/hgodinho" target="_blank">
                <img
                    src="https://cdn.simpleicons.org/github/181717"
                    height={20}
                    width={20}
                    alt="github"
                />
            </a>
        </header>
    );
}
