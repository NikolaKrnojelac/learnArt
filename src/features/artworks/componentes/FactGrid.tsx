import { Text, View } from "react-native";

type Fact = { label: string; value: string | null };

type FactGridProps = { facts: Fact[] };

export function FactGrid({ facts }: FactGridProps) {
    const visible = facts.filter(
        (fact): fact is { label: string; value: string } => Boolean(fact.value)
    );

    if (visible.length === 0) return null;

    return (
        <View className="flex-row flex-wrap px-4 pt-5">
            {visible.map((fact) => (
                <View key={fact.label} className="mb-5 w-1/2 pr-4">
                    <Text className="text-xs uppercase tracking-widest text-primary/60">
                        {fact.label}
                    </Text>
                    <Text className="mt-1 text-base text-primary">{fact.value}</Text>
                </View>
            ))}
        </View>
    );
}