import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { StyleSheet, Animated } from "react-native"
import { useEffect, useRef } from "react"

const Logo = () => {

    return (

        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={289}
            height={58}
            fill="none"
            opacity={1}
        >
            <Path style={styles.path1}
                fill="#fff"
                d="M22.58 32.45c-1.641 0-3.282.397-4.922 1.192a16.308 16.308 0 0 0-4.447 3.066 17.026 17.026 0 0 0-3.195 4.343c-.835 1.59-1.252 3.208-1.252 4.855 0 .454.043.923.13 1.405.086.455.259.88.518 1.278.288.397.69.724 1.209.98.518.255 1.208.383 2.072.383 1.67 0 3.281-.384 4.835-1.15a15.595 15.595 0 0 0 4.231-3.109 15.838 15.838 0 0 0 2.98-4.3c.747-1.62 1.122-3.237 1.122-4.856 0-.425-.044-.88-.13-1.362a3.41 3.41 0 0 0-.432-1.32 2.718 2.718 0 0 0-.993-.98c-.431-.284-1.007-.426-1.727-.426Zm3.626 17.16c-2.447 2.897-5.051 5.026-7.814 6.389C15.657 57.333 12.692 58 9.498 58c-1.756 0-3.238-.255-4.447-.767-1.209-.482-2.187-1.15-2.936-2.001a7.968 7.968 0 0 1-1.64-2.98A13.423 13.423 0 0 1 0 48.631c0-1.448.187-2.939.561-4.472a29.603 29.603 0 0 1 1.468-4.514 201.577 201.577 0 0 0 1.64-3.918c.173-.454.317-.837.432-1.15l.432-1.022c.144-.368.317-.78.518-1.234a49.32 49.32 0 0 1 .82-1.832L18.479 2.854c.173-.369.417-.724.734-1.064a6.01 6.01 0 0 1 1.166-.895 5.075 5.075 0 0 1 1.381-.638A4.95 4.95 0 0 1 23.313 0c1.324 0 2.245.256 2.764.767.546.51.82 1.135.82 1.873 0 .568-.144 1.193-.432 1.874a15.711 15.711 0 0 1-.95 1.831 232.817 232.817 0 0 0-6.044 12.307 256.577 256.577 0 0 1-6.044 12.307c.92-.71 1.9-1.391 2.936-2.044a23.934 23.934 0 0 1 3.238-1.789 19.058 19.058 0 0 1 3.497-1.277 13.622 13.622 0 0 1 3.712-.511c.893 0 1.8.17 2.72.51.921.341 1.756.838 2.504 1.491a7.137 7.137 0 0 1 1.857 2.428c.49.936.734 2.03.734 3.278 0 .284-.087.852-.26 1.704a27.66 27.66 0 0 1-.776 2.896 30.691 30.691 0 0 1-1.21 3.279 16.66 16.66 0 0 1-1.553 2.938c.201.312.46.511.777.596.316.057.676.085 1.079.085 1.324 0 2.633-.17 3.929-.51a27.003 27.003 0 0 0 3.713-1.236 38.016 38.016 0 0 0 3.238-1.575 78.602 78.602 0 0 0 2.46-1.406c.346-.369.72-.553 1.123-.553.49 0 .906.213 1.252.639.374.425.561.98.561 1.66a4.82 4.82 0 0 1-.432 1.96c-.259.624-.748 1.32-1.467 2.086a75.92 75.92 0 0 1-3.93 2.172 35.364 35.364 0 0 1-3.971 1.788c-1.353.483-2.734.88-4.145 1.193a20.965 20.965 0 0 1-4.23.425c-.922 0-1.77-.127-2.548-.383a5.387 5.387 0 0 1-2.029-1.192Z"
            />
            <Path
                fill="#fff"
                d="M56.557 32.875c-1.353 0-2.663.34-3.93 1.022a11.717 11.717 0 0 0-3.323 2.64 13.188 13.188 0 0 0-2.289 3.705 10.732 10.732 0 0 0-.863 4.216c0 .54.043 1.136.13 1.789.086.624.259 1.22.518 1.788.287.54.69.994 1.208 1.363s1.21.553 2.073.553c1.324 0 2.604-.34 3.842-1.022a12.858 12.858 0 0 0 3.368-2.725 13.732 13.732 0 0 0 2.33-3.833c.576-1.419.864-2.853.864-4.3 0-.568-.043-1.15-.13-1.746a4.217 4.217 0 0 0-.517-1.704 3.02 3.02 0 0 0-1.166-1.235c-.518-.34-1.223-.51-2.115-.51Zm2.245-7.495c1.093 0 2.259.142 3.497.426 1.266.284 2.432.767 3.497 1.448 1.065.681 1.942 1.59 2.633 2.725.72 1.108 1.08 2.485 1.08 4.131 0 .852-.116 1.831-.346 2.938a22.571 22.571 0 0 1-1.036 3.407c.288.34.619.582.993.724.374.142.777.213 1.209.213.604 0 1.266-.17 1.986-.51a14.76 14.76 0 0 0 2.288-1.321 26.24 26.24 0 0 0 2.331-1.831 53.732 53.732 0 0 0 4.058-3.96c.576-.625 1.051-1.15 1.425-1.576.202-.199.446-.298.734-.298.403 0 .763.213 1.08.639.316.397.474.965.474 1.703 0 .738-.23 1.59-.69 2.555-.432.965-1.252 1.973-2.461 3.023-.691.739-1.483 1.59-2.375 2.555a32.09 32.09 0 0 1-2.85 2.726 18.869 18.869 0 0 1-3.15 2.172c-1.094.596-2.188.894-3.282.894a7.274 7.274 0 0 1-2.202-.34c-.69-.228-1.396-.597-2.115-1.108a26.082 26.082 0 0 1-3.54 4.344 21.446 21.446 0 0 1-4.447 3.364 21.581 21.581 0 0 1-5.267 2.172c-1.871.54-3.871.809-6.001.809-.806 0-1.742-.156-2.807-.469-1.065-.312-2.086-.823-3.065-1.533-.95-.738-1.756-1.689-2.418-2.853-.662-1.164-.993-2.583-.993-4.258 0-1.136.188-2.498.562-4.088.374-1.59.935-3.223 1.683-4.898a31.837 31.837 0 0 1 2.893-5.024 22.155 22.155 0 0 1 4.188-4.472c1.612-1.334 3.454-2.399 5.526-3.194 2.072-.823 4.375-1.235 6.908-1.235Z"
            />
            <Path
                fill="#fff"
                d="M93.167 32.875c-1.352 0-2.662.34-3.928 1.022a11.719 11.719 0 0 0-3.325 2.64 13.19 13.19 0 0 0-2.288 3.705 10.732 10.732 0 0 0-.863 4.216c0 .54.043 1.136.13 1.789.085.624.258 1.22.517 1.788.288.54.691.994 1.21 1.363.517.369 1.208.553 2.071.553 1.324 0 2.605-.34 3.843-1.022a12.858 12.858 0 0 0 3.367-2.725 13.732 13.732 0 0 0 2.332-3.833c.575-1.419.863-2.853.863-4.3 0-.568-.043-1.15-.13-1.746a4.217 4.217 0 0 0-.517-1.704 3.02 3.02 0 0 0-1.166-1.235c-.518-.34-1.223-.51-2.116-.51Zm2.245-7.495c1.094 0 2.26.142 3.497.426 1.267.284 2.432.767 3.497 1.448 1.065.681 1.943 1.59 2.634 2.725.719 1.108 1.079 2.485 1.079 4.131 0 .852-.115 1.831-.345 2.938a22.605 22.605 0 0 1-1.036 3.407c.287.34.618.582.993.724.374.142.777.213 1.208.213.605 0 1.267-.17 1.986-.51a14.73 14.73 0 0 0 2.289-1.321c.777-.54 1.554-1.15 2.331-1.831a53.7 53.7 0 0 0 4.058-3.96 90.044 90.044 0 0 0 1.425-1.576c.201-.199.446-.298.734-.298.403 0 .763.213 1.079.639.317.397.475.965.475 1.703 0 .738-.23 1.59-.691 2.555-.431.965-1.252 1.973-2.461 3.023-.69.739-1.482 1.59-2.374 2.555a32.098 32.098 0 0 1-2.849 2.726 18.888 18.888 0 0 1-3.152 2.172c-1.094.596-2.188.894-3.281.894a7.27 7.27 0 0 1-2.202-.34c-.691-.228-1.396-.597-2.116-1.108a26.07 26.07 0 0 1-3.54 4.344 21.446 21.446 0 0 1-4.447 3.364 21.581 21.581 0 0 1-5.267 2.172c-1.87.54-3.87.809-6 .809-.807 0-1.742-.156-2.807-.469-1.065-.312-2.087-.823-3.065-1.533-.95-.738-1.756-1.689-2.418-2.853-.662-1.164-.993-2.583-.993-4.258 0-1.136.187-2.498.561-4.088.374-1.59.936-3.223 1.684-4.898a31.837 31.837 0 0 1 2.893-5.024 22.155 22.155 0 0 1 4.188-4.472c1.611-1.334 3.453-2.399 5.526-3.194 2.072-.823 4.374-1.235 6.907-1.235Z"
            />
            <Path
                fill="#fff"
                d="M124.899 34.536a75.789 75.789 0 0 1 3.454-3.279 30.61 30.61 0 0 1 3.843-2.938 21.049 21.049 0 0 1 4.231-2.13 13.283 13.283 0 0 1 7.555-.468 8.423 8.423 0 0 1 2.72 1.022 6.09 6.09 0 0 1 2.029 1.874c.518.766.777 1.703.777 2.81 0 1.817-.432 3.464-1.295 4.94-.835 1.476-1.929 2.797-3.281 3.96a25.926 25.926 0 0 1-4.533 3.11 45.88 45.88 0 0 1-4.836 2.256c-.403.17-.777.398-1.122.681-.346.256-.648.54-.907.852a4.24 4.24 0 0 0-.561.894c-.144.284-.216.526-.216.724 0 .341.101.64.302.895.23.227.619.34 1.166.34 1.065 0 2.274-.213 3.626-.639 1.353-.425 2.922-1.064 4.706-1.916 1.813-.88 3.871-1.987 6.174-3.321a440.754 440.754 0 0 0 8.03-4.727c.489-.284.95-.426 1.382-.426.547 0 .978.199 1.295.596.316.398.475.923.475 1.576 0 .795-.302 1.703-.907 2.725-.576.994-1.554 1.945-2.936 2.853-1.928 1.164-3.9 2.37-5.914 3.62a73.448 73.448 0 0 1-6.217 3.45 42.75 42.75 0 0 1-6.563 2.512 23.654 23.654 0 0 1-6.907 1.022c-4.087 0-6.131-1.746-6.131-5.238 0-1.845.389-3.464 1.166-4.855a15.547 15.547 0 0 1 2.892-3.705 22.204 22.204 0 0 1 3.584-2.682 113.728 113.728 0 0 0 3.195-2.044c.69-.398 1.338-.824 1.942-1.278a12.983 12.983 0 0 0 1.598-1.405c.489-.483.863-.966 1.122-1.448.288-.511.432-1.022.432-1.533 0-.823-.389-1.235-1.166-1.235-2.878 0-6.907 2.74-12.088 8.219a70.446 70.446 0 0 0-3.238 3.662 89.37 89.37 0 0 0-2.763 3.45 417.86 417.86 0 0 0-2.418 3.32c-.777 1.051-1.54 2.06-2.288 3.024-2.245 2.499-4.245 3.748-6.001 3.748-.835 0-1.439-.156-1.813-.469-.374-.284-.562-.837-.562-1.66v-.341c0-.114.015-.241.044-.383.057-.568.302-1.434.734-2.598a85.774 85.774 0 0 1 1.597-3.96 407.745 407.745 0 0 1 2.159-4.727 891.721 891.721 0 0 1 2.374-4.897 377.007 377.007 0 0 1 2.202-4.514c.691-1.42 1.266-2.598 1.727-3.535l13.643-27.467c.172-.369.431-.724.777-1.064a7.34 7.34 0 0 1 1.209-.895c.46-.284.935-.497 1.424-.638A4.95 4.95 0 0 1 137.376 0c1.296 0 2.188.241 2.677.724.518.483.777 1.065.777 1.746 0 .624-.158 1.277-.475 1.959-.287.681-.633 1.32-1.036 1.916-1.209 2.13-2.417 4.4-3.626 6.814a586.617 586.617 0 0 0-3.54 7.281 442.673 442.673 0 0 1-3.584 7.325 134.243 134.243 0 0 1-3.67 6.771Z"
            />
            <Path
                fill="#fff"
                d="M172.519 31.214a2.023 2.023 0 0 0-.388-.042h-.389a7.403 7.403 0 0 0-3.065.639c-.95.425-1.828.993-2.634 1.703a13.873 13.873 0 0 0-2.115 2.342c-.605.88-1.151 1.76-1.641 2.64a25.086 25.086 0 0 0-1.252 2.47 32.399 32.399 0 0 0-.734 2.002 44.183 44.183 0 0 0 3.109-1.746 163.967 163.967 0 0 0 3.065-1.874c.95-.596 1.77-1.136 2.461-1.618.719-.483 1.223-.81 1.511-.98 1.295-.794 2.187-1.533 2.677-2.214.489-.71.734-1.32.734-1.831 0-.426-.144-.767-.432-1.022a1.645 1.645 0 0 0-.907-.469Zm1.554-5.876c2.389 0 4.174.567 5.354 1.703 1.18 1.136 1.77 2.711 1.77 4.727 0 1.192-.317 2.441-.95 3.747s-1.727 2.64-3.281 4.003c-1.554 1.335-3.641 2.712-6.26 4.131-2.59 1.391-5.843 2.796-9.757 4.216.144.823.59 1.476 1.338 1.959.749.454 1.742.681 2.979.681 1.324 0 2.734-.184 4.231-.553a36.088 36.088 0 0 0 4.49-1.49 67.245 67.245 0 0 0 4.361-1.917c1.41-.71 2.676-1.377 3.799-2.002a69.663 69.663 0 0 0 2.849-1.618c.777-.454 1.295-.738 1.554-.852.26-.17.49-.27.691-.298.231-.028.432-.042.605-.042.345 0 .633.085.863.255.23.142.417.327.561.554.173.199.288.426.346.681.057.227.086.426.086.596 0 .256-.029.568-.086.937-.058.34-.274.738-.648 1.193-.144.142-.633.525-1.468 1.15-.806.624-1.856 1.362-3.151 2.214a74.564 74.564 0 0 1-4.534 2.725 53.334 53.334 0 0 1-5.439 2.598 40.598 40.598 0 0 1-5.958 1.959c-2.072.54-4.116.809-6.131.809-1.727 0-3.266-.327-4.619-.98a10.656 10.656 0 0 1-3.411-2.64c-.921-1.107-1.626-2.385-2.115-3.832a14.116 14.116 0 0 1-.734-4.557c0-1.22.244-2.555.734-4.003.489-1.476 1.194-2.953 2.115-4.429.921-1.476 2.044-2.91 3.368-4.3a24.873 24.873 0 0 1 4.533-3.748 23.663 23.663 0 0 1 5.483-2.598c2.014-.653 4.159-.98 6.432-.98Z"
            />
            <Path
                fill="#fff"
                d="M202.136 33.088c-1.353 0-2.662.34-3.929 1.022a12.15 12.15 0 0 0-3.367 2.683 13.285 13.285 0 0 0-2.332 3.747c-.575 1.363-.863 2.74-.863 4.131 0 .568.029 1.164.086 1.789.087.596.259 1.15.518 1.66a3.58 3.58 0 0 0 1.08 1.278c.489.34 1.137.511 1.942.511.634 0 1.368-.27 2.202-.81.864-.567 1.742-1.277 2.634-2.128a36.798 36.798 0 0 0 2.677-2.853 48.198 48.198 0 0 0 2.331-3.067 29.275 29.275 0 0 0 1.684-2.682c.431-.795.647-1.377.647-1.746 0-.54-.187-1.022-.561-1.448a4.94 4.94 0 0 0-1.382-1.15 6.328 6.328 0 0 0-1.77-.681c-.604-.17-1.137-.256-1.597-.256Zm29.919 10.987c-.518.482-1.209 1.15-2.072 2.001a76.796 76.796 0 0 1-2.979 2.768 79.547 79.547 0 0 1-3.541 3.024 39.102 39.102 0 0 1-3.842 2.725 23.763 23.763 0 0 1-3.842 2.002c-1.267.54-2.461.809-3.584.809-1.007 0-1.871-.213-2.59-.639a5.916 5.916 0 0 1-1.813-1.66 7.634 7.634 0 0 1-1.037-2.3c-.23-.88-.345-1.775-.345-2.683 0-.596.043-1.178.13-1.746.086-.596.23-1.15.431-1.66a53.017 53.017 0 0 1-3.065 3.704 29.918 29.918 0 0 1-3.67 3.45 19.847 19.847 0 0 1-4.101 2.512c-1.41.681-2.85 1.022-4.317 1.022-.749 0-1.627-.156-2.634-.469-.979-.284-1.914-.766-2.806-1.448-.892-.68-1.641-1.56-2.245-2.64-.605-1.078-.907-2.399-.907-3.96 0-1.164.173-2.555.518-4.173.374-1.619.921-3.294 1.641-5.025a32.697 32.697 0 0 1 2.806-5.196 22.813 22.813 0 0 1 4.058-4.556 19.074 19.074 0 0 1 5.311-3.28c1.986-.85 4.202-1.277 6.648-1.277 1.267 0 2.375.157 3.325.469.949.312 1.755.653 2.417 1.022.749.454 1.411.95 1.986 1.49.489-.255.993-.497 1.511-.724.432-.198.878-.369 1.339-.51.489-.171.906-.256 1.252-.256 1.093 0 1.986.298 2.676.894.691.596 1.037 1.25 1.037 1.959 0 .199-.015.355-.044.468a21.24 21.24 0 0 1-.69 2.044c-.288.824-.619 1.746-.993 2.768-.375.994-.763 2.044-1.166 3.152a80.977 80.977 0 0 0-1.036 3.194 37.8 37.8 0 0 0-.777 2.98c-.202.909-.303 1.69-.303 2.343 0 .851.144 1.561.432 2.129.288.54.777.809 1.468.809.432 0 .935-.128 1.511-.383a15.794 15.794 0 0 0 1.943-1.108 30.1 30.1 0 0 0 2.115-1.533 70.808 70.808 0 0 0 2.159-1.788 110.749 110.749 0 0 0 5.138-4.855c.46-.369.906-.553 1.338-.553.576 0 1.051.284 1.425.851.403.54.604 1.15.604 1.831 0 .795-.273 1.462-.82 2.002Z"
            />
            <Path
                fill="#fff"
                d="M239.955 32.364c1.756.909 3.325 1.945 4.706 3.109 1.382 1.164 2.548 2.399 3.497 3.705.979 1.277 1.713 2.583 2.202 3.917.518 1.335.777 2.64.777 3.918 0 1.618-.475 3.08-1.424 4.386-.921 1.278-2.145 2.37-3.67 3.28-1.497.88-3.224 1.547-5.181 2a24.088 24.088 0 0 1-5.871.725c-1.497 0-2.951-.17-4.361-.511a13.594 13.594 0 0 1-3.885-1.49 10.78 10.78 0 0 1-2.979-2.598c-.835-1.08-1.425-2.357-1.77-3.833a2.347 2.347 0 0 1-.087-.553c0-.767.274-1.42.82-1.96.547-.567 1.152-.851 1.814-.851.316 0 .662.057 1.036.17.403.114.705.37.907.767a6.229 6.229 0 0 0 1.554 1.83c.69.54 1.453 1.009 2.288 1.406.835.37 1.712.667 2.633.895.95.198 1.871.298 2.764.298.921 0 1.798-.086 2.633-.256.864-.17 1.612-.44 2.245-.809.662-.37 1.18-.837 1.554-1.405.374-.568.562-1.264.562-2.087 0-1.448-.331-2.782-.993-4.003a13.723 13.723 0 0 0-2.591-3.364 21.378 21.378 0 0 0-3.583-2.896 105.306 105.306 0 0 0-3.972-2.598c-.144-.085-.36-.326-.648-.723-.288-.426-.431-.852-.431-1.278 0-.34.086-.61.259-.809.46-.596.993-1.207 1.597-1.831a15.622 15.622 0 0 1 1.943-1.703 8.795 8.795 0 0 1 2.245-1.278 6.367 6.367 0 0 1 2.504-.511c.633 0 1.223.085 1.77.255.547.17 1.007.398 1.381.682.375.255.662.553.864.894.23.312.345.61.345.894 0 .398-.1.781-.302 1.15-.201.37-.475.724-.82 1.065-.317.34-.691.681-1.123 1.022-.403.34-.806.667-1.209.98Z"
            />
            <Path
                fill="#fff"
                d="M271.817 31.214a2.023 2.023 0 0 0-.388-.042h-.389a7.403 7.403 0 0 0-3.065.639c-.95.425-1.828.993-2.634 1.703a13.873 13.873 0 0 0-2.115 2.342c-.605.88-1.152 1.76-1.641 2.64a25.086 25.086 0 0 0-1.252 2.47 32.399 32.399 0 0 0-.734 2.002 44.183 44.183 0 0 0 3.109-1.746 163.967 163.967 0 0 0 3.065-1.874c.95-.596 1.77-1.136 2.461-1.618.719-.483 1.223-.81 1.511-.98 1.295-.794 2.187-1.533 2.677-2.214.489-.71.734-1.32.734-1.831 0-.426-.144-.767-.432-1.022a1.645 1.645 0 0 0-.907-.469Zm1.554-5.876c2.389 0 4.174.567 5.354 1.703 1.18 1.136 1.77 2.711 1.77 4.727 0 1.192-.317 2.441-.95 3.747s-1.727 2.64-3.281 4.003c-1.554 1.335-3.641 2.712-6.26 4.131-2.591 1.391-5.843 2.796-9.757 4.216.144.823.59 1.476 1.338 1.959.748.454 1.741.681 2.979.681 1.324 0 2.734-.184 4.231-.553a36.143 36.143 0 0 0 4.49-1.49 66.977 66.977 0 0 0 4.36-1.917c1.411-.71 2.677-1.377 3.8-2.002a69.663 69.663 0 0 0 2.849-1.618c.777-.454 1.295-.738 1.554-.852.259-.17.49-.27.691-.298.23-.028.432-.042.605-.042.345 0 .633.085.863.255.23.142.417.327.561.554.173.199.288.426.346.681.057.227.086.426.086.596 0 .256-.029.568-.086.937-.058.34-.274.738-.648 1.193-.144.142-.633.525-1.468 1.15-.806.624-1.856 1.362-3.151 2.214a74.564 74.564 0 0 1-4.534 2.725 53.334 53.334 0 0 1-5.439 2.598 40.598 40.598 0 0 1-5.958 1.959c-2.073.54-4.116.809-6.131.809-1.727 0-3.267-.327-4.619-.98a10.656 10.656 0 0 1-3.411-2.64c-.921-1.107-1.626-2.385-2.116-3.832a14.142 14.142 0 0 1-.733-4.557c0-1.22.244-2.555.733-4.003.49-1.476 1.195-2.953 2.116-4.429.921-1.476 2.043-2.91 3.367-4.3a24.914 24.914 0 0 1 4.534-3.748 23.663 23.663 0 0 1 5.483-2.598c2.014-.653 4.159-.98 6.432-.98Z"
            />
        </Svg>
    )
}
export default Logo


const styles = StyleSheet.create({
    path1: {
        color: "red"
    }

})