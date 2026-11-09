import { Pressable } from "react-native";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react-native";
import { colors } from "@/theme/colors";

type IconButtonProps = Omit<ComponentProps<typeof Pressable>, "children"> & {
    icon: LucideIcon;
    label: string;
    size?: number;
};

export function IconButton({
                               icon: Icon,
                               label,
                               size = 26,
                               ...props
                           }: IconButtonProps) {
    return (
        <Pressable
            {...props}
            accessibilityRole="button"
            accessibilityLabel={label}
            hitSlop={8}
            className="h-11 w-11 items-center justify-center rounded-full active:bg-surface"
        >
            <Icon size={size} color={colors.primary} strokeWidth={1.75} />
        </Pressable>
    );
}