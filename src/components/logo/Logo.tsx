import { cva, VariantProps } from "class-variance-authority";

const logoVariants = cva(["z-20"], {
    variants: {
        variant: {
            black: [],
            white: [],
        },
        size: {
            small: ["h-6"],
            medium: ["h-8"],
            large: ["h-12"],
        },
    },
    defaultVariants: {
        variant: "white",
        size: "small",
    },
});

const pathVariants = cva(["transition-colors", "duration-300"], {
    variants: {
        variant: {
            black: ["fill-black"],
            white: ["fill-white"],
        },
    },
    defaultVariants: {
        variant: "white",
    },
});

export type LogoProps<Variant = unknown> =
    React.HTMLAttributes<HTMLDivElement> & Variant;

export function Logo({
    className,
    variant = "white",
    size,
    ...props
}: LogoProps<VariantProps<typeof logoVariants>>) {
    return (
        <div
            {...props}
            aria-label="paletaaa"
            title="paletaaa"
            className={logoVariants({ className, variant, size })}
        >
            <svg
                className="h-full w-full"
                viewBox="0 0 243 57"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="paletaaa">
                    <path
                        d="M0 55V10.7317H7.53622V16.0556H7.98077C8.37593 15.2731 8.93338 14.4417 9.65314 13.5614C10.3729 12.667 11.3467 11.9055 12.5745 11.2767C13.8023 10.6339 15.3688 10.3125 17.274 10.3125C19.7861 10.3125 22.0512 10.9483 24.0693 12.2199C26.1016 13.4775 27.7104 15.343 28.8959 17.8163C30.0955 20.2757 30.6953 23.294 30.6953 26.8712C30.6953 30.4065 30.1096 33.4108 28.9382 35.8841C27.7669 38.3575 26.1721 40.2439 24.154 41.5434C22.1359 42.843 19.8496 43.4928 17.2952 43.4928C15.4323 43.4928 13.887 43.1853 12.6592 42.5705C11.4313 41.9557 10.4435 41.2151 9.69547 40.3487C8.96161 39.4684 8.39004 38.6369 7.98077 37.8544H7.66323V55H0ZM7.51505 26.8293C7.51505 28.9113 7.81142 30.7349 8.40415 32.2999C9.011 33.865 9.87894 35.0877 11.008 35.968C12.1511 36.8343 13.5341 37.2675 15.1571 37.2675C16.8506 37.2675 18.269 36.8204 19.4121 35.9261C20.5553 35.0178 21.4161 33.7811 21.9948 32.2161C22.5875 30.6371 22.8839 28.8415 22.8839 26.8293C22.8839 24.831 22.5945 23.0564 22.0159 21.5053C21.4373 19.9543 20.5764 18.7386 19.4333 17.8582C18.2901 16.9779 16.8648 16.5377 15.1571 16.5377C13.52 16.5377 12.1299 16.9639 10.9868 17.8163C9.84366 18.6687 8.97572 19.8634 8.38299 21.4005C7.80436 22.9376 7.51505 24.7472 7.51505 26.8293Z"
                        className={pathVariants({ variant })}
                    />
                    <path
                        d="M46.6145 43.5766C44.554 43.5766 42.6982 43.2133 41.047 42.4867C39.4099 41.7461 38.1115 40.6561 37.1519 39.2168C36.2063 37.7776 35.7335 36.0029 35.7335 33.8929C35.7335 32.0763 36.0722 30.5742 36.7497 29.3864C37.4271 28.1987 38.3515 27.2485 39.5228 26.5358C40.6942 25.8232 42.0137 25.2852 43.4814 24.9219C44.9633 24.5446 46.4945 24.2721 48.0751 24.1044C49.9804 23.9088 51.5257 23.7341 52.7112 23.5804C53.8967 23.4127 54.7575 23.1612 55.2938 22.8258C55.8442 22.4765 56.1194 21.9385 56.1194 21.2119V21.0861C56.1194 19.5071 55.6467 18.2844 54.7011 17.4181C53.7555 16.5517 52.3937 16.1185 50.6154 16.1185C48.7385 16.1185 47.2496 16.5238 46.1488 17.3342C45.0621 18.1447 44.3282 19.1019 43.9472 20.2058L36.792 19.1997C37.3565 17.2434 38.2879 15.6085 39.5863 14.295C40.8847 12.9675 42.4724 11.9754 44.3494 11.3186C46.2264 10.6479 48.301 10.3125 50.5731 10.3125C52.1396 10.3125 53.6991 10.4942 55.2515 10.8575C56.8039 11.2208 58.2222 11.8216 59.5065 12.6601C60.7908 13.4845 61.821 14.6094 62.5972 16.0347C63.3875 17.46 63.7827 19.2416 63.7827 21.3796V42.9268H56.4158V38.5042H56.1618C55.696 39.3985 55.0398 40.2369 54.193 41.0194C53.3604 41.788 52.309 42.4098 51.0388 42.8849C49.7828 43.346 48.308 43.5766 46.6145 43.5766ZM48.6044 38.0011C50.1427 38.0011 51.4763 37.7007 52.6054 37.0998C53.7344 36.485 54.6023 35.6745 55.2092 34.6684C55.8301 33.6623 56.1406 32.5654 56.1406 31.3777V27.5838C55.9007 27.7795 55.4914 27.9611 54.9128 28.1288C54.3483 28.2965 53.7132 28.4432 53.0076 28.569C52.3019 28.6947 51.6033 28.8065 50.9118 28.9043C50.2203 29.0022 49.6205 29.086 49.1124 29.1559C47.9693 29.3096 46.9461 29.5611 46.0429 29.9104C45.1397 30.2598 44.427 30.7489 43.9048 31.3777C43.3827 31.9925 43.1216 32.789 43.1216 33.7672C43.1216 35.1645 43.6367 36.2195 44.6669 36.9322C45.6971 37.6448 47.0096 38.0011 48.6044 38.0011Z"
                        className={pathVariants({ variant })}
                    />
                    <path
                        d="M79.1515 0V42.9268H71.4882V0H79.1515Z"
                        className={pathVariants({ variant })}
                    />
                    <path
                        d="M101.427 43.5556C98.1667 43.5556 95.3512 42.8849 92.9802 41.5434C90.6234 40.188 88.8099 38.2736 87.5397 35.8003C86.2696 33.313 85.6345 30.3855 85.6345 27.0179C85.6345 23.7062 86.2696 20.7997 87.5397 18.2984C88.824 15.7832 90.6163 13.8269 92.9167 12.4295C95.2171 11.0182 97.9197 10.3125 101.024 10.3125C103.029 10.3125 104.92 10.6339 106.698 11.2767C108.49 11.9055 110.071 12.8836 111.44 14.2111C112.823 15.5386 113.909 17.2294 114.7 19.2835C115.49 21.3237 115.885 23.7551 115.885 26.5777V28.9043H89.2333V23.79H108.54C108.525 22.3368 108.208 21.0442 107.587 19.9123C106.966 18.7665 106.098 17.8652 104.983 17.2085C103.882 16.5517 102.598 16.2233 101.13 16.2233C99.5638 16.2233 98.1878 16.6006 97.0024 17.3552C95.8169 18.0958 94.8925 19.0739 94.2292 20.2896C93.58 21.4914 93.2484 22.8119 93.2342 24.2511V28.7157C93.2342 30.5882 93.58 32.1951 94.2715 33.5366C94.9631 34.8641 95.9298 35.8841 97.1717 36.5968C98.4136 37.2955 99.8672 37.6448 101.533 37.6448C102.647 37.6448 103.657 37.4911 104.56 37.1837C105.463 36.8623 106.246 36.3942 106.91 35.7793C107.573 35.1645 108.074 34.4029 108.413 33.4947L115.568 34.2912C115.116 36.1636 114.255 37.7985 112.985 39.1959C111.729 40.5793 110.12 41.6552 108.159 42.4238C106.197 43.1784 103.953 43.5556 101.427 43.5556Z"
                        className={pathVariants({ variant })}
                    />
                    <path
                        d="M138.605 10.7317V16.6006H119.913V10.7317H138.605ZM124.528 3.01829H132.191V33.2431C132.191 34.2632 132.346 35.0457 132.657 35.5907C132.981 36.1217 133.404 36.485 133.927 36.6806C134.449 36.8763 135.027 36.9741 135.663 36.9741C136.142 36.9741 136.58 36.9392 136.975 36.8693C137.384 36.7994 137.695 36.7365 137.906 36.6806L139.198 42.6124C138.789 42.7522 138.203 42.9059 137.441 43.0735C136.693 43.2412 135.775 43.339 134.689 43.367C132.769 43.4229 131.041 43.1364 129.502 42.5076C127.964 41.8648 126.743 40.8727 125.84 39.5313C124.951 38.1898 124.513 36.513 124.528 34.5008V3.01829Z"
                        className={pathVariants({ variant })}
                    />
                    <path
                        d="M154.371 43.5766C152.31 43.5766 150.454 43.2133 148.803 42.4867C147.166 41.7461 145.868 40.6561 144.908 39.2168C143.963 37.7776 143.49 36.0029 143.49 33.8929C143.49 32.0763 143.829 30.5742 144.506 29.3864C145.183 28.1987 146.108 27.2485 147.279 26.5358C148.45 25.8232 149.77 25.2852 151.238 24.9219C152.72 24.5446 154.251 24.2721 155.831 24.1044C157.737 23.9088 159.282 23.7341 160.467 23.5804C161.653 23.4127 162.514 23.1612 163.05 22.8258C163.601 22.4765 163.876 21.9385 163.876 21.2119V21.0861C163.876 19.5071 163.403 18.2844 162.457 17.4181C161.512 16.5517 160.15 16.1185 158.372 16.1185C156.495 16.1185 155.006 16.5238 153.905 17.3342C152.818 18.1447 152.084 19.1019 151.703 20.2058L144.548 19.1997C145.113 17.2434 146.044 15.6085 147.343 14.295C148.641 12.9675 150.229 11.9754 152.106 11.3186C153.983 10.6479 156.057 10.3125 158.329 10.3125C159.896 10.3125 161.455 10.4942 163.008 10.8575C164.56 11.2208 165.979 11.8216 167.263 12.6601C168.547 13.4845 169.577 14.6094 170.353 16.0347C171.144 17.46 171.539 19.2416 171.539 21.3796V42.9268H164.172V38.5042H163.918C163.452 39.3985 162.796 40.2369 161.949 41.0194C161.117 41.788 160.065 42.4098 158.795 42.8849C157.539 43.346 156.064 43.5766 154.371 43.5766ZM156.361 38.0011C157.899 38.0011 159.233 37.7007 160.362 37.0998C161.491 36.485 162.359 35.6745 162.965 34.6684C163.586 33.6623 163.897 32.5654 163.897 31.3777V27.5838C163.657 27.7795 163.248 27.9611 162.669 28.1288C162.105 28.2965 161.469 28.4432 160.764 28.569C160.058 28.6947 159.36 28.8065 158.668 28.9043C157.977 29.0022 157.377 29.086 156.869 29.1559C155.726 29.3096 154.702 29.5611 153.799 29.9104C152.896 30.2598 152.183 30.7489 151.661 31.3777C151.139 31.9925 150.878 32.789 150.878 33.7672C150.878 35.1645 151.393 36.2195 152.423 36.9322C153.453 37.6448 154.766 38.0011 156.361 38.0011Z"
                        fill="url(#paint0_linear_67_144)"
                    />
                    <path
                        d="M188.601 43.5766C186.541 43.5766 184.685 43.2133 183.034 42.4867C181.397 41.7461 180.098 40.6561 179.139 39.2168C178.193 37.7776 177.72 36.0029 177.72 33.8929C177.72 32.0763 178.059 30.5742 178.736 29.3864C179.414 28.1987 180.338 27.2485 181.51 26.5358C182.681 25.8232 184.001 25.2852 185.468 24.9219C186.95 24.5446 188.481 24.2721 190.062 24.1044C191.967 23.9088 193.513 23.7341 194.698 23.5804C195.883 23.4127 196.744 23.1612 197.281 22.8258C197.831 22.4765 198.106 21.9385 198.106 21.2119V21.0861C198.106 19.5071 197.633 18.2844 196.688 17.4181C195.742 16.5517 194.38 16.1185 192.602 16.1185C190.725 16.1185 189.236 16.5238 188.136 17.3342C187.049 18.1447 186.315 19.1019 185.934 20.2058L178.779 19.1997C179.343 17.2434 180.275 15.6085 181.573 14.295C182.872 12.9675 184.459 11.9754 186.336 11.3186C188.213 10.6479 190.288 10.3125 192.56 10.3125C194.126 10.3125 195.686 10.4942 197.238 10.8575C198.791 11.2208 200.209 11.8216 201.493 12.6601C202.778 13.4845 203.808 14.6094 204.584 16.0347C205.374 17.46 205.769 19.2416 205.769 21.3796V42.9268H198.403V38.5042H198.149C197.683 39.3985 197.027 40.2369 196.18 41.0194C195.347 41.788 194.296 42.4098 193.026 42.8849C191.77 43.346 190.295 43.5766 188.601 43.5766ZM190.591 38.0011C192.129 38.0011 193.463 37.7007 194.592 37.0998C195.721 36.485 196.589 35.6745 197.196 34.6684C197.817 33.6623 198.127 32.5654 198.127 31.3777V27.5838C197.887 27.7795 197.478 27.9611 196.9 28.1288C196.335 28.2965 195.7 28.4432 194.994 28.569C194.289 28.6947 193.59 28.8065 192.899 28.9043C192.207 29.0022 191.607 29.086 191.099 29.1559C189.956 29.3096 188.933 29.5611 188.03 29.9104C187.127 30.2598 186.414 30.7489 185.892 31.3777C185.369 31.9925 185.108 32.789 185.108 33.7672C185.108 35.1645 185.623 36.2195 186.654 36.9322C187.684 37.6448 188.996 38.0011 190.591 38.0011Z"
                        fill="url(#paint1_linear_67_144)"
                    />
                    <path
                        d="M222.832 43.5766C220.771 43.5766 218.916 43.2133 217.264 42.4867C215.627 41.7461 214.329 40.6561 213.369 39.2168C212.424 37.7776 211.951 36.0029 211.951 33.8929C211.951 32.0763 212.29 30.5742 212.967 29.3864C213.644 28.1987 214.569 27.2485 215.74 26.5358C216.912 25.8232 218.231 25.2852 219.699 24.9219C221.181 24.5446 222.712 24.2721 224.292 24.1044C226.198 23.9088 227.743 23.7341 228.929 23.5804C230.114 23.4127 230.975 23.1612 231.511 22.8258C232.062 22.4765 232.337 21.9385 232.337 21.2119V21.0861C232.337 19.5071 231.864 18.2844 230.918 17.4181C229.973 16.5517 228.611 16.1185 226.833 16.1185C224.956 16.1185 223.467 16.5238 222.366 17.3342C221.279 18.1447 220.546 19.1019 220.164 20.2058L213.009 19.1997C213.574 17.2434 214.505 15.6085 215.804 14.295C217.102 12.9675 218.69 11.9754 220.567 11.3186C222.444 10.6479 224.518 10.3125 226.79 10.3125C228.357 10.3125 229.916 10.4942 231.469 10.8575C233.021 11.2208 234.44 11.8216 235.724 12.6601C237.008 13.4845 238.038 14.6094 238.815 16.0347C239.605 17.46 240 19.2416 240 21.3796V42.9268H232.633V38.5042H232.379C231.913 39.3985 231.257 40.2369 230.41 41.0194C229.578 41.788 228.526 42.4098 227.256 42.8849C226 43.346 224.525 43.5766 222.832 43.5766ZM224.822 38.0011C226.36 38.0011 227.694 37.7007 228.823 37.0998C229.952 36.485 230.82 35.6745 231.426 34.6684C232.047 33.6623 232.358 32.5654 232.358 31.3777V27.5838C232.118 27.7795 231.709 27.9611 231.13 28.1288C230.566 28.2965 229.931 28.4432 229.225 28.569C228.519 28.6947 227.821 28.8065 227.129 28.9043C226.438 29.0022 225.838 29.086 225.33 29.1559C224.187 29.3096 223.163 29.5611 222.26 29.9104C221.357 30.2598 220.644 30.7489 220.122 31.3777C219.6 31.9925 219.339 32.789 219.339 33.7672C219.339 35.1645 219.854 36.2195 220.884 36.9322C221.914 37.6448 223.227 38.0011 224.822 38.0011Z"
                        fill="url(#paint2_linear_67_144)"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="paint0_linear_67_144"
                        x1="143.603"
                        y1="27.5"
                        x2="240"
                        y2="27.5"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FF1616" />
                        <stop offset="0.169821" stopColor="#8C52FF" />
                        <stop offset="0.355592" stopColor="#5271FF" />
                        <stop offset="0.525348" stopColor="#7ED957" />
                        <stop offset="0.679089" stopColor="#FFDE59" />
                        <stop offset="0.829627" stopColor="#FF914D" />
                        <stop offset="1" stopColor="#FF1616" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_67_144"
                        x1="143.603"
                        y1="27.5"
                        x2="240"
                        y2="27.5"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FF1616" />
                        <stop offset="0.169821" stopColor="#8C52FF" />
                        <stop offset="0.355592" stopColor="#5271FF" />
                        <stop offset="0.525348" stopColor="#7ED957" />
                        <stop offset="0.679089" stopColor="#FFDE59" />
                        <stop offset="0.829627" stopColor="#FF914D" />
                        <stop offset="1" stopColor="#FF1616" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_67_144"
                        x1="143.603"
                        y1="27.5"
                        x2="240"
                        y2="27.5"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FF1616" />
                        <stop offset="0.169821" stopColor="#8C52FF" />
                        <stop offset="0.355592" stopColor="#5271FF" />
                        <stop offset="0.525348" stopColor="#7ED957" />
                        <stop offset="0.679089" stopColor="#FFDE59" />
                        <stop offset="0.829627" stopColor="#FF914D" />
                        <stop offset="1" stopColor="#FF1616" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
