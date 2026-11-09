import { Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { colors } from "@/theme/colors";

type CalloutCardProps = { icon: LucideIcon; label: string; text: string };

export function CalloutCard({ icon: Icon, label, text }: CalloutCardProps) {
    return (
        <View className="mx-4 mt-6 flex-row gap-3">
            <Icon size={22} color={colors.primary} strokeWidth={1.75} />
            <View className="flex-1">
                <Text className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {label}
                </Text>
                <Text className="mt-1 text-base leading-6 text-primary/60">{text}</Text>
            </View>
        </View>
    );
}