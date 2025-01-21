import { usePaletteContext } from "@/context";
import { cn } from "@/lib";

export function Preview() {
    const { getBackgroundHex } = usePaletteContext();
    return (
        <div
            className={cn(
                "h-screen",
                "col-start-2",
                "col-span-1",
                "px-10",
                "py-16",
                "max-w-lg"
            )}
            style={{
                backgroundColor: getBackgroundHex(),
            }}
        >
            <h1
                className={cn(
                    "text-5xl",
                    "font-bold",
                    "flex",
                    "gap-4"
                )}
            // style={{
            //     color: colors?.[0]?.data.toString("hex"),
            // }}
            >
                <p
                    className={cn("uppercase", "font-mono", "text-2xl")}
                // style={{
                //     color: colors?.[0]?.data.toString("hex"),
                // }}
                >
                    Capítulo I
                </p>
                <p
                // style={{
                //     color: colors?.[0]?.data.toString("hex"),
                // }}
                >
                    Do Título
                </p>
            </h1>
            <p
                className={cn("text-xl", "mt-8")}
            // style={{
            //     color: colors?.[0]?.data.toString("hex"),
            // }}
            >
                Uma noite destas, vindo da cidade para o Engenho Novo, encontrei
                no trem da Central um rapaz aqui do bairro, que eu conheço de
                vista e de chapéu. Cumprimentou-me, sentou-se ao pé de mim,
                falou da lua e dos ministros, e acabou recitando-me versos. A
                viagem era curta, e os versos pode ser que não fossem
                inteiramente maus. Sucedeu, porém, que, como eu estava cansado,
                fechei os olhos três ou quatro vezes; tanto bastou para que ele
                interrompesse a leitura e metesse os versos no bolso.
            </p>
            <p
                className={cn("text-xl", "mt-8")}
            // style={{
            //     color: colors?.[0]?.data.toString("hex"),
            // }}
            >
                — Continue, disse eu acordando.
                <br />
                — Já acabei, murmurou ele.
                <br />— São muito bonitos.
            </p>
        </div>
    );
}
