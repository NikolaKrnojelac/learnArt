import type { ComponentProps } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Search } from "lucide-react-native";
import { colors } from "@/theme/colors";

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    onSubmit: () => void;
    onCancel: () => void;
    showCancel: boolean;
    inputRef?: ComponentProps<typeof TextInput>["ref"];
};

export function SearchBar({
                              value,
                              onChangeText,
                              onFocus,
                              onBlur,
                              onSubmit,
                              onCancel,
                              showCancel,
                              inputRef,
                          }: SearchBarProps) {
    return (
        <View className="flex-row items-center px-4 pb-2 pt-2">
            <View className="h-14 flex-1 flex-row items-center gap-3 rounded-full border border-border bg-white px-5">
                <Search size={22} color={colors.muted} strokeWidth={1.75} />
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSubmitEditing={onSubmit}
                    placeholder="Search artworks, artists..."
                    placeholderTextColor={colors.muted}
                    returnKeyType="search"
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={{
                        flex: 1,
                        height: "100%",
                        paddingVertical: 0,
                        fontSize: 14,
                        letterSpacing: 0.4,
                        color: colors.primary,
                    }}
                />
            </View>
            {showCancel ? (
                <Pressable onPress={onCancel} hitSlop={8} accessibilityRole="button" className="ml-4">
                    <Text className="text-base text-primary/60">Cancel</Text>
                </Pressable>
            ) : null}
        </View>
    );
}