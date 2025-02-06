import { useState, useEffect, useCallback } from "react";

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

export function useViewPortSize() {
    const getWindowDimensions = useCallback(() => {
        const { width, height, isDesktop, isMobile, isTablet } = (() => {
            if (typeof window !== "undefined") {
                const { innerWidth, innerHeight } = window;
                return {
                    width: innerWidth,
                    height: innerHeight,
                    isMobile: innerWidth <= breakpoints.sm && innerWidth >= 0,
                    isTablet:
                        innerWidth <= breakpoints.lg &&
                        innerWidth >= breakpoints.md,
                    isDesktop: innerWidth >= breakpoints.lg,
                };
            } else {
                // default to mobile for ssg
                return {
                    width: 480,
                    height: 800,
                    isMobile: true,
                    isTablet: false,
                    isDesktop: false,
                };
            }
        })();

        return {
            width,
            height,
            isDesktop,
            isMobile,
            isTablet,
            breakpoints,
        };
    }, []);

    const [windowDimensions, setWindowDimensions] = useState(
        (() => {
            if (typeof window !== "undefined") {
                const { innerWidth, innerHeight } = window;
                return {
                    width: innerWidth,
                    height: innerHeight,
                    isMobile: innerWidth <= breakpoints.sm && innerWidth >= 0,
                    isTablet:
                        innerWidth <= breakpoints.lg &&
                        innerWidth >= breakpoints.md,
                    isDesktop: innerWidth >= breakpoints.lg,
                };
            } else {
                // default to mobile for ssg
                return {
                    width: 480,
                    height: 800,
                    isMobile: true,
                    isTablet: false,
                    isDesktop: false,
                };
            }
        })()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [getWindowDimensions]);

    return { windowDimensions, setWindowDimensions };
}
