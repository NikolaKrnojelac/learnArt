import { useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { formatYear } from "@/features/artworks/utils/year";
import { colors } from "@/theme/colors";

type YearFieldProps = {
    label: string;
    value: number;
    onChange: (year: number) => void;
};

export function YearField({ label, value, onChange }: YearFieldProps) {
    const [text, setText] = useState("");
    const [focused, setFocused] = useState(false);

    const handleChange = (next: string) => {
        setText(next)
        const parsed = Number.parseInt(next, 10)
        if(Number.isFinite(parsed)) {onChange(parsed)}
    }

    return (
        <View className="flex-1 rounded-2xl border border-border bg-white px-4 py-3">
            <Text className="text-sm text-primary/60">{label}</Text>
            <TextInput
                accessibilityLabel={label}
                value={focused ? text : formatYear(value)}
                onFocus={() => {
                    setText(String(value));
                    setFocused(true);
                }}
                onBlur={() => setFocused(false)}
                onChangeText={handleChange}
                selectTextOnFocus
                keyboardType={Platform.select({
                    ios: "numbers-and-punctuation",
                    default: "numeric",
                })}
                returnKeyType="done"
                maxLength={5}
                style={{
                    marginTop: 2,
                    height: 26,
                    padding: 0,
                    fontSize: 18,
                    fontWeight: "600",
                    color: colors.primary,
                }}
            />
        </View>
    );
}