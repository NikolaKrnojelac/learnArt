import {View, Text} from "react-native";


export function EmptyState({message} : { message: string }) {
    return (
        <View className="flex-1 items-center justify-center px-8">
            <Text className="text-center text-base text-primary/60">{message}</Text>
        </View>
    )
}