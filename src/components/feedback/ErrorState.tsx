import { Pressable, Text, View } from "react-native";

type ErrorStateProps = {
    onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
    return(
        <View className="flex-1 items-center justify-center gap-4 px-8">
            <Text className="text-center text-base text-primary">
                Something went wrong while loading artworks.
            </Text>
            <Pressable
                onPress={onRetry}
                className="h-10 items-center justify-center rounded-full bg-primary px-6"
            >
                <Text className="text-base text-background">Try again</Text>
            </Pressable>
        </View>
    )
}