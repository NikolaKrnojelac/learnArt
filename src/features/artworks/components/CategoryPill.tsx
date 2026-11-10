import { FlatList } from "react-native";
import { Pill } from "@/components/ui/Pill";
import type { Category } from "../types";

type CategoryPillsProps = {
    categories: Category[];
    selectedId: string;
    onSelect: (id: string) => void;
};

export function CategoryPills({
                                  categories,
                                  selectedId,
                                  onSelect,
                              }: CategoryPillsProps) {
    return (
        <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
            renderItem={({ item }) => (
                <Pill
                    label={item.label}
                    selected={item.id === selectedId}
                    onPress={() => onSelect(item.id)}
                />
            )}
        />
    );
}