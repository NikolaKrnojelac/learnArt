import { Linking, Pressable, Text, View } from "react-native";

type MuseumCreditProps = {
    creditLine: string | null;
    sourceUrl: string | null;
};

export function MuseumCredit({ creditLine, sourceUrl }: MuseumCreditProps) {
    return (
        <View className="mx-4 mt-8 border-t border-border pt-4">
            {creditLine ? (
                <Text className="text-sm text-primary/60">{creditLine}</Text>
            ) : null}
            <Text className="mt-1 text-sm text-primary/60">
                Data and images courtesy of the Cleveland Museum of Art (CC0).
            </Text>
            {sourceUrl ? (
                <Pressable
                    onPress={() => Linking.openURL(sourceUrl)}
                    accessibilityRole="link"
                    className="mt-2"
                >
                    <Text className="text-sm text-primary underline">
                        View at the museum
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );
}