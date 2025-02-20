import { useState, useEffect } from "react";

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

const getWindowDimensions = () => {
    if (typeof window === "undefined") {
        return {
            width: 480,
            height: 800,
            isMobile: true,
            isTablet: false,
            isDesktop: false,
        };
    }

    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
        isMobile: width <= breakpoints.sm,
        isTablet: width > breakpoints.sm && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
    };
};

export function useViewPortSize() {
    const [windowDimensions, setWindowDimensions] =
        useState(getWindowDimensions);

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { windowDimensions, breakpoints };
}
