import { Text, View } from "react-native";

type CollectionHeaderProps = {
    title: string;
    count: number;
};

export function CollectionHeader({ title, count }: CollectionHeaderProps) {
    return (
        <View className="px-1.5 pb-4 pt-2">
            <Text className="font-display text-4xl leading-tight tracking-wide text-primary">
                {title}
            </Text>
            <Text className="mt-2 text-base text-primary/60">
                {count === 1 ? "1 work" : `${count} works`}
            </Text>
        </View>
    );
}