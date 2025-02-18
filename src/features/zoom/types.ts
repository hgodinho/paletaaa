export type ZoomProps = {
    visible?: boolean;
    min: number;
    max: number;

    referenceScale?: number;

    zoomToFit: () => void;
    zoom: (scale: number) => void;
};

export type ZoomContextType = ZoomProps & {
    zoomPlus: () => void;
    zoomMinus: () => void;

    contrast: "black" | "white";
};
