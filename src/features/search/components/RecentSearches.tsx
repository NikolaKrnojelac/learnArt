import { ScrollView } from "react-native";
import { router } from "expo-router";
import { HeaderSection } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ArtworkRow } from "@/features/artworks/components/ArtworkRow";
import { formatByLine } from "@/features/artworks/utils/format";
import { useRecentSearches } from "../store/recentSearches";
import { RecentQueryRow } from "./RecentQueryRow";

type RecentSearchesProps = {
    onSelectQuery: (text: string) => void;
};

export function RecentSearches({ onSelectQuery }: RecentSearchesProps) {
    const items = useRecentSearches((state) => state.items);
    const remove = useRecentSearches((state) => state.remove);
    const clear = useRecentSearches((state) => state.clear);

    if (items.length === 0) {
        return <EmptyState message="Your recent searches will appear here." />;
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
        >
            <HeaderSection
                title="Recent searches"
                actionLabel="Clear All"
                onActionPress={clear}
            />
            {items.map((item) =>
                item.kind === "query" ? (
                    <RecentQueryRow
                        key={item.id}
                        text={item.text}
                        onPress={() => onSelectQuery(item.text)}
                        onRemove={() => remove(item.id)}
                    />
                ) : (
                    <ArtworkRow
                        key={item.id}
                        title={item.title}
                        subtitle={formatByLine(item.artist, item.medium)}
                        imageUrl={item.imageUrl}
                        onPress={() =>
                            router.push({
                                pathname: "/artwork/[id]",
                                params: { id: String(item.artworkId) },
                            })
                        }
                        onRemove={() => remove(item.id)}
                    />
                )
            )}
        </ScrollView>
    );
}