import { Pressable, Text } from "react-native";
import type { ComponentProps } from "react";

type PrimaryButtonProps = Omit<ComponentProps<typeof Pressable>, "children"> & {
    label: string;
};

export function PrimaryButton({ label, disabled, ...props }: PrimaryButtonProps) {
    return (
        <Pressable
            {...props}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityState={{ disabled: !!disabled }}
            className={`h-16 items-center justify-center rounded-2xl ${
                disabled ? "bg-primary/40" : "bg-primary"
            }`}
        >
            <Text className="text-lg font-semibold tracking-wide text-background">
                {label}
            </Text>
        </Pressable>
    );
}