import { usePaletteContext } from "@/context";
import { cn } from "@/lib";
import { useState } from "react";
import { Select } from "../select";
import { Label } from "../label";
import { ColorSwatchPicker } from "../picker";
import { Color } from "react-aria-components";
import { Trigger } from "../trigger";
import { FileInput, FileOutput, MenuIcon, X } from "lucide-react";
import { Editable } from "../editable";
import { Input } from "../input";

export function Preview() {
    const previewId = "preview";

    const [open, setOpen] = useState(true);

    const { colors, getNodes, getNode, contrastColor } = usePaletteContext();

    return (
        <div
            className={cn(
                "flex",
                "items-start",
                "justify-start",
                "bg-transparent"
            )}
            style={{
                backgroundColor:
                    getNode("background")?.color?.data.toString("hex"),
            }}
        >
            <aside
                id={previewId}
                className={cn(
                    "h-screen",
                    "flex",
                    "flex-col",
                    "duration-300",
                    open ? ["w-[500px]"] : ["w-0"]
                )}
                aria-expanded={open}
                aria-roledescription="preview"
            >
                <div
                    className={cn(
                        "p-4",
                        "flex",
                        "flex-col",
                        "gap-4",
                        !open && "hidden"
                    )}
                >
                    <Editable
                        sharedClassName={cn("text-3xl")}
                        defaultValue={"Capítulo I"}
                        viewComponent={({ onChange, className, ...props }) => (
                            <h1 className={cn(className)} {...props} />
                        )}
                        editComponent={({ className, ...props }) => (
                            <Input
                                type={"text"}
                                className={cn(className)}
                                {...(props as Omit<
                                    React.InputHTMLAttributes<HTMLInputElement>,
                                    "size"
                                >)}
                            />
                        )}
                    />
                    <Editable
                        sharedClassName={cn("text-3xl")}
                        defaultValue={"Capítulo I"}
                        viewComponent={({ onChange, className, ...props }) => (
                            <h1 className={cn(className)} {...props} />
                        )}
                        editComponent={({ className, ...props }) => (
                            <Input
                                type={"text"}
                                className={cn(className)}
                                {...(props as Omit<
                                    React.InputHTMLAttributes<HTMLInputElement>,
                                    "size"
                                >)}
                            />
                        )}
                    />
                </div>
            </aside>
            <Trigger
                value={open}
                onClick={setOpen}
                controlledId={previewId}
                className={cn(
                    // "p-4",
                    // "relative",
                    "duration-300",
                    // "ml-4",
                    // "mt-4",
                    "bottom-4",
                    "-ml-16"
                    // open ? "-ml-16" : "m-0"
                )}
                ValueTrue={FileInput}
                ValueFalse={FileOutput}
            />
        </div>
    );
}

{
    /* <div>
    <h1
        className={cn(
            "text-5xl",
            "font-bold",
            "flex",
            "flex-col",
            "gap-4"
        )}
        style={{
            color: colors?.[0]?.data.toString("hex"),
        }}
    >
        <p
            className={cn("uppercase",  "text-2xl")}
            style={{
                color: colors?.[0]?.data.toString("hex"),
            }}
        >
            Capítulo I
        </p>
        <p
            style={{
                color: colors?.[0]?.data.toString("hex"),
            }}
        >
            Do Título
        </p>
    </h1>
    <p
        className={cn("text-xl", "mt-8")}
        style={{
            color: colors?.[0]?.data.toString("hex"),
        }}
    >
        Uma noite destas, vindo da cidade para o Engenho Novo,
        encontrei no trem da Central um rapaz aqui do bairro, que eu
        conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao
        pé de mim, falou da lua e dos ministros, e acabou
        recitando-me versos. A viagem era curta, e os versos pode
        ser que não fossem inteiramente maus. Sucedeu, porém, que,
        como eu estava cansado, fechei os olhos três ou quatro
        vezes; tanto bastou para que ele interrompesse a leitura e
        metesse os versos no bolso.
    </p>
    <p
        className={cn("text-xl", "mt-8")}
        style={{
            color: colors?.[0]?.data.toString("hex"),
        }}
    >
        — Continue, disse eu acordando.
        <br />
        — Já acabei, murmurou ele.
        <br />— São muito bonitos.
    </p>
</div> */
}
