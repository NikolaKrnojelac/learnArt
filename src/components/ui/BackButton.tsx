import {Pressable} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {ArrowLeft} from "lucide-react-native";
import {colors} from "@/theme/colors";
import {router} from "expo-router";


export function BackButton() {

    const {top} = useSafeAreaInsets();

    return (
        <Pressable onPress={() => router.back()}
        accessibilityRole="button" accessibilityLabel="Back" hitSlop={8} style={{top: top+8}}
                   className="absolute left-4 h-11 w-11  items-center justify-center rounded-full bg-background/80"
        >
            <ArrowLeft size={22} color={colors.primary} strokeWidth={1.75} />
        </Pressable>
    )
}