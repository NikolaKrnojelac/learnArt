import { Text, View } from "react-native";

type InfoSectionProps = { title: string; body: string };

export function InfoSection({ title, body }: InfoSectionProps) {
    return (
        <View className="px-4 pt-2">
            <Text className="font-display text-2xl text-primary">{title}</Text>
            <Text className="mt-3 text-base leading-7 text-primary">{body}</Text>
        </View>
    );
}