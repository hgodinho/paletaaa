export type ZoomProps = {
    visible?: boolean;
    min: number;
    max: number;

    referenceScale?: number;

    zoomToFit: () => void;
    zoom: (scale: number) => void;
};
