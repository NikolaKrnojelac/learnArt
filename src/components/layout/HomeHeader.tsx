import { View } from "react-native";
import { SlidersHorizontal, Settings2 } from "lucide-react-native";
import { Logo } from "@/components/ui/Logo";
import { IconButton } from "@/components/ui/IconButton";

type HomeHeaderProps = {
    onFilterPress?: () => void;
};

export function HomeHeader({ onFilterPress }: HomeHeaderProps) {
    return (
        <View className="flex-row items-center justify-between px-4 pb-4">
            <Logo />
            <IconButton
                icon={Settings2}
                label="Filters"
                onPress={onFilterPress}
            />
        </View>
    );
}