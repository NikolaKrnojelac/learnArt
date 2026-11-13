import { Pressable } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { colors } from "@/theme/colors";

export function BackButton() {
    return (
        <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            className="h-11 w-11 items-center justify-center rounded-full bg-background/80"
        >
            <ArrowLeft size={22} color={colors.primary} strokeWidth={1.75} />
        </Pressable>
    );
}