import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-red-100" edges={["top"]}>
            <View className="flex-1 px-4 pt-6">
                <Text className="text-3xl font-semibold text-primary">Profile</Text>
            </View>
        </SafeAreaView>
    );
}