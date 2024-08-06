import { computed, type Ref } from "vue";
import type { IconProps, IconWeight } from "./types";

export const useIcon = (props: Ref<IconProps>) => {
    const ICON_WEIGHT_TO_STROKE_WIDTH: Record<IconWeight, number> = {
        thin: 1,
        normal: 1.5,
        bold: 2,
    };

    const strokeWidth = computed<number>(() => {
        if (typeof props.value.weight === "number") {
            return props.value.weight;
        }

        return ICON_WEIGHT_TO_STROKE_WIDTH[props.value.weight || "normal"];
    });

    return {
        strokeWidth
    };
};