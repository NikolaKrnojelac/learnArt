import { Pressable } from "react-native";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react-native";
import { colors } from "@/theme/colors";
import { TAB_BUTTON_SIZE } from "@/constants/layout";

type TabButtonProps = ComponentProps<typeof Pressable> & {
    icon: LucideIcon;
    label: string;
    isFocused?: boolean;
};

export function TabButton({
                              icon: Icon,
                              label,
                              isFocused,
                              ...props
                          }: TabButtonProps) {
    return (
        <Pressable
            {...props}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: !!isFocused }}
            className="items-center justify-center rounded-full border border-border bg-background"
            style={{
                width: TAB_BUTTON_SIZE,
                height: TAB_BUTTON_SIZE,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 4,
            }}
        >
            <Icon
                size={24}
                color={colors.primary}
                strokeWidth={isFocused ? 2.5 : 1.75}
            />
        </Pressable>
    );
}