import { Pressable, Text } from "react-native";
import { X } from "lucide-react-native";
import { IconButton } from "@/components/ui/IconButton";

type RecentQueryRowProps = {
    text: string;
    onPress: () => void;
    onRemove: () => void;
};

export function RecentQueryRow({ text, onPress, onRemove }: RecentQueryRowProps) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            className="flex-row items-center justify-between px-4 py-3"
        >
            <Text numberOfLines={1} className="flex-1 text-lg italic text-primary">
                {text}
            </Text>
            <IconButton
                icon={X}
                label="Remove from recent searches"
                size={20}
                onPress={onRemove}
            />
        </Pressable>
    );
}