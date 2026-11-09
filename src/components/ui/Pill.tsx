import { Pressable, Text } from "react-native";
import type { ComponentProps } from "react";

type PillProps = Omit<ComponentProps<typeof Pressable>, "children"> & {
    label: string;
    selected?: boolean;
};

export function Pill({ label, selected = false, ...props }: PillProps) {
    return (
        <Pressable
            {...props}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`h-10 items-center justify-center rounded-full border px-5 ${
                selected ? "border-primary bg-primary" : "border-border bg-background"
            }`}
        >
            <Text
                className={`text-base ${selected ? "text-background" : "text-primary"}`}
            >
                {label}
            </Text>
        </Pressable>
    );
}