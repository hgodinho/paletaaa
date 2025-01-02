import { cva, VariantProps } from "class-variance-authority";

const logoVariants = cva([], {
    variants: {
        variant: {
            dark: [],
            light: [],
        },
    },
    defaultVariants: {
        variant: "light",
    },
});

export type LogoProps<Variant = unknown> =
    React.HTMLAttributes<HTMLDivElement> & Variant;

export function Logo({
    className,
    variant,
    ...props
}: LogoProps<VariantProps<typeof logoVariants>>) {
    return (
        <div {...props} className={logoVariants({ className, variant })}>
            <img
                src={
                    variant === "dark" ? "/color=white.svg" : "/color=black.svg"
                }
                alt="paletaaa logo"
            />
        </div>
    );
}
